import * as THREE from 'three';

// ---주제: 기본장면
export default function example() {
    // renderer
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true //선을 부드럽게 표현, 성능을 조금 저하시킴
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // console.log(window.devicePixelRatio); //pixel 밀도를 숫자로 나타냄
    renderer.setPixelRatio(window.devicePixelRatio >1 ? 2 : 1);
    // setPixelRatio: three.js에서 고해상도로 표현될때 사용되는 메소드

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

    function setSize(){
        //카메라
        camera.aspect = window.innerWidth/ window.innerHeight;
        //updateProjectionMatrix 카메라 투명에 관련된 값에 변화가 있을 경우 실행해야 함
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene,camera);
    }

    //이벤트
    window.addEventListener('resize', setsize);

}