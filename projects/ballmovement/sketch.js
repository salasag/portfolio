var ellx = [];
var elly = [];
var numel = 4;
var CANVAS_WIDTH;
var CANVAS_HEIGHT;
var ballHeight = [];
var ballDirection = [];
var ballSpeed = [];
var init = 0;
var ballSpeedMod = 30;
let img;
var FPS = 60;
var maxh0 = 0;
var maxhh = 0;
var mousePrevPressed = false;
var sliderX;
var rColor = 255;
var gColor = 255;
var bColor = 255;
var colorVariance = 10;

function setup(){
    CANVAS_WIDTH = windowWidth-180;
    CANVAS_HEIGHT = windowHeight-100;
    sliderX = CANVAS_WIDTH/2
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT+100);
    background(255);
    frameRate(60);
}

function draw(){
    bounce();
}

function preload(){
}

function bounce(){
    if(mouseIsPressed){
        background(255);
    }
    rect(0,CANVAS_HEIGHT+50,CANVAS_WIDTH,50);
    fill(127);
    rect(sliderX,CANVAS_HEIGHT+50,CANVAS_WIDTH,50);
    if(mouseIsPressed && mouseY > CANVAS_HEIGHT+50){
        sliderX = mouseX;
        init = 0;
    }
    var numBalls = sliderX/CANVAS_WIDTH*500;
    var scale = CANVAS_HEIGHT/(2*Math.PI*FPS);
    var accvel = 36*Math.PI;
    if(init == 0){
        for(var i = 0; i < numBalls; i++){
            ballHeight[i] = (CANVAS_HEIGHT/2)*Math.sin(i/numBalls*2*Math.PI);
            if(i < numBalls/2){
                ballDirection[i] =  1;
                ballSpeed[i] = Math.cos((ballHeight[i])/CANVAS_HEIGHT*Math.PI)*scale;
            }
            else{
                ballDirection[i] =  1;
                ballSpeed[i] = Math.cos((ballHeight[i])/CANVAS_HEIGHT*Math.PI)*scale;
            }
        }
        init = 1;
        
        
        
    }

    for(var i = 0; i < numBalls; i++){
        drawBall(ballHeight[i],i/numBalls*2*Math.PI);
        if(!mouseIsPressed){
            if(i < numBalls/2){
                ballSpeed[i] = ballSpeed[i] - Math.sin((ballHeight[i])/CANVAS_HEIGHT*Math.PI)/accvel;
            }
            else{
                ballSpeed[i] = ballSpeed[i] - Math.sin((ballHeight[i])/CANVAS_HEIGHT*Math.PI)/accvel;// / FPS;
            }
            ballHeight[i] = ballHeight[i] + ballDirection[i] * ballSpeed[i];// * ballSpeedMod/FPS;
        }
    }
    if(mouseIsPressed && mouseY < CANVAS_HEIGHT+50){
        mousePrevPressed = true;
    }
    if (mouseIsPressed && mouseY < CANVAS_HEIGHT+50){ // mousePrevPressed && !
        var mouseRelX = mouseX - CANVAS_WIDTH/2;
        var mouseRelY = mouseY - CANVAS_HEIGHT/2;
        var newHeight = Math.max(-CANVAS_HEIGHT/2,Math.min(CANVAS_HEIGHT/2,-Math.sqrt(mouseRelX*mouseRelX+mouseRelY*mouseRelY))); //* Math.sign(mouseRelX)
        var angle = 0;
        if(mouseRelX == 0){
            angle = 0;
        }
        else if(mouseRelY == 0){
            angle = Math.PI/2;
        }
        else {
            angle = Math.atan(mouseRelY/mouseRelX)+Math.PI+Math.PI/2*Math.sign(mouseRelX);
        }
        var ballIndex = Math.floor((angle/2/Math.PI)*numBalls)%numBalls;
        ballHeight[ballIndex] = newHeight;
        ballSpeed[ballIndex] = Math.cos((ballHeight[ballIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        var prevIndex = (ballIndex-1)%numBalls;
        var nextIndex = (ballIndex+1)%numBalls;
        var elasticity = 1; // Between 0 and 1
        // while(Math.abs(prevIndex - nextIndex) > 1){
        //     var prevPrevIndex = (prevIndex+1)%numBalls;
        //     ballHeight[prevIndex] = (1-elasticity)*ballHeight[prevIndex] + (elasticity)*ballHeight[prevPrevIndex];
        //     if(prevIndex < numBalls/2){
        //         ballSpeed[prevIndex] = Math.cos((ballHeight[prevIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        //     }
        //     else{
        //         ballSpeed[prevIndex] = -Math.cos((ballHeight[prevIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        //     }
        //     var prevIndex = (prevIndex-1)%numBalls;

        //     var prevNextIndex = (nextIndex-1)%numBalls;
        //     ballHeight[nextIndex] = (1-elasticity)*ballHeight[nextIndex] + (elasticity)*ballHeight[prevNextIndex];
        //     if(nextIndex < numBalls/2){
        //         ballSpeed[nextIndex] = Math.cos((ballHeight[nextIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        //     }
        //     else{
        //         ballSpeed[nextIndex] = -Math.cos((ballHeight[nextIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        //     }
        //     var nextIndex = (nextIndex+1)%numBalls;
        // }
        mousePrevPressed = false;
    }

}

function bounce2(){

    var numBalls = 100;
    if(init == 0){
        for(var i = 0; i <= numBalls; i++){
            ballHeight[i] = (CANVAS_HEIGHT/2)*Math.sin(i/numBalls*Math.PI);//-CANVAS_HEIGHT/2;
            //if(i < numBalls/2){
            ballDirection[i] =  -1;
            // }
            // else{
            //     ballDirection[i] = -1;
            // }
            ballSpeed[i] = Math.cos(Math.PI*ballHeight[i]/(CANVAS_HEIGHT));
        }
        init = 1;
    }

    for(var i = 0; i < numBalls; i++){
        drawBall(ballHeight[i],i/numBalls*Math.PI);
        //if(ballHeight[i] > CANVAS_HEIGHT/2){
        //    ballHeight[i] = CANVAS_HEIGHT/2;
        //   ballDirection[i] = -1;
        //}
        //if(ballHeight[i] < -CANVAS_HEIGHT/2){
        //    ballHeight[i] = -CANVAS_HEIGHT/2;
        //    ballDirection[i] = 1;
        //}
        ballSpeed[i] = ballSpeed[i] + Math.sin(Math.PI*ballHeight[i]/(CANVAS_HEIGHT));
        ballHeight[i] = ballHeight[i] + ballDirection[i] * ballSpeed[i];
    }

}

function bounce3(){

    var numBalls = 100;
    var scale = CANVAS_HEIGHT/(2*Math.PI*FPS);
    var accvel = 113.09;
    if(init == 0){
        for(var i = 0; i < numBalls; i++){
            ballHeight[i] = (CANVAS_HEIGHT/2)*Math.sin(i/numBalls*Math.PI);
            if(i < numBalls/2){
                ballDirection[i] =  1;
                ballSpeed[i] = Math.cos((ballHeight[i])/CANVAS_HEIGHT*Math.PI)*scale;
            }
            else{
                ballDirection[i] =  1;
                ballSpeed[i] = -Math.cos((ballHeight[i])/CANVAS_HEIGHT*Math.PI)*scale;
            }
            console.log(i + " : " + (ballHeight[i])/CANVAS_HEIGHT*2*Math.PI);
            console.log(i + " Height: " + ballHeight[i]);
            console.log(i + " Speed: " + ballSpeed[i]);
            console.log(i + " Accel: " + Math.sin((ballHeight[i])/CANVAS_HEIGHT*Math.PI)/scale*scale);
        }
        init = 1;
        
        
        
    }

    for(var i = 0; i < numBalls; i++){
        drawBall(ballHeight[i],i/numBalls*Math.PI);
        if(i < numBalls/2){
            ballSpeed[i] = ballSpeed[i] - Math.sin((ballHeight[i])/CANVAS_HEIGHT*Math.PI)/accvel;
        }
        else{
            ballSpeed[i] = ballSpeed[i] - Math.sin((ballHeight[i])/CANVAS_HEIGHT*Math.PI)/accvel;// / FPS;
        }
        ballHeight[i] = ballHeight[i] + ballDirection[i] * ballSpeed[i];// * ballSpeedMod/FPS;
    }
    // if(maxh0 < ballHeight[0]){
    //     maxh0 = ballHeight[0];
    // }
    // if(maxhh < ballHeight[7]){
    //     maxhh = ballHeight[7];
    // }
    // console.log("H0: " + maxh0);
    // console.log("HH: " + maxhh);

}

function bounce4(){

    var numBalls = 100;
    var scale = CANVAS_HEIGHT/(2*Math.PI*FPS);
    var accvel = 36*Math.PI;
    if(init == 0){
        for(var i = 0; i < numBalls; i++){
            ballHeight[i] = (CANVAS_HEIGHT/2)*Math.sin(i/numBalls*2*Math.PI);
            if(i < numBalls/2){
                ballDirection[i] =  1;
                ballSpeed[i] = Math.cos((ballHeight[i])/CANVAS_HEIGHT*Math.PI)*scale;
            }
            else{
                ballDirection[i] =  1;
                ballSpeed[i] = Math.cos((ballHeight[i])/CANVAS_HEIGHT*Math.PI)*scale;
            }
        }
        init = 1;
        
        
        
    }

    for(var i = 0; i < numBalls; i++){
        drawBall(ballHeight[i],i/numBalls*2*Math.PI);
        if(i < numBalls/2){
            ballSpeed[i] = ballSpeed[i] - Math.sin((ballHeight[i])/CANVAS_HEIGHT*Math.PI)/accvel;
        }
        else{
            ballSpeed[i] = ballSpeed[i] - Math.sin((ballHeight[i])/CANVAS_HEIGHT*Math.PI)/accvel;// / FPS;
        }
        ballHeight[i] = ballHeight[i] + ballDirection[i] * ballSpeed[i];// * ballSpeedMod/FPS;
    }
    if(mouseIsPressed){
        mousePrevPressed = true;
    }
    if (mouseIsPressed){ // mousePrevPressed && !
        var mouseRelX = mouseX - CANVAS_WIDTH/2;
        var mouseRelY = mouseY - CANVAS_HEIGHT/2;
        var newHeight = Math.max(-CANVAS_HEIGHT/2,Math.min(CANVAS_HEIGHT/2,Math.sqrt(mouseRelX*mouseRelX+mouseRelY*mouseRelY) * Math.sign(mouseRelX)));
        var angle = 0;
        if(mouseRelX == 0){
            angle = 0;
        }
        else if(mouseRelY == 0){
            angle = Math.PI/2;
        }
        else {
            angle = Math.atan(mouseRelY/mouseRelX)+Math.PI/2;
        }
        var ballIndex = Math.floor((angle/2/Math.PI)*numBalls)%numBalls;
        ballHeight[ballIndex] = newHeight;
        ballSpeed[ballIndex] = Math.cos((ballHeight[ballIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        var prevIndex = (ballIndex-1)%numBalls;
        var nextIndex = (ballIndex+1)%numBalls;
        var elasticity = 1; // Between 0 and 1
        // while(Math.abs(prevIndex - nextIndex) > 1){
        //     var prevPrevIndex = (prevIndex+1)%numBalls;
        //     ballHeight[prevIndex] = (1-elasticity)*ballHeight[prevIndex] + (elasticity)*ballHeight[prevPrevIndex];
        //     if(prevIndex < numBalls/2){
        //         ballSpeed[prevIndex] = Math.cos((ballHeight[prevIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        //     }
        //     else{
        //         ballSpeed[prevIndex] = -Math.cos((ballHeight[prevIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        //     }
        //     var prevIndex = (prevIndex-1)%numBalls;

        //     var prevNextIndex = (nextIndex-1)%numBalls;
        //     ballHeight[nextIndex] = (1-elasticity)*ballHeight[nextIndex] + (elasticity)*ballHeight[prevNextIndex];
        //     if(nextIndex < numBalls/2){
        //         ballSpeed[nextIndex] = Math.cos((ballHeight[nextIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        //     }
        //     else{
        //         ballSpeed[nextIndex] = -Math.cos((ballHeight[nextIndex])/CANVAS_HEIGHT*Math.PI)*scale;
        //     }
        //     var nextIndex = (nextIndex+1)%numBalls;
        // }
        mousePrevPressed = false;
    }
}

function drawBall(height,angle){
    var curX = CANVAS_WIDTH/2+height*Math.sin(angle);
    var curY = CANVAS_HEIGHT/2-height*Math.cos(angle);
    var colorDelay = 10;
    var brightness = 64;
    rColor = rColor + colorVariance*Math.random() - colorVariance/2;
    gColor = gColor + colorVariance*Math.random() - colorVariance/2;
    bColor = bColor + colorVariance*Math.random() - colorVariance/2;
    rColor = Math.max(64,Math.min(200,rColor));
    gColor = Math.max(64,Math.min(200,gColor));
    bColor = Math.max(64,Math.min(200,bColor));
    // stroke(255);
    noStroke()
    fill((curX+performance.now()/colorDelay)%127+brightness,(sqrt(curX*curY)+performance.now()/colorDelay)%127+brightness,(curY+performance.now()/colorDelay)%127+brightness,50);
    //fill(rColor,gColor,bColor);
    ellipse(curX,curY,20,20);
}

function drawline(){
    for(var i = 0; i < numel; i++){
        ellx[i] = (CANVAS_WIDTH/2)+(mouseX-CANVAS_WIDTH/2)*i/numel;
        elly[i] = (CANVAS_HEIGHT/2)+(mouseY-CANVAS_HEIGHT/2)*i/numel;
    }

    fill(255,127,0);
    for(var i = 0; i < numel; i++){
        var curX = ellx[i];
        var curY = elly[i];
        var curWidth  = 200*(numel-i)/numel;
        var curHeight = 200*(numel-i)/numel;
        fill(curX%127+64,(sqrt(curX*curY))%127+64,(curY)%127+64);
        ellipse(curX,curY,curWidth,curHeight);
        curX = CANVAS_HEIGHT - elly[i];
        curY = ellx[i];
        fill(curX%127+64,(sqrt(curX*curY))%127+64,(curY)%127+64);
        ellipse(curX,curY,curWidth,curHeight);
        curX = elly[i];
        curY = CANVAS_WIDTH  - ellx[i];
        fill(curX%127+64,(sqrt(curX*curY))%127+64,(curY)%127+64);
        ellipse(curX,curY,curWidth,curHeight);
        curX = CANVAS_WIDTH  - ellx[i];
        curY = CANVAS_HEIGHT - elly[i];
        fill(curX%127+64,(sqrt(curX*curY))%127+64,(curY)%127+64);
        ellipse(curX,curY,curWidth,curHeight);
    }
}

function drawbear(){
    fill(255,127,0);
    ellipse(200,200,200,200);
    fill(0,127,127);
    ellipse(200,200,175,175);
    fill(255,127,0);
    ellipse(600,200,200,200);
    fill(0,127,127);
    ellipse(600,200,175,175);
    fill(255,127,0);
    ellipse(400,500,600,600);
    fill(255);
    ellipse(500,350,150,150);
    fill(0);
    ellipse(475,375,75,75);
    fill(255);
    ellipse(300,350,150,150);
    fill(0);
    ellipse(325,375,75,75);
    
    // Mouth 

    fill(0,127,127);
    rect(300,550,200,100);
    fill(255,255,255);
    rect(310,550,30,40);
    fill(255,255,255);
    rect(460,550,30,40);
    fill(255,255,255);
    rect(360,550,30,40);
    fill(255,255,255);
    rect(410,550,30,40);
    fill(255,255,255);
    rect(310,610,30,40);
    fill(255,255,255);
    rect(460,610,30,40);
    fill(255,255,255);
    rect(360,610,30,40);
    fill(255,255,255);
    rect(410,610,30,40);

}