export interface ScoresInterface    {
    g: number;
    r: number;
    h: number;
    s: number;
    addScores(newScores: ScoresInterface): ScoresInterface
    getWinnerHouse(): string
    getMaxScore(): number

}