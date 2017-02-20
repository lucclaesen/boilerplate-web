
export const createCar = () => {
   
    const carProto = {
        sound: "vroom",
        drive: () => {
            console.log(this.sound);
        }
    };
    
    return Object.create(carProto);
};


