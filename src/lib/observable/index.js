const debug = require('debug')('haiku-senseme:observable');

let Observable, hasObservable;
try {
    Observable = require('any-observable');
    hasObservable = true;

    debug('woohoo! observables!');
}
catch (e) {
    debug("there's no Observable, but we can do without");
}

export {
    Observable as default,
    hasObservable
}
