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

    public getWinnerHouse(): string   {
        const winner: number = this.getMaxScore()
        let winnerHouse: string = ""
        switch (winner) {
            case this.g:
                if (winnerHouse.length === 0) {
                    winnerHouse += "Gryffindor"
                } else {
                    winnerHouse += " & Gr"
                }

            case this.r:
                if (winnerHouse.length === 0) {
                    winnerHouse += "Ravenclaw"
                } else {
                    winnerHouse += " & Ravenclaw"
                }
            
            case this.h:
                if (winnerHouse.length === 0) {
                    winnerHouse += "Hufflepuff"
                } else {
                    winnerHouse += " & Hufflepuff"
                }
        
            case this.s:
                if (winnerHouse.length === 0) {
                    winnerHouse += "Slytherin"
                } else {
                    winnerHouse += " & Slytherin"
                }
                break;
            default:
                break;
        }
        return winnerHouse
    }

    public getMaxScore(scores: Scores): number  {
        return Math.max(this.g, this.r, this.h, this.s)
    }


}