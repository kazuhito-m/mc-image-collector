import { inject, injectable } from 'inversify';
import { SiteMetadataDownlaodService } from '../../application/service/ct/site-metadata-download-service';

@injectable()
export class CollectCommand {
    constructor(
        @inject(Symbol.for('SiteMetadataDownlaodService'))
        private readonly siteMetadataDownlaodService: SiteMetadataDownlaodService
    ) { }

    public async execute(): Promise<number> {
        const siteMetaData = this.siteMetadataDownlaodService.loadSiteMetadata();

        console.log(JSON.stringify(siteMetaData));

        return 0;
    }
}
