
const canvasWidth = 1080;
const canvasHeight = 1080;

let bgCanvas;
let fireFractal;
let treeFractal;

function initializeCanvas(canvasID){
    const canvas = document.getElementById(canvasID);
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    return canvas;
}

var red = 0;
var blue = 0;
var green = 0;
var greenGoUp = true;
var redGoUp = true;
var blueGoUp = false;
console.log('red',red);

function main(){
    bgCanvas = initializeCanvas('canvasBackground');
    drawTreeFractal();
    drawFireFractal();
}

document.getElementById('drawFire').addEventListener("click", function(){
    drawFireFractal();
    console.log('click button');
  });


function drawFireFractal(){
    console.log('fire up');

    fireFractal = initializeCanvas('fireFractal');
    const treeLocation = [canvasWidth * 0.5, canvasHeight* 0.95];   
    drawSmoke(fireFractal, treeLocation, 100, 90, 10);   
}

function drawSmoke(canvas, start, len, angle, branchWidth){
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.save();
    ctx.lineWidth = branchWidth;
    ctx.translate(...start);
    ctx.rotate(angle*Math.PI/180);

    // red
    if  (redGoUp == true){
        red += .91;
        ctx.strokeStyle = `rgb(${red}, ${green},${blue})`
    }
    if  (red >= 255){
        redGoUp = false;
    }
    if  (redGoUp == false){
        red -= .91;
        ctx.strokeStyle = `rgb(${red}, ${green},${blue})`
    }
    if  (red <= 0){
        redGoUp = true;
    }


    // blue
    if  (blueGoUp == true){
        blue += .1;
    }
    if  (blue >= 255){
        blueGoUp = false;
    }

    if  (blueGoUp == false){
        blue -= .1;
    }
    if  (blue <= 0){
        blueGoUp = true;
    }

    // green
    if  (greenGoUp == true){
        green += .1;
    }
    if  (green >= 255){
        greenGoUp = false;
    }

    if  (greenGoUp == false){
        green -= .1;
    }
    if  (green <= 0){
        greenGoUp = true;
    }
    ctx.moveTo(0,0);
    ctx.lineTo(0, -len);
    ctx.stroke();


    if (len > 1 && branchWidth > 1) {

    setTimeout(function(){     
        drawSmoke(canvas, [0,-(len)], len * 0.6 , red, branchWidth * .9);
        drawSmoke(canvas, [30,-(len)], len * 0.85 , -94, branchWidth * 0.9);
    }, 100);            
    }
};




function drawTreeFractal(){
    console.log('tree up');
    treeFractal = initializeCanvas('treeFractal');
    const treeLocation = [canvasWidth * 0.2, canvasHeight* 0.95];   
    drawBranches(treeFractal, treeLocation, 400, 0, 60);   
}

function drawBranches(canvas, start, len, angle, branchWidth){
    const ctxtree = canvas.getContext('2d');
    ctxtree.beginPath();
    ctxtree.save();
    ctxtree.lineWidth = branchWidth;
    ctxtree.translate(...start);
    ctxtree.rotate(angle*Math.PI/180);

    ctxtree.moveTo(0,0);
    ctxtree.lineTo(0, -len);
    ctxtree.stroke();


    if (len > 1 && branchWidth > 1) {
        drawBranches(canvas, [0,-len], len*0.5+branchWidth*1.1, 20, branchWidth * 0.7);
        drawBranches(canvas, [0,-len], len*0.5+branchWidth*1.1, -20, branchWidth * 0.3);
   
    }
};