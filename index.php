<? xml version = "1.0" encoding = "UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="de">
<head>
    <title>clickr</title>
    <script type="text/javascript" src="/clickr.js"></script>
    <script type="text/javascript" src="/shortcut.js"></script>
    <script type="text/javascript">
        var clickr = new Clickr();
        clickr.setImageDir("/image/album").setTileDir("/image/tiles");
        shortcut.add("n", function () {
            clickr.newImage()
        });
        shortcut.add("c", function () {
            clickr.dropTile()
        });
        shortcut.add("escape", function () {
            clickr.clear()
        });
        <?php
            $imageDir = $_SERVER['DOCUMENT_ROOT'] . '/image/album';
            $images = glob($imageDir . '/*');
            foreach($images as $image) {
                $image = basename($image);
                printf( 'clickr.addImage("%s");' . PHP_EOL, $image);
            }
            $tileDir = $_SERVER['DOCUMENT_ROOT'] . '/image/tiles';
            $tiles = glob($tileDir . '/*');
            foreach($tiles as $tile) {
                $tile = basename($tile);
                printf( 'clickr.addTile("%s");' . PHP_EOL, $tile);
            }
        ?>
    </script>
    <style type="text/css">
        div.tile {
            position: absolute;
            z-index: 9999;
            width: 100px;
            height: 100px;
        }

        #overlay {
            position: absolute;
            left: -10000px;
            top: -10000px;
        }

        #clickr_image {
        }
    </style>
</head>
<body>

<h1>Clickr</h1>
<button onclick="clickr.newImage() || alert('Keine Bilder mehr!')">new image</button>
<button onclick="clickr.dropTile()">click</button>
<button onclick="clickr.clear()">clear</button>
<br/>

<div style="text-align: center;">
    <img src="" id="clickr_image"/>
</div>

<div id="overlay"></div>

<pre id="debug"></pre>

</body>
</html>