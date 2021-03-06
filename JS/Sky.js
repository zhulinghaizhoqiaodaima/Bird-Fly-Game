const SkyDmo = document.querySelector(".sky");
const SkyStyles = getComputedStyle(SkyDmo);
const SkyHeight = parseFloat(SkyStyles.height);
const SkyWidth = parseFloat(SkyStyles.width);

//设置一个开始时间;
//设置一个稳定速度
class Sky extends Rectangle {
    constructor() {
        super(SkyWidth,SkyHeight,0,0,-100,0,SkyDmo);
       
    }
    
    move(duration) {
        super.move(duration);
        if(this.onMove) {
            this.onMove();
        } //判断是否重加载
    }

    onMove() {
        if(this.x <= -SkyWidth/2) {
            this.x = 0;
        }
    } // 重渲染图片
    
}
