import { inject, injectable } from "inversify";
import { NamedWorkRepository } from "../../../domain/model/ct/named-work/named-work-repository";
import { SiteMetadata } from "../../../domain/model/ct/site/site-metadata";

@injectable()
export class SiteMetadataDownlaodService {
    constructor(
        @inject(Symbol.for('NamedWorkRepository'))
        private namedWorkRepository: NamedWorkRepository
    ) { }

    public async loadSiteMetadata(): Promise<SiteMetadata> {
        const namedWorks = await this.namedWorkRepository.allOf();
        return { namedWorks: namedWorks };
    }
}