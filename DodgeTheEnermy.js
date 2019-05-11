'use strict';
//Define Objects and Set Parameter
let timeRecord = 0;
let score = 0;
const fps = 60;
const playerSpeed = 6;
const playerMaxSpeed = 100;
const playerBreakRate = 0.9;
const enermyMainSpeed = 3;
const enermyMainMaxSpeed = 120;
const updateCoordBoost = 1.0;
let KeyPressMemory = [false /*Up*/, false /*Down*/, false /*Left*/, false /*Right*/, false /*A*/, false /*Space*/];
//Define GameArea
let gameArea = {
    canvas : document.getElementById("gameAreaCanvas"),
    start : function() {
        this.canvas.width = screen.width *0.5;
        this.canvas.height = screen.width * 0.3;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        window.addEventListener("keydown",function (event){
            gamePlayerController.keyDownEvent(event);
        });
        window.addEventListener("keyup",function (event){
            gamePlayerController.keyUpEvent(event);
        });
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);                        
    }
}
//Define GamePlayer
let gamePlayer = {
    width: 0,
    height: 0,
    color: "green", 
    x: 0,
    y: 0,
    xSpeed: 0,
    ySpeed: 0,
    initialize : function(){
        this.width = 20;
        this.height = 20;
        this.color = "green";
        this.x = 30;
        this.y = gameArea.canvas.height/2;
        this.xSpeed =  0;
        this.ySpeed = 0;
    },
    update : function(){
        let ctx = gameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}
let gamePlayerController = {
    keyDownEvent : function(event) {
        let pressed = event.keyCode;
        //Detect KeyPress: Movement
        if (pressed == 38 /*Up*/) {
            KeyPressMemory[0] = true;
        }
        if (pressed == 40 /*Down*/) {
            KeyPressMemory[1] = true;
        }
        if (pressed == 37 /*Left*/) {
            KeyPressMemory[2] = true;
        }
        if (pressed == 39 /*Right*/) {
            KeyPressMemory[3] = true;
        }
        //Detect KeyPress: Action
        if (pressed == 65 /*A*/) {
            KeyPressMemory[4] = true;                
        }
        if (pressed == 32 /*Space*/) {
            KeyPressMemory[5] = true;                    
        }
        //KeyPress Event: Movement
        if (KeyPressMemory[0] == true /*Up*/) {
            gamePlayer.ySpeed -= playerSpeed/fps;
        }
        if (KeyPressMemory[1] == true /*Down*/) {
            gamePlayer.ySpeed += playerSpeed/fps;
        }
        if (KeyPressMemory[2] == true /*Left*/) {
            gamePlayer.xSpeed -= playerSpeed/fps;
        }
        if (KeyPressMemory[3] == true/*Right*/) {
            gamePlayer.xSpeed += playerSpeed/fps;
        }
        //KeyPress Event: Action, one Action each time
        if (KeyPressMemory[4] == true /*A*/) {
            gamePlayer.xSpeed = gamePlayer.xSpeed * playerBreakRate;            
            gamePlayer.ySpeed = gamePlayer.ySpeed * playerBreakRate;
            KeyPressMemory[0] = false;
            KeyPressMemory[1] = false;
            KeyPressMemory[2] = false;
            KeyPressMemory[3] = false;
            gamePlayer.color = "black";              
        }
        else if (KeyPressMemory[5] == true /*Space*/) {
            gamePlayer.color = "red";
        }
    },
    keyUpEvent : function(event) {
        let pressed = event.keyCode;
        //Detect KeyUp: Movement
        if (pressed == 38 /*Up*/) {
            KeyPressMemory[0] = false;
        }
        if (pressed == 40 /*Down*/) {
            KeyPressMemory[1] = false;
        }
        if (pressed == 37 /*Left*/) {
            KeyPressMemory[2] = false;
        }
        if (pressed == 39 /*Right*/) {
            KeyPressMemory[3] = false;
        }
        //Detect KeyUp: Action
        if (pressed == 65 /*A*/) {
            KeyPressMemory[4] = false;
            gamePlayer.color = "green";                
        } 
        if (pressed == 32 /*Space*/) {
            KeyPressMemory[5] = false;                            
            gamePlayer.color = "green";                    
        }
    },
    updateMove : function() {
        if (gamePlayer.x < 10) {gamePlayer.x = 10};                        
        if (gamePlayer.x > gameArea.canvas.width - gamePlayer.width - 10) {gamePlayer.x = gameArea.canvas.width - gamePlayer.width - 10};
        if (gamePlayer.y < 10) {gamePlayer.y = 10};
        if (gamePlayer.y > gameArea.canvas.height - gamePlayer.height - 10) {gamePlayer.y = gameArea.canvas.height - gamePlayer.height - 10};
        if (gamePlayer.xSpeed > playerMaxSpeed/fps) {gamePlayer.xSpeed = playerMaxSpeed/fps};
        if (gamePlayer.xSpeed < -playerMaxSpeed/fps) {gamePlayer.xSpeed = -playerMaxSpeed/fps};                        
        if (gamePlayer.ySpeed > playerMaxSpeed/fps) {gamePlayer.ySpeed = playerMaxSpeed/fps};
        if (gamePlayer.ySpeed < -playerMaxSpeed/fps) {gamePlayer.ySpeed = -playerMaxSpeed/fps};
        gamePlayer.x += gamePlayer.xSpeed;
        gamePlayer.y += gamePlayer.ySpeed;
        },
    updateAction : function() {
    }
}
//Define GameEnermy
let gameEnermyPrototype = {
    width: 0,
    height: 0,
    color: "blue",
    x: 0,
    y: 0,
    xSpeed : 0,
    ySpeed : 0,
    initialize : function (){
        this.width = 15;
        this.height = 15;
        this.color = "blue";
        this.x = gameArea.canvas.width - 50;
        this.y = gameArea.canvas.height/2;
        this.xSpeed = 0;
        this.ySpeed = 0;
    },
    update : function(){
        let ctx = gameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}
let gameEnermyMain = Object.create(gameEnermyPrototype);
let gameEnermyMainController = {
    updateMove : function(){
        if (gameEnermyMain.x < 5) {gameEnermyMain.x = 5};                        
        if (gameEnermyMain.x > gameArea.canvas.width - gameEnermyMain.width - 5) {gameEnermyMain.x = gameArea.canvas.width - gameEnermyMain.width - 5};
        if (gameEnermyMain.y < 5) {gameEnermyMain.y = 5};
        if (gameEnermyMain.y > gameArea.canvas.height - gameEnermyMain.height - 5) {gameEnermyMain.y = gameArea.canvas.height - gameEnermyMain.height - 5};
        if (gameEnermyMain.x > gamePlayer.x) {gameEnermyMain.xSpeed -= enermyMainSpeed/fps;}
        else {gameEnermyMain.xSpeed += enermyMainSpeed/fps;}
        if (gameEnermyMain.y > gamePlayer.y ) {gameEnermyMain.ySpeed -= enermyMainSpeed/fps;}
        else {gameEnermyMain.ySpeed += enermyMainSpeed/fps;}
        if (gameEnermyMain.xSpeed > enermyMainMaxSpeed/fps) {gameEnermyMain.xSpeed = enermyMainMaxSpeed/fps};
        if (gameEnermyMain.xSpeed < -enermyMainMaxSpeed/fps) {gameEnermyMain.xSpeed = -enermyMainMaxSpeed/fps};
        if (gameEnermyMain.ySpeed > enermyMainMaxSpeed/fps) {gameEnermyMain.ySpeed = enermyMainMaxSpeed/fps};
        if (gameEnermyMain.ySpeed < -enermyMainMaxSpeed/fps) {gameEnermyMain.ySpeed = -enermyMainMaxSpeed/fps};
        gameEnermyMain.x += gameEnermyMain.xSpeed * (1 + timeRecord/60000);
        gameEnermyMain.y += gameEnermyMain.ySpeed * (1 + timeRecord/60000);
    }
}
//Initialize Game Area and Player
function startGame() {
    timeRecord = 0;
    score = 0;
    for (let i = 0; i<6; i++) {
        KeyPressMemory[i] = false;
    }
    gameArea.start();
    gamePlayer.initialize();
    gamePlayer.update();
    gameEnermyMain.initialize();
    gameEnermyMain.update();
}                
//Update Frame by Redraw Canvas
setInterval(updateFrame, 1000/fps);
setInterval(updateScore,1000);
setInterval(updateCoord, 1000/updateCoordBoost/fps);
setInterval(reportGamePlayerParameter, 10000/fps);
function updateFrame() {
    timeRecord += 1000/fps;
    gameArea.clear();
    gamePlayer.update();
    gameEnermyMain.update();
    if ((Math.abs(gamePlayer.x - gameEnermyMain.x) < (gamePlayer.width + gameEnermyMain.width)/2) && (Math.abs(gamePlayer.y - gameEnermyMain.y) < (gamePlayer.height + gameEnermyMain.height)/2)) {alert("End. Press Enter to Restart");startGame();}
    //if (Math.abs(gamePlayer.y - gameEnermyMain.y) < (gamePlayer.height + gameEnermyMain.height)/2) {alert("Loss, Press Enter to Restart");startGame();}
}
function updateScore(){
    score += 1;
    document.getElementById("scoreText").innerHTML = score + "s";
}
function updateCoord() {
    gamePlayerController.updateMove();
    if (timeRecord>1000) {gameEnermyMainController.updateMove()};
}
function reportGamePlayerParameter (){
    //Log Player
    //console.log("x = " + Math.round(gamePlayer.x*100)/100 +"; y = " + Math.round(gamePlayer.y*100)/100 + "; xSpeed = " + Math.round(gamePlayer.xSpeed*100)/100  +"; ySpeed = " + Math.round(gamePlayer.ySpeed*100)/100 );
    //Loh EnermyMain
    //console.log("EMx = " + Math.round(gameEnermyMain.x*100)/100 +"; EMy = " + Math.round(gameEnermyMain.y*100)/100 + "; EMxSpeed = " + Math.round(gameEnermyMain.xSpeed*100)/100  +"; EMySpeed = " + Math.round(gameEnermyMain.ySpeed*100)/100 );
    //Log KeyPress
    //console.log("Up = " + KeyPressMemory[0] + "; down = " + KeyPressMemory[1] + "; Left = " + KeyPressMemory[2]  + "; Right = " + KeyPressMemory[3] +"; Ctrl = " + KeyPressMemory[4]);
}
