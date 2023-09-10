import { inject, injectable } from 'inversify';
import { SiteMetadataDownlaodService } from '../../application/service/ct/site-metadata-download-service';

@injectable()
export class CollectCommand {
    constructor(
        @inject(Symbol.for('SiteMetadataDownlaodService'))
        siteMetadataDownlaodService: SiteMetadataDownlaodService
    ) { }

    public execute(): number {
        console.log('コマンドの中身が実行されました。 TODO 実装。');
        return 0;
    }
}
