var CANVAS_HEIGHT = 800;
var CANVAS_WIDTH  = 1600;
let messiImage;
let messiscale = 1;
let ballImage;
let ballscale = 15;
let goalImage;
let goalscale = 1.5;
let grassImage;
let grassscale = 5;
let sunImage;
let sunscale = 3;
let cloudImage;
let cloudscale = [];
let FPS = 60;
let ballX = 0;
let ballY = 0;
let ballXVelocity = 0;
let ballYVelocity = 0;
let ballVelocityScale = 10;
let xVelocityWallHitFactor = .6;
let yVelocityWallHitFactor = .6;
let gravity = .2;
let mouseDragStartX = 0;
let mouseDragStartY = 0;
let mouseIsPreviouslyPressed = false;
let mouseIsDragging = false;
let ballShot = false;
let score = 0;
let goalX = 0;
let goalY = 0;
let grassX = [];
let grassY = [];
let cloudX = [];
let cloudY = [];
let cloudXVelocity = [];
let cloudYVelocity = [];
let numClouds = 3;

function setup(){
    //CANVAS_HEIGHT = windowHeight;
    //CANVAS_WIDTH = windowWidth;
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
    frameRate(60);
    textSize(70);
    setUpGrass();
    setUpClouds();
    ballX = (messiImage.width*3/4)/messiscale;
    ballY = CANVAS_HEIGHT-ballImage.height/ballscale;
    goalX = CANVAS_WIDTH-goalImage.width/goalscale;
    goalY = CANVAS_HEIGHT-goalImage.height/goalscale;
}

function draw(){
    background(94,170,254);
    drawAllGrass();
    image(sunImage, 100, 100, sunImage.width/sunscale, sunImage.height/sunscale);
    image(goalImage, goalX, goalY, goalImage.width/goalscale, goalImage.height/goalscale);
    image(messiImage, 0, CANVAS_HEIGHT-messiImage.height, messiImage.width/messiscale, messiImage.height/messiscale);
    drawClouds();
    drawBall();
    drawScore();
    handleBallDragAndShoot();
    handleCloudsMotion();
    handleBallMotion();
    handleBallBoundaries();
    handleBallScoring();
    mouseIsPreviouslyPressed = mouseIsPressed;
}

function preload(){
    messiImage = loadImage("images/messi.png");
    ballImage = loadImage("images/soccerball.png");
    goalImage = loadImage("images/goal2.png");
    grassImage = loadImage("images/grass.png");
    sunImage = loadImage("images/sun.png");
    cloudImage = loadImage("images/cloud.png");

}

function setUpGrass(){
    var numHorizontalGrass = 50;
    var numVerticalGrass = 20;
    for(var i = 0; i < numHorizontalGrass; i++){
        for(var j = 0; j < numVerticalGrass; j++){
            grassX.push(i*CANVAS_WIDTH/numHorizontalGrass-grassImage.width/grassscale/2+10*Math.random());
            grassY.push(CANVAS_HEIGHT-(grassImage.height/grassscale/2)*j+10*Math.random());
        }
    }
    
}

function drawAllGrass(){
    for(var i = 0; i < grassX.length; i++){
        drawGrass(grassX[i],grassY[i]);
    }
}

function drawGrass(x, y){
    image(grassImage, x, y, grassImage.width/grassscale, grassImage.height/grassscale);
}

function setUpClouds(){
    for(var i = 0; i < numClouds; i++){
        cloudX.push(CANVAS_WIDTH*Math.random());
        cloudY.push(CANVAS_HEIGHT/4*Math.random());
        cloudXVelocity.push(0.5+Math.random());
        cloudYVelocity.push(0.0);
        cloudscale.push(1+Math.random());
    }
    console.log(cloudXVelocity);
    console.log(cloudYVelocity);
}

function drawClouds(){
    
    console.log(cloudX);
    console.log(cloudY);
    for(var i = 0; i < numClouds; i++){
        image(cloudImage, cloudX[i], cloudY[i], cloudImage.width/cloudscale[i], cloudImage.height/cloudscale[i]);
    }
}

function drawBall(){
    image(ballImage, ballX, ballY, ballImage.width/ballscale, ballImage.height/ballscale);
}

function drawScore(){
    fill(127);
    text('Score: '+score, CANVAS_WIDTH-400, 150);
}

function isMouseOnBall(){
    let ballCenterX = ballX+ballImage.width/ballscale/2;
    let ballCenterY = ballY+ballImage.height/ballscale/2;
    let relativeMouseX = mouseX - ballCenterX;
    let relativeMouseY = mouseY - ballCenterY;
    let distanceFromCenter = Math.sqrt(relativeMouseX*relativeMouseX+relativeMouseY*relativeMouseY);
    return distanceFromCenter<(ballImage.width+ballImage.height)/ballscale/4;
}

function handleBallDragAndShoot(){
    if(mouseIsPressed && !mouseIsPreviouslyPressed && isMouseOnBall()){
        mouseIsDragging = true;
        mouseDragStartX = mouseX;
        mouseDragStartY = mouseY;
    }
    if(!mouseIsPressed && mouseIsDragging){
        mouseIsDragging = false;
        ballShot = true;
        ballXVelocity = (mouseDragStartX - mouseX)/ballVelocityScale;
        ballYVelocity = (mouseDragStartY - mouseY)/ballVelocityScale;
    }
}

function handleBallMotion(){
    if(ballShot){
        ballX += ballXVelocity;
        ballY += ballYVelocity;
        ballYVelocity += gravity;
    }
}

function handleCloudsMotion(){
    for(var i = 0; i < numClouds; i++){
        cloudX[i] += cloudXVelocity[i];
        cloudY[i] += cloudYVelocity[i];
        if(cloudX[i] > CANVAS_WIDTH){
            cloudX[i] = 0;
        }
    }
    
}

function handleBallBoundaries(){
    if(ballX > CANVAS_WIDTH-ballImage.width/ballscale){
        ballX = CANVAS_WIDTH-ballImage.width/ballscale - 1;
        ballXVelocity = ballXVelocity * -xVelocityWallHitFactor;
    }
    if(ballX < 0){
        ballX = 1;
        ballXVelocity = ballXVelocity * -xVelocityWallHitFactor;
    }
    if(ballY > CANVAS_HEIGHT-ballImage.height/ballscale){
        ballY = CANVAS_HEIGHT-ballImage.height/ballscale - 1;
        ballYVelocity = ballYVelocity * -yVelocityWallHitFactor;
    }
    if(ballY < 0){
        //ballY = 1;
        //ballYVelocity = ballYVelocity * -yVelocityWallHitFactor;
    }
}

function handleBallScoring(){
    if(isCollision(ballX,ballImage.width/ballscale,ballY,ballImage.height/ballscale,goalX+100,goalImage.width/goalscale,goalY+100,goalImage.height/goalscale-200) && (ballXVelocity>0)){
        score++;
        ballX = (messiImage.width*3/4)/messiscale;
        ballY = CANVAS_HEIGHT-ballImage.height/ballscale;
        ballShot = false;
    }
}

function isCollision(x1,width1,y1,height1,x2,width2,y2,height2){
    return x1 < (x2+width2) && (x1+width1) > x2 &&
           y1 < (y2+height2) && (y1+height1) > y2;
}