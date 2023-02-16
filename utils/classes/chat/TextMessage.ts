import { TextMessageInterface } from "../../interfaces/chat/TextMessageInterface";

export default class TextMessage implements TextMessageInterface {

    owner: string = ""
    content: string = ""
    time: string = ""
  
    constructor(owner: string, content: string, time: string) {
      this.owner = owner;
      this.content = content;
      this.time = time;
    }
  }