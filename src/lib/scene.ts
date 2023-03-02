import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
const light = new THREE.AmbientLight(0x404040, 1);
const pointLight = new THREE.PointLight(0xffffff, 2, 200);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

scene.add(cube);
scene.add(light);
camera.position.z = 5;

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