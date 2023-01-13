import * as THREE from 'three';

// 애니메이션 기본

export default function example() {
    // renderer
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true, //선을 부드럽게 표현, 성능을 조금 저하시킴
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio >1 ? 2 : 1);
    // renderer.setClearAlpha(0.5); //투명도조절
    // renderer.setClearColor('#00ff00');
    // renderer.setClearAlpha(0.5)


    // scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black'); 

    // perspective camera(원근 카메라)
    const camera = new THREE.PerspectiveCamera(
        75,//시야각
        window.innerWidth / window.innerHeight,//종횡비(apsect)
        0.1, //near
        1000//far
    );
 
    camera.position.z = 5;
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.x =1;
    light.position.y = 1;
    light.position.z = 2;
    scene.add(light);

    // mesh
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: '#ff0000'
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //그리기
    const clock= new THREE.Clock();

    function draw(){
        // 일정값을 더해주는 식에 적합한 방법:getDelta();
        // delta는 draw함수 한번 실행 간격 즉,시간 차를 나타냄
        // getElaspedTime은 실행시간으로부터 경과된 총 시간을 나타냄
        // getDelta랑 getElapsedTime 동시에 쓰면 안됨.
        const delta = clock.getDelta();
           
        mesh.rotation.y += 2* delta; //속도를 올리고싶은만큼 숫자를 곱해주면됨.
        mesh.position.y += delta;
        if(mesh.position.y> 3){
            mesh.position.y =0;
        }
        //  mesh.rotation.y += 0.1;
         renderer.render(scene,camera);

        //  window.requestAnimationFrame(draw);
        // 꼭 setAnimationLoop를 사용해야하는 때: three.js를 이용해서 ar,vr 콘텐츠를 만들 때!
        renderer.setAnimationLoop(draw);
    }

    function setSize(){
        camera.aspect = window.innerWidth/ window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene,camera);
    }

    //이벤트
    window.addEventListener('resize', setSize);
    draw();
}