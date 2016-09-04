import Logger from 'js-logger';

let Observable, hasObservable;
try {
    Observable = require('any-observable');
    hasObservable = true;

    Logger.debug('woohoo! observables!');
}
catch (e) {
    Logger.debug("there's no Observable, but we can do without");
}

export {
    Observable as default,
    hasObservable
}
