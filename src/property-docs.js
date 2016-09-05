/**
 * A single property of a SenseME device.
 * @interface SenseMeProperty
 * @template T
 */

/**
 * The value of this property
 * @name SenseMeProperty#value
 * @type {T}
 */

/**
 * Re-fetch the value of this property from the device.
 * @name SenseMeProperty#refresh
 * @function
 */

/**
 * Listen for changes to this property value. Changes are
 * delivered as 'change' events emitted by the returned object.
 * @name SenseMeProperty#listen
 * @function
 * @returns {EventEmitter}
 */

/**
 * Observe this property for changes.  Returns an ES7-compatible {Observable}.
 * This method will only be available to applications that include an Observable library.
 * See {@link https://www.npmjs.com/package/any-observable} for details.
 *
 * @name SenseMeProperty#observe
 * @function
 * @returns {Observable}
 */

/**
 * A single read-only property of a SenseME device.
 * @template T
 * @interface SenseMeReadonlyProperty
 * @augments SenseMeProperty<T>
 */

/**
 * The value of this property
 * @name SenseMeReadonlyProperty#value
 * @override
 * @type {T}
 * @readonly
 */

/**
 * A property of a SenseME device that describes the
 * "level" of something (fan speed, light brightness, etc)
 * @interface SenseMeLevelProperty
 * @augments SenseMeProperty<number>
 */

/**
 * The minimum level for this property
 * @name SenseMeLevelProperty#minimum
 * @type {SenseMeReadonlyProperty<number>}
 */

/**
 * The maximum level for this property
 * @name SenseMeLevelProperty#maximum
 * @type {SenseMeReadonlyProperty<number>}
 */

/**
 * A collection of the properties of a fan.
 * @interface FanProperties
 */

/**
 * The power state of the fan.
 * @name FanProperties#power
 * @type {SenseMeProperty<('on'|'off')>}
 */

/**
 * The speed of the fan
 * @name FanProperties#speed
 * @type {SenseMeLevelProperty}
 */

/**
 * The state of the fan's motion sensor. This is for the purposes
 * of turning the fan on and off automatically; setting this to
 * 'off' will not disable the presence sensor.
 * @name FanProperties#automaticOn
 * @type {SenseMeProperty<('on'|'off')>}
 */

/**
 * Is whoosh mode enabled?
 * @name FanProperties#whooshMode
 * @type {SenseMeProperty<('on'|'off')>}
 */

/**
 * The fan's direction of spin
 * @name FanProperties#direction
 * @type {SenseMeProperty<('forward'|'reverse')>}
 */

/**
 * A collection of the properties of a light.
 * @interface LightProperties
 */

/**
 * The power state of the light.
 * @name LightProperties#power
 * @type {SenseMeProperty<('on'|'off')>}
 */

/**
 * The brightness of the light
 * @name LightProperties#brightness
 * @type {SenseMeLevelProperty}
 */

/**
 * The state of the light's motion sensor. This is for the purposes
 * of turning the light on and off automatically; setting this to
 * 'off' will not disable the presence sensor.
 * @name LightProperties#automaticOn
 * @type {SenseMeProperty<('on'|'off')>}
 */

/**
 * A collection of the device's properties related to the occupancy sensor.
 * @interface SensorProperties
 */

/**
 * Is the room occupied?
 * @name SensorProperties#isRoomOccupied
 * @type {SenseMeProperty<boolean>}
 */

/**
 * The occupancy sensor timeout (in milliseconds).  The device will turn
 * itself off automatically after this much time has passed.
 * @name SensorProperties#timeout
 * @type {SenseMeLevelProperty}
 */

/**
 * A collection of the device's properties related to Smart mode.
 * @interface SmartModeProperties
 */

/**
 * The current actual smart mode setting.
 * @name SmartModeProperties#actual
 * @type {SenseMeReadonlyProperty<('cooling'|'heating'|'off')>}
 */

/**
 * The current desired smart mode setting.
 * @name SmartModeProperties#state
 * @type {SenseMeProperty<('followThermostat'|'cooling'|'heating'|'off')>}
 */

/**
 * The minimum speed of the fan in smart mode
 * @name SmartModeProperties#minimumSpeed
 * @type {SenseMeProperty<number>}
 */

/**
 * The maximum speed of the fan in smart mode
 * @name SmartModeProperties#maximumSpeed
 * @type {SenseMeProperty<number>}
 */

/**
 * The ideal smart mode temperature in degrees Celsius
 * @name SmartModeProperties#idealTemperatureC
 * @type {SenseMeProperty<number>}
 */

/**
 * The ideal smart mode temperature in degrees Fahrenheit
 * @name SmartModeProperties#idealTemperatureF
 * @type {SenseMeProperty<number>}
 */

/**
 * A collection of the device's properties related to sleep mode.
 * @interface SleepModeProperties
 */

/**
 * Is sleep mode on?
 * @name SleepModeProperties#status
 * @type {SenseMeProperty<('on'|'off')>}
 */

/**
 * The ideal sleep mode temperature in degrees Celsius
 * @name SleepModeProperties#idealTemperatureC
 * @type {SenseMeProperty<number>}
 */

/**
 * The ideal sleep mode temperature in degrees Fahrenheit
 * @name SleepModeProperties#idealTemperatureF
 * @type {SenseMeProperty<number>}
 */

/**
 * The minimum speed of the fan in sleep mode
 * @name SleepModeProperties#minimumFanSpeed
 * @type {SenseMeProperty<number>}
 */

/**
 * The maximum speed of the fan in sleep mode
 * @name SleepModeProperties#maximumFanSpeed
 * @type {SenseMeProperty<number>}
 */

/**
 * A collection of properties related to the device itself.
 * @interface DeviceProperties
 */

/**
 * Does the fan have a light kit attached?
 * @name DeviceProperties#hasLight
 * @type {SenseMeReadonnlyProperty<boolean>}
 */

/**
 * The power status of the confirmation beep heard when changing settings.
 * @name DeviceProperties#beeperStatus
 * @type {SenseMeProperty<('on'|'off')>}
 */

/**
 * The power status of the indicator lights on the fan
 * @name DeviceProperties#indicatorsStatus
 * @type {SenseMeProperty<('on'|'off')>}
 */

/**
 * The current state of Winter mode
 * @name DeviceProperties#winterMode
 * @type {SenseMeProperty<('on'|'off')>}
 */

/**
 * The height of the device abvoe the floor in meters.
 * @name DeviceProperties#heightInMeters
 * @type {SenseMeProperty<number>}
 */

/**
 * The height of the device abvoe the floor in feet.
 * @name DeviceProperties#heightInFeet
 * @type {SenseMeProperty<number>}
 */

/**
 * A network token GUID.  It's currently not known what this token is useful for.
 * @name NetworkProperties#token
 * @type {SenseMeReadonlyProperty<number>}
 */

/**
 * DHCP status
 * @name NetworkProperties#dhcpStatus
 * @type {SenseMeReadonlyProperty<('on'|'off')>}
 */

/**
 * The SSID of the currently associated wireless network.
 * @name NetworkProperties#ssid
 * @type {SenseMeReadonlyProperty<string>}
 */

/**
 * The power status of the device's internal access point.
 * It's possible to configure the fan to act as its own wireless access point.
 * This property indicates whether it's in that mode or not.
 * @name NetworkProperties#accessPointStatus
 * @type {SenseMeReadonlyProperty<('on'|'off')>}
 */

/**
 * A collection of properties related to the device's network connection
 * @interface NetworkProperties
 */
