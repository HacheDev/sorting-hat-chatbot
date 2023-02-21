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

    /**
     * Add scores values to current Scores
     * @param {Scores} newScores 
     * @returns {Scores}
     */
    public addScores(newScores: Scores): Scores {
        this.g += newScores.g
        this.r += newScores.r
        this.h += newScores.h
        this.s += newScores.s
        return this
    }

    /**
     * Returns name of house with the most points
     * @returns {string}
     */
    public getWinnerHouse(): string   {
        const winner: number = this.getMaxScore()
        let winnerHouse: string = ""
        switch (winner) {
            case this.g:
                winnerHouse += "Gryffindor"
                break;

            case this.r:
                    winnerHouse += "Ravenclaw"
                    break;
            
            case this.h:
                    winnerHouse += "Hufflepuff"
                    break;

        
            case this.s:
                winnerHouse += "Slytherin"
                break;
                
            default:
                break;
        }
        return winnerHouse
    }

    /**
     * Get maximum score
     * @returns {number}
     */
    public getMaxScore(): number  {
        return Math.max(this.g, this.r, this.h, this.s)
    }


}