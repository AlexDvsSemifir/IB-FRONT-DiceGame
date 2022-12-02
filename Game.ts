import Cup from "./Cup";
import Dice from "./Dice";
import Player from "./Player";

// On déclare une liste de type de victoire possible
// Cette liste nous servira pour la méthode setWinner
enum VictoryType {
  turn = "turn",
  game = "game",
}

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
    names.forEach((name) => this._players.push(new Player(name)));
  }

  /**
   * Créé autant de dés que de joueurs dans la partie
   */
  private createDices(): void {
    // Boucle for pour créer autant de dés que de joueurs
    for (let index = 0; index < this.numberOfPlayers; index++) {
      // Qu'on ajoute dans le gobelet au fur et à mesure
      this._cup.addDices(new Dice());
    }
  }

  /**
   * Joue une partie complète
   */
  public playGame(): void {
    for (let index = 0; index < this.numberOfTurns; index++) {
      console.log(`=======TOUR ${index + 1}=======`);
      this.playTurn();
    }
    this.setWinner(VictoryType.game);
  }

  /**
   * Chaque joueur lance les des du gobelet, et met à jour son score
   */
  private playTurn(): void {
    for (let player of this._players) {
      player.playTurn(this._cup);
    }
    this.setWinner(VictoryType.turn);
  }

  /**
   * Détermine le joueur qui a le plus gros score de la manche
   * @param type type de victoire (tour ou partie)
   */
  private setWinner(victoryType: VictoryType): void {
    // NB : Faudrait pas découper ça ?!
    // ALED IL Y A TROP DE LIGNES DANS CETTE METHODE
    let winners: Player[] = [this._players[0]];

    if (victoryType === VictoryType.turn){
        for (let player of this._players) {
            if (player.score > winners[0].score) {
                winners = [player];
            } else if (player.score === winners[0].score && player != winners[0]) {
                winners.push(player);
            }
        }
        winners.forEach((winner) => winner.winTurn());

    } else if (victoryType === VictoryType.game){
        for (let player of this._players) {
            if (player.numberOfWinnedTurn > winners[0].numberOfWinnedTurn) {
                winners = [player];
            } else if (player.numberOfWinnedTurn === winners[0].numberOfWinnedTurn && player != winners[0]) {
                winners.push(player);
            }
        }
        winners.forEach((winner) => winner.winGame());
    }
  }
}
