//enables trict mode,this helps deal with common errors
'use strict';

/*
lets the javascript interact with elements in the DOM
*/
const game = document.getElementById('game');
const doodler = document.getElementById('doodler');

/*
declares all the game constants so they can be reusued in 
different blocks of the code and so they can be easily changed if needed
*/
const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const DOODLER_WIDTH = 60;
const PLATFORM_HEIGHT = 15;
const PLATFORM_WIDTH = 85;
const MOVE_SPEED = 5;
const GRAVITY = 0.9;
const JUMP_START = 20;

/*
declares all the game variables so they can be reusued in 
different blocks of the code and so they can be easily changed if needed
*/
let doodlerLeft = 170;
let doodlerBottom = 100;
let isJumping = true;

let jumpSpeed = JUMP_START;
let fallSpeed = 0;
let animationFrame;
let leftTimer, rightTimer;
let isGoingLeft = false;
let isGoingRight = false;

const platforms = [];

/*
checks for collisions between the ball(doodler) and the platforms
*/
function collision(platform){
 return (
  doodlerBottom >= platform.bottom &&
  doodlerBottom <= platform.bottom + PLATFORM_HEIGHT &&
  doodlerLeft + DOODLER_WIDTH >= platform.left &&
  doodlerLeft <= platform.left + PLATFORM_WIDTH &&
  !isJumping
 );

}

/*
/*defines the jumping(bouncing) action of the ball(doodler)
this function animates the ball jumping ypwards and then falling
 downwards due to gravity
*/
function jump() {
 cancelAnimationFrame(animationFrame); //ensures only one animation frame is running at a time
 isJumping = true;
 jumpSpeed = JUMP_START;

 function jumpLoop() {
  doodlerBottom += jumpSpeed;
  jumpSpeed -= GRAVITY;

  if(jumpSpeed <= 0) {
    isJumping = false
    fall();
    return;
  }
  doodler.style.bottom = doodlerBottom + 'px';
  movePlatforms();
  animationFrame = requestAnimationFrame(jumpLoop);
 }
 animationFrame = requestAnimationFrame(jumpLoop);
}

/*animates the falling action of the ball due to gravity, also checks 
for collisions with platforms to bounce off of, and ends
 the game if the doodler falls of the screen*/
function fall() {
  cancelAnimationFrame(animationFrame);
  isJumping = false;
  fallSpeed = 0;
  function animateFall() {
    doodlerBottom -= fallSpeed;
    fallSpeed += GRAVITY;
    doodler.style.bottom = doodlerBottom + 'px';
    movePlatforms();
    if (doodlerBottom <= 0) {
      gameOver();
      return;
    }
    for (const platform of platforms) {
      if (collision(platform)) {
        jump(); // Start a new jump if a collision is detected
        return;
      }
    }
    animationFrame = requestAnimationFrame(animateFall);
  }
  animateFall();    
}


/*
stops all game activity and notifies the player that the game is 
over and clears the game display
*/
function gameOver() {
  clearInterval(gameInterval);
  clearInterval(leftTimer);
  clearInterval(rightTimer);
  alert('Game Over!');
  while (game.firstChild) {
    game.removeChild(game.firstChild);
  }
}

/*
control the left and right movement  of the ball(doodler) using the arrow keys it allows the 
ball to move 5pixels to the lkeft every 20milliseconds in the direction of the corresponding arrow key pressed
*/
function moveLeft() {
  if (isGoingRight) {
    clearInterval(rightTimer);
    isGoingRight = false;
  }
  isGoingLeft = true;
  leftTimer = setInterval(() => {
    if (doodlerLeft >= 0) {
      doodlerLeft -= 5;
      doodler.style.left = doodlerLeft + 'px';
    }
  }, 20);
}

function moveRight() {
  if (isGoingLeft) {
    clearInterval(leftTimer);
    isGoingLeft = false;
  }
  isGoingRight = true;
  rightTimer = setInterval(() => {
    if (doodlerLeft <= 340) {
      doodlerLeft += 5;
      doodler.style.left = doodlerLeft + 'px';
    }
  }, 20);
}

/*
thisi function listens for key presses and calls the appropriate movement functions and if the up 
arrow is pressed the movemnt stops
*/
function control(e) {
  if (e.key === 'ArrowLeft') moveLeft();
  if (e.key === 'ArrowRight') moveRight();
  if (e.key === 'ArrowUp') {
    clearInterval(leftTimer);
    clearInterval(rightTimer);
    isGoingLeft = false;
    isGoingRight = false;
  }
}

/*
starts the game by creating the platforms, adding the event listener for key presses 
and making the ball jump
*/
function start() {
  createPlatforms();
  document.addEventListener('keydown', control);
  jump();
}

start();

