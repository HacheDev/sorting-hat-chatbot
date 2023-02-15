import { TextMessageInterface } from "../../interfaces/chat/TextMessageInterface";

export default class TextMessage implements TextMessageInterface {

    type: string = ""
    content: string = ""
    time: string = ""
  
    constructor(type: string, content: string, time: string) {
      this.type = type;
      this.content = content;
      this.time = time;
    }
  }