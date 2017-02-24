export class CarClass {
    
    constructor(options) {

        // public instance state
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

    accelerate (amount) {
        if (amount < 0)
            this.brake(-amount);
        if (!amount || amount === 0)
            return this;

        this.mph += amount;
        this.log.push(`acc(${amount})`);
        return this;
    }

    brake (amount) {
        if (amount < 0)
            this.accelerate(-amount);
        if (!amount || amount === 0)
            return;
        
        this.mph -= amount || 0;
        this.log.push(`brake(${amount})`);
        return this;
    }

    turn (degrees) {
        this.direction = (this.direction + degrees) % 360;
        return this;
    }

}