import { injectable } from 'inversify';

@injectable()
export class CollectCommand {
    public execute(): number {
        console.log('コマンドの中身が実行されました。 TODO 実装。');
        return 0;
    }
}
