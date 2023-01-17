import * as THREE from 'three';
import {OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// ----- 주제: OrbitControls

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();

	// Camera
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.y = 1.5;
	camera.position.z = 4;
	scene.add(camera);

	// Light
	const ambientLight = new THREE.AmbientLight('white', 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight('white', 1);
	directionalLight.position.x = 1;
	directionalLight.position.z = 2;
	scene.add(directionalLight);

	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	controls.enableDamping = true; //draw함수에 controls.update() 실행해줘야함
	// controls.enableZoom = false; //wheel을 돌려도 줌인 줌아웃안됨
	// controls.maxDistance = 10; //10까지만 멀어질 수 있다.
	// controls.minDistance = 5;
	// controls.minPolarAngle = Math.PI/4; // 45도까지만 볼 수 있음
	// controls.minPolarAngle = THREE.MathUtils.degToRad(45);
	// controls.maxPolarAngle = THREE.MathUtils.degToRad(135);
	// controls.target.set(2,2,2); //target의 중심점(x,y,z)를 정해줌
	// controls.autoRotate = true; //저절로 돌아감
	// controls.autoRotateSpeed =5; 



	// Mesh 
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	let mesh;
	let material;
	for(let i =0; i<20;i++){
		material = new THREE.MeshStandardMaterial({
			color: `rgb(
				${50 + Math.floor(Math.random() * 205)},
				${50 +Math.floor(Math.random() * 205)},
				${50 +Math.floor(Math.random() * 205)}
				)`
		});
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = (Math.random() - 0.5 ) * 5;
		mesh.position.y = (Math.random() - 0.5 ) * 5;
		mesh.position.z = (Math.random() - 0.5 ) * 5;
		scene.add(mesh);

	}

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const delta = clock.getDelta();

		controls.update();

		renderer.render(scene, camera);
		renderer.setAnimationLoop(draw);
	}

	function setSize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
	}

	// 이벤트
	window.addEventListener('resize', setSize);

	draw();
}
