import { inject, injectable } from "inversify";
import { NamedWorkRepository } from "../../../../domain/model/ct/named-work/named-work-repository";
import { Settings } from "../../../../domain/model/config/settings";

@injectable()
export class NamedWorkTransfer implements NamedWorkRepository {
    constructor(
        @inject(Symbol.for('Settings'))
         settings: Settings
    ) { }
}