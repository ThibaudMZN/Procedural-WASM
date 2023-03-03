import Perlin from "./perlin";


type Mesh = {
    vertices: Float32Array;
    normals: Float32Array;
    colors: Float32Array;
}

const colorFromZ = (z: number, maxAmplitude: number): [number, number, number] => {
    if (z < -0.4 * maxAmplitude) return [4 / 255, 16 / 255, 186 / 255];
    else if (z < -0.3 * maxAmplitude) return [18 / 255, 99 / 255, 230 / 255];
    else if (z < -0.2 * maxAmplitude) return [18 / 255, 166 / 255, 230 / 255];
    else if (z < -0.1 * maxAmplitude) return [194 / 255, 188 / 255, 10 / 255];
    else if (z < 0.3 * maxAmplitude) return [29 / 255, 163 / 255, 8 / 255];
    else if (z < 0.4 * maxAmplitude) return [79 / 255, 42 / 255, 4 / 255];


    return [1.0, 1.0, 1.0];
};

export const generate = (width: number, height: number, step: number, maxAmplitude: number): Mesh => {
    const noise = new Perlin(42);
    const size = (width + 1) * (height + 1) * 3;
    const vertices = new Float32Array(size);
    const colors = new Float32Array(size);
    let idx = 0;

    const octaveCount = 4;
    const persistence = 0.5; //(0,1)
    const lacunarity = 2; //( > 1)
    for (let x = 0; x <= width; x++) {
        for (let y = 0; y <= height; y++) {
            // const z = noise.perlin2(x * step, y * step);

            let z = noise.perlin2(x * step, y * step);
            let frequency = step;
            let amplitude = maxAmplitude;

            for (let i = 0; i < octaveCount; i++) {
                z += amplitude * noise.perlin2(x * frequency, y * frequency);
                amplitude *= persistence;
                frequency *= lacunarity;
            }

            vertices[idx] = (x - width / 2);
            vertices[idx + 1] = z;
            vertices[idx + 2] = (y - height / 2);

            const [r, g, b] = colorFromZ(z, maxAmplitude)
            colors[idx] = r;
            colors[idx + 1] = g;
            colors[idx + 2] = b;
            idx += 3;
        }
    }

    return {
        vertices,
        normals: new Float32Array(width * height * 3),
        colors,
    }
}