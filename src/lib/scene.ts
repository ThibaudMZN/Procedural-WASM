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
const map = generate(100, 100, 1 / 50, 20);

//
geometry.setIndex(map.indices);
geometry.setAttribute('position', new THREE.Float32BufferAttribute(map.vertices, 3));
geometry.setAttribute('normal', new THREE.Float32BufferAttribute(map.normals, 3));
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