const carProto = {
    accelerate : function(amount) {
        if (amount < 0)
            this.brake(-amount);
        if (!amount || amount === 0)
            return this;

        this.mph += amount;
        this.log.push(`acc(${amount})`);
        return this;
    },
    brake: function(amount) {
        if (amount < 0)
            this.accelerate(-amount);
        if (!amount || amount === 0)
            return;
        
        this.mph -= amount || 0;
        this.log.push(`brake(${amount})`);
        return this;
    },
    turn: function(degrees) {
        this.direction = (this.direction + degrees) % 360;
        return this;
    }
};

const carDefaults = {
    color : "blue",
    direction : 0,
    mph : 0,
    log : []
}

export function CreateCar(options) {
    let _lightsOn = false

    // first of all, an empty object with the carProto as proto is created, then the defaults are copied onto the new object, overriden by the options
    const instance = Object.assign(Object.create(carProto), carDefaults, options);

    // dynamic extension of the object with methods that need access to the "private" variable
    instance.toggleLights = function() {
        _lightsOn = !_lightsOn;
        return this;
    };
    instance.lightsOn = function() {
        return _lightsOn;
    };
    instance.report = function() {
        return JSON.stringify(this) + "lightsOn: " + _lightsOn;
    }

    return instance;
}