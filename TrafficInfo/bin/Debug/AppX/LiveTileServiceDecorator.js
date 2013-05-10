var LiveTileServiceDecorator = (function(tmplate,decorator,tileChildStrategy) {

    this.createTile = function(mess, prop, img) {

        var squareTile = tileChildStrategy.createTile(decorator, mess, prop, img);

        var tile = new Tile(tmplate);
        tile.text = mess;
        tile.branding = prop;
        tile.image = img;
        
        tileChildStrategy.setChild(tile, squareTile);
        
        return tile;
    };
});