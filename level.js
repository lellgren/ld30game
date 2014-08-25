LevelConstructor = {
    "createLevel": function() {
        // Create level
        Crafty.e("2D, Canvas, Image, wallX")
            .image("gfx/wall_left.png")
            .attr({x:24, y:0, w:32, h:710});
        
        Crafty.e("2D, Canvas, Image, wallX")
            .image("gfx/wall_right.png")
            .attr({x:474, y:0, w:32, h:710});
        
        Crafty.e("2D, Canvas, Image, wallX")
            .image("gfx/wall_left2.png")
            .attr({x:522, y:0, w:32, h:710});
            
        Crafty.e("2D, Canvas, Image, wallX")
            .image("gfx/wall_right2.png")
            .attr({x:968, y:0, w:32, h:710});
            
        Crafty.e("2D, Canvas, Image").image("gfx/floor1.png")
            .attr({x:56, y:0, w:418, h:768});
            
        Crafty.e("2D, Canvas, Image").image("gfx/floor2.png")
            .attr({x:554, y:0, w:418, h:768});
        
        Crafty.e("2D, Canvas, Color, wallY").color("#000000")
            .attr({x:0, y:704, w:1024, h:64});
        
        Crafty.e("2D, Canvas, Color, wallY").color("#000000")
            .attr({x:0, y:-64, w:1024, h:64});
    }
};