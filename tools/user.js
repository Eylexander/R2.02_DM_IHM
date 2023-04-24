// Variable regardant le mode de couleur de l'utilisateur
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const canva = document.getElementById("monster");

// Fonction qui défini tout l'avatar du monstre mais qui peut être rappelé à chaque changement de mode de couleur
function start() {
    // Définition de la couleur de fond en fonction du mode de couleur de l'utilisateur
    const bg = mediaQuery.matches ? [22, 22, 35] : [255, 255, 255];

    // Définition de la taille de la fenêtre
    kaboom({
        fullscreen: false,
        canvas: canva,
        background: bg,
        scale: 2,
        width: 128,
        height: 128,
    });

    // Liste des sprites du monstre
    dinos = [
        "dino-lime.png",
        "dino-blue.png",
        "dino-red.png",
        "dino-yellow.png",
        "dino-green.png",
    ];

    // Définition de l'animation du monstre
    // loadSprite("dino", `images/${dinos[Math.floor(Math.random() * dinos.length)]}`, {
    loadSprite("dino", `images/dino.png`, {
        sliceX: 9,
        anims: {
            "idle" : {
                from: 0,
                to: 3,
                speed: 3,
                loop: true,
            },
            "run" : {
                from: 4,
                to:7,
                speed: 3,
                loop: true,
            },
            "jump" : 8
        },
    });

    // Définition de l'effet de shader
    loadShader("invert", null, `
uniform float u_time;

vec4 frag(vec3 pos, vec2 uv, vec4 color, sampler2D tex) {
	vec4 c = def_frag();
	float t = (sin(u_time * 4.0) + 1.0) / 2.0;
	return mix(c, vec4(1.0 - c.r, 1.0 - c.g, 1.0 - c.b, c.a), t);
}
`)

    // Définition de l'objet monstre
    const monster = add([
        sprite("dino"),
        pos(center()),
        origin("center"),
        scale(4),
        shader("invert", {
            "u_time": time(),
        }),
        "monster",
    ]);

    monster.shader = null;

    // Définition de l'animation du monstre
    monster.play("idle");

    
    // Définition des évènements clavier
    document.addEventListener('click', () => {
        monster.scaleTo(vec2(money / 40 + 4));
    });

    // Jouer l'animation de course du monstre quand la fonction run() est appelée
    function makeMonsterRun() {
        monster.play("run");
        setTimeout(() => {
            monster.play("idle");
        }, 3000);
    }

    // Exporter la fonction makeMonsterRun() pour pouvoir l'appeler dans game.js
    window.makeMonsterRun = makeMonsterRun;

    // Jouer l'animation de sleep du monstre quand la fonction sleep() est appelée
    function makeMonsterSleep() {
        monster.play("sleep");
        setTimeout(() => {
            monster.play("idle");
        }, 7000);
    }
    window.makeMonsterSleep = makeMonsterSleep;

    // Jouer l'animation d'attaque du monstre quand la fonction fight() est appelée
    function makeMonsterFight() {
        monster.shader = "invert";
        monster.onUpdate(() => {
            monster.uniform["u_time"] = time();
        });
        setTimeout(() => {
            monster.shader = null;
        }, 1500);
    }
    window.makeMonsterFight = makeMonsterFight;

    // Jouer l'animation de mort du monstre quand la fonction kill() est appelée
    function makeMonsterDead() {
        monster.play("dead");
    }
    window.makeMonsterDead = makeMonsterDead;
}

// Fonction qui détruit tout l'avatar du monstre lors d'un changement de mode de couleur
mediaQuery.addEventListener('change', () => {
    destroy();
    start();
});

// Lancement de la fonction start()
start();

// Resolution de CORS
// var ctx = canva.getContext('2d');