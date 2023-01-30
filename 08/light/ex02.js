import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';
import { Sphere, TextureLoader } from 'three';

// ----- 주제: light, shadow


/*
castShadow: 영향을 주는 그림자
receiveShadow: 영향을 받는 그림자

*/ 

export default function example() {
	// Renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
	renderer.shadowMap.enabled = true;
	// renderer.shadowMap.type = THREE.PCFShadowMap;
	// renderer.shadowMap.type = THREE.BasicShadowMap; //그림자 픽셀처럼 표현됨. 성능 가장 좋음
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; //그림자 부드러움


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

	const light = new THREE.DirectionalLight('orange', 0.5);
	// light.position.x = 3;
	light.position.y = 3;
	scene.add(light);

	const lightHelper = new THREE.DirectionalLightHelper(light);
	scene.add(lightHelper);

	// 그림자 설정
	light.castShadow = true; //이 빛은 그림자를 만들 수 있는 빛이 됨
	light.shadow.mapSize.width  = 1024; //기본값 512
	light.shadow.mapSize.height = 1024; 
	light.shadow.camera.near = 1;
	light.shadow.camera.far = 10;
	// light.shadow.radius = 15; //그림자 부드럽게 처리. 기본값인 THREE.PCFShadowMap에서만 적용
	
	


	// Controls
	const controls = new OrbitControls(camera, renderer.domElement);

	// geometry
	const planeGeometry = new THREE.PlaneGeometry(10, 10);
	const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
	const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

	// material 
	const material1 = new THREE.MeshStandardMaterial({ color: 'white' });
	const material2 = new THREE.MeshStandardMaterial({ color: 'royalblue' });
	const material3 = new THREE.MeshStandardMaterial({ color: 'gold' });



	// mesh
	const plane = new THREE.Mesh(planeGeometry, material1);
	const box = new THREE.Mesh(boxGeometry, material2);
	const sphere = new THREE.Mesh(sphereGeometry, material3);

	plane.rotation.x = -Math.PI * 0.5;
	box.position.set(1, 1, 0);
	sphere.position.set(-1, 1, 0);

	// 그림자 설정
	plane.receiveShadow = true;
	box.castShadow = true;
	box.receiveShadow = true;
	sphere.castShadow = true;
	sphere.receiveShadow = true;

	scene.add(plane, box, sphere);

	// AxesHelper
	const axesHelper = new THREE.AxesHelper(3);
	scene.add(axesHelper);

	// Dat GUI
	const gui = new dat.GUI();
	gui.add(light.position, 'x', -5, 5, 0.1);
	gui.add(light.position, 'y', -5, 5, 0.1);
	gui.add(light.position, 'z', -5, 5, 0.1);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		// const delta = clock.getDelta();
		const time = clock.getElapsedTime();



		// light.position.x = Math.cos(time) * 5;
		// light.position.z = Math.sin(time) * 5;

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
