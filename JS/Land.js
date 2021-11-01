const LandDmo = document.querySelector(".land");
const LandStyles = getComputedStyle(LandDmo);
const LandHeight = parseFloat(LandStyles.height);
const LandWidth = parseFloat(LandStyles.width);
const LandTop  =parseFloat(LandStyles.top)
// parseFloat 返回字符串的第一个数字
//设置一个开始时间;
//设置一个稳定速度
class Land extends Rectangle {
    constructor(speed) {
        super(LandWidth,LandHeight,0,LandTop,speed,0,LandDmo);
       
    }
    
    move(duration) {
        super.move(duration);
        if(this.onMove) {
            this.onMove();
        }
    }

    onMove() {
        if(this.x <= -LandWidth/2) {
            this.x = 0;
        }
    }
    
}

const landDmo = new Land(-100);

//  Land 仿 Sky类