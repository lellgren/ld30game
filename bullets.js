BulletFactory = {
    
    "blueBullets": {
        "rechargeRate": 0.1,
        "bulletSpeed": 12,
        "explosionSize": 0,
        "numberOfShots": 1,
        "bulletWidth": 10,
        "knockbackAmount": 0,
        "bulletHue": "#a6fefe"
    },
    
    "redBullets": {
        "rechargeRate": 0.1,
        "bulletSpeed": 10,
        "explosionSize": 0,
        "numberOfShots": 1,
        "bulletWidth": 10,
        "knockbackAmount": 0,
        "bulletHue": "#fea6d8"
    },
    
    "blueCharge": 1.0,
    "redCharge": 1.0,
    
    "init": function() {
        var interval = setInterval(function() {
            if (BulletFactory.blueCharge < 1.0) {
                BulletFactory.blueCharge += BulletFactory.blueBullets.rechargeRate;
            }
            BulletFactory.blueCharge = Math.min(BulletFactory.blueCharge, 1.0);
            if (BulletFactory.redCharge < 1.0) {
                BulletFactory.redCharge += BulletFactory.redBullets.rechargeRate;
            }
            BulletFactory.redCharge = Math.min(BulletFactory.redCharge, 1.0);
        }, 100);
    },
    
    "canFireBullet": function(color) {
        if (color === "blue") {
            if (BulletFactory.blueCharge === 1.0) {
                return true;
            }
        } else {
            if (BulletFactory.redCharge === 1.0) {
                return true;
            }
        }
        return false;
    },
    
    "givePowerup": function(color) {
        var bulletData = {};
        if (color === "blue") {
            bulletData = BulletFactory.blueBullets;
        } else {
            bulletData = BulletFactory.redBullets;
        }
        
        bulletData.rechargeRate += 0.1;
        bulletData.bulletSpeed += 4;
        bulletData.bulletWidth += 4;
        
        Crafty.audio.play("powerup.ogg");
    },
    
    "fireBullet": function(color, x, y) {
        var bulletData = {};
        if (color === "blue") {
            bulletData = BulletFactory.blueBullets;
            BulletFactory.blueCharge = 0.0;
        } else {
            bulletData = BulletFactory.redBullets;
            BulletFactory.redCharge = 0.0;
        }
        
        // Get X and Y positions for top left of bullet corner
        var offset = Math.floor(bulletData.bulletWidth/2.0);
        var xPos = x - offset;
        var yPos = y - offset;
        
        // Create bullet
        var innerBullet = Crafty.e("2D, Canvas, Color")
            .color("#FFFFFF")
            .attr({x:xPos+2, y:yPos+2, w: bulletData.bulletWidth-4, h: bulletData.bulletWidth-4, z:11})
            .bind('EnterFrame', function() {
                this.y -= bulletData.bulletSpeed;
            });
        var bullet = Crafty.e("2D, Canvas, Color, Collision")
            .color(bulletData.bulletHue)
            .collision()
            .attr({x:xPos, y:yPos, w:bulletData.bulletWidth, h:bulletData.bulletWidth, z:10})
            .bind('EnterFrame', function() {
                this.y -= bulletData.bulletSpeed;
            })
            .onHit("wallY", function() {
                bullet.remove();
            });
        
        // Play sound
        Crafty.audio.play("shoot.ogg");
    }
};