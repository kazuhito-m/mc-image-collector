import { inject, injectable } from "inversify";
import { NamedWorkRepository } from "../../../../domain/model/ct/named-work/named-work-repository";
import { Settings } from "../../../../domain/model/config/settings";
import { NamedWork } from "../../../../domain/model/ct/named-work/named-work";
import { HttpRequester } from "./http-requester";

@injectable()
export class NamedWorkTransfer implements NamedWorkRepository {
    constructor(
        @inject(Symbol.for('HttpRequester'))
        private requester: HttpRequester,
        @inject(Symbol.for('Settings'))
        private settings: Settings
    ) { }

    public async allOf(): Promise<{ [index: string]: NamedWork }> {
        // TODO 実装。
        const text = await this.requester.httpsGetTextOf('https://comic-trail.com/series');
        console.log(text);
        return { name: { id: 'test' } }
    }
}
