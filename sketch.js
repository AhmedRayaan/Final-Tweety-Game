var bg,bgImg;
var player, shooterImg, shooter_shooting;
var tweety,tweetyGroup,tweetyImg;
var heart1,heart2,heart3
var heart1Img,heart2Img,heart3Img;
var bullets=70, bulletImg;
var gameState="fight"

var score= 0 ;
var life=3;

var lose,winning,explosionSound ;

function preload(){
  
  heart1Img=loadImage("assets/heart_1.png")
  heart2Img=loadImage("assets/heart_2.png")
  heart3Img=loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/elmer_fudd.png")
  shooter_shooting = loadImage("assets/elmer_fudd_shooting.png")

  bgImg = loadImage("assets/park.jpg");
  bulletImg= loadImage("assets/bullet.png");
  tweetyImg= loadImage("assets/tweety.png");

  lose=loadSound("assets/lose.mp3");
  winning= loadSound("assets/win.mp3");
  explosionSound= loadSound("assets/explosion.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);

bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1780, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

tweetyGroup=new Group();
bulletGroup= new Group();


heart1=createSprite(displayWidth-500,40,20,20)
heart1.visible=false
heart1.addImage(heart1Img)
heart1.scale=0.4

heart2=createSprite(displayWidth-500,40,20,20)
heart2.visible=false
heart2.addImage(heart2Img)
heart2.scale=0.4

heart3=createSprite(displayWidth-500,40,20,20)
heart3.addImage(heart3Img)
heart3.scale=0.4



}

function draw() {
  background(0); 

if(gameState === "fight"){


if(life==3){
  heart3.visible=true
  heart1.visible=false
  heart2.visible=false
}
if(life===2){
  heart2.visible=true
  heart1.visible=false
  heart3.visible=false
}
if(life===1){
  heart1.visible=true
  heart2.visible=false
  heart3.visible=false
}
if(life===0){
  gameState="lost"
}

if(score==50){
  gameState="won"
  winning.play();
}


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("RIGHT_ARROW")||touches.length>0){
  player.x = player.x+30
}
if(keyDown("LEFT_ARROW")||touches.length>0){
 player.x = player.x-30
}
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
bullet= createSprite(displayWidth-1150,player.y-30,20,10);
 bullet.velocityX=20;
 bullet.addImage(bulletImg);
 bullet.scale=0.1

 bulletGroup.add(bullet)
 player.depth=bullet.depth;
 player.depth=player.depth+2
 player.addImage(shooter_shooting)
 bullets=bullets-1
 explosionSound.play();

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(bullets==0){
  gameState="bullet"
  lose.play();
}

if(tweetyGroup.isTouching(bulletGroup)){

for(var i=0;i<tweetyGroup.length;i++){
  if(tweetyGroup[i].isTouching(bulletGroup)){
    tweetyGroup[i].destroy();
    bulletGroup.destroyEach();
    explosionSound.play();

    score=score+2
    }
  }
}

if(tweetyGroup.isTouching(player)){

  lose.play();

  for(var i=0;i<tweetyGroup.length;i++){
    if(tweetyGroup[i].isTouching(player)){
      tweetyGroup[i].destroy();

      life=life-1
    }
  }

}
}

enemy();

drawSprites();

textSize(32)
fill("brown")
text("bullets = "+bullets,displayWidth-260,displayHeight/2-400);
text("score = " + score,displayWidth-250,displayHeight/2-440);
text("life = "+life,displayWidth-250,displayHeight/2-480);

if(gameState== "lost"){
  textSize(100)
 fill("brown")
 text("Your Pathetic ",400,400)
 tweetyGroup.destroyEach();
 player.destroy();
}

else if(gameState=="won"){
  textSize(100)
 fill("brown")
 text("Your excellent ",400,400)
 tweetyGroup.destroyEach();
 player.destroy();
}

else if(gameState== "bullet"){
  textSize(50)
 fill("brown")
 text("Your bullets are finished !!!",470,410)
 tweetyGroup.destroyEach();
 player.destroy();
 bulletGroup.destroyEach();
}

}

function enemy(){
  if(frameCount%50===0){

   tweety= createSprite(random(1600,1100),random(100,500),40,40)

  
  tweety.addImage(tweetyImg)
  tweety.scale=0.32
  tweety.velocityX=-3
  tweety.debug=false
  tweety.setCollider("rectangle",0,0,300,300)

  tweety.lifetime= 400
  tweetyGroup.add(tweety);

  }

}
