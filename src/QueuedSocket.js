import { Socket }   from 'net';
import { Duplex }   from 'stream';
import { nextTick } from 'process';

import Logger from 'js-logger';

import Observable, { hasObservable } from './lib/observable';

const $private = Symbol();

function setUpConnection() {
    let socket =
        new Socket({
            readable: true,
            writable: true
        });
    socket.setEncoding('utf8');

    this[$private].socket = socket;

    let handleClose = () => {
        this[$private].socket    = undefined;
        this[$private].connected = undefined;
    }

    let handleConnect = () => {
        Logger.info("socket connected; let's do some work");

        this[$private].connected = true;
        socket.on('data', raw => {
            let buffer = this[$private].buffer + raw;

            let m, re = this[$private].inputRegex;

            if (!re.flags.includes('g')) {
                re = new RegExp(re.source, re.flags + 'g');
            }

            do {
                let lastIdx = re.lastIndex;

                m = re.exec(buffer);
                if (m) {
                    if (this[$private].isReading) {
                        this.push(m[0]);
                    }
                    else {
                        this[$private].incomingQueue.push(m[0]);
                    }

                    let sub = this[$private].subject;
                    if (sub && !sub.closed) {
                        sub.next(m[0]);
                    }
                }
                else {
                    this[$private].buffer = buffer.substr(lastIdx);
                }
            } while (m);
        });

        nextTick(() => {
            this::processQueue()
        });
    };

    socket
        .on('connect', handleConnect)
        .on('close',   handleClose)
        ;

    socket.connect(this._port, this._ip);
}

function processQueue() {
    const {
        outgoingQueue = [],
        alreadyWorking,
        connected,
        socket
    } = this[$private];

    // if there's nothing to do, get out.
    if (!outgoingQueue.length) {
        Logger.info('nothing to do!');
        return;
    }

    // if we're already doing something, get out.
    if (alreadyWorking) {
        Logger.info('already working!');
        return;
    }

    // if a connection is pending, wait.
    if (connected === false) {
        Logger.info('connection pending');
        return;
    }

    // if there's no network connection, make one and get out.
    if (connected === undefined) {
        this[$private].connected = false;
        Logger.info("no connection; let's make one.");
        this::setUpConnection();
        return;
    }

    Logger.info('Getting down to business');

    // this is probably not really needed.
    this[$private].alreadyWorking = true;

    // if there is something to do and there's a connection, process
    // the first item in the queue
    let cmd = outgoingQueue.shift();
    Logger.debug("sent: " + cmd);
    socket.write(cmd);
    nextTick(() => {
        this::processQueue();
    });
    this[$private].alreadyWorking = false;
}

class QueuedSocket extends Duplex {
    constructor(ip, port, inputRegex = /.*/g) {
        super();

        this._ip   = ip;
        this._port = port;

        this[$private] = {
            outgoingQueue: [],
            incomingQueue: [],
            connected:     false,
            inputRegex
        }

        Logger.info("no connection; let's make one.");
        this::setUpConnection();

        if (hasObservable) {
            let self = this;
            let descriptor = {
                get: () =>
                    new Observable(
                        function(observer) {
                            self[$private].subject = observer;

                            return () => {
                                delete self[$private].subject;
                            }
                        }
                    )
            };

            Object.defineProperty(this, 'data', descriptor)
        }
    }

    _read(size) {
        let priv = this[$private];

        priv.isReading = true;

        // first empty the queue if there is one
        while (priv.isReading && priv.incomingQueue.length) {
            priv.isReading = this.push(priv.incomingQueue.shift());
        }
    }

    get connected() {
        return this[$private].connected;
    }

    _write(chunk, encoding, callback) {
        this.send(chunk.toString());
        callback();
    }

    send(data) {
        this[$private].outgoingQueue.push(data);
        nextTick(() => this::processQueue())
    }

    close() {
        const { socket } = this[$private];
        socket && socket.end();
    }
}

export {
    QueuedSocket as default
}
