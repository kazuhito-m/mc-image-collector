import { inject, injectable } from "inversify";
import { NamedWorkRepository } from "../../../domain/model/ct/named-work/named-work-repository";

@injectable()
export class SiteMetadataDownlaodService {
    constructor(
        @inject(Symbol.for('NamedWorkRepository'))
        private namedWorkRepository: NamedWorkRepository
    ) { }
}