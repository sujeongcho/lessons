import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 랜덤 파티클

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
	controls.enableDamping = true;
	

/*

1. 내가 만들고 싶은 geometry 정하기
2. material은 PointsMateril 사용
3. 사이즈 설정해주기
4. mesh 대신에 points로 scene.add()생성
5. 파티클 효과 완성

*/


	// Points
	const geometry = new THREE.BufferGeometry(1, 32, 32); //bufferGeometry는 원래 가진 형태가 없어서, 도형 만든 후 vertex를 본인이 설정. 인자는 아무것도 안들어감
	const count = 1000;
	const positions = new Float32Array(count * 3) // count * 3로 길이 설정. 3차원이기에 x,y,z 속성이 점 하나당 각각 필요해서 곱하기 3 해줌
	for(let i = 0; i<positions.length; i++){
		positions[i] = (Math.random()-0.5) * 10;
	}
	geometry.setAttribute(
		
		'position',
		new THREE.BufferAttribute(positions, 3) //1개의 vertex(정점)을 위해 값 3개 필요
	
	);
	const material = new THREE.PointsMaterial({
		size: 0.03,
		color: 'green'
	})
	const particles = new THREE.Points(geometry, material);
	scene.add(particles);



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
