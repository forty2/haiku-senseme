import Observable from './index';

class FlatMapObserver {
    constructor(subscriber, mapper) {
        this.mapper = mapper;
        this.subscriber = subscriber;

        this._index = 0;
        this._subs = [];
    }

    next(item) {
        const subscriber = this.subscriber;
        if (subscriber.closed) {
            this._subs.forEach(x => x.unsubscribe());
            return
        }

        let inner;
        try {
            inner = this.mapper(item, this._index++);
        }
        catch (e) {
            this.error(e);
            return;
        }

        if (inner) {
            let sub = inner.subscribe(
                x => {
                    if (subscriber.closed) {
                        this._subs.forEach(x => x.unsubscribe());
                    }
                    else {
                        subscriber.next(x)
                    }
                },
                ::subscriber.error,
                () => {
                    this._subs.remove(sub);
                    this._closeIfReady();
                }
            );

            this._subs.push(sub);
        }
    }

    error() {
        this.subscriber.error(...arguments);
    }

    complete() {
        this._outerFinished = true;
        this._closeIfReady();
    }

    _closeIfReady() {
        if (this._outerFinished && this._subs.length === 0) {
            this.subscriber.complete();
        }
    }
}

function flatMapObservable(observable, mapper) {
    return new Observable(
        subscriber =>
            observable
                .subscribe(new FlatMapObserver(subscriber, mapper))
    );
}

function method(mapper) {
    return flatMapObservable(this, mapper);
}

export {
    flatMapObservable as default,
    method
}
