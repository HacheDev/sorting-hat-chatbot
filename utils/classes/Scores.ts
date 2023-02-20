import { ScoresInterface } from "../interfaces/ScoresInterface";

export default class Scores implements ScoresInterface  {
    g: number
    r: number
    h: number
    s: number

    public constructor(g: number, r: number, h: number, s: number) {
        this.g = g
        this.r = r
        this.h = h
        this.s = s
    }

    public addScores(newScores: Scores): Scores {
        this.g += newScores.g
        this.r += newScores.r
        this.h += newScores.h
        this.s += newScores.s
        return this
    }


}