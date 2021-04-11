var spaceship,spaceship1Img,spaceship2Img,spaceship3Img,spaceship4Img,spaceship5Img,spaceship6Img,spaceship7Img,spaceship8Img;
var timeFire=0,angle=0,state=0;
var start,startImg,enemies1Img,enemies2Img,enemies3Img,enemies1G,enemies2G,rayG,score=0,resetImg;
function preload(){
  spaceship1Img=loadImage("spaceship1.png");
  spaceship2Img=loadImage("spaceship2.png");
  spaceship3Img=loadImage("spaceship3.png");
  spaceship4Img=loadImage("spaceship4.png");
  spaceship5Img=loadImage("spaceship5.png");
  spaceship6Img=loadImage("spaceship6.png");
  spaceship7Img=loadImage("spaceship7.png");
  spaceship8Img=loadImage("spaceship8.png");
  startImg=loadImage("play.png");
  enemies1Img=loadImage("enemies1.png");
  enemies2Img=loadImage("enemies2.png");
  enemies3Img=loadImage("enemies3.png");
  resetImg=loadImage("reset.png");
}
function setup() {
  createCanvas(800,400);
   spaceship=createSprite(100, 200, 50, 50);
   spaceship.addImage(spaceship1Img);
   spaceship.scale=0.125;
   start=createSprite(400,200);
   start.addImage(startImg);
   start.scale=0.25;
   enemies1G=new Group();
   rayG=new Group();
   enemies2G=new Group();
   enemies3G=new Group();
   reset=createSprite(400,100);
   reset.scale=0.25;
   reset.addImage(resetImg);
   reset.visible=false;
   
}

function draw() {
  background(0);
  if(mousePressedOver(spaceship)&&state===0){
    var rand=Math.round(random(1,7));
    switch(rand){
      case 1:spaceship.addImage(spaceship1Img);
      break;
      case 2:spaceship.addImage(spaceship2Img);
      break;
      case 3:spaceship.addImage(spaceship3Img);
      break;
      case 4:spaceship.addImage(spaceship4Img);
      break;
      case 5:spaceship.addImage(spaceship5Img);
      break;
      case 6:spaceship.addImage(spaceship6Img);
      break;
      case 7:spaceship.addImage(spaceship7Img);
      break;
      case 8:spaceship.addImage(spaceship8Img);
      default:break;
    }

   }
   if(mousePressedOver(start)&&start.visible===true){
      state=1;
      start.visible=false;
   }
 if(keyDown("right")&&state===1){
   spaceship.rotation+=10;
   angle+=10;
 }
if(keyDown("left")&&state===1){
  spaceship.rotation-=10;
  angle-=10;
}
if(state===1){
spawnEnemies1();
spawnEnemies2();
spawnEnemies3();
}
if(rayG.isTouching(enemies1G)){
  enemies1G.destroyEach();
  score+=1;
  rayG.destroyEach();
}
if(rayG.isTouching(enemies2G)){
  enemies2G.destroyEach();
  rayG.destroyEach();
  score+=1;
}
if(rayG.isTouching(enemies3G)){
  enemies3G.destroyEach();
  rayG.destroyEach();
}
if(enemies1G.isTouching(spaceship)||enemies2G.isTouching(spaceship)||enemies3G.isTouching(spaceship)){
  state=2;
}
if(state===2){
  enemies1G.setVelocityEach(0,0);
  enemies1G.setLifetimeEach(-1);
  enemies2G.setVelocityEach(0,0);
  enemies2G.setLifetimeEach(-1);
  enemies3G.setVelocityEach(0,0);
  enemies3G.setLifetimeEach(-1);
  reset.visible=true;
}
if(reset.visible===true&&mousePressedOver(reset)){
  state=0;
  enemies1G.destroyEach();
  enemies2G.destroyEach();
  enemies3G.destroyEach();
  start.visible=true;
  reset.visible=false;
  spaceship.rotation=0;
  angle=0;
  score=0;
}
 drawSprites();
 fill(255);
 text("Score:"+'\t'+score,720,20);
}
function keyPressed(){
  if(keyCode === 32&&state===1){
    var ray=createSprite(spaceship.x,spaceship.y,4,10);
    ray.setSpeedAndDirection(10,angle+90);
    ray.rotation=angle;
    ray.shapeColor="red";
    rayG.add(ray);
  }
}
function spawnEnemies1(){
  if(World.frameCount%200===0){
    var enemies1=createSprite(800,random(0,400));
    enemies1.velocityX=-6;
    enemies1.lifetime=800/6;
    enemies1.scale=0.5;
    enemies1.addImage(enemies1Img);
    enemies1G.add(enemies1);
  }
}
function spawnEnemies3(){
  if(World.frameCount%130===0){
    var enemies3=createSprite(800,random(0,400));
    enemies3.velocityX=-6;
    enemies3.lifetime=800/6;
    enemies3.scale=0.5;
    enemies3.addImage(enemies3Img);
    enemies3G.add(enemies3);
  }
}
function spawnEnemies2(){
  if(World.frameCount%170===0){
    var enemies2=createSprite(800,random(0,400));
    enemies2.velocityX=-6;
    enemies2.lifetime=800/6;
    enemies2.scale=0.5;
    enemies2.addImage(enemies2Img);
    enemies2G.add(enemies2);
  }
}

