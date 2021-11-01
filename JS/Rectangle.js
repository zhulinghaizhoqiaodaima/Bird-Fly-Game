/**
 * 游戏矩形类对象：可以移动
 * 属性：宽，高，横坐标，纵坐标
 * 纵向速度，横向速度，对应的demo对象
 * 
 */

class Rectangle {
    constructor (width,height,x,y,xSpeed,ySpeed,dmo) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dmo =dmo;
        this.render();
    }

    render() {
        this.dmo.style.width = this.width + "px";
        this.dmo.style.height = this.height + "px";
        this.dmo.style.left = this.x + "px";
        this.dmo.style.top = this.y + "px";
    }
    /**
     * 按照矩形的速度，移动矩形
     * @param{*} duration
     */

    move(duration) {
        const xDis = this.xSpeed * duration;
        const yDis = this.ySpeed * duration;
        this.x += xDis;
        this.y += yDis;
        // this.x = newX;
        // this.y =newY;
        this.render();
    }
}
