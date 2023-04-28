// Variable regardant le mode de couleur de l'utilisateur
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const canva = document.getElementById("monster");
let textNom = false;

function start() {
    // Définition de la couleur de fond en fonction du mode de couleur de l'utilisateur
    const bg = mediaQuery.matches ? [22, 22, 35] : [255, 255, 255];

    // Définition du canva spécial Kaboom
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
        "dino-pink.png",
        "dino-orange.png",
        "dino-black.png",
        "dino-white.png",
    ];

    // Définition de l'animation du monstre
    loadSprite("dino", `images/${dinos[Math.floor(Math.random() * dinos.length)]}`, {
        sliceX: 13,
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
            "sleep" : {
                from: 8,
                to: 11,
                speed: 1,
                loop: true,
            },
            "dead" : 12
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
    monster.play("idle");

    function makeMonsterName() {
        if (nom && !textNom) {
            add([
                text(nom, {
                    size: 18,
                    font: "apl386",
                }),
                pos(center().sub(0, 50)),
                origin("center"),
                scale(1),
                color(255, 255, 255),
            ]);
            textNom = true;
        }
    }
    window.makeMonsterName = makeMonsterName;

    function makeMonsterMoney() {
        monster.scaleTo(vec2(money / 40 + 4));
    }
    window.makeMonsterMoney = makeMonsterMoney;
    
    // Quand on clique dans la fenêtre, on lance la fonction makeMonsterMoney() qui permet de faire grossir le monstre en fonction de l'argent
    document.addEventListener('click', () => {
        makeMonsterMoney();
    });

    // On définit une fonction qui permet de lancer l'animation course du monstre
    function makeMonsterRun() {
        monster.play("run");
        setTimeout(() => {
            monster.play("idle");
        }, 3000);
    }
    window.makeMonsterRun = makeMonsterRun;

    // On définit une fonction qui permet de lancer l'animation sommeil du monstre
    function makeMonsterSleep() {
        monster.play("sleep");
        setTimeout(() => {
            monster.play("idle");
        }, 7000);
    }
    window.makeMonsterSleep = makeMonsterSleep;

    // On définit une fonction qui permet de lancer l'animation combat du monstre
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

    // On définit une fonction qui permet de lancer l'animation mort du monstre
    function makeMonsterDead() {
        monster.play("dead");
    }
    window.makeMonsterDead = makeMonsterDead;
}

// Fonction qui permet de détruire et reconstruire le monstre
function kaboomreload() {
    destroy();
    textNom = false;
    start();
    makeMonsterName();
}

// Pour des raisons de protocoles CORS
// On réagit en fonction du protocole de la page
switch (window.location.protocol) {
    case 'http:':
    case 'https:':
        // Fonction qui détruit tout l'avatar du monstre lors d'un changement de mode de couleur
        mediaQuery.addEventListener('change', () => {
            kaboomreload();
        });

        // Lancement de la fonction start() au chargement de la page
        start();
        break;

    case 'file:':
        // Si on est en local, on remplace le monstre par une image
        document.getElementById("monster").remove();
        const image = document.createElement("img");
        let getWrapper = document.getElementById("wrapper");
        image.src = "images/dinoPlaceHolder.png";
        image.style.maxHeight = "150px";
        image.style.maxWidth = "150px";
        image.style.transform = "scale(4)";
        getWrapper.insertBefore(image, getWrapper.childNodes[0]);
        break;
        
    default:
        // On ne fait rien puisque le protocole n'est pas reconnu
        break;
}