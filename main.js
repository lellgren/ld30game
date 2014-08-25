LDGame = {
    "playingMusic": false,
    
    "init": function() {
        // Init Crafty and create scene
        Crafty.init(1024, 768, document.getElementById('game'));
        Crafty.canvas.init();
        
        Crafty.defineScene("game", function() {
            level = LevelConstructor.createLevel();
            players = PlayerFactory.createPlayers();
            BulletFactory.init();
            
            // Keys for debug stuff
            Crafty.e("Keyboard")
                .bind('KeyUp', function(event) {
                    if (event.key === Crafty.keys.M) {
                        if (!LDGame.playingMusic) {
                            LDGame.playingMusic = true;
                            Crafty.audio.play("music.mp3", -1, 0.8);
                        } else {
                            LDGame.playingMusic = false;
                            Crafty.audio.stop("music.mp3");
                        }
                    }
                    if (event.key === Crafty.keys.Q) {
                        BulletFactory.givePowerup("blue");
                    }
                    if (event.key === Crafty.keys.E) {
                        BulletFactory.givePowerup("red");
                    }
                });
        });
        
        Crafty.defineScene("loading", function() {
            console.log("Loading...");
            
            Crafty.e("2D, Canvas, Text").attr({ x: 480, y: 380 })
                .text("Loading...").textFont({size: '20px'}).textColor("#FFFFFF");
            
            Crafty.load(["gfx/player_blue.png", "gfx/player_red.png", "gfx/wall_left.png", "gfx/wall_right.png", "gfx/wall_left2.png",
                         "gfx/wall_right2.png", "gfx/floor1.png", "gfx/floor2.png", "snd/music.mp3", "snd/shoot.ogg", "snd/powerup.ogg"],
                         function() {
                            console.log("Done loading!");
                            Crafty.scene("game");
                         });
        });

        Crafty.scene("loading");
    }
};