interface IVector {
    add(vector: Vector): Vector
    mult(scalar: number): Vector
    div(divisor: number): Vector
    normalize(): Vector
    setMag(length: number): Vector
    setXY(x: number, y: number): Vector
}

class Vector implements IVector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static random2D(angle: number, length: number = 1): Vector {
        return new Vector(length * Math.cos(angle), length * Math.sin(angle));
    }

    add(vector: Vector): Vector {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    mult(scalar: number): Vector {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    div(divisor: number): Vector {
        this.x /= divisor;
        this.y /= divisor;
        return this;
    }

    get magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize(): Vector {
        const mag = this.magnitude;
        if (mag > 0) this.div(mag);
        return this;
    }

    setMag(length: number): Vector {
        return this.normalize().mult(length);
    }

    setXY(x: number, y: number): Vector {
        this.x = x;
        this.y = y;
        return this;
    }
}

export default Vector;