export default class Dice {
    private _value: number = 1;

    public get value(): number {
        return this._value;
    }

    /**
     * Retourne une valeur aléatoire entre 1 et 6
     */
    public roll(): void {
        this._value = Math.floor(Math.random() * 6) + 1;
    }
}