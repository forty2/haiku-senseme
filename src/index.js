import 'any-observable/register/rxjs';
import './lib/polyfills';

import util from 'util';

import Logger from 'js-logger';

import SenseMe from './SenseMe';

Logger.useDefaults({
    defaultLevel: Logger.DEBUG,
    formatter: function (messages, context) {
        const date   = new Date(),
              year   = date.getFullYear(),
              month  = ("0"+(date.getMonth() + 1)).substr(-2),
              day    = ("0"+date.getDate()).substr(-2),
              hour   = ("0"+date.getHours()).substr(-2),
              minute = ("0"+date.getMinutes()).substr(-2),
              second = ("0"+date.getSeconds()).substr(-2),
              millis = ("000"+date.getMilliseconds()).substr(-3),
              level  = ("     "+context.level.name).substr(-5);

        messages.unshift(
            `[${year}/${month}/${day}]` +
            `[${hour}:${minute}:${second}.${millis}]` +
            `[${level}]`
        )
    }
})

/*
const QueuedSocket = require('./QueuedSocket');
const { Transform } = require('stream');
const streamify = require('stream-array');


const { Observable } = require('@reactivex/rxjs');

let g;
if (typeof window !== 'undefined') {
    g = window;
} else if (typeof global !== 'undefined') {
    g = global;
}

if (g) {
    g.Observable = Observable;
}

class AddANewline extends Transform {
    _transform(line, encoding, processed) {
        this.push(line + '\n');
        processed();
    }

    _flush() { }
}



let socket = new QueuedSocket('192.168.2.81', 31415, /\([^)]+\)/);
*/

    /*
socket
    .pipe(new AddANewline())
    .pipe(process.stdout);
    */

/*
socket.data
    .subscribe(x => console.log(x), e => console.error(e), () => console.log('done'));

streamify([
    '<Living Room Fan;FAN;SPD;SET;2>'
])
    .pipe(socket);
    */


SenseMe.discover();
SenseMe.on('founddevice', dev => {
    Logger.debug(`Found a device: ${dev.name} (${dev.ip})`);

    /*
    dev.observeAll()
        .subscribe(
            ::Logger.debug,
            ::Logger.error,
            () => Logger.info('done')
        );
        */

    //dev.fan.power.listen()
    /*
    dev.listenAll()
        .on('change', x => log.debug(x))
        ;
    */

    /*
    if (dev.name === 'Living Room Fan') {
        setTimeout(function() {
            console.log(`get: ${dev.name}: ${dev.fan.speed.value}`);
        }, 1000);
        setTimeout(function() {
            dev.fan.speed.value = 2;
        }, 5000);
    }
    */
});
