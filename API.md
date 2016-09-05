## Modules

<dl>
<dt><a href="#module_Device">Device</a></dt>
<dd></dd>
<dt><a href="#module_SenseMe">SenseMe</a></dt>
<dd></dd>
</dl>

<a name="module_Device"></a>

## Device

* [Device](#module_Device)
    * [~Device](#module_Device..Device)
        * [new Device(opts, messenger)](#new_module_Device..Device_new)
        * [.id](#module_Device..Device+id) : <code>string</code>
        * [.ip](#module_Device..Device+ip) : <code>string</code>
        * [.name](#module_Device..Device+name) : <code>string</code>
        * [.type](#module_Device..Device+type) : <code>string</code>
        * [.network](#module_Device..Device+network) : <code>[NetworkProperties](#NetworkProperties)</code>
        * [.fan](#module_Device..Device+fan) : <code>[FanProperties](#FanProperties)</code>
        * [.light](#module_Device..Device+light) : <code>[LightProperties](#LightProperties)</code>
        * [.sensor](#module_Device..Device+sensor) : <code>[SensorProperties](#SensorProperties)</code>
        * [.smartMode](#module_Device..Device+smartMode) : <code>[SmartModeProperties](#SmartModeProperties)</code>
        * [.sleepMode](#module_Device..Device+sleepMode) : <code>[SleepModeProperties](#SleepModeProperties)</code>
        * [.device](#module_Device..Device+device) : <code>[DeviceProperties](#DeviceProperties)</code>
        * [.observeAll()](#module_Device..Device+observeAll) ⇒ <code>Observable</code>
        * [.disconnect()](#module_Device..Device+disconnect)
        * [.listenAll()](#module_Device..Device+listenAll) ⇒ <code>EventEmitter</code>
        * [.refreshAll()](#module_Device..Device+refreshAll)

<a name="module_Device..Device"></a>

### Device~Device
Represents one device on the local network, such as a fan.

**Kind**: inner class of <code>[Device](#module_Device)</code>  

* [~Device](#module_Device..Device)
    * [new Device(opts, messenger)](#new_module_Device..Device_new)
    * [.id](#module_Device..Device+id) : <code>string</code>
    * [.ip](#module_Device..Device+ip) : <code>string</code>
    * [.name](#module_Device..Device+name) : <code>string</code>
    * [.type](#module_Device..Device+type) : <code>string</code>
    * [.network](#module_Device..Device+network) : <code>[NetworkProperties](#NetworkProperties)</code>
    * [.fan](#module_Device..Device+fan) : <code>[FanProperties](#FanProperties)</code>
    * [.light](#module_Device..Device+light) : <code>[LightProperties](#LightProperties)</code>
    * [.sensor](#module_Device..Device+sensor) : <code>[SensorProperties](#SensorProperties)</code>
    * [.smartMode](#module_Device..Device+smartMode) : <code>[SmartModeProperties](#SmartModeProperties)</code>
    * [.sleepMode](#module_Device..Device+sleepMode) : <code>[SleepModeProperties](#SleepModeProperties)</code>
    * [.device](#module_Device..Device+device) : <code>[DeviceProperties](#DeviceProperties)</code>
    * [.observeAll()](#module_Device..Device+observeAll) ⇒ <code>Observable</code>
    * [.disconnect()](#module_Device..Device+disconnect)
    * [.listenAll()](#module_Device..Device+listenAll) ⇒ <code>EventEmitter</code>
    * [.refreshAll()](#module_Device..Device+refreshAll)

<a name="new_module_Device..Device_new"></a>

#### new Device(opts, messenger)
Create a new device.


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> |  |
| opts.name | <code>string</code> | The advertised name of the new device |
| opts.id | <code>string</code> | The MAC address of the new device |
| opts.type | <code>string</code> | The type of the new device, such as `FAN,HAIKU,HSERIES` |
| opts.ip | <code>string</code> | The IP address of the new device |
| messenger | <code>EventEmitter</code> | An EventEmitter for funneling incoming messages from the discovery process. |

<a name="module_Device..Device+id"></a>

#### device.id : <code>string</code>
The ID (MAC address) of this device.

**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+ip"></a>

#### device.ip : <code>string</code>
The IP address of this device.

**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+name"></a>

#### device.name : <code>string</code>
The name of this device

**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+type"></a>

#### device.type : <code>string</code>
The type of this device, such as `FAN,HAIKU,HSERIES`

**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+network"></a>

#### device.network : <code>[NetworkProperties](#NetworkProperties)</code>
**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+fan"></a>

#### device.fan : <code>[FanProperties](#FanProperties)</code>
**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+light"></a>

#### device.light : <code>[LightProperties](#LightProperties)</code>
**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+sensor"></a>

#### device.sensor : <code>[SensorProperties](#SensorProperties)</code>
**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+smartMode"></a>

#### device.smartMode : <code>[SmartModeProperties](#SmartModeProperties)</code>
**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+sleepMode"></a>

#### device.sleepMode : <code>[SleepModeProperties](#SleepModeProperties)</code>
**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+device"></a>

#### device.device : <code>[DeviceProperties](#DeviceProperties)</code>
**Kind**: instance property of <code>[Device](#module_Device..Device)</code>  
**Read only**: true  
<a name="module_Device..Device+observeAll"></a>

#### device.observeAll() ⇒ <code>Observable</code>
Observe changes to any of the properties of this device.  This method is only
available if your application has an Observable library installed.
See [https://www.npmjs.com/package/any-observable](https://www.npmjs.com/package/any-observable) for details.

**Kind**: instance method of <code>[Device](#module_Device..Device)</code>  
**Returns**: <code>Observable</code> - An ES7-compatible obsevable that emits objects of the form `{ path, value }` for each property change.  
<a name="module_Device..Device+disconnect"></a>

#### device.disconnect()
Disconnect from the device.

**Kind**: instance method of <code>[Device](#module_Device..Device)</code>  
<a name="module_Device..Device+listenAll"></a>

#### device.listenAll() ⇒ <code>EventEmitter</code>
Listen for changes to any of the properties of this device.
Changes are delivered as 'change' events emitted by the returned
emitter.

**Kind**: instance method of <code>[Device](#module_Device..Device)</code>  
<a name="module_Device..Device+refreshAll"></a>

#### device.refreshAll()
Request the current values of all known properties from this device.
This method only updates the local state; to be informed of the new
values, use [Device#listenAll](Device#listenAll), {@link Device#observeAll}, or the corresponding
methods on the individual values of interest.

**Kind**: instance method of <code>[Device](#module_Device..Device)</code>  
<a name="module_SenseMe"></a>

## SenseMe

* [SenseMe](#module_SenseMe)
    * _static_
        * [.default](#module_SenseMe.default) : <code>SenseMe</code>
    * _inner_
        * [~SenseMe](#module_SenseMe..SenseMe)
            * [.getAllDevices()](#module_SenseMe..SenseMe+getAllDevices) ⇒ <code>Array.&lt;Device&gt;</code>
            * [.getDeviceById(id)](#module_SenseMe..SenseMe+getDeviceById) ⇒ <code>Device</code>
            * [.getDeviceByName(name)](#module_SenseMe..SenseMe+getDeviceByName) ⇒ <code>Device</code>
            * [.discover([interval], [missingThreshold])](#module_SenseMe..SenseMe+discover)
            * [.cancelDiscovery()](#module_SenseMe..SenseMe+cancelDiscovery)

<a name="module_SenseMe.default"></a>

### SenseMe.default : <code>SenseMe</code>
**Kind**: static property of <code>[SenseMe](#module_SenseMe)</code>  
<a name="module_SenseMe..SenseMe"></a>

### SenseMe~SenseMe
Discover and manage SenseME-enabled devices on the local network.

**Kind**: inner class of <code>[SenseMe](#module_SenseMe)</code>  

* [~SenseMe](#module_SenseMe..SenseMe)
    * [.getAllDevices()](#module_SenseMe..SenseMe+getAllDevices) ⇒ <code>Array.&lt;Device&gt;</code>
    * [.getDeviceById(id)](#module_SenseMe..SenseMe+getDeviceById) ⇒ <code>Device</code>
    * [.getDeviceByName(name)](#module_SenseMe..SenseMe+getDeviceByName) ⇒ <code>Device</code>
    * [.discover([interval], [missingThreshold])](#module_SenseMe..SenseMe+discover)
    * [.cancelDiscovery()](#module_SenseMe..SenseMe+cancelDiscovery)

<a name="module_SenseMe..SenseMe+getAllDevices"></a>

#### senseMe.getAllDevices() ⇒ <code>Array.&lt;Device&gt;</code>
Get a list of all currently known devices.

**Kind**: instance method of <code>[SenseMe](#module_SenseMe..SenseMe)</code>  
<a name="module_SenseMe..SenseMe+getDeviceById"></a>

#### senseMe.getDeviceById(id) ⇒ <code>Device</code>
Get one discovered device by its ID (usually MAC address).

**Kind**: instance method of <code>[SenseMe](#module_SenseMe..SenseMe)</code>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The ID of the requested device. |

<a name="module_SenseMe..SenseMe+getDeviceByName"></a>

#### senseMe.getDeviceByName(name) ⇒ <code>Device</code>
Get one discovered device by its name.

**Kind**: instance method of <code>[SenseMe](#module_SenseMe..SenseMe)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the requested device. |

<a name="module_SenseMe..SenseMe+discover"></a>

#### senseMe.discover([interval], [missingThreshold])
Begin discovery of all SenseME devices on the local network.
Discovery will continue until [cancelDiscovery](cancelDiscovery) is called.

**Kind**: instance method of <code>[SenseMe](#module_SenseMe..SenseMe)</code>  
**Emits**: <code>SenseMe#event:lostdevice</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [interval] | <code>number</code> | <code>10000</code> | How often (in milliseconds) should a discovery request be sent out? |
| [missingThreshold] | <code>number</code> | <code>3</code> | How many discovery requests must a device miss before being considered no longer on the network? |

<a name="module_SenseMe..SenseMe+cancelDiscovery"></a>

#### senseMe.cancelDiscovery()
Cancel an ongoing discovery session.

**Kind**: instance method of <code>[SenseMe](#module_SenseMe..SenseMe)</code>  
<a name="SenseMeProperty"></a>

## SenseMeProperty
A single property of a SenseME device.

**Kind**: global interface  
**Template**: T  

* [SenseMeProperty](#SenseMeProperty)
    * [.value](#SenseMeProperty+value) : <code>T</code>
    * [.refresh()](#SenseMeProperty+refresh)
    * [.listen()](#SenseMeProperty+listen) ⇒ <code>EventEmitter</code>
    * [.observe()](#SenseMeProperty+observe) ⇒ <code>Observable</code>

<a name="SenseMeProperty+value"></a>

### senseMeProperty.value : <code>T</code>
The value of this property

**Kind**: instance property of <code>[SenseMeProperty](#SenseMeProperty)</code>  
<a name="SenseMeProperty+refresh"></a>

### senseMeProperty.refresh()
Re-fetch the value of this property from the device.

**Kind**: instance method of <code>[SenseMeProperty](#SenseMeProperty)</code>  
<a name="SenseMeProperty+listen"></a>

### senseMeProperty.listen() ⇒ <code>EventEmitter</code>
Listen for changes to this property value. Changes are
delivered as 'change' events emitted by the returned object.

**Kind**: instance method of <code>[SenseMeProperty](#SenseMeProperty)</code>  
<a name="SenseMeProperty+observe"></a>

### senseMeProperty.observe() ⇒ <code>Observable</code>
Observe this property for changes.  Returns an ES7-compatible {Observable}.
This method will only be available to applications that include an Observable library.
See [https://www.npmjs.com/package/any-observable](https://www.npmjs.com/package/any-observable) for details.

**Kind**: instance method of <code>[SenseMeProperty](#SenseMeProperty)</code>  
<a name="SenseMeReadonlyProperty"></a>

## SenseMeReadonlyProperty ⇐ <code>SenseMeProperty&lt;T&gt;</code>
A single read-only property of a SenseME device.

**Kind**: global interface  
**Extends:** <code>SenseMeProperty&lt;T&gt;</code>  
**Template**: T  
<a name="SenseMeReadonlyProperty+value"></a>

### senseMeReadonlyProperty.value : <code>T</code>
The value of this property

**Kind**: instance property of <code>[SenseMeReadonlyProperty](#SenseMeReadonlyProperty)</code>  
**Read only**: true  
<a name="SenseMeLevelProperty"></a>

## SenseMeLevelProperty ⇐ <code>SenseMeProperty&lt;number&gt;</code>
A property of a SenseME device that describes the
"level" of something (fan speed, light brightness, etc)

**Kind**: global interface  
**Extends:** <code>SenseMeProperty&lt;number&gt;</code>  

* [SenseMeLevelProperty](#SenseMeLevelProperty) ⇐ <code>SenseMeProperty&lt;number&gt;</code>
    * [.minimum](#SenseMeLevelProperty+minimum) : <code>SenseMeReadonlyProperty.&lt;number&gt;</code>
    * [.maximum](#SenseMeLevelProperty+maximum) : <code>SenseMeReadonlyProperty.&lt;number&gt;</code>

<a name="SenseMeLevelProperty+minimum"></a>

### senseMeLevelProperty.minimum : <code>SenseMeReadonlyProperty.&lt;number&gt;</code>
The minimum level for this property

**Kind**: instance property of <code>[SenseMeLevelProperty](#SenseMeLevelProperty)</code>  
<a name="SenseMeLevelProperty+maximum"></a>

### senseMeLevelProperty.maximum : <code>SenseMeReadonlyProperty.&lt;number&gt;</code>
The maximum level for this property

**Kind**: instance property of <code>[SenseMeLevelProperty](#SenseMeLevelProperty)</code>  
<a name="FanProperties"></a>

## FanProperties
A collection of the properties of a fan.

**Kind**: global interface  

* [FanProperties](#FanProperties)
    * [.power](#FanProperties+power) : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.speed](#FanProperties+speed) : <code>[SenseMeLevelProperty](#SenseMeLevelProperty)</code>
    * [.automaticOn](#FanProperties+automaticOn) : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.whooshMode](#FanProperties+whooshMode) : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.direction](#FanProperties+direction) : <code>SenseMeProperty.&lt;(&#x27;forward&#x27;\|&#x27;reverse&#x27;)&gt;</code>

<a name="FanProperties+power"></a>

### fanProperties.power : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
The power state of the fan.

**Kind**: instance property of <code>[FanProperties](#FanProperties)</code>  
<a name="FanProperties+speed"></a>

### fanProperties.speed : <code>[SenseMeLevelProperty](#SenseMeLevelProperty)</code>
The speed of the fan

**Kind**: instance property of <code>[FanProperties](#FanProperties)</code>  
<a name="FanProperties+automaticOn"></a>

### fanProperties.automaticOn : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
The state of the fan's motion sensor. This is for the purposes
of turning the fan on and off automatically; setting this to
'off' will not disable the presence sensor.

**Kind**: instance property of <code>[FanProperties](#FanProperties)</code>  
<a name="FanProperties+whooshMode"></a>

### fanProperties.whooshMode : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
Is whoosh mode enabled?

**Kind**: instance property of <code>[FanProperties](#FanProperties)</code>  
<a name="FanProperties+direction"></a>

### fanProperties.direction : <code>SenseMeProperty.&lt;(&#x27;forward&#x27;\|&#x27;reverse&#x27;)&gt;</code>
The fan's direction of spin

**Kind**: instance property of <code>[FanProperties](#FanProperties)</code>  
<a name="LightProperties"></a>

## LightProperties
A collection of the properties of a light.

**Kind**: global interface  

* [LightProperties](#LightProperties)
    * [.power](#LightProperties+power) : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.brightness](#LightProperties+brightness) : <code>[SenseMeLevelProperty](#SenseMeLevelProperty)</code>
    * [.automaticOn](#LightProperties+automaticOn) : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>

<a name="LightProperties+power"></a>

### lightProperties.power : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
The power state of the light.

**Kind**: instance property of <code>[LightProperties](#LightProperties)</code>  
<a name="LightProperties+brightness"></a>

### lightProperties.brightness : <code>[SenseMeLevelProperty](#SenseMeLevelProperty)</code>
The brightness of the light

**Kind**: instance property of <code>[LightProperties](#LightProperties)</code>  
<a name="LightProperties+automaticOn"></a>

### lightProperties.automaticOn : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
The state of the light's motion sensor. This is for the purposes
of turning the light on and off automatically; setting this to
'off' will not disable the presence sensor.

**Kind**: instance property of <code>[LightProperties](#LightProperties)</code>  
<a name="SensorProperties"></a>

## SensorProperties
A collection of the device's properties related to the occupancy sensor.

**Kind**: global interface  

* [SensorProperties](#SensorProperties)
    * [.isRoomOccupied](#SensorProperties+isRoomOccupied) : <code>SenseMeProperty.&lt;boolean&gt;</code>
    * [.timeout](#SensorProperties+timeout) : <code>[SenseMeLevelProperty](#SenseMeLevelProperty)</code>

<a name="SensorProperties+isRoomOccupied"></a>

### sensorProperties.isRoomOccupied : <code>SenseMeProperty.&lt;boolean&gt;</code>
Is the room occupied?

**Kind**: instance property of <code>[SensorProperties](#SensorProperties)</code>  
<a name="SensorProperties+timeout"></a>

### sensorProperties.timeout : <code>[SenseMeLevelProperty](#SenseMeLevelProperty)</code>
The occupancy sensor timeout (in milliseconds).  The device will turn
itself off automatically after this much time has passed.

**Kind**: instance property of <code>[SensorProperties](#SensorProperties)</code>  
<a name="SmartModeProperties"></a>

## SmartModeProperties
A collection of the device's properties related to Smart mode.

**Kind**: global interface  

* [SmartModeProperties](#SmartModeProperties)
    * [.actual](#SmartModeProperties+actual) : <code>SenseMeReadonlyProperty.&lt;(&#x27;cooling&#x27;\|&#x27;heating&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.state](#SmartModeProperties+state) : <code>SenseMeProperty.&lt;(&#x27;followThermostat&#x27;\|&#x27;cooling&#x27;\|&#x27;heating&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.minimumSpeed](#SmartModeProperties+minimumSpeed) : <code>SenseMeProperty.&lt;number&gt;</code>
    * [.maximumSpeed](#SmartModeProperties+maximumSpeed) : <code>SenseMeProperty.&lt;number&gt;</code>
    * [.idealTemperatureC](#SmartModeProperties+idealTemperatureC) : <code>SenseMeProperty.&lt;number&gt;</code>
    * [.idealTemperatureF](#SmartModeProperties+idealTemperatureF) : <code>SenseMeProperty.&lt;number&gt;</code>

<a name="SmartModeProperties+actual"></a>

### smartModeProperties.actual : <code>SenseMeReadonlyProperty.&lt;(&#x27;cooling&#x27;\|&#x27;heating&#x27;\|&#x27;off&#x27;)&gt;</code>
The current actual smart mode setting.

**Kind**: instance property of <code>[SmartModeProperties](#SmartModeProperties)</code>  
<a name="SmartModeProperties+state"></a>

### smartModeProperties.state : <code>SenseMeProperty.&lt;(&#x27;followThermostat&#x27;\|&#x27;cooling&#x27;\|&#x27;heating&#x27;\|&#x27;off&#x27;)&gt;</code>
The current desired smart mode setting.

**Kind**: instance property of <code>[SmartModeProperties](#SmartModeProperties)</code>  
<a name="SmartModeProperties+minimumSpeed"></a>

### smartModeProperties.minimumSpeed : <code>SenseMeProperty.&lt;number&gt;</code>
The minimum speed of the fan in smart mode

**Kind**: instance property of <code>[SmartModeProperties](#SmartModeProperties)</code>  
<a name="SmartModeProperties+maximumSpeed"></a>

### smartModeProperties.maximumSpeed : <code>SenseMeProperty.&lt;number&gt;</code>
The maximum speed of the fan in smart mode

**Kind**: instance property of <code>[SmartModeProperties](#SmartModeProperties)</code>  
<a name="SmartModeProperties+idealTemperatureC"></a>

### smartModeProperties.idealTemperatureC : <code>SenseMeProperty.&lt;number&gt;</code>
The ideal smart mode temperature in degrees Celsius

**Kind**: instance property of <code>[SmartModeProperties](#SmartModeProperties)</code>  
<a name="SmartModeProperties+idealTemperatureF"></a>

### smartModeProperties.idealTemperatureF : <code>SenseMeProperty.&lt;number&gt;</code>
The ideal smart mode temperature in degrees Fahrenheit

**Kind**: instance property of <code>[SmartModeProperties](#SmartModeProperties)</code>  
<a name="SleepModeProperties"></a>

## SleepModeProperties
A collection of the device's properties related to sleep mode.

**Kind**: global interface  

* [SleepModeProperties](#SleepModeProperties)
    * [.status](#SleepModeProperties+status) : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.idealTemperatureC](#SleepModeProperties+idealTemperatureC) : <code>SenseMeProperty.&lt;number&gt;</code>
    * [.idealTemperatureF](#SleepModeProperties+idealTemperatureF) : <code>SenseMeProperty.&lt;number&gt;</code>
    * [.minimumFanSpeed](#SleepModeProperties+minimumFanSpeed) : <code>SenseMeProperty.&lt;number&gt;</code>
    * [.maximumFanSpeed](#SleepModeProperties+maximumFanSpeed) : <code>SenseMeProperty.&lt;number&gt;</code>

<a name="SleepModeProperties+status"></a>

### sleepModeProperties.status : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
Is sleep mode on?

**Kind**: instance property of <code>[SleepModeProperties](#SleepModeProperties)</code>  
<a name="SleepModeProperties+idealTemperatureC"></a>

### sleepModeProperties.idealTemperatureC : <code>SenseMeProperty.&lt;number&gt;</code>
The ideal sleep mode temperature in degrees Celsius

**Kind**: instance property of <code>[SleepModeProperties](#SleepModeProperties)</code>  
<a name="SleepModeProperties+idealTemperatureF"></a>

### sleepModeProperties.idealTemperatureF : <code>SenseMeProperty.&lt;number&gt;</code>
The ideal sleep mode temperature in degrees Fahrenheit

**Kind**: instance property of <code>[SleepModeProperties](#SleepModeProperties)</code>  
<a name="SleepModeProperties+minimumFanSpeed"></a>

### sleepModeProperties.minimumFanSpeed : <code>SenseMeProperty.&lt;number&gt;</code>
The minimum speed of the fan in sleep mode

**Kind**: instance property of <code>[SleepModeProperties](#SleepModeProperties)</code>  
<a name="SleepModeProperties+maximumFanSpeed"></a>

### sleepModeProperties.maximumFanSpeed : <code>SenseMeProperty.&lt;number&gt;</code>
The maximum speed of the fan in sleep mode

**Kind**: instance property of <code>[SleepModeProperties](#SleepModeProperties)</code>  
<a name="DeviceProperties"></a>

## DeviceProperties
A collection of properties related to the device itself.

**Kind**: global interface  

* [DeviceProperties](#DeviceProperties)
    * [.hasLight](#DeviceProperties+hasLight) : <code>SenseMeReadonnlyProperty.&lt;boolean&gt;</code>
    * [.beeperStatus](#DeviceProperties+beeperStatus) : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.indicatorsStatus](#DeviceProperties+indicatorsStatus) : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.winterMode](#DeviceProperties+winterMode) : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.heightInMeters](#DeviceProperties+heightInMeters) : <code>SenseMeProperty.&lt;number&gt;</code>
    * [.heightInFeet](#DeviceProperties+heightInFeet) : <code>SenseMeProperty.&lt;number&gt;</code>

<a name="DeviceProperties+hasLight"></a>

### deviceProperties.hasLight : <code>SenseMeReadonnlyProperty.&lt;boolean&gt;</code>
Does the fan have a light kit attached?

**Kind**: instance property of <code>[DeviceProperties](#DeviceProperties)</code>  
<a name="DeviceProperties+beeperStatus"></a>

### deviceProperties.beeperStatus : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
The power status of the confirmation beep heard when changing settings.

**Kind**: instance property of <code>[DeviceProperties](#DeviceProperties)</code>  
<a name="DeviceProperties+indicatorsStatus"></a>

### deviceProperties.indicatorsStatus : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
The power status of the indicator lights on the fan

**Kind**: instance property of <code>[DeviceProperties](#DeviceProperties)</code>  
<a name="DeviceProperties+winterMode"></a>

### deviceProperties.winterMode : <code>SenseMeProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
The current state of Winter mode

**Kind**: instance property of <code>[DeviceProperties](#DeviceProperties)</code>  
<a name="DeviceProperties+heightInMeters"></a>

### deviceProperties.heightInMeters : <code>SenseMeProperty.&lt;number&gt;</code>
The height of the device abvoe the floor in meters.

**Kind**: instance property of <code>[DeviceProperties](#DeviceProperties)</code>  
<a name="DeviceProperties+heightInFeet"></a>

### deviceProperties.heightInFeet : <code>SenseMeProperty.&lt;number&gt;</code>
The height of the device abvoe the floor in feet.

**Kind**: instance property of <code>[DeviceProperties](#DeviceProperties)</code>  
<a name="NetworkProperties"></a>

## NetworkProperties
A collection of properties related to the device's network connection

**Kind**: global interface  

* [NetworkProperties](#NetworkProperties)
    * [.token](#NetworkProperties+token) : <code>SenseMeReadonlyProperty.&lt;number&gt;</code>
    * [.dhcpStatus](#NetworkProperties+dhcpStatus) : <code>SenseMeReadonlyProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
    * [.ssid](#NetworkProperties+ssid) : <code>SenseMeReadonlyProperty.&lt;string&gt;</code>
    * [.accessPointStatus](#NetworkProperties+accessPointStatus) : <code>SenseMeReadonlyProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>

<a name="NetworkProperties+token"></a>

### networkProperties.token : <code>SenseMeReadonlyProperty.&lt;number&gt;</code>
A network token GUID.  It's currently not known what this token is useful for.

**Kind**: instance property of <code>[NetworkProperties](#NetworkProperties)</code>  
<a name="NetworkProperties+dhcpStatus"></a>

### networkProperties.dhcpStatus : <code>SenseMeReadonlyProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
DHCP status

**Kind**: instance property of <code>[NetworkProperties](#NetworkProperties)</code>  
<a name="NetworkProperties+ssid"></a>

### networkProperties.ssid : <code>SenseMeReadonlyProperty.&lt;string&gt;</code>
The SSID of the currently associated wireless network.

**Kind**: instance property of <code>[NetworkProperties](#NetworkProperties)</code>  
<a name="NetworkProperties+accessPointStatus"></a>

### networkProperties.accessPointStatus : <code>SenseMeReadonlyProperty.&lt;(&#x27;on&#x27;\|&#x27;off&#x27;)&gt;</code>
The power status of the device's internal access point.
It's possible to configure the fan to act as its own wireless access point.
This property indicates whether it's in that mode or not.

**Kind**: instance property of <code>[NetworkProperties](#NetworkProperties)</code>  
