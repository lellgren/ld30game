PlayerFactory = {
    "createPlayers": function() {
    
        Crafty.sprite(32, 48, "gfx/player_blue.png", {
            PlayerBlue: [0,3]
        });
        
        Crafty.sprite(32, 48, "gfx/player_red.png", {
            PlayerRed: [0,3]
        });
        
        Crafty.c('PlayerControls', {
			__move: {left: false, right: false, up: false, down: false},
            _acceleration: 4,
            _friction: 1,
            _maxSpeed: 8,
			_speedX: 0,
            _speedY: 0,
			
			PlayerControls: function() {				
				this.bind('EnterFrame', function() {
                    // Apply Friction
                    if (this._speedX < 0) {
                        this._speedX = (this._speedX + this._friction);
                    } else if (this._speedX > 0) {
                        this._speedX = (this._speedX - this._friction);
                    }
                    if (this._speedY < 0) {
                        this._speedY = (this._speedY + this._friction);
                    } else if (this._speedY > 0) {
                        this._speedY = (this._speedY - this._friction);
                    }
                    
                    // Determine the level of acceleration by
                    // checking if multiple directions are held down
                    var acceleration = this._acceleration;
                    if ((this.isDown("RIGHT_ARROW") && this.isDown("UP_ARROW")) ||
                        (this.isDown("RIGHT_ARROW") && this.isDown("DOWN_ARROW")) ||
                        (this.isDown("LEFT_ARROW") && this.isDown("UP_ARROW")) ||
                        (this.isDown("LEFT_ARROW") && this.isDown("DOWN_ARROW"))) {
                        acceleration = Math.floor(acceleration / 2);
                    }
                    
                    // Use player input to adjust speed
                    if (this.isDown("RIGHT_ARROW")) {
                        this._speedX = (this._speedX + acceleration);
                    } else if (this.isDown("LEFT_ARROW")) {
                        this._speedX = (this._speedX - acceleration);
                    }
                    if (this.isDown("UP_ARROW")) {
                        this._speedY = (this._speedY - acceleration);
                    } else if (this.isDown("DOWN_ARROW")) {
                        this._speedY = (this._speedY + acceleration);
                    }
                    
                    // Apply Max speed caps
                    if (this._speedX > 0) {
                        this._speedX = Math.min(this._speedX, this._maxSpeed);
                    } else if (this._speedX < 0) {
                        this._speedX = Math.max(this._speedX, (this._maxSpeed * -1));
                    }
                    if (this._speedY > 0) {
                        this._speedY = Math.min(this._speedY, this._maxSpeed);
                    } else if (this._speedY < 0) {
                        this._speedY = Math.max(this._speedY, (this._maxSpeed * -1));
                    }
                    
                    // Move the player according to speed
                    this.x = (this.x + this._speedX);
                    this.y = (this.y + this._speedY);
                });
				
				return this;
			}
		});
        
        
        // Create Player Blue
        var playerB = Crafty.e("2D, Canvas, PlayerBlue, Keyboard, PlayerControls, Collision, SpriteAnimation")
			.attr({x: 365, y: 600, z: 1, w:32, h:48, z:20})
            .reel("lookDown", 1000, 0, 0, 1)
            .reel("lookRight", 1000, 1, 0, 1)
            .reel("lookUp", 1000, 2, 0, 1)
            .reel("lookLeft", 1000, 3, 0, 1)
			.PlayerControls()
			.collision()
            .bind('EnterFrame', function() {
                // check to fire bullet
                if (BulletFactory.canFireBullet("blue") && this.isDown("A")) {
                    BulletFactory.fireBullet("blue", this.x+16, this.y+24);
                }
                // Update animation
                if (this.isDown("RIGHT_ARROW")) {
                    this.animate("lookRight");
                } else if (this.isDown("LEFT_ARROW")) {
                    this.animate("lookLeft");
                } else if (this.isDown("UP_ARROW")) {
                    this.animate("lookUp");
                } else if (this.isDown("DOWN_ARROW")) {
                    this.animate("lookDown");
                }
            })
			.onHit("wallX", function() {
				this.x += (this._speedX * -1);
                this._speedX = 0;
			}).onHit("wallY", function() {
				this.y += (this._speedY * -1);
                this._speedY = 0;
			});
        
        playerB.animate("lookDown");
        
        // Create Player Red
        var playerR = Crafty.e("2D, Canvas, PlayerRed, Keyboard, PlayerControls, Collision, SpriteAnimation")
			.attr({x: 877, y: 600, z: 1, w:32, h:48, z:20})
            .reel("lookDown", 1000, 0, 0, 1)
            .reel("lookRight", 1000, 1, 0, 1)
            .reel("lookUp", 1000, 2, 0, 1)
            .reel("lookLeft", 1000, 3, 0, 1)
			.PlayerControls()
			.collision()
            .bind('EnterFrame', function() {
                // check to fire bullet
                if (BulletFactory.canFireBullet("red") && this.isDown("D")) {
                    BulletFactory.fireBullet("red", this.x+16, this.y+24);
                }
                // Update animation
                if (this.isDown("RIGHT_ARROW")) {
                    this.animate("lookRight");
                } else if (this.isDown("LEFT_ARROW")) {
                    this.animate("lookLeft");
                } else if (this.isDown("UP_ARROW")) {
                    this.animate("lookUp");
                } else if (this.isDown("DOWN_ARROW")) {
                    this.animate("lookDown");
                }
            })
			.onHit("wallX", function() {
				this.x += (this._speedX * -1);
                this._speedX = 0;
			}).onHit("wallY", function() {
				this.y += (this._speedY * -1);
                this._speedY = 0;
			});
            
        playerR.animate("lookDown");
        
        return {
            "blue": playerB,
            "red": playerR
        };
    }
};