const proto = {
    state : false,
    isOn () {
        return this.state;
    },
    toggle() {
        this.state = !this.state;
    }
}

export function createSwitch() {
    return Object.create(proto);
}