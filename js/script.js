
const canvasWidth = 1080;
const canvasHeight = 1080;

let bgCanvas;
let branchCanvas;

function initializeCanvas(canvasID){
    const canvas = document.getElementById(canvasID);
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    return canvas;
}

var red = 0;
var redGoUp = true;
console.log('red',red);

function main(){
    console.log('test');
    bgCanvas = initializeCanvas('canvasBackground');
    branchCanvas = initializeCanvas('canvasBranches');
    const treeLocation = [canvasWidth * 0.5, canvasHeight* 0.85];
    drawBranches(branchCanvas, treeLocation, 80, 0, 10);
}

function drawBranches(canvas, start, len, angle, branchWidth){
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = branchWidth;
    ctx.translate(...start);
    ctx.rotate(angle*Math.PI/180);


    if  (redGoUp == true){
        red += .21;
        ctx.strokeStyle = 'rgb(' + red + ',162, '+ red/3 + ')';
        console.log('red up',red);
    }
    if  (red >= 255){
        redGoUp = false;
        console.log('flip to red down');
    }


    if  (redGoUp == false){
        red -= .21;
        ctx.strokeStyle = 'rgb('+red+',162,63)';
        console.log('red down',red);
    }
    if  (red <= 0){
        redGoUp = true;
        console.log('flip to red up');
    }

    ctx.moveTo(0,0);
    ctx.lineTo(0, -len);
    ctx.stroke();


    if (len > 1 && branchWidth > 1) {
        drawBranches(canvas, [0,-(len)], len * 0.8 , 40, branchWidth * .8);
        drawBranches(canvas, [0,-(len)], len * 0.85 , -10, branchWidth * 0.8);


        console.log('draw');
    }
    ctx.restore();

};