//déclaration des variables globales

//éléments screen and memory
const memoireE = document.querySelector("#memory");
const ecranE = document.querySelector("#screen");

//stockage de la valeur de l'écran précédent
let precedent = 0;

//on stock l'affichage
let affichage = "";

//on stock l'opération 
let opération = null;

//on initialise la mémoire
// let memoire;

window.onload = () => {
    //on écoute les clics sur les touches
    let touches = document.querySelectorAll("span");

    for(let touche of touches){
        touche.addEventListener("click",gererTouches);
    }
    
// //recuperation de la memoire
// memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
// if(memoire != 0){
//     memoireE.style.display = "initial";
// }



}
/**
 * cette fonction réagira au clic sur les touches
 */
function gererTouches(){
    let touche = this.innerText;
    //on vérifie si on a appuyé sur un chiffre ou sur un point
    if(parseFloat(touche) >= 0 || touche === "."){
        //on met à jour la valeur de l'affichage sur l'écran
        affichage = (affichage === "" ) ? touche.toString() : affichage + touche.toString();
        ecranE.innerText = affichage;
    }else{
        switch(touche){
            // C permet de réinitialiser
            case "C":
                precedent = 0;
                affichage = "";
                operation = null;
                ecranE.innerText = 0;
            break;
            case "D":
                if(touche === "D"){
                    affichage = affichage.replace(affichage.slice(-1), "");
                    // operation = null;
                    ecranE.innerText = affichage;
                    if(affichage === ""){
                        ecranE.innerText = 0;
                    }
                }
                break;
            // les touches de calcul
            case "*":
            case "+":
            case "-":
            case "/":
                // on calcul la valeur résultat de l'étape précédent
                precedent = (precedent === 0) ? parseFloat(affichage): 
                        calculer(precedent, parseFloat(affichage), operation);
                // on met à jour l'ecran
                ecranE.innerText = precedent;
                // on stock l'opération
                operation = touche;
                // on réinitialise la variable d'affichage
                affichage = "";
                break;
            case "=":
                // on calcul la valeur résultat de l'étape précédent
                precedent = (precedent === 0) ? parseFloat(affichage): 
                        calculer(precedent, parseFloat(affichage), operation);
                // on met à jour l'ecran
                ecranE.innerText = precedent;
                // on stock le résultat dans la variable d'affichage
                affichage = precedent;
                //on réinitialise precedent
                precedent = 0;
                break;
                //gestion de la memoire
                default:
                    
                    break;
        }
    }
}
/**
 * création de fonction pour le calcul
 * @param{number} nb1
 *  @param{numbert} nb2
 *  @param{string} operation
 *  @returns number
 */
function calculer(nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "*") return nb1 * nb2;
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "/") return nb1 / nb2;
}