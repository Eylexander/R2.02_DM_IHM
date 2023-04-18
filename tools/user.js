// Variable regardant le mode de couleur de l'utilisateur
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Fonction qui défini tout l'avatar du monstre mais qui peut être rappelé à chaque changement de mode de couleur
function start() {
    // Définition de la couleur de fond en fonction du mode de couleur de l'utilisateur
    const bg = mediaQuery.matches ? [22, 22, 35] : [255, 255, 255];
    let i = 1;

    // Définition de la taille de la fenêtre
    kaboom({
        fullscreen: false,
        canvas: document.getElementById("monster"),
        background: bg,
        scale: 2,
        width: 128,
        height: 128,
    });

    // Définition de l'animation du monstre
    loadRoot("images/");
    loadSprite("dino", "dino.png", {
        sliceX: 4,
        anims: {
            "idle" : {
                from: 0,
                to: 3,
                speed: 3,
                loop: true,
            },
        },
    });

    // Définition de l'objet monstre
    const monster = add([
        sprite("dino"),
        pos(center()),
        origin("center"),
        scale(i*4),
        "monster",
    ]);

    // Définition de l'animation du monstre
    monster.play("idle");
    
    // Définition des évènements clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            i += 0.1;
            monster.scaleTo(vec2(i));
        }
        if (e.key === 'ArrowDown') {
            i -= 0.1;
            monster.scaleTo(vec2(i));
        }
    });
}

// Fonction qui détruit tout l'avatar du monstre lors d'un changement de mode de couleur
mediaQuery.addEventListener('change', () => {
    destroy();
    start();
});

// Lancement de la fonction start()
start();