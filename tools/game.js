let nom, life, money, awake;

// Récupération des éléments du DOM
let b1 = document.getElementById("b1"); // New Life
let b2 = document.getElementById("b2"); // Run
let b3 = document.getElementById("b3"); // Fight
let b4 = document.getElementById("b4"); // Sleep
let b5 = document.getElementById("b5"); // Eat
let b6 = document.getElementById("b6"); // Show
let b7 = document.getElementById("b7"); // Work
let k = document.getElementById("k");   // Kill

let actionbox = document.getElementById("actionbox"); // Boite d'action
let status = document.querySelector("#status"); // Boite de status

// Ajout des évènements aux boutons
b1.addEventListener('click', newLife);
b2.addEventListener('click', run);
b3.addEventListener('click', fight);
b4.addEventListener('click', sleep);
b5.addEventListener('click', eat);
b6.addEventListener('click', showme);
b7.addEventListener('click', work);
k.addEventListener('click', kill);

let events = [sleep, run, fight, eat, work];

// Fonction qui initialise l'etat du monstre
function init(n, l, m) {
    nom = n;
    life = l;
    money = m;
    awake = true;
}

// Fonction qui affiche les stats du monstre
function showme() {
    log(`Nom : ${nom}    Vie : ${life}   Argent : ${money}`);
}

function go() {
    init(prompt("Quel est le nom de votre monstre ?"), 100, 0);
    displayStatus(life, money, awake);
}

// window.onload = go;
init("Dino", 100, 0);

window.addEventListener('load' , () => {
    init ("Dino", 100, 0);
    // go();
    displayStatus(life, money, awake);

    setInterval(() => {
        hasard();
    }, 12000);
});

function log(message) {
    let p = document.createElement("p");
    p.innerHTML = message;
    actionbox.appendChild(p);

    actionbox.scrollTop = actionbox.scrollHeight;
}

function displayStatus(life, money, awake) {
    status.childNodes[1].innerHTML = `Life : ${life}`;
    status.childNodes[3].innerHTML = `Money : ${money}`;
    status.childNodes[5].innerHTML = awake && life > 0 ? "Awake" : life <= 0 ? "Dead" : "Sleeping";

    if (life <= 0) {
        makeMonsterDead();
    }
}

function run() {
    if (!awake) {
        log("Vous êtes endormi...");
    } else if (life <= 0) {
        log("Vous êtes mort...");
    }
    else {
        log("Vous êtes en train de courir...");
        if (life > 0) {
            life -= 1;
        }
    }
    displayStatus(life, money, awake);
    
    // Appel de la fonction makeMonsterRun de user.js
    makeMonsterRun();
}

function fight() {
    if (!awake) {
        log("Vous êtes endormi...");
    } else if (life <= 0) {
        log("Vous êtes mort...");
    }
    else {
        log("Vous êtes en train de combattre...");
        if (life >= 3) {
            life -= 3;
        } else {
            life = 0;
        }
    }
    displayStatus(life, money, awake);

    // Appel de la fonction makeMonsterFight de user.js
    makeMonsterFight();
}

function work() {
    if (!awake) {
        log("Vous êtes endormi...");
    } else if (life <= 0) {
        log("Vous êtes mort...");
    }
    else {
        log("Vous êtes en train de travailler...");
        if (life > 0) {
            life -= 1;
        }
        money += 2;
    }
    displayStatus(life, money, awake);
}

function eat() {
    if (!awake) {
        log("Vous êtes endormi...");
    } else if (life <= 0) {
        log("Vous êtes mort...");
    } else if (money <= 3) {
        log("Vous n'avez pas assez d'argent...");
    }
    else {
        log("Vous êtes en train de manger...");
        if (life <= 98) {
            life += 2;
        } else {
            life = 100;
        }
        money -= 3;
    }
    displayStatus(life, money, awake);
}

function sleep() {
    if (life <= 0) {
        log("Vous êtes mort...");
    } else if (!awake) {
        log("Vous êtes déjà endormi...");
    }
    else {
        log("Vous êtes en train de dormir...");
        awake = false;
        displayStatus(life, money, awake);
        setTimeout(() => {
            log("Vous avez bien dormi, vous avez récupéré 1 point de vie");
            if (life < 100) {
                life += 1;
            }
            awake = true;
        }, 7000);
    }
    displayStatus(life, money, awake);

    // Appel de la fonction makeMonsterSleep de user.js
    makeMonsterSleep();
}

function hasard() {
    let i = Math.floor(Math.random() * events.length);
    events[i]();
}

function kill() {
    life = 0;
    awake = false;
    displayStatus(life, money, awake);
}

function newLife() {
    init(prompt("Quel est le nom de votre monstre ?"), 100, 0);
    displayStatus(life, money, awake);
}