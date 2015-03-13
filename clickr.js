/**
 * Created by daniel on 13.03.15.
 */

/**
 *
 * @constructor
 */
Clickr = function () {

    /**
     * the id of the element holding the current image
     * @type {string}
     */
    this.ELEMENT_IMAGE = "clickr_image";

    /**
     * the id of the overlay element
     * @type {string}
     */
    this.ELEMENT_OVERLAY = "overlay";

    /**
     * controls whether this.debug() will write to console.log
     * or simply will do nothing at all
     * @type {boolean}
     */
    this.DEBUG = true;

    /**
     * holds the tiles covering the current image
     * @type {Array}
     */
    this.tiles = [];

    /**
     * the image directory
     * @type {String}
     */
    this.imageDir = null;

    /**
     * an array of images
     * @type {Array} of img
     */
    this.images = [];

    /**
     * the tile directory
     * @type {String}
     */
    this.tileDir = null;

    /**
     * an array of tiles
     * @type {Array}
     */
    this.tileImages = [];

}

/**
 * get the absolute position of an element
 *
 * @param elem
 * @returns {*}
 */
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

/**
 * write a log message to console.log
 * @param msg
 * @returns {Clickr}
 */
Clickr.prototype.debug = function (msg) {
    if (this.DEBUG) {
        console.log(msg);
    }
    return this;
}

/**
 * adjust and fill the overlay
 *
 * will position, scale and fill the overlay div to hide the current image
 *
 * @param image
 * @returns {Clickr}
 */
Clickr.prototype.adjustOverlay = function (image) {

    this.elementOverlay = document.getElementById(this.ELEMENT_OVERLAY);
    var position = this.getPosition(image);
    this.debug("position: " + position.x + ", " + position.y);

    this.elementOverlay.style.left = position.x + "px";
    this.elementOverlay.style.top = position.y + "px";
    this.elementOverlay.style.width = image.width + "px";
    this.elementOverlay.style.height = image.height + "px";

    this.elementOverlay.innerHTML = "";

    this.tiles = [];

    var sizeX = 100, sizeY = 100,
        startX = -21, startY = -21,
        offsetX = sizeX + startX, offsetY = sizeY + startY;

    reqX = Math.ceil((image.width - startX)/ offsetX);
    reqY = Math.ceil((image.height -startY)/ offsetY);

    this.debug("width:  " + image.width + " -> " + reqX);
    this.debug("height: " + image.height + " -> " + reqY);

    for (var x = 0; x < reqX; x++) {
        for (var y = 0; y < reqY; y++) {

            var posX = startX + x * offsetX;
            var posY = startY + y * offsetY;

            var tileIdx = Math.floor(Math.random() * this.tileImages.length);
            var tileSrc = this.tileImages[tileIdx];
            this.debug("tile: " + tileSrc);

            var tile = document.createElement("div");
            tile.setAttribute("class", "tile");
            tile.setAttribute("style", "left: " + posX + "px; top: " + posY + "px; ");
            tile.innerHTML = "<img src='" + this.tileDir + "/" + tileSrc + "' width='" + sizeX + "' height='" + sizeY + "' />";
            this.elementOverlay.appendChild(tile);
            this.tiles.push(tile);
        }
    }

    return this;

}

/**
 * switch to a new image
 *
 * Will randomly select one of the remaining images (if any).
 *
 * @returns {boolean}
 */
Clickr.prototype.newImage = function () {

    this.elementImage = document.getElementById(this.ELEMENT_IMAGE);

    if (this.images.length) {
        var idx = Math.floor(Math.random() * this.images.length);
        var imageSrc = this.images[idx];
        // this.elementImage.setAttribute("src", this.imageDir + "/" + imageSrc);
        this.elementImage.setAttribute("src", imageSrc.src);
        this.images.splice(idx, 1);
        this.adjustOverlay(this.elementImage);

        return true;
    }
    else {
        return false;
    }

}

/**
 * Declare the directory holding the images
 *
 * @param directory
 * @returns {Clickr}
 */
Clickr.prototype.setImageDir = function (directory) {
    this.imageDir = directory;
    return this;
}

/**
 * Declare the directory holding the tiles
 *
 * @param directory
 * @returns {Clickr}
 */
Clickr.prototype.setTileDir = function (directory) {
    this.tileDir = directory;
    return this;
}

/**
 * Remove all remaining tiles, revealing the image
 *
 * @returns {Clickr}
 */
Clickr.prototype.clear = function () {
    for (var i = 0; i < this.tiles.length; i++) {
        this.tiles[i].style.visibility = "hidden";
    }
    this.tiles = [];
    return this;
}

/**
 * Remove a random tile
 *
 * @returns {boolean}
 */
Clickr.prototype.dropTile = function () {

    if (this.tiles.length) {

        var idx = Math.floor(Math.random() * this.tiles.length);
        this.debug("Remove tile #" + idx);
        this.tiles[idx].style.visibility = "hidden";
        this.tiles.splice(idx, 1);

        return true;
    }
    else {
        return false;
    }

}

/**
 * Add Image to the list of available images.
 *
 * Will fail if the image directory was not defined before.
 *
 * @param src
 * @returns {Clickr}
 */
Clickr.prototype.addImage = function (src) {

    if (null == this.imageDir) {
        throw "You have to declare an image directory first";
    }

    var image = document.createElement("img");
    image.src = this.imageDir + "/" + src;


    this.images.push(image);
    return this;
}

/**
 * Add a tile to the list of available tiles.
 *
 * @param src
 * @returns {Clickr}
 */
Clickr.prototype.addTile = function (src) {
    this.tileImages.push(src);
    return this;
}

/**
 * Get number of remaining images
 *
 * @returns {Number}
 */
Clickr.prototype.getImageCount = function() {
    return this.images.length;
}