const gammDom = document.querySelector(".game");



class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProduct = new PipePareProduct(-100);
        this.timer = null;
        this.tick = 16;
        this.gameOver = false;
    }

    start() {
        if(this.gameOver) {
            window.location.reload();
        }
        if (this.timer) {
            return;
        }
        this.bird.StartSwing();
        this.pipeProduct.StartPaduct(); //生成柱子
        this.timer = setInterval(() => {
                const durantion = this.tick / 1000;
                this.sky.move(durantion);
                this.land.move(durantion);
                this.bird.move(durantion);
                this.pipeProduct.pairs.forEach(pair => {
                    pair.onmove(durantion);
                })
                if(this.isGameOver()) {
                    this.Stop();
                    this.gameOver = true;
                    gammDom.style.opacity = ".6";
                    gammDom.style.backgroundColor = "#555555"
                }
        },this.tick)
    }

     /**
     * 判断两个矩形是否碰撞
     * @param {*} rec1 
     * @param {*} rec2 
     */
      isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        var centerX1 = rec1.x + rec1.width / 2;
        var centerY1 = rec1.y + rec1.height / 2;
        var centerX2 = rec2.x + rec2.width / 2;
        var centerY2 = rec2.y + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        var disY = Math.abs(centerY1 - centerY2);//中心点总想距离
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2
        ) {
            return true;
        }
        return false;
    }


    Stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.StopSwing();
        this.pipeProduct.StopProduct();
            
    }

    RegEvent() {
        window.onkeydown =(e) =>{
            if(e.key == "Enter") {
                if(this.timer) {
                    this.Stop();
                   
                }else{
                    this.start();
                }
               
            } else if(e.key == " ") {
                    this.bird.Jump();
            }
        }
    }
            
    isGameOver() {
        // 是否与大地碰撞
        if (this.bird.y === this.bird.maxY) {
            console.log("游戏结束");
            //鸟碰到了大地
            return true;
            
        }
        // 是否与柱子碰撞
        for (let i = 0; i < this.pipeProduct.pairs.length; i++) {
            const pair = this.pipeProduct.pairs[i];
            //看柱子对pair是否跟bird进行了碰撞
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }

}

const g = new Game();
g.RegEvent();
