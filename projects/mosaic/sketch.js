var CANVAS_HEIGHT = 800;
var CANVAS_WIDTH  = 1600;
let FPS = 30;
let objects = [];
let isMousePreviouslyPressed = false;
let objectWidth = 25;
let objectHeight = 25;
let init = false;

function setup(){
    CANVAS_HEIGHT = windowHeight;
    CANVAS_WIDTH  = windowWidth-180;
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);
    frameRate(FPS);
    noStroke();
    setupObjects();
    setupColors();
    init = true;
}

function setupObjects(){
    for(let i = 0; i < CANVAS_WIDTH/objectWidth; i++){
        let row = []
        for(let j = 0; j < CANVAS_HEIGHT/objectHeight; j++){
            let newObject = new PhysicsObject(objectWidth*i,objectHeight*j,0,0,0,0,objectWidth,objectHeight);
            newObject.isColorSet == false;
            newObject.topColor = [127];
            newObject.bottomColor = [127];
            row.push(newObject);
        }
        objects.push(row);
    }

}

function setupColors(){
    for(let i = 0; i < objects.length; i++){
        let row = []
        for(let j = 0; j < objects[0].length; j++){
            setColors(i,j);
        }
    }
}

function setColors(i,j){
    let currentObject = objects[i][j];
    let currentColor;
    if(!currentObject.isColorSetTop){
        currentColor = getNewColor();
        currentObject.topColor = currentColor;
        currentObject.isColorSetTop = true;
        setBottomColors(i,j-1,currentColor);
        if(currentObject.direction){
            setRightColors(i-1,j,currentColor);
        }
        else{
            setLeftColors(i+1,j,currentColor);
        }
    }
    if(!currentObject.isColorSetBottom){
        currentColor = getNewColor();
        currentObject.bottomColor = currentColor;
        currentObject.isColorSetBottom = true;
        setTopColors(i,j+1,currentColor);
        if(!currentObject.direction){
            setRightColors(i-1,j,currentColor);
        }
        else{
            setLeftColors(i+1,j,currentColor);
        }
    }        
}

function setTopColors(i, j, currentColor){
    if(i < 0 || i >= objects.length || j < 0 || j >= objects[0].length){
        return;
    }
    let currentObject = objects[i][j];
    if(currentObject.isColorSetTop){
        return;
    }
    currentObject.topColor = currentColor;
    currentObject.isColorSetTop = true;
    if(currentObject.direction){
        setRightColors(i-1,j,currentColor);
    }
    else{
        setLeftColors(i+1,j,currentColor);
    }
}

function setBottomColors(i, j, currentColor){
    if(i < 0 || i >= objects.length || j < 0 || j >= objects[0].length){
        return;
    }
    let currentObject = objects[i][j];
    if(currentObject.isColorSetBottom){
        return;
    }
    currentObject.bottomColor = currentColor;
    currentObject.isColorSetBottom = true;
    if(!currentObject.direction){
        setRightColors(i-1,j,currentColor);
    }
    else{
        setLeftColors(i+1,j,currentColor);
    }
}

function setLeftColors(i, j, currentColor){
    if(i < 0 || i >= objects.length || j < 0 || j >= objects[0].length){
        return;
    }
    let currentObject = objects[i][j];
    if(!currentObject.direction){ //Bottom
        if(currentObject.isColorSetBottom){
            return;
        }
        currentObject.bottomColor = currentColor;
        currentObject.isColorSetBottom = true;
        setTopColors(i,j+1,currentColor);
    }
    else{
        if(currentObject.isColorSetTop){
            return;
        }
        currentObject.topColor = currentColor;
        currentObject.isColorSetTop = true;
        setBottomColors(i,j-1,currentColor);
    }
}

function setRightColors(i, j, currentColor){
    if(i < 0 || i >= objects.length || j < 0 || j >= objects[0].length){
        return;
    }
    let currentObject = objects[i][j];
    if(currentObject.direction){ //Bottom
        if(currentObject.isColorSetBottom){
            return;
        }
        currentObject.bottomColor = currentColor;
        currentObject.isColorSetBottom = true;
        setTopColors(i,j+1,currentColor);
    }
    else{
        if(currentObject.isColorSetTop){
            return;
        }
        currentObject.topColor = currentColor;
        currentObject.isColorSetTop = true;
        setBottomColors(i,j-1,currentColor);
    }
}

function getNewColor(){
    return [Math.random()*255,Math.random()*255,Math.random()*255]
}

function draw(){
    background(94,170,254);
    drawObjects();
    handleMouseClick();
    isMousePreviouslyPressed = mouseIsPressed;
}

function drawObjects(){
    objects.map(row => {
        row.map(object => {
            object.draw();
            object.isColorSetBottom = false;
            object.isColorSetTop = false;
        })
    });
}

function handleMouseClick(){
    if(!isMousePreviouslyPressed && mouseIsPressed){
        let i = Math.floor(mouseX/objectWidth)
        let j = Math.floor(mouseY/objectHeight)
        if(i < objects.length && j < objects[0].length){
            objects[i][j].onClick();
            setColors(i,j)
        }
    }
}

function isCollision(x1,width1,y1,height1,x2,width2,y2,height2){
    return x1 < (x2+width2) && (x1+width1) > x2 &&
           y1 < (y2+height2) && (y1+height1) > y2;
}

class PhysicsObject{

    constructor(initXPosition,initYPosition,initXVelocity,initYVelocity,initXAcceleration,initYAcceleration,initWidth,initHeight){
        this.xPosition = initXPosition;
        this.yPosition = initYPosition;
        this.xVelocity = initXVelocity;
        this.yVelocity = initYVelocity;
        this.xAcceleration = initXAcceleration;
        this.yAcceleration = initYAcceleration;
        this.width = initWidth;
        this.height = initHeight
        this.direction = Math.random()<.5; // True means diagonal goes bottom left to top right
        this.topColor = [100,100,100]
        this.bottomColor = [125,125,125]
    }

    move(){
        this.xVelocity += this.xAcceleration;
        this.xPosition += this.xVelocity;
        this.yVelocity += this.yAcceleration;
        this.yPosition += this.yVelocity;
        if(this.xPosition > CANVAS_WIDTH-ballImage.width/ballImageScale){
            this.xPosition = CANVAS_WIDTH-ballImage.width/ballImageScale;
            this.xVelocity *= -0.6;
        }
        if(this.xPosition < 0){
            this.xPosition = 0;
            this.xVelocity *= -0.6;
        }
        if(this.yPosition > CANVAS_HEIGHT-ballImage.height/ballImageScale){
            this.yPosition = CANVAS_HEIGHT-ballImage.height/ballImageScale;
            this.yVelocity *= -0.6;
        }
        if(this.yPosition < 0){
            this.yPosition = 0;
            this.yVelocity *= -0.6;
        }
    }

    draw(){
        //image(ballImage,this.xPosition,this.yPosition,ballImage.width/ballImageScale,ballImage.height/ballImageScale);
        let middleColor = [100,200,200]
        fill(middleColor);
        rect(this.xPosition,this.yPosition,this.width,this.height);
        let scale = .8;
        if(this.direction){ // bottom left to top right
            fill(this.topColor);
            triangle(this.xPosition,this.yPosition,this.xPosition,this.yPosition+this.height*scale, this.xPosition+this.width*scale,this.yPosition);
            fill(this.bottomColor);
            triangle(this.xPosition+this.width,this.yPosition+this.height,this.xPosition+this.width,this.yPosition+this.height*(1-scale), this.xPosition+this.width*(1-scale),this.yPosition+this.height);
            // little triangles
            fill(middleColor);
            triangle(this.xPosition,this.yPosition,this.xPosition,this.yPosition+this.height*(1-scale), this.xPosition+this.width*(1-scale),this.yPosition);
            triangle(this.xPosition+this.width,this.yPosition+this.height,this.xPosition+this.width,this.yPosition+this.height*(scale), this.xPosition+this.width*(scale),this.yPosition+this.height);
        }
        else{ // top left to bottom right
            fill(this.topColor);
            triangle(this.xPosition+this.width*(1-scale),this.yPosition,this.xPosition+this.width,this.yPosition, this.xPosition+this.width,this.yPosition+this.height*scale);
            fill(this.bottomColor);
            triangle(this.xPosition,this.yPosition+this.width*(1-scale),this.xPosition,this.yPosition+this.width, this.xPosition+this.width*scale,this.yPosition+this.height);
            // little triangles
            fill(middleColor);
            triangle(this.xPosition+this.width*(scale),this.yPosition,this.xPosition+this.width,this.yPosition, this.xPosition+this.width,this.yPosition+this.height*(1-scale));
            triangle(this.xPosition,this.yPosition+this.width*(scale),this.xPosition,this.yPosition+this.width, this.xPosition+this.width*(1-scale),this.yPosition+this.height);
        }
    }

    onClick(){
        this.direction = !this.direction;
    }
}
