import { ScoresInterface } from "~~/utils/interfaces/ScoresInterface";
import { AnswerInterface } from "../interfaces/AnswerInterface";

export default class Answer implements AnswerInterface  {

    title: string
    scores: ScoresInterface
  
    constructor(title: string, scores: ScoresInterface) {
      this.title = title;
      this.scores = scores;
    }
  }