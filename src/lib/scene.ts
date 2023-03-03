import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import type { Mesh } from "./mapGenerator";

let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let pointLight: THREE.PointLight;
let mesh: THREE.Mesh;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    vertexColors: true
});
const geometry = new THREE.BufferGeometry();
const meshObj = new THREE.Mesh(geometry, material);
scene.add(meshObj);

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

export const updateMesh = (mesh: Mesh) => {
    geometry.setIndex(mesh.indices);
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(mesh.vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(mesh.normals, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(mesh.colors, 3));
}

window.addEventListener("resize", resize);