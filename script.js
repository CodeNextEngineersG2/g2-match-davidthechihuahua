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

/*
 * function loadImages()
 * Called in the preload() function. Loads all images needed for your game
 * with the loadImage() function. When testing on your machine, be sure to
 * setup a local test server or the images will not load! Your coach will show
 * you how to do this.
 * Example:
   function loadImages() {
     myImage = loadImage("assets/img/image.png");
   }
 */
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


/*
 * function loadAnimations()
 * Called in the preload() function. Loads all animations using the built-in
 * p5.play function "loadAnimation()". Therefore, this function is called after
 * loadImages(). The loadAnimation() function takes image input in the order
 * you'd like the animation to be played, from the first frame to the last.
 * Example:
   function loadAnimations() {
     myAnimation = loadAnimation(img1, img2, img3, img4);
   }
 */
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


/*
 * function preload()
 * Called automatically by p5.play. Loads all assets for your game (e.g.,
 * images, sounds) before p5 calls setup(), to ensure that the game does not
 * begin running until the assets are loaded and ready. Therefore, this function
 * is essentially a "pre-setup" function.
 */
function preload() {
  loadImages();
  loadAnimations();
}

/*
 * function setup()
 * Called automatically by p5.js when the game begins, but after preload().
 * Therefore, assets are assumed to have been loaded and ready before this
 * function is called.
 */
 function setup() {
   gameScreen = createCanvas(790, 370);
   gameScreen.parent("#game-screen"); // Just like maurry
   spriteWidth = 120;
   spriteHeight = 168;
   spriteX = 70;
   spriteY = 95;
   imageArray = [backImage, okImage, spaghetImage, knucklesImage, wizardImage, footFungusImage, lossImage,
                 transitionImage1, transitionImage2, transitionImage3];
   resizeImages();
   createSprites();
   spriteArray = [okSprite1, okSprite2, spaghetSprite1, spaghetSprite2,
     knucklesSprite1, knucklesSprite2, wizardSprite1, wizardSprite2, footFungusSprite1, footFungusSprite2,
     lossSprite1, lossSprite2];
   addAnimations();
   shuffle(spriteArray, true);
   placeSprites();
   spritesActive = true;
  matches =0;
  lives = 5;
 }


/*
 * function draw()
 */
 function draw() {
   background(20, 40, 60);
   drawSprites();
 }

/*
 * function init()
 * Initializes various elements of the game. Called in both setup() and
 * resetGame(). Helps reduce some of the bloat and redundancy in both of those
 * functions (DRY principle = "don't repeat yourself")
 */


/*
 * function resetGame()
 * Resets the game by calling init(), resetAllSprites(), then after a 1000
 * millisecond delay, calls shuffle(spriteArray, true), placeSprites(), and
 * sets spritesActive to true.
 */


/*
 * function toggleMusic()
 * Toggles the background music on and off.
 */


/*
 * function resizeImages()
 * Resizes all images in imageArray such that each image has a width of
 * spriteWidth and a height of spriteHeight. To resize an image use the
 * resize(width, height) method on the image itself.
 * Example of resizing one image:
   image.resize(40, 50);
 */
function resizeImages() {
  for(var i = 0; i < imageArray.length; i++) {
    imageArray[i].resize(spriteWidth, spriteHeight);
  }
}

/*
 * function createSprites()
 * Initializes each sprite variable (e.g., knucklesSprite1) as a sprite object
 * through the createSprite(x, y, width, height) p5.play method. For all sprites,
 * x and y parameters should be passed values 0 and 0 (sprites are actually placed
 * in a separate function), while width and height correspond to spriteWidth and
 * spriteHeight.
 * Example:
   function createSprites() {
     mySprite = createSprite(0, 0, spriteWidth, spriteHeight);
   }
 */
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


/*
 * function addAnimations()
 * Adds an animation to each sprite in spriteArray. The animations have already
 * been loaded using loadAnimations(), so this function is responsible for
 * actually adding them to the sprites. Additionally, this function initializes
 * each animation's frameDelay, loop, and playing properties. Finally, this
 * function calls activateSprite(s) with each sprite as input.
 */
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


/*
 * function placeSprites()
 * Places all sprites in spriteArray on the game screen, according to any
 * pattern you like. For starters, try arranging the sprites in a simple
 * grid-like pattern (e.g., 2x2 if you only have four sprites).
 */
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



/*
 * function activateSprite(s)
 * Activates a sprite by initializing its onMousePressed property to a function.
 * This will essentially cause the sprite to "come alive" and behave like a
 * real playing card when it is clicked.
 * To initialize the onMousePressed property as a function, use a function
 * expression.
 * The onMousePressed function itself plays sprite animations and assigns
 * spriteOne and spriteTwo to sprites in the order tht they are clicked. When
 * two sprites have been clicked, the function calls checkMatch().
 */

 // functions are hoisted to the top of the script. variables are not hoisted.

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



/*
 * function checkMatch()
 * Checks if spriteOne and spriteTwo match. If they do, the player is notified
 * in some way and those sprites remain "flipped". If they do not, the player is
 * notified in some way and, after a short delay, the sprites are returned to
 * face-down position. If the player has matched all sprites, they are notified
 * that they have won. IF the player has matched incorrectly too many times
 * (as indicated by the "lives" variable), they are notified that they have
 * lost and all sprites are simultaneously flipped face-up, revealing their
 * locations to the player. Win or lose, the player is given the option to
 * reset and try again with a fresh shuffle.
 */
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
          alert("YOU LAUGH YOU LOSE!");
          spritesActive = false;
        }
        else {
          alert("REEEEE!");
          firstChoice = undefined;
          secondChoice = undefined;
        }
      }
      else{
        lives--;
        spritesActive = false;
        if (lives === 0){
          setTimeout(function() {
            alert("HA, BUT CAN YOU DO THIS")
            //flipAllSprites();
          }, 2000);
        }
        else{
          setTimeout( function() {
            alert("PEW PEW PEW!");
            firstChoice.animation.goToFrame(0);
            secondChoice.animation.goToFrame(0);
            firstChoice = undefined;
            firstChoice = undefined;
            spritesActive = true;
          },2000)
        }
      }
}
/*
 * function flipAllSprites()
 * Flips all sprites in spriteArray to their last animation frame (i.e.,
 * "face-up").
 */
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
