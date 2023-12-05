<!--Karina Shannon X23216760-->


var gameContainer = document.getElementById('game-container');
var timerElement = document.getElementById('timer');

var score = 0;
var timeLeft = 20;
var gameActive = true;
var cakeSpeed = 2;
/* defines a function called updateTimer that 
is responsible for updating a timer element 
on a web page. 
If the timeLeft variable is less than 0, 
the function stops two intervals, sets a 
flag gameActive to false, updates the timer 
element text to "Shop closed", adds a CSS 
class to the timer element, updates the 
score element, and then returns. 
Otherwise, it updates the timer element 
with the current value of timeLeft, 
decreases timeLeft by 0.1, and increases 
the cakeSpeed variable by a small factor. */
function updateTimer() {
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        clearInterval(cakeSpawnInterval);
        gameActive = false;
        timerElement.textContent = "Shop closed";
        timerElement.classList.add('shop-closed');
        document.getElementById('score').textContent = `You scored ${score}`;
        return;
    }
    timerElement.innerText = timeLeft.toFixed(1);
    timeLeft -= 0.1;
    cakeSpeed *= 1.0005; // increase spped every second
}
var timerInterval = setInterval(updateTimer, 100);

var cakeImages = [
    '001-cake.png', '002-roll-cake.png', '003-cupcake.png', '004-cupcake-1.png',
    '005-cake-1.png', '006-cake-2.png', '007-roll-cake-1.png', '008-cake-3.png',
    '009-cake-4.png', '010-cake-5.png'
];
/* That returns a random cake image URL 
from an array called cakeImages. 
The function generates a random index 
using Math.random() and Math.floor(), 
and then uses that index to select a 
cake image from the array. 
The function returns the URL of 
the selected cake image. */
function getRandomCakeImage() {
    var index = Math.floor(Math.random() * cakeImages.length);
    return `gamefiles/flaticon/${cakeImages[index]}`;
}
/*The function creates a new HTML div element and assigns 
it the class name "cake". It then sets the background image 
of the element to a randomly selected cake image.

The function determines the start position and direction 
of the cake's movement. It randomly decides whether the
cake starts on the left or right side of the window and 
calculates the start position accordingly. 
The direction is set to 1 if the cake starts on the left, 
and -1 if it starts on the right.

The function also sets the peak height of 
the cake's movement, the duration of the cake's 
spin animation, and assigns CSS styles to the cake element.

The cake element is appended to the gameContainer element.

The function then starts an interval that updates 
the position of the cake element based on its movement 
speed and direction. The interval checks if the cake 
has moved outside the window and removes it if it has. 
Otherwise, it updates the position of the cake element.

When the cake element is clicked, the function increments 
the score, updates the score display, stops the interval, 
changes the cake's animation and background image to an 
explosion effect, and removes the cake element after a delay.

Overall, this code snippet appears to be part of a game 
that spawns cakes and handles their movement and interaction 
with the player. */
function spawnCake() {
    var cake = document.createElement('div');
    cake.classList.add('cake');
    var cakeImage = getRandomCakeImage();
    cake.style.backgroundImage = `url(${cakeImage})`;

    // Determine start position and direction
    var isLeftStart = Math.random() < 0.5;
    var startPos = isLeftStart ? Math.random() * window.innerWidth * 0.25 : window.innerWidth * 0.75 + Math.random() * window.innerWidth * 0.25;
    var direction = isLeftStart ? 1 : -1;

    var peakHeight = (Math.random() * 0.55 + 0.25) * window.innerHeight;
    var spinDuration = Math.random() * 4 + 1;

    Object.assign(cake.style, {
        left: `${startPos}px`,
        bottom: '0px',
        animation: `spin ${spinDuration}s linear infinite`
    });

    gameContainer.appendChild(cake);

    var movedX = 0;
    var movementLimit = window.innerWidth * 0.25;

    var id = setInterval(() => {
        movedX += direction * cakeSpeed;
        var posX = startPos + movedX;
        var posY = peakHeight * Math.sin(Math.PI * movedX / movementLimit);

        if (posX < 0 || posX > window.innerWidth) {
            clearInterval(id);
            gameContainer.removeChild(cake);
        } else {
            cake.style.bottom = `${posY}px`;
            cake.style.left = `${posX}px`;
        }
    }, 10);
/*adds a click event to an element with the id "cake". 
When the element is clicked, it increments the score, 
updates the score display, stops an animation, changes 
the background image to an explosion image, and removes 
the element after a delay. */
    cake.onclick = () => {
        if (gameActive) {
            score=score+1;
            document.getElementById('score').innerText = 'Score: ' + score;
            clearInterval(id);
            timeLeft = timeLeft + 2
            cake.style.animation = 'none'; // Stop the rotation
            cake.style.backgroundImage = 'url("gamefiles/Explosion fire effects GIF on GIFER - by Nalmaran.gif")'; // Change to explosion image
            setTimeout(() => { gameContainer.removeChild(cake); }, 1000); // Remove the cake after a delay
        }
    };
}

var cakeSpawnInterval = setInterval(spawnCake, 2000);
