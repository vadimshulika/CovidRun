var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var boy = new Image();
var boyRun1 = new Image();
var boyRun2 = new Image();
var boyRun3 = new Image();
var boyRun4 = new Image();
var boyRun5 = new Image();
var boyRun6 = new Image();
var boyJump1 = new Image();
var boyJump2 = new Image();
var lose = new Image();
var bg = new Image();
var fg = new Image();
var pipe = new Image();

var jumpSound = new Audio();
var coughSound = new Audio();

boy.src = "img/boy.png";
boyRun1.src = "img/boyRun1.png";
boyRun2.src = "img/boyRun2.png";
boyRun3.src = "img/boyRun3.png";
boyRun4.src = "img/boyRun4.png";
boyRun5.src = "img/boyRun5.png";
boyRun6.src = "img/boyRun6.png";
boyJump1.src = "img/boyJump1.png";
boyJump2.src = "img/boyJump2.png";
lose.src = "img/lose.png";
bg.src = "img/bg.png";
fg.src = "img/boy.png";
pipe.src = "img/pipes.png";

jumpSound.src = "sounds/jump.mp3";
coughSound.src = "sounds/cough.mp3";

//setup
var play = false;
var score = 0;
var earth = true;
var pipes = [];
var animatePers = 1;
pipes[0] = {
  x: cvs.width,
  y: 450
};

//позиция
var xpos = 50;
var ypos = 400;
var xposjump = 1;
var speedjump = 4;
var run = 5;
var distance = 10
var fly = false;

function playGame() {
  if (play == false){
    play = true;
    draw();
    console.log("game active");
  }
  
}

//управление
function control() {
  if (earth) {
    jump();
  }
}

function jump() {
  ypos -= Math.log2(xposjump); //200px
  fly = true;
  earth = false;
  jumpSound.play();
}

var pol = 0;

function staticDraw(){
  if(play == false){
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(boy, xpos, ypos);
  }
}

function draw() {
  //backgrjund and boy
  ctx.drawImage(bg, 0, 0);
  //ctx.drawImage(boy, xpos, ypos);

  for (var i = 0; i < pipes.length; i++) {
    ctx.drawImage(pipe, pipes[i].x, pipes[i].y);

    pipes[i].x = pipes[i].x - run;
    if (pipes[i].x == distance) {
      
      pipes.push({
        x: Math.floor(Math.random() % 700 + 1000),
        y: 450
      });
    }

    // xpos + cat.width == pipes[i].x + 100 && ypos >= pipes[i].y - 100
    // v2: "(xpos + 150 == pipes[i].x + 5 && ypos >= pipes[i].y) || (xpos == pipes[i].x + 5 && ypos  >= pipes[i].y)"
    // fv: "(((xpos + 150 >= pipes[i].x + 20 && xpos <= pipes[i].x + 75 ) && ypos + 50 >= pipes[i].y - 5) || ((xpos + 60 == pipes[i].x + 20 && xpos <= pipes[i].x + 75) && ypos + 50  >= pipes[i].y - 5))"
    if (((xpos + 110 >= pipes[i].x + 20 && xpos + 110 <= pipes[i].x + 200 ) && ypos + 150 >= pipes[i].y - 5) || ((xpos == pipes[i].x + 20 && xpos <= pipes[i].x + 200) && ypos + 150  >= pipes[i].y - 5)) {
      ctx.drawImage(lose, xpos - 10, ypos - 15);
      coughSound.play();
      play = false;
      setTimeout(function(){
        alert("Вы проиграли! Ваш результат: " + score);
        location.reload();
      }, 500);
    }

    if (pipes[i].x == 5) {
      score++;
    }
  }

  if (animatePers < 10 && play && earth){
    ctx.drawImage(boyRun1, xpos, ypos);
  }
  if (animatePers >= 10 && animatePers < 19 && play && earth){
    ctx.drawImage(boyRun2, xpos, ypos);
  }
  if (animatePers >= 19 && animatePers < 28 && play && earth){
    ctx.drawImage(boyRun3, xpos, ypos);
  }
  if (animatePers >= 28 && animatePers < 37 && play && earth){
    ctx.drawImage(boyRun4, xpos, ypos);
  }
  if (animatePers >= 37 && animatePers < 46 && play && earth){
    ctx.drawImage(boyRun5, xpos, ypos);
  }
  if (animatePers >= 46 && animatePers < 55 && play && earth){
    ctx.drawImage(boyRun6, xpos, ypos);
  }

  // physics
  if (fly) {
    if(play){
      ctx.drawImage(boyJump1, xpos, ypos);
    }
    xposjump = xposjump + speedjump;
    jump();
  }
  if (ypos <= 140) {
    fly = false;
  }
  if (ypos >= 400) {
    fly = false;
    earth = true;
    ypos = 400;
  }
  if (ypos != 400 && fly == false && xposjump != 1) {
    xposjump = xposjump - speedjump;
    if (play){
      ctx.drawImage(boyJump2, xpos, ypos);
    }
    ypos += Math.log2(xposjump);
    if (xposjump == 1) {
      ypos = 400;
    }
  }

  ctx.fillStyle = "#FF0800";
  ctx.font = "48px Verdana";
  ctx.fillText("Счет: " + score, 700, 50);

  if (earth) {
    document.addEventListener("keydown", function (e) {
      console.log(e.code == 'KeyW');
      if (e.code == 'KeyW' && earth) {
        control();
      }
    });

  }
  if (play) {
    if (earth){
      animatePers = animatePers + 1;
    }
    if (animatePers > 54) {
      animatePers = 1;
    }
    requestAnimationFrame(draw);
  }
}

bg.onload = staticDraw;
