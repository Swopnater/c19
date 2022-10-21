var score= 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameover 
var restart

var man , man_running 
var dog, dog_running  


function preload(){ 
    Park = loadImage("park.jpg") 
    gameover = loadImage("bitten.jpg")
    restart = loadImage("restart.png")

    man_running =   loadAnimation("man-1.png" , "man-2.png" , "man-3.png" , "man-4.png")
    dog_running = loadAnimation("dog-1.png" , "dog-2.png", "dog-3.png", "dog-4.png" , "dog-5.png")

}

function setup() {
    createCanvas(600, 200);
    
    park = createSprite(200,180,400,20);
    park.addImage("park",park);
    park.velocityX = -1
    
    man = createSprite(50,180,20,50);
    man.addAnimation("man", man_running);
    man.addAnimation(man_dead);
    man.scale = 0.5;
    man.velocityX = 0.7
    
    gameOver = createSprite(300,160);
    gameOver.addImage("bitten" , gameover);
    
    restart = createSprite(300,200);
    restart.addImage("restart" ,restart );
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;
  
    gameOver.visible = false;
    restart.visible = false;

    logGroup = new Group();

    score = 0;
}

function draw() {
    background(250);
    text("Score: "+ score, 500,50);
    
      if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/50);
      
        if(keyDown("space")) {
          man.velocityY = 15;
        }
      
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
      
        if(logGroup.isTouching(man)){
            gameState = END;
        }
      }
      else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        
        ground.velocityX = 0;
        trex.velocityY = 0;
        logGroup.setVelocityXEach(0);
        
        loadImage.setLifetimeEach(-1);
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }
      drawSprites();
    }