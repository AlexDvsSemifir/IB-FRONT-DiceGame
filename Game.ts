import Cup from "./Cup";
import Dice from "./Dice";
import Player from "./Player";

export default class Game {
    private _players: Player[] = [];
    private _cup!: Cup;

    get numberOfTurns(): number {
        return this._players.length + 1;
    }

    get numberOfPlayers(): number {
        return this._players.length;
    }

    /**
     * Initialise la partie
     * @param names noms des joueurs
     */
    public initGame(...names: string[]): void {
        this._cup = new Cup();
        this.createPlayers(...names);
        this.createDices();
    }

    /**
     * Créé autant de joueurs que de noms dans la liste donnée
     * @param names noms des joueurs
     */
    private createPlayers(...names: string[]): void {
        names.forEach(name => this._players.push(new Player(name)));
    }

    /**
     * Créé autant de dés que de joueurs dans la partie
     */
    private createDices(): void {
        // Boucle for pour créer autant de dés que de joueurs
        for (let i = 0; i < this.numberOfPlayers; i++) {
            // Qu'on ajoute dans le gobelet au fur et à mesure
            this._cup.addDices(new Dice())
        }
    }
}