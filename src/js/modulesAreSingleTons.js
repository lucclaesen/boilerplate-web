let x = 0, y = 0;

export function Point() {
    return {
        getX() {
            return x;
        },
        getY() {
            return y;
        },
        moveX(magnitude) {
            x+= magnitude;
        },
        moveY(magnitude) {
            y += magnitude;
        }
    }
};