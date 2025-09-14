/*
this is the class for all the platforms in my game, it creates the 
platforms and also contains the functions to create and move them
*/

/*
declares all the constants that will be used to control and manipulate the plaforms
*/

const platformCount = 5;
class Platform {
  constructor(newPlatBottom) {
    this.bottom = newPlatBottom;
    this.left = Math.random() * 315;
    this.visual = document.createElement('div');

    //creates a visal representation of the platforms in the game
    const visual = this.visual;
    visual.classList.add('platform');
    visual.style.left = this.left + 'px';
    visual.style.bottom = this.bottom + 'px';

    game.appendChild(visual); //'game' is defined in sketch.js
  }
}

/*
create platforms and push them into an aray where they can be assessed and usesd
*/
function createPlatforms() {
  for (let i = 0; i < platformCount; i++) {
    let platGap = 600 / platformCount;
    let newPlatBottom = 100 + i * platGap;
    let newPlatform = new Platform(newPlatBottom);
    platforms.push(newPlatform); //pushes the new platform into the platforms array
  }
}

/*
move the platforms down the screen to simuate vertical scrolling and then remove them 
at the bottom while adding new ones at the top from the platforms array
*/
function movePlatforms() {
  if (doodlerBottom > 200) {
    platforms.forEach(platform => {
      platform.bottom -= 4;
      platform.visual.style.bottom = platform.bottom + 'px';

      if (platform.bottom < 10) {
        platform.visual.remove();
        platforms.shift();
        let newPlatform = new Platform(600);
        platforms.push(newPlatform);
      }
    });
  }
}
