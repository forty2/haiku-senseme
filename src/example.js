// uncomment if you've installed rxjs
// import 'any-observable/register/rxjs-all';

import Logger from 'js-logger';

import Observable from './lib/observable';
import { SenseME } from './index';

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

SenseME
    .on('founddevice', dev => {
        Logger.debug(`Found a device: ${dev.name} (${dev.ip})`);
    })
    .on('lostdevice', dev => {
        Logger.debug(`Lost a device: ${dev.name} (${dev.ip})`);
    })
    .discover();
