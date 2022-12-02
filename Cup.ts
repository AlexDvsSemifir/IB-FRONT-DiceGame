import Dice from "./Dice";

export default class Cup {
    private _dices: Dice[] = [];

    /**
     * Retourne la valeur totale des dés du gobelet
     */
    get value(): number{
        // Attribut à 0 pour stocker la valeur totale
        let somme = 0;
        // On parcourt le tableau de dés et on ajoute la valeur de chaque dé à la somme
        this._dices.forEach(dice => somme += dice.value);
        // Et on retourne la somme
        return somme;
    }

    /**
     * Retourne la valeur de chaque dès
     */
    get values(): number[] {
        // On créé un tableau vide pour accueillir les valeurs
        let values: number[] = [];
        // On ajoute la valeur de chaque dés dans le tableau
        this._dices.forEach(dice => values.push(dice.value));
        // On retourne le tableau
        return values;
    }

    /**
     * Ajoute des dés au gobelet
     * @param dices Dès à ajouter
     */
    addDices(...dices: Dice[]): void {
        dices.forEach(dice => this._dices.push(dice));
    }

    /**
     * Lance tous les dés du gobelet.
     */
    rollAllDices(): void {
        // On parcourt le tableau de dés et on lance chaque dé
        this._dices.forEach(dice => dice.roll());
    }

    /**
     * Affiche des informations sur le score dans la console.
     */
    showScore(): void {
        console.log(`Score: ${this.value} \nDices: ${this.values}`);
    }
}