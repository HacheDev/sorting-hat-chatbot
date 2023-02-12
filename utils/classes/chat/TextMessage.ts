import { TextMessageInterface } from "../../interfaces/chat/TextMessageInterface";

export default class TextMessage implements TextMessageInterface {

    type: string = ""
    content: string = ""
  
    constructor(type: string, content: string) {
      this.type = type;
      this.content = content;
    }
  }