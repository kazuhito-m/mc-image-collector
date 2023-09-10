import { Container } from 'inversify';

import { SettingRepository } from './domain/model/config/setting-repository';
import { SettingDatasource } from './infrastracture/datasource/config/setting-datasource';
import { NamedWorkRepository } from './domain/model/ct/named-work/named-work-repository';
import { NamedWorkTransfer } from './infrastracture/http-transfer/ct/named-work/named-work-transfer';
import { Settings } from './domain/model/config/settings';
import { CollectCommand } from './presentation/command/collect-command';

export class DIContainerFactory {
    public create(settings: Settings): Container {
        const c = new Container();

        c.bind<Settings>(Symbol.for('Settings')).toConstantValue(settings);

        c.bind<CollectCommand>(Symbol.for('CollectCommand')).toSelf();

        c.bind<SettingRepository>(Symbol.for('SettingRepository')).to(SettingDatasource);
        c.bind<NamedWorkRepository>(Symbol.for('NamedWorkRepository')).to(NamedWorkTransfer);

        return c;
    }
}