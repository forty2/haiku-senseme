# haiku-senseme
> Control your fans and other Big Ass devices

[![NPM Version][npm-image]][npm-url]
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
![Dependency status](https://david-dm.org/forty2/haiku-senseme.svg)

haiku-senseme is a Node.js module for controlling SenseME-enabled devices by [Haiku](http://www.haikuhome.com/).

## Installation

This module is distributed through NPM:

```sh
npm install haiku-senseme --save
```

## Examples

This module handles two aspects of working with SenseME devices: discovery and control.  Discovered devices are presented as a series of `founddevice` events; when devices disappear, a `lostdevice` event will be emitted.

For example, to print the names of all SenseME devices on the local network:

```javascript
import { SenseME } from 'haiku-senseme';

SenseME
  .on('founddevice', dev => {
    console.log(`Found: ${dev.name}`);
  })
  .on('lostdevice', dev => {
    console.log(`Lost: ${dev.name}`);
  })
  .discover();
```

Discovery will continue indefinitely until you stop it:

```javascript
import { SenseME } from 'haiku-senseme';

SenseME.cancelDiscovery();
SenseME.getAllDevices().forEach(dev => dev.disconnect());
```

If you know the IP address and either the name or the MAC address of your device, you can skip discovery altogether if you prefer:

```javascript
import { Device } from 'haiku-senseme';

const dev = new Device({ name: 'Living Room Fan', ip: 'aaa.bbb.ccc.ddd' });

// It's too cold in here.
dev.fan.power.value = 'off';
```

Controllable properties of the fan are exposed as a set of nested properties on the Device object.  For instance:

```javascript
// Turn the fan on
dev.fan.power.value = 'on';

// How about a light breeze?
dev.fan.whooshMode.value = 'on';

// Plus, it's a little dark...
dev.light.power.value = 'on';

// But that's too much!
dev.light.brightness.value = 3;
```

For full details, see the [API docs](API.md).

Since other devices on the network might change some of these values, it's also possible to request fresh values directly from the fan, as well as to get notification when values change:

```javascript
dev.fan.speed.refresh();

// keep track of changes in speed
dev.fan.speed.listen()
  .on('change', speed => console.log(`Current speed: ${speed}`));

// keep track of any change to any property
dev.listenAll()
  .on('change', ({ path, value }) => {
      console.log(JSON.stringify(path));
      // prints ["fan", "speed"]

      console.log(value);
      // prints 5
  });

dev.fan.speed.value = 5;
```

If you install one of the `Observable` libraries supported by [any-observable](http://www.npmjs.org/package/any-observable/), you can also get property change notifications as an `Observable` stream:

```javascript
import 'any-observable/register/rxjs-all';
import { Device } from 'haiku-senseme';

const dev = new Device({ name: 'Living Room', ip: '...' });

// It's very important that I know when the fan speed drops below 3...
dev.fan.speed
  .observe()
  .map(x => x < 3)
  .distinctUntilChanged()
  .filter(x => x)
  .subscribe(
    x => console.log(`Oh no! The fan's going too slow! (current speed: ${x}`)
  );

// You can also observe changes in all properties
dev.observeAll()
  // but really I only care about fan properties
  .filter(({ path: [category] }) => category === 'fan')
  .subscribe(
    ({ path: [, ...prop], value }) => {
      console.log(`Something about the fan has changed: ${prop}, ${value}`);
    }
  );
```

## Contributing

Contributions are of course always welcome.  If you find problems, please report them in the [Issue Tracker](http://www.github.com/forty2/haiku-senseme/issues/).  If you've made an improvement, open a [pull request](http://www.github.com/forty2/haiku-senseme/pulls).

Getting set up for development is very easy:
```sh
git clone <your fork>
cd haiku-senseme
npm install -g babel-cli # if you don't already have it
npm install
```

And the development workflow is likewise straightforward:
```sh
# make a change to the src/ file, then...
npm run build
npm run example # run the bundled example script

# if you change the documentation:
npm run docs

# or if you want to clean up all the leftover build products:
npm run clean
```

## Release History

* 1.0.0
    * The first release.

## Meta

Zach Bean – zb@forty2.com

Distributed under the MIT license. See [LICENSE](LICENSE.md) for more detail.

[npm-image]: https://img.shields.io/npm/v/haiku-senseme.svg?style=flat
[npm-url]: https://npmjs.org/package/haiku-senseme
[npm-downloads]: https://img.shields.io/npm/dm/haiku-senseme.svg?style=flat
