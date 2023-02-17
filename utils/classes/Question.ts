import { AnswerInterface } from "~~/utils/interfaces/AnswerInterface";
import { QuestionInterface } from "~~/utils/interfaces/QuestionInterface";

export default class Question implements QuestionInterface  {
    title: string
    answers: AnswerInterface[]

    constructor(title: string, answers: AnswerInterface[])  {
        this.title = title;
        this.answers = answers;
    }
}