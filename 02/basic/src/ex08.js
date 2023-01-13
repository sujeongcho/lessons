import * as THREE from 'three';
import gsap from 'gsap';


//--주제 : 라이브러리를 이용한 애니메이션

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
  


    // scene

    // 안개는 scene에 추가한다
    // 안개가 원근감이 살아남

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('white', 3, 7);



    // camera
    const camera = new THREE.PerspectiveCamera(
        75,//시야각
        window.innerWidth / window.innerHeight,//종횡비(apsect)
        0.1, //near
        1000//far
    );
    camera.position.y = 1;
    camera.position.z = 5;
    scene.add(camera);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.x =1;
    light.position.y = 3;
    light.position.z = 5;
    scene.add(light);


    
    // Mesh
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 'red'
    });
  
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
 

    //그리기
    let time = Date.now();

    function draw(){
       const newTime = Date.now();
       const deltaTime = newTime - time;
       time = newTime;

    //    meshes.forEach(item =>{
    //     item.rotation.y +=deltaTime *0.001;
    //    })
        renderer.render(scene,camera);

        renderer.setAnimationLoop(draw);
    }

    // gsap
    gsap.to(
        mesh.position,
        {
            duration: 1,
            y: 2,
            z: 3
        }
    );


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