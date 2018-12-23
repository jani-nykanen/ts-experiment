/**
 * Main file
 * 
 * (c) 2018 Jani Nykänen
 */


// Assets
let assetInfo = {

    bitmapPath : "assets/bitmaps/",
    bitmaps: {

        font: "font.png",
        player: "player.png",
        sword: "sword.png",
        hud: "hud.png",
        bow: "bow.png",
        tileset: "tileset.png",
        water: "water.png",
        envdeath: "envdeath.png",
        enemies: "enemies.png",
        items: "items.png",
    },

    audioPath: "assets/audio/",
    audio: {
        // ...
    },

    docPath: "assets/",
    docs: {
        map: "tilemaps/map.json",
        solid: "tilemaps/solid.json",
        itemInfo: "iteminfo.json",
    }
};


// Gamepad
let gamePad = {

    keys: [
        90,
        88,
        13,
        16,
        27
    ],
    names: [
        "fire1",
        "fire2",
        "start",
        "select",
        "cancel",
    ]

}


// Main function
function main() {

    // Create application
    let app = new Application();

    // Add scenes
    app.addScene(new Global(), true, false);
    app.addScene(new Game(), false, true);

    // Create gamepad
    app.createVirtualGamepad(gamePad.keys, gamePad.names);
    // Set assets loading
    app.loadAssets(assetInfo);

    // Run
    app.run();
}
