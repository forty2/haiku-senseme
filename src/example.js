// uncomment if you've installed rxjs
// import 'any-observable/register/rxjs-all';

import Observable from './lib/observable';
import { SenseME } from './index';

SenseME
    .on('founddevice', dev => {
        console.log(`Found a device: ${dev.name} (${dev.ip})`);
    })
    .on('lostdevice', dev => {
        console.log(`Lost a device: ${dev.name} (${dev.ip})`);
    })
    .discover();
