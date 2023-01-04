import * as THREE from 'three';




// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector('#three-canvas');
// const renderer = new THREE.WebGLRenderer({canvas: canvas});
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true //선을 부드럽게 표현, 성능을 조금 저하시킴
});
renderer.setSize(window.innerWidth, window.innerHeight);


// scene
const scene = new THREE.Scene();


// perspective camera(원근 카메라)
const camera = new THREE.PerspectiveCamera(
    75,//시야각
    window.innerWidth / window.innerHeight,//종횡비(apsect)
    0.1, //near
    1000//far
);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// // orthographic camera(직교 카메라). 직육면체임
// const camera = new THREE.OrthographicCamera(
//     -(window.innerWidth / window.innerHeight), //left
//     window.innerWidth /window.innerHeight, //right
//     1, //top
//     -1, //bottom
//     0.1, //near
//     1000  //far
// );

// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 5;
// camera.lookAt(0,0,0);
// camera.zoom = 0.5;
// camera.updateProjectionMatrix();
// scene.add(camera)



// mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    // color: 0xff0000
    // color:'red'
    color: '#ff0000'
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//그리기
renderer.render(scene, camera);

