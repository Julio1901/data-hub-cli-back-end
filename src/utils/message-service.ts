import * as fs from 'fs';
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageService {
    private messages: Record<string, string>

    constructor() {
        const rawData = fs.readFileSync('src/utils/messages.json', 'utf8')
        this.messages = JSON.parse(rawData)
      }

      getMessage(key: string, lang: string = 'en'): string {
        return this.messages[key] || ''
      }
}