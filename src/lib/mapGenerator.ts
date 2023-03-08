import Perlin from "./perlin";
import { tinygoPerlin } from "./wasm";

export type Mesh = {
    vertices: Float32Array;
    normals: Float32Array;
    colors: Float32Array;
    indices: number[];
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

export const generate = (
    width: number,
    height: number,
    step: number,
    maxAmplitude: number,
    octaveCount: number,
    persistence: number,
    lacunarity: number
): Mesh => {
    const noise = new Perlin(42);
    const size = (width + 1) * (height + 1) * 3;

    const vertices = new Float32Array(size);
    const colors = new Float32Array(size);
    const normals = new Float32Array(size);
    const indices = [];

    tinygoPerlin.NewPerlin(42)

    for (let x = 0, idx = 0; x <= width; x++) {
        for (let y = 0; y <= height; y++, idx += 3) {

            /* Noise */
            // let z = noise.perlin2(x * step, y * step);
            let z = tinygoPerlin.Perlin(x * step, y*step);
            let frequency = step;
            let amplitude = maxAmplitude;

            for (let i = 0; i < octaveCount; i++) {
                z += amplitude * tinygoPerlin.Perlin(x * frequency, y * frequency);
                //z += amplitude * noise.perlin2(x * frequency, y * frequency);
                amplitude *= persistence;
                frequency *= lacunarity;
            }

            /* Vertices */
            vertices[idx] = (x - width / 2);
            vertices[idx + 1] = z;
            vertices[idx + 2] = (y - height / 2);

            /* Colors */
            const [red, green, blue] = colorFromZ(z, maxAmplitude)
            colors[idx] = red;
            colors[idx + 1] = green;
            colors[idx + 2] = blue;

            /* Normals */
            normals[idx] = 0;
            normals[idx + 1] = 0;
            normals[idx + 2] = 1;

            /* Indices */
            if (y < height && x < width) {
                const a = x * (height + 1) + (y + 1);
                const b = x * (height + 1) + y;
                const c = (x + 1) * (height + 1) + y;
                const d = (x + 1) * (height + 1) + (y + 1);

                indices.push(a, b, d); // face one
                indices.push(b, c, d); // face two
            }
        }
    }

    return {
        vertices,
        normals,
        colors,
        indices,
    }
}
