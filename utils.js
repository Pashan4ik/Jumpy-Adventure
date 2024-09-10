function getCenter(x, y, width, height) {
    return { 
        x: x + width / 2, 
        y: y + height / 2 
    }
}

function checkCollision(object1, object2) {
    return object1.x >= object2.x && // Check left top
           object1.x <= object2.x + object2.width && 
           object1.y >= object2.y &&
           object1.y <= object2.y + object2.height ||
// Check right top
           object1.x + object1.width >= object2.x && 
           object1.x + object1.width <= object2.x + object2.width && 
           object1.y >= object2.y &&
           object1.y <= object2.y + object2.height ||
// Check left bottom
           object1.x >= object2.x && 
           object1.x <= object2.x + object2.width && 
           object1.y + object1.height >= object2.y &&
           object1.y + object1.height <= object2.y + object2.height ||
// Check right bottom
           object1.x + object1.width >= object2.x && 
           object1.x + object1.width <= object2.x + object2.width && 
           object1.y + object1.height >= object2.y &&
           object1.y + object1.height <= object2.y + object2.height;
}

function getPositionToSpawnEnemy(width, height) {
    position = {x: width, y: height}
    while(position.x >= 0 && position.x <= width &&
          position.y >= 0 && position.y <= height) {
        position.x = randomIntFromInterval(-width, width * 2)
        position.y = randomIntFromInterval(-height, height * 2)
    }
    
    return position;

}

function randomIntFromInterval(min, max) { // min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}
