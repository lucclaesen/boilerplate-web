import {Point} from "./modulesAreSingleTons";
import {Car} from "./carInAncientConstructorStyle";
import {CreateCar} from "./carFactory";
import {CarClass} from "./carsClass";


console.log("Modules are Singletons, yeah");
const p1 = Point();
const p2 = Point();

console.log(`p1 is now at (${p1.getX()}, ${p1.getY()})`);
console.log(`p2 is now at (${p2.getX()}, ${p2.getY()})`);

p1.moveX(3);

console.log(`p1 is now at (${p1.getX()}, ${p1.getY()})`);
console.log(`p2 is now at (${p2.getX()}, ${p2.getY()})`);

function testCarClassicalConstructorStyle() {
    console.log("Car classical constructor style");

    const c1 = new Car({ color: "red" });
    const c2 = new Car({color: "orange"});

    console.log(`c1: ${c1.report()}`);
    console.log(`c2: ${c2.report()}`);

    c1
        .accelerate(50)
        .accelerate(50)
        .brake(40)
        .turn(90)
        .toggleLights();

    console.log(`c1: ${c1.report()}`);
    console.log(`c2: ${c2.report()}`);
}

function testCarFactory() {
    console.log("Car factory style");

    const c1 = CreateCar({ color: "red" });
    const c2 = CreateCar({color: "orange"});

    console.log(`c1: ${c1.report()}`);
    console.log(`c2: ${c2.report()}`);

    c1
        .accelerate(50)
        .accelerate(50)
        .brake(40)
        .turn(90)
        .toggleLights();

    console.log(`c1: ${c1.report()}`);
    console.log(`c2: ${c2.report()}`);
}

function testCarClass() {
    console.log("Car classical Es2015 class style");

    const c1 = new CarClass({ color: "red" });
    const c2 = new CarClass({color: "orange"});

    console.log(`c1: ${c1.report()}`);
    console.log(`c2: ${c2.report()}`);

    c1
        .accelerate(50)
        .accelerate(50)
        .brake(40)
        .turn(90)
        .toggleLights();

    console.log(`c1: ${c1.report()}`);
    console.log(`c2: ${c2.report()}`);
}

// testCarClassicalConstructorStyle();
// testCarFactory();
testCarClass();

const configFactory = {
    config: {},
    addEntrySection(options) {
        this.config.entry = [];
        if (options.run === 'tests') {
            this.config.entry.push('./tests/index.js');
        }
        else {
            this.config.entry.push('./src/index.js');
        }
        return this;
    }
};

const optionsDefaults = {
    target : 'development',
    run: 'app'
}
function createConfig (options = optionsDefaults) {
    return configFactory
        .addEntrySection(options)
        .config;
};

console.log(createConfig());
