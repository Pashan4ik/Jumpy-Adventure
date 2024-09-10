class Enemy{
    constructor(width, height, color,  x, y, speed){
        this.width = width;
        this.height = height;
        this.color = color
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.orientation = 0;
    }

    update = function() {
        // Body
        context.shadowColor = "dark" + this.color;
        context.shadowBlur = 10;
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        // Face
        context.fillStyle = "black";
        const eyeWidth = this.width / 4;
        const eyeHeight = this.width / 4;
        // Left eye
        context.fillRect(this.x+this.width/10, 
                         this.y+eyeHeight / 1.4, 
                         eyeWidth, eyeHeight
                         );
        // Right eye
        context.fillRect(this.x+this.width-eyeWidth-this.width/10, 
                         this.y+eyeHeight / 1.4, 
                         eyeWidth, eyeHeight
                         );
        // Mouth
        const mouthWidth = this.width / 2.2;
        const mouthHeight = this.height / 6;
        context.fillRect(this.x + this.width / 2 - mouthWidth / 2, 
            	         this.y + this.height - mouthHeight * 2, 
                         mouthWidth, 
                         mouthHeight);
     
    }

    move = function(player) {
        this.orientation = getOrientation(this);

        // Move the enemy
        this.x += Math.cos(this.orientation) * this.speed;
        this.y += Math.sin(this.orientation) * this.speed;
        
        
        function getOrientation(enemy){
            const center = getCenter(player.x, player.y, player.width, player.height);

            // Calculate orientation of the enemy
            const deltaX = center.x + enemy.width / 2 - enemy.x - enemy.width;
            const deltaY = center.y + enemy.height / 2 - enemy.y - enemy.height;
            const angle = Math.atan2(deltaY, deltaX);
    
            return angle;
        }
    }

    die = function() {
        enemies.splice(enemies.indexOf(this), 1);
    }
    
}