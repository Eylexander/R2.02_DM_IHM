let nom, life, money, awake;

// Fonction qui initialise l'etat du monstre
function init(n, l, m) {
    nom = n;
    life = l;
    money = m;
    awake = true;
    return showme();
}

// Fonction qui affiche les stats du monstre
function showme() {
    // return `Nom : ${nom}    Vie : ${life}   Argent : ${money}`;
    return alert(`Nom : ${nom}    Vie : ${life}   Argent : ${money}`);
}