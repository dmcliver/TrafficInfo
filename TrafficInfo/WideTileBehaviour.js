var WideTileBehaviour = function () {

    this.createTile = function(decorator, mess, prop, img) {
        return decorator.createTile(mess, prop, img);
    };

    this.setChild = function(tile, squareTile) {
        tile.firstVisualChild = squareTile.firstBindingItem;
    };
}