// image variables
var imageArray;
var backImage, okImage, spaghetImage, knucklesImage, wizardImage, footFungusImage, lossImage;
var transitionImage1, transitionImage2, transitionImage3;

// animation variables
var okAnimation, spaghetAnimation, knucklesAnimation, wizardAnimation, footFungusAnimation,
lossAnimation;

// sprite variables
var spriteArray;
var okSprite1, okSprite2;
var spaghetSprite1, spaghetSprite2;
var knucklesSprite1, knucklesSprite2;
var wizardSprite1, wizardSprite2;
var footFungusSprite1, footFungusSprite2;
var lossFungusSprite1, lossFungusSprite2;
var spriteWidth, spriteHeight;
var spriteX, spriteY;

// sound variables
var flipSound, matchSound, nopeSound, winSound, loseSound, bgMusic;

// game variables
var firstChoice, secondChoice;
var lives, matches;
var spritesActive;

// UI variables
var gameScreen;
var messageDisplay, livesDisplay;
var resetButton, musicButton;


 function loadImages() {
   backImage = loadImage("assets/img/back.png");
   okImage = loadImage("assets/img/ok.png");
   spaghetImage = loadImage("assets/img/spaghet.png");
   knucklesImage = loadImage("assets/img/knuckles.png");
   wizardImage = loadImage("assets/img/wizard.png");
   footFungusImage = loadImage("assets/img/footFungus.png");
   lossImage = loadImage("assets/img/loss.png");
   transitionImage1 = loadImage("assets/img/transition1.png");
   transitionImage2 = loadImage("assets/img/transition2.png");
   transitionImage3 = loadImage("assets/img/transition3.png");
 }



function loadAnimations() {
  okAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, okImage);
  spaghetAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, spaghetImage);
  knucklesAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, knucklesImage);
  wizardAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, wizardImage);
  footFungusAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, footFungusImage);
  lossAnimation = loadAnimation(backImage, transitionImage1, transitionImage2, transitionImage3, lossImage);
}

/*
 * function loadSounds()
 * Works very similarly to loadImages(), only for music and sound effects.
 * Example:
   function loadSounds() {
     soundFormats("mp3", "wav");
     mySound = loadSound("assets/sound/sound.wav");
     myOtherSound = loadSound("assets/sound/otherSound.mp3");
   }
 */



function preload() {
  loadImages();
  loadAnimations();
}


function setup() {
  gameScreen = createCanvas(790, 370);
  gameScreen.parent("#game-screen");
  messageDisplay = select("#message-display");
  livesDisplay = select("#lives-display");
  spriteWidth = 120;
  spriteHeight = 168;
  init();
  imageArray = [backImage, okImage, spaghetImage, knucklesImage, wizardImage,
               footFungusImage, lossImage, transitionImage1, transitionImage2,
               transitionImage3];
  resizeImages();
  createSprites();
  spriteArray = [okSprite1, okSprite2, spaghetSprite1, spaghetSprite2,
                 knucklesSprite1, knucklesSprite2, wizardSprite1, wizardSprite2,
                 footFungusSprite1, footFungusSprite2, lossSprite1, lossSprite2];
  addAnimations();
  shuffle(spriteArray, true);
//  console.log("Am i getting here");
  placeSprites();
  spritesActive = true;

}

function draw(){
  background(20,40,60);
  drawSprites();

}

/*
 * function init()
 * Initializes various elements of the game. Called in both setup() and
 * resetGame(). Helps reduce some of the bloat and redundancy in both of those
 * functions (DRY principle = "don't repeat yourself")
 */
function init(){
  messageDisplay.html("lives:");
  lives = 5;
  livesDisplay.html(lives);
  matches = 0;
  firstChoice = undefined;
  secondChoice = undefined;
  spriteX = 70;
  spriteY = 95;
}

/*
 * function resetGame()
 * Resets the game by calling init(), resetAllSprites(), then after a 1000
 * millisecond delay, calls shuffle(spriteArray, true), placeSprites(), and
 * sets spritesActive to true.
 */
function resetGame(){
  init();
  resetAllSprites();
  setTimeout(function(){
    shuffle(spriteArray,true);
    placeSprites();
    spritesActive = true;
  }, 1000);
}


function resizeImages() {
  for(var i = 0; i < imageArray.length; i++) {
    imageArray[i].resize(spriteWidth, spriteHeight);
  }
}


 function createSprites() {
   okSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
   okSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
   spaghetSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
   spaghetSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
   knucklesSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
   knucklesSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
   wizardSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
   wizardSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
   footFungusSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
   footFungusSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
   lossSprite1 = createSprite(0, 0, spriteWidth, spriteHeight);
   lossSprite2 = createSprite(0, 0, spriteWidth, spriteHeight);
 }



 function addAnimations() {
   console.log("Did I even reach this part? Add aminations?");
   var animations = [okAnimation, okAnimation, spaghetAnimation, spaghetAnimation,
                    knucklesAnimation, knucklesAnimation, wizardAnimation, wizardAnimation,
                    footFungusAnimation, footFungusAnimation,
                    lossAnimation, lossAnimation];
   for(var i = 0; i < spriteArray.length; i++) {
     spriteArray[i].addAnimation("flip", animations[i]);
     spriteArray[i].animation.frameDelay = 10;
     spriteArray[i].animation.looping = false;
     spriteArray[i].animation.playing = false;
     activateSprite(spriteArray[i]);
   }
 }


 function placeSprites() {
   for(var i = 0; i < spriteArray.length; i++) {
     spriteArray[i].position.x = spriteX;
     spriteArray[i].position.y = spriteY;
     if((i + 1) % 6 === 0) { // if the number of sprites is divisible by 6
       spriteX = 70;
       spriteY += spriteHeight + 10;
     }
     else {
       spriteX += spriteWidth + 10;
     }
   }
 }


 function activateSprite(s) {
   s.onMousePressed = function() {
     console.log("Hello There!");
     if(spritesActive && s.animation.getFrame() !== s.animation.getLastFrame()) {
       if(firstChoice === undefined) {
         firstChoice = s;
         // flipSound.play();
         s.animation.goToFrame(s.animation.getLastFrame());
       }
       else if(s !== firstChoice) {
         secondChoice = s;
         //flipSound.play();
         s.animation.goToFrame(s.animation.getLastFrame());
         checkMatch();
       }
     }
   }
 }

function checkMatch(){
  var okMatch = (firstChoice === okSprite1 && secondChoice === okSprite2) ||
                  (firstChoice === okSprite2 && secondChoice === okSprite1);
  var spaghetMatch = (firstChoice === spaghetSprite1 && secondChoice === spaghetSprite2) ||
                  (firstChoice === spaghetSprite2 && secondChoice === spaghetSprite1);
  var wizardMatch =(firstChoice === wizardSprite1 && secondChoice === wizardSprite2) ||
                  (firstChoice === wizardSprite2 && secondChoice === wizardSprite1);
  var knucklesMatch = (firstChoice === knucklesSprite1 && secondChoice === knucklesSprite2) ||
                (firstChoice === knucklesSprite2 && secondChoice === knucklesSprite1);
  var footFungusMatch = (firstChoice === footFungusSprite1 && secondChoice === footFungusSprite2)||
                    (firstChoice === footFungusSprite2 && secondChoice === footFungusSprite1);
  var lossMatch = (firstChoice === lossSprite1 && secondChoice === lossSprite2)||
                  (firstChoice === lossSprite2 && secondChoice === lossSprite1);
      if(okMatch || lossMatch || spaghetMatch || wizardMatch || knucklesMatch || footFungusMatch){
        matches++;
        if (matches === spriteArray.length / 2 ){
          messageDisplay.html("You win!");
          livesDisplay.html("");
          spritesActive = false;
        }
        else {

          firstChoice = undefined;
          secondChoice = undefined;
        }
      }
      else{
        lives--;
        livesDisplay.html(lives);
        spritesActive = false;
        if (lives === 0){
          setTimeout(function() {
            messageDisplay.html("You lost!");
            livesDisplay.html("");
            flipAllSprites();
          }, 2000);
        }
        else{
          setTimeout( function() {

            firstChoice.animation.goToFrame(0);
            secondChoice.animation.goToFrame(0);
            firstChoice = undefined;
            firstChoice = undefined;
            spritesActive = true;
          },2000)
        }
      }
}

function flipAllSprites(){
  for(var i = 0; i <spriteArray.length; i++){
    var lastFrame = spriteArray[i].animation.getsLastFrame();
    spriteArray[i].animation.goToFrame(lastFrame);
  }
}
 /*
  * function resetAllSprites()
  * Does exactly the opposite of the above function!
  */
  function resetAllSprites(){
    for(var i = 0; i <spriteArray.length; i++){
        spiteArray[i].animation.goToFrame(0);
      }
  }
