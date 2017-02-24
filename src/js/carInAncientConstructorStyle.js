/**
 * The objective is to create an object that represents the following properties:
 * - it has the following public properties: 
 *      * color, direction and mph representing instance state (instance safe)
 *      * a log of all accelerate and brake actions ever performed with this car -- this also needs to be instance-safe
 * - it has a private field _lightsOn exposed only through privileged methods toggleLights and LightsOn:bool.
 * - it has public instance methods accelerate, brake and turn that need to be defined on the prototype
 * - a Log public instance method that needs to be on the instance since it also reports on the private state
 * 
 * We now realize that we take an important limitation into account that seems intrinsic to js: prototypal inheritance
 * does not agree well with encapsulation through closure. "privacy through closure" simply means that a prototype can'take
 * access the private member. See this excellent summary of the situation here http://stackoverflow.com/questions/436120/javascript-accessing-private-member-variables-from-prototype-defined-functions
 * and here http://www.crockford.com/javascript/private.html.
 */

export function Car(options) {
    this.color = options.color || "blue";
    this.direction = options.direction || 0;
    this.mph = 0;
    this.log = [];

    // private state 
    let _lightsOn = false;

    this.toggleLights = function() {
        _lightsOn = !_lightsOn;
        return this;    // chainable
    }

    this.lightsOn = function() {
        return _lightsOn;
    }

    this.report = function() {
        return JSON.stringify(this) + "lightsOn: " + _lightsOn;
    }
}

Car.prototype.accelerate = function(amount) {
    if (amount < 0)
        this.brake(-amount);
    if (!amount || amount === 0)
        return this;

    this.mph += amount;
    this.log.push(`acc(${amount})`);
    return this;
}

Car.prototype.brake = function(amount) {
    if (amount < 0)
        this.accelerate(-amount);
    if (!amount || amount === 0)
        return;
    
    this.mph -= amount || 0;
    this.log.push(`brake(${amount})`);
    return this;
}

Car.prototype.turn = function(degrees) {
    this.direction = (this.direction + degrees) % 360;
    return this;
}