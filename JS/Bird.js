const BirdDmo = document.querySelector(".bird");
const BirdStyles = getComputedStyle(BirdDmo);
const BirdHeight = parseFloat(BirdStyles.height);
const BirdWidth = parseFloat(BirdStyles.width);
const BirdTop  =parseFloat(BirdStyles.top)
const BirdLeft  =parseFloat(BirdStyles.left);

const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;


class Bird extends Rectangle {

    constructor() {
        super(BirdWidth,BirdHeight,BirdLeft,BirdTop,0,0,BirdDmo);
        this.g = 1500;// 单位: px/s  
        this.maxY = gameHeight - LandHeight - this.height;
        this.SwingStatus = 0; //翅膀状态
        this.timer = null;
        this.render();
    }

    move(duration) {
        super.move(duration);
        if(this.y >  this.maxY) {
            this.y =  this.maxY;
            this.StopSwing();
            // this.g = 0;
        }else {
            this.ySpeed += this.g * duration;
        }
    }

    Jump () {
        this.ySpeed = -450; 
    } // 特有Jump (px)

    StartSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(()=> {
            this.SwingStatus ++;
           this.SwingStatus = (this.SwingStatus) %3;
           this.render(); // 重渲染
         
        },200)
       
    }
    render() {
        super.render(); //重用父类渲染逻辑
        this.dmo.className = `bird swing${this.SwingStatus}`;
    }

    StopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }

}

// 测试Bird class
// const BirdMove = new Bird();
// setInterval(()=> {
//     BirdMove.move(16/1000);
// },16)