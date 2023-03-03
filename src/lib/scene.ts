import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generate } from "./mapGenerator";

let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let pointLight: THREE.PointLight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const geometry = new THREE.BufferGeometry();

const indices = [];

const map = generate(100, 100, 1 / 20, 20);
// const vertices = generate(100, 100, 1 / 20, 20).vertices;
const normals = [];
// const colors = [];

const size = 100;
const segments = 100;

const halfSize = size / 2;
const segmentSize = size / segments;

// generate vertices, normals and color data for a simple grid geometry

for (let i = 0; i <= segments; i++) {

    const y = (i * segmentSize) - halfSize;

    for (let j = 0; j <= segments; j++) {

        const x = (j * segmentSize) - halfSize;

        // vertices.push(x, Math.random() * 10, y);
        normals.push(0, 0, 1);

        // const r = (x / size) + 0.5;
        // const g = (y / size) + 0.5;

        // colors.push(r, g, 1);

    }

}

// generate indices (data for element array buffer)

for (let i = 0; i < segments; i++) {

    for (let j = 0; j < segments; j++) {

        const a = i * (segments + 1) + (j + 1);
        const b = i * (segments + 1) + j;
        const c = (i + 1) * (segments + 1) + j;
        const d = (i + 1) * (segments + 1) + (j + 1);

        // generate two faces (triangles) per iteration

        indices.push(a, b, d); // face one
        indices.push(b, c, d); // face two

    }

}

//
geometry.setIndex(indices);
geometry.setAttribute('position', new THREE.Float32BufferAttribute(map.vertices, 3));
geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(map.colors, 3));

const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    vertexColors: true
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.AmbientLight(0x404040, 1);
pointLight = new THREE.PointLight(0xffffff, 2, 200);
pointLight.position.set(0, 50, -25);
scene.add(pointLight);

scene.add(light);
camera.position.z = 60;
camera.position.y = 30;

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
};

export const createThreeScene = (canvas: HTMLCanvasElement) => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    controls = new OrbitControls(camera, canvas);
    resize();
    animate();
};

window.addEventListener("resize", resize);