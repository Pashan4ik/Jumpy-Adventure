const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 700;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const SPEED = 1.75;
const ENEMY_SPEED = 0.75;
const BULLET_SPEED = 3;
const BULLET_SIZE = 7;

const MAX_ENEMIES_COUNT = 1;

let player = undefined;
const bullets = [];
const enemies = [];

// Score
let score = 0
const scoreText = document.getElementById("score");
let kills = 0
const killsText = document.getElementById("kills");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const myGameArea ={
    start : function() {
        // Start lLoop
        this.interval = setInterval(updateGameArea, 10);

        // Create the player
        player = new Player(30, 30, "red", "slategrey", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, SPEED);

        // Clear arrays
        enemies.splice(0, enemies.length);
        bullets.splice(0, bullets.length);

        // Reset values
        score = 0;
        scoreText.innerText = score;
        kills = 0;
        killsText.innerText = kills;
    },
    clear : function() {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    },
    collisions : function() {
        enemies.forEach(enemy => {
            // Is player touching an enemy
            if(checkCollision(player, enemy)) {
                // Game over
                console.log("Game Over!!!");
                clearInterval(this.interval)
                
                // Reset the game
                setTimeout(function() { myGameArea.start(); }, 3 * 1000) // Secondsd
                return;
            }
            // Is the enemy touching a bullet
            bullets.forEach(bullet => {
                if(checkCollision(bullet, enemy)) {
                    enemy.die();
                    bullet.die();  
                    // Kills
                    kills += 1;
                    killsText.innerText = kills;
                }
            });
        });
    }
}

// Movement
window.onkeydown = function(e) {
    const kc = e.keyCode;
    e.preventDefault();

    // On key down
    if (kc === 65) { player.directions.left = true; player.orientation = "left" }   // LEft
    if (kc === 87) { player.directions.up = true; player.orientation = "up" }       // Up
    if (kc === 68) { player.directions.right = true; player.orientation = "right" } // RIght
    if (kc === 83) { player.directions.down = true; player.orientation = "down" }   // Down
};
window.onkeyup = function(e) {
    const kc = e.keyCode;
    e.preventDefault();

    // On key up
    if (kc === 65) player.directions.left = false;  // Left
    if (kc === 87) player.directions.up = false;    // Up
    if (kc === 68) player.directions.right = false; // Right
    if (kc === 83) player.directions.down = false;  // Down
};

// Shooting
canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();
    if(e.button !== 0) return;  

    // Calculate orientation of new bullet
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;

    const deltaX = mouseX - player.shootPointX - BULLET_SIZE;
    const deltaY = mouseY - player.shootPointY - BULLET_SIZE;
    const angle = Math.atan2(deltaY, deltaX);

    // Create new bullet
    bullets.push(new Bullet(BULLET_SIZE, BULLET_SIZE, angle, "orange", BULLET_SPEED, player));
});

// Infinite loop
function updateGameArea() {
    myGameArea.collisions();
    myGameArea.clear();
    // Player
    player.update();
    player.move(canvas);
    // Enemies
    enemies.forEach(enemy => {
        enemy.update();
        enemy.move(player);
    });
    // Bullets
    bullets.forEach(bullet => {
        bullet.update();
        bullet.move(canvas);
    });
    // Enemy spawner
    if(score > 3 && enemies.length < score){
        position = getPositionToSpawnEnemy(CANVAS_WIDTH, CANVAS_HEIGHT)
        enemies.push(new Enemy(30, 30, "green", position.x, position.y, ENEMY_SPEED));
    }
    // Score
    score += 0.01
    scoreText.innerText = Math.floor(score);

}

myGameArea.start();
