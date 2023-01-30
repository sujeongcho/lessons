import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// ----- 주제: canvasTexture

export default function example() {

	// 텍스쳐 이미지 로드
	const cubeTextureLoader = new THREE.CubeTextureLoader();
	const cubeTexture = cubeTextureLoader	
	.setPath('/textures/cubemap/')
	.load([
	//  + - 순서
	// p로 시작하는 파일은 +
	// n으로 시작하는 파일은 -
	// xyz 순으로 써줌
	'px.png','nx.png',
	'py.png', 'ny.png',
	'pz.png','nz.png'

]);




	// renderer
	const canvas = document.querySelector('#three-canvas');
	const renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

	// Scene
	const scene = new THREE.Scene();
	scene.background = cubeTexture;

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
		const directionalLight = new THREE.DirectionalLight('white', 1);
		directionalLight.position.set(1,1,2);
		scene.add(ambientLight, directionalLight);

	// Controls
	const controls = new OrbitControls(camera,renderer.domElement);

	// CanvasTexture
	const texCanvas = document.createElement('canvas');
	const texContext = texCanvas.getContext('2d'); //canvas를 쓰기 위한 디폴트 식
	texCanvas.width = 500;
	texCanvas.height = 500;
	const canvasTexture = new THREE.CanvasTexture(texCanvas);


	// Mesh
	const geometry = new THREE.BoxGeometry(1,1,1);
	// MeshLamberMaterial : 하이라이트, 반사광 없는 재질
	const material = new THREE.MeshBasicMaterial({
		map: canvasTexture
	});

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	// 그리기
	const clock = new THREE.Clock();

	function draw() {
		const time = clock.getElapsedTime();
		//canvas에 그림 그리기 위해 context 객체 사용

		//움직이게 하기 위해 map:canvasTexture를 true로 만들어줘야함
		material.map.needsUpdate = true;

		texContext.fillStyle = 'green';
		texContext.fillRect(0,0,500,500);

		texContext.fillStyle = 'white';
		texContext.fillRect(time*50,100,50,50);
		texContext.font = 'bold 100px sans-serif'
		texContext.fillText('xtal', 200,200);

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
