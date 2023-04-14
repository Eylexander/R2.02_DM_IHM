kaboom({
    fullscreen: false,
    canvas: document.getElementById("monster"),
});

loadSprite("monster", "./images/favicon.ico");

add([
    sprite("monster"),
    pos(0, 0),
    scale(16),
    "monster",
]);