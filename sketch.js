var enemy;
var enemyHead;
var gameState ="start"
function preload(){
  ninjaImage = loadAnimation("png/Run__001.png","png/run__002.png","png/run__003.png","png/run__004.png","png/run__005.png","png/run__006.png","png/run__007.png","png/run__008.png","png/run__009.png")
  bgImage = loadImage("bg.jpg")
  idleAnimation = loadAnimation("png/Idle__000.png","png/Idle__001.png","png/Idle__002.png","png/Idle__003.png")
  enemy = loadAnimation("female/Walk1.png","female/Walk2.png","female/Walk3.png","female/Walk4.png","female/Walk5.png")
  enemyIdle = loadAnimation("female/Idle.png")
}

function setup() {
  createCanvas(800,400);
  bg = createSprite(40, 200, 50, 50);
  bg.addImage(bgImage)
enemyGroup = createGroup()
enemyHeadGrp = createGroup()
  ninja = createSprite(-2000,380)
  ninja.addAnimation("plr_running",ninjaImage)
  ninja.addAnimation("plr_idle",idleAnimation)
  ninja.scale = 0.2
ground=createSprite(0,430,5000,5)



}

function draw() {
  background(0);  
camera.x=ninja.x 
camera.y=ninja.y 
ninja.collide(ground)
// ninja.changeAnimation("plr_idle")
if (gameState=="start") {
if (keyDown("up") && ninja.y >250){
ninja.velocityY=-12
}
if (keyDown("right")){
  ninja.x-=-8
  ninja.changeAnimation("plr_running")
  ninja.mirrorX(1)
  }
ninja.velocityY+=0.8
if (keyDown("left")){
  ninja.x-=8
  ninja.changeAnimation("plr_running")
  ninja.mirrorX(-1)
}

if (keyWentUp("right")){
 ninja.changeAnimation("plr_idle")
}

if (keyWentUp("left")){
  ninja.changeAnimation("plr_idle")
 }
 createEnemy()
//  destroy player


}
  drawSprites();
  if (enemyGroup.isTouching(ninja)){
    ninja.destroy()
    gameState= "over"
    restart=createButton("RESTART")
// restart.position(ninja.x, ninja.y)
restart.style("padding","20px")
 restart.position(camera.x, camera.y)

    // enemyGroup.setVelocityXEach(0)
    // enemyHeadGrp.setVelocityXEach(0)
    // enemyBody.changeAnimation("idle")
    enemyGroup.destroyEach()
  }
  if (enemyHeadGrp.isTouching(ninja)){
    enemyHeadGrp[0].destroy()
   enemyGroup[0].destroy()
  }
}


function createEnemy(){
  if (frameCount%80==0){
    random_no = Math.round(random(0,1))
   
  enemyBody = createSprite(70,380, 60,60)
enemyBody.shapeColor = "red"
enemyHead=createSprite (enemyBody.x+7, enemyBody.y-25, 60,30)
enemyHead.shapeColor="green"
switch(random_no){
  case 0:enemyHead.velocityX = 5
  enemyBody.velocityX = 5
  break;
  case 1:enemyHead.velocityX = -5
  enemyBody.velocityX = -5
  break;
}
enemyBody.addAnimation("enemy",enemy)
enemyBody.addAnimation("idle",enemyIdle)
enemyBody.scale=0.15
// enemyHead.visible = false
enemyBody.debug = false
enemyBody.setCollider("rectangle",10,0,320,300)
enemyGroup.add(enemyBody)
enemyHeadGrp.add(enemyHead)


}
}