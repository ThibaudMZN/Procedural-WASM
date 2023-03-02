<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";

    let canvas: HTMLCanvasElement;

    onMount(() => {
        createThreeScene(canvas);
    });

    const createThreeScene = (canvas: HTMLCanvasElement) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        let renderer;
        scene.add(cube);
        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        const resize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };

        renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
        resize();
        animate();

        window.addEventListener("resize", resize);
    };
</script>

<canvas bind:this={canvas} />
