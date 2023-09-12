import { inject, injectable } from "inversify";
import { NamedWorkRepository } from "../../../../domain/model/ct/named-work/named-work-repository";
import { Settings } from "../../../../domain/model/config/settings";
import { NamedWork } from "../../../../domain/model/ct/named-work/named-work";

@injectable()
export class NamedWorkTransfer implements NamedWorkRepository {
    constructor(
        @inject(Symbol.for('Settings'))
        settings: Settings
    ) { }

    public allOf(): { [index: string]: NamedWork } {
        // TODO 実装。
        return { name: { id: 'test' } }
    }
}
