import { ScoresInterface } from "../interfaces/ScoresInterface";

export default class Scores implements ScoresInterface  {
    g: number
    r: number
    h: number
    s: number

    constructor(g: number, r: number, h: number, s: number) {
        this.g = g
        this.r = r
        this.h = h
        this.s = s
    }


}