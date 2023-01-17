export class KeyController {
    constructor() {
        //생성자
        this.keys = []; 
        window.addEventListener('keydown', e => {
            console.log(e.code + '누름');
            this.keys[e.code] = true;
        });
     

        window.addEventListener('keyup', e => {
            console.log(e.code + '뗌');
            delete this.keys[e.code];
        });
     
    }
}
//속성으로 keys라는 배열을 추가
     /*
        윈도우에 키가 눌렸을 때, 어떤 키냐에 따라  속성 추가하거나 삭제해줌

        this.keys에 이벤트 객체에 있는 코드를 추가해주고 true로 설정
        w를 누르면, "KeyW"가 찍힘
        keys 배열에 해당되는 키의 속성값을 트루로 세팅. 예를들어,
        w키를 눌렀다면, this.keys["KeyW"] = true;*/

           //w에서 손을 뗐다면, this.keys배열에서 'KeyW'이름의 속성을 삭제
        // 즉 this.keys["KeyW"]를 삭제하는 것