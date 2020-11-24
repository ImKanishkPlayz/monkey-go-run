
var monkey , monkey_running
var ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4
  ground.x = ground.width/2;

  score = 0;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
  background("white")
  stroke = ("black");
  textSize(20);
  fill("black");
  text("Score: "+ score, 250,50);
  monkey.collide(ground)
  
  
  if (ground.x < 200){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  if(FoodGroup.isTouching(monkey)){
    score = score + 2
    FoodGroup.destroyEach();
  }
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    stroke = ("black");
    textSize(20);
    fill("black");
    text("GameOver",250,250);
  }
  
  bananas();
  obstacles();
  
  
  
  drawSprites();
}

function bananas(){
   if (frameCount % 200 === 0) {
    var banana = createSprite(600,180,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  
  
}

function obstacles(){
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,330,40,10);
    obstacle.y = Math.round(random(330,330));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
  
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
  }
  
}






