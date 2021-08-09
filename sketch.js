const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var bg,leaf,playb,leaderboard,logo,form;
var leafGroup;
var database;
var gameState = 0;
var score = 0;
var touches = [];

function preload() {
  bg = loadImage("assets/bg.png");
  leaf_img = loadImage("assets/leaf.png");
  leaderboard_img = loadImage("assets/leaderboard.png");
  playb_img = loadImage("assets/playbutton.png");
  logoimg = loadImage("assets/logo.png");
  gameover = loadImage("assets/gameover.png");

  ping =loadSound("assets/ping.mp3")
  bg_music = loadSound("assets/bg.wav")
}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if(isMobile){
   canW = displayWidth; 
   canH = displayHeight;
   createCanvas(displayWidth+80, displayHeight);

 } else {
        canW = windowWidth;
        canH = windowHeight; 
        createCanvas(windowWidth, windowHeight); 
 }
  

  logo = createSprite(canW/2 -50,canH/2,30,30);
  logo.addImage(logoimg);
  logo.scale = 1.5
  
  playb = createSprite(canW/2 -30,canH/2 +200);
  playb.addImage(playb_img);
  playb.scale = 0.4

  leafGroup = new Group();
  
}

function draw() {
  background(bg);

  if (gameState === 0) {


  playb.visible = true;
    logo.visible = true;

   if (mousePressedOver(playb)) {
      //play1();
      gameState = 1;
   }

  } else if (gameState === 1)
  {

    ////bg_music.play();
    bg_music.setVolume(0.5)

    playb.visible = false;
    logo.visible = false;

    if (frameCount % 50 === 0) {
      leaf = createSprite(0,0,50,50);
      leaf.x = Math.round(random(100,canW -10));
      leaf.y = Math.round(random(100,canH -10));
      leaf.addImage(leaf_img);
      leaf.scale = 0.09
      leafGroup.add(leaf);
    }  
    for(var i=0;i<leafGroup.length;i++)
    {
      if (touches.length > 0 || mousePressedOver(leafGroup.get(i))) {
        leafGroup.get(i).destroy();
        score = score +5;
        touches = [];
        ping.play();
        }
    }
      
      textSize(20);
      fill("white");
      text("Score: " + score,50,50);
    
  setTimeout(() => {
    gameState = 3;
  }, 180000);

} else if (gameState === 3) {

  textSize(30);
  fill("white")
  text("Score: " + score,canW/2 -50,canH/2 +100);
  gameOver = createSprite(canW/2,canH/2);
  gameOver.addImage(gameover);
  leafGroup.destroyEach();

}

 

  drawSprites();
}


