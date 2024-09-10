class Player {
    constructor(width, height, color, gunColor, x, y, speed){
        this.width = width;
        this.height = height;
        this.color = color
        this.gunColor = gunColor
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.directions = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.orientation = "up";
        this.shootPointX = null;
        this.shootPointY = null;
    }

    update = function() {
        const center = getCenter(this.x, this.y, this.width, this.height);

        // Update the player
        context.shadowColor = "dark" + this.color
        context.shadowBlur = 10
        context.fillStyle = this.color
        context.fillRect(this.x, this.y, this.width, this.height);
        //context.strokeStyle = "dark" + this.color
        //context.lineWidth = 3;
        //context.strokeRect(this.x, this.y, this.width, this.height);
        context.shadowBlur = 0

        // Update the gun
        let gunHeight;
        let gunWidth;
        let gunX;
        let gunY;
        
        rotateGun(this);
 
        context.fillStyle = this.gunColor;
        context.fillRect(gunX, gunY, gunWidth, gunHeight);
        context.strokeStyle = "dark" + this.gunColor
        context.lineWidth = 1.5;
        context.strokeRect(gunX, gunY, gunWidth, gunHeight);

        const gunCenter = getCenter(gunX, gunY, gunWidth, gunHeight);
        // Calculating of shoot point
        if(player.orientation == "left") {
            this.shootPointX = gunX - BULLET_SIZE;
            this.shootPointY = gunCenter.y - BULLET_SIZE / 2;
        }
        else if(player.orientation == "up") {
            this.shootPointX = gunCenter.x - BULLET_SIZE / 2;
            this.shootPointY = gunY - BULLET_SIZE;
        }
        else if(player.orientation == "right") {
            this.shootPointX = gunWidth + gunX;
            this.shootPointY = gunCenter.y - BULLET_SIZE / 2;
        }
        else if(player.orientation == "down") {
            this.shootPointX = gunCenter.x - BULLET_SIZE / 2;
            this.shootPointY = gunHeight + gunY;
        }

        function rotateGun(player){
            // Width and height
            gunHeight = player.width / 3;
            gunWidth = player.height / 1.15;
            if(player.orientation == "up" || player.orientation == "down"){
                gunWidth = player.width / 3;
                gunHeight = player.height / 1.15;
            }
            // X and Y
            gunX = center.x;
            gunY = center.y - gunHeight;
            if(player.orientation == "down" || player.orientation == "left"){
                gunX = center.x - gunWidth;
                gunY = center.y;
            }
        }
        
    }

    move = function(canvas) {
        // Up and down
        if (this.directions.up && this.y > 0) 
            this.y -= this.speed;
        if (this.directions.down && this.y + this.height < canvas.width)  // both up and down does not work so check excl.
            this.y += this.speed;

        // Left and right
        if (this.directions.left && this.x > 0) 
            this.x -= this.speed;
        if (this.directions.right && this.x + this.width < canvas.height) 
            this.x += this.speed;
    }

}
