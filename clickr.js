/**
 * Created by daniel on 13.03.15.
 */


Clickr = function () {

    this.ELEMENT_IMAGE = "clickr_image";
    this.ELEMENT_OVERLAY = "overlay";

    this.image_width = null;
    this.image_height = null;

    this.tiles = [];

    this.imageDir = null;
    this.images = [];

    this.tileDir = null;
    this.tileImages = [];

}

Clickr.prototype.getPosition = function (elem) {
    if (!elem) {
        return {"x": 0, "y": 0};
    }
    var xy = {"x": elem.offsetLeft, "y": elem.offsetTop}
    var par = this.getPosition(elem.offsetParent);
    for (var key in par) {
        xy[key] += par[key];
    }
    return xy;
}


Clickr.prototype.debug = function (msg) {
    console.log(msg);
    return this;
}

Clickr.prototype.adjustOverlay = function(image) {

    this.elementOverlay = document.getElementById(this.ELEMENT_OVERLAY);
    var position = this.getPosition(image);
    this.debug("position: " + position.x + ", " + position.y);

    this.elementOverlay.style.left = position.x + "px";
    this.elementOverlay.style.top = position.y + "px";
    this.elementOverlay.style.width = image.width + "px";
    this.elementOverlay.style.height = image.height+ "px";

    this.elementOverlay.innerHTML = "";



    this.tiles = [];

    var sizeX = 50, sizeY = 50,
        startX = -11, startY = -11,
        offsetX = sizeX+startX, offsetY = sizeY+startY;

    var sizeX = 100, sizeY = 100,
        startX = -21, startY = -21,
        offsetX = sizeX+startX, offsetY = sizeY+startY;

    reqX = Math.ceil( image.width / offsetX );
    reqY = Math.ceil( image.height / offsetY );

    this.debug( "width:  " + image.width + " -> " + reqX );
    this.debug( "height: " + image.height + " -> " + reqY );

    for( var x=0; x<reqX; x++) {
        for( var y=0; y<reqY; y++) {

            var posX = startX + x * offsetX;
            var posY = startY + y * offsetY;

            var tileIdx = Math.floor(Math.random() * this.tileImages.length);
            var tileSrc = this.tileImages[tileIdx];
            this.debug("tile: " + tileSrc);

            var tile = document.createElement("div");
            tile.setAttribute("class", "tile");
            tile.setAttribute("style", "left: " + posX + "px; top: " + posY + "px; ");
            tile.innerHTML = "<img src='" + this.tileDir + "/" + tileSrc +"' width='"+sizeX+"' height='"+sizeY+"' />";
            this.elementOverlay.appendChild(tile);
            this.tiles.push(tile);
        }
    }

    return this;

}

Clickr.prototype.newImage = function () {
    this.elementImage = document.getElementById(this.ELEMENT_IMAGE);
    if(this.images.length) {
        var idx = Math.floor(Math.random() * this.images.length);
        var imageSrc = this.images[idx];
        this.elementImage.setAttribute("src", this.imageDir + "/" + imageSrc);
        this.images.splice(idx, 1);
        this.adjustOverlay(this.elementImage);
    }

    return this;

}

Clickr.prototype.setImageDir = function(directory) {
    this.imageDir = directory;
    return this;
}

Clickr.prototype.setTileDir = function(directory) {
    this.tileDir = directory;
    return this;
}


Clickr.prototype.dropTile = function() {

    if(this.tiles.length) {

        var idx = Math.floor(Math.random() * this.tiles.length);
        this.debug( "Remove tile #" + idx);
        this.tiles[idx].style.visibility = "hidden";
        this.tiles.splice(idx, 1);

    }

}

Clickr.prototype.addImage = function(src) {
    this.images.push(src);
    return this;
}

Clickr.prototype.addTile= function(src) {
    this.debug("addTile(): " + src);
    this.tileImages.push(src);
    return this;
}