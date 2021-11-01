const gameWithPipe = gameDom.clientWidth;

class Pipe extends Rectangle {
    constructor(height,y,xspeed,dom) {
        super(52,height,gameWithPipe,y,xspeed,0,dom);
    }

    RemovePipe() {
        if(this.x < -this.width) {
            //移除dom
            this.dom.remove();
        }
    }
}

// const SpaHeight = 150;
// const minHeight = 80;
// const maxHeight = LandTop -minHeight - SpaHeight;

function getRandom(min,max){
    return Math.floor(Math.random() *(max -min) + min);
}


class PipePare {

    constructor(xspeed) {
        // const DownHeight = LandTop - UpHeight - SpaHeight;
        // const DownY = LandTop - DownHeight;

        this.spaceHeight = 150; //空隙位置的高度
        this.minHeight = 80; //水管最小高度
        this.maxHeight = LandTop - this.minHeight - this.spaceHeight;
        const UpHeight = getRandom(this.minHeight, this.maxHeight);
        // const UpHeight = getRandom(minHeight,maxHeight);
        const UpDomPipe = document.createElement("div");
        UpDomPipe.className = "pipe up";
        this.upPipe = new Pipe(UpHeight,0,xspeed,UpDomPipe);


        const DownDomPipe = document.createElement("div");
        DownDomPipe.className = "pipe down";

        const DownHeight = LandTop - UpHeight - this.spaceHeight;
        const DownY = LandTop - DownHeight;
        this.downPipe = new Pipe(DownHeight,DownY,xspeed,DownDomPipe);
        gameDom.appendChild(UpDomPipe);
        gameDom.appendChild(DownDomPipe);
    }

    onmove(duration) {
       
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
    
    /**
     * get 访问器属性 判断柱子是否移出视野
     */
     uesless() {
        return this.upPipe.x < -this.upPipe.width;
    }
}



/**
 * 用于不断的产生柱子对
 */

class PipePareProduct {
    constructor(xspeed) {
        this.pairs = [];
        this.timer = null;
        this.xspeed = xspeed;
        this.tick = 1500;

    }

    StartPaduct() {

        if(this.timer) {
            return;
        }

        this.timer = setInterval(()=>{
            this.pairs.push(new PipePare(this.xspeed))

            //移除柱子
            for (let i = 0; i < this.pairs.length; i++) {
                var pair = this.pairs[i];
                
                if (pair.uesless()) {
                    //没用的柱子对
                    this.pairs.splice(i, 1);
                    i--;
                    // pair.upPipe.RemovePipe();
                    // pair.downPipe.RemovePipe();
                }
            }

        },this.tick)

    }

    StopProduct () {
        clearInterval(this.timer);
        this.timer = null;
    }

}



// const product = new PipePareProduct(-100);
// product.StartPaduct();

//  setInterval(() => {
//     product.pairs.forEach(pair => {
//         // console.log(pair)
//         pair.onmove(16/1000);
//     })
//  },16)