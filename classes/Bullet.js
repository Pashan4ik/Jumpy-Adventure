class Bullet {
    constructor(width, height, orientation, color, speed, player) {
        this.width = width;
        this.height = height;
        this.color = color
        this.speed = speed;
        this.x = player.shootPointX;
        this.y = player.shootPointY;
        this.orientation = orientation;
    }

    update = function() {
        context.shadowColor = this.color
        context.shadowBlur = 5
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    move = function(canvas) {
        // Check position
        if(
            this.x < 0 ||
            this.y < 0 ||
            this.x > canvas.width ||
            this.y > canvas.height
        ) {
            this.die();
        } 
        else {
            this.x += Math.cos(this.orientation) * this.speed;
            this.y += Math.sin(this.orientation) * this.speed;
        }
    }

    die = function() {
        bullets.splice(bullets.indexOf(this), 1);
    }

}
