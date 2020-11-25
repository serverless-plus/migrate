import { deepClone } from '../utils';
import { AnyObject } from '../typings';

/**
 * migrate static config
 * @param oldConfigs static config in yaml file
 */
function migrateStatic(oldConfigs: AnyObject): AnyObject {
  const staticConfig = deepClone(oldConfigs || {});
  if (staticConfig.cosConf) {
    staticConfig.cos = deepClone(staticConfig.cosConf);
    delete staticConfig.cosConf;

    if (staticConfig.cos.sources) {
      staticConfig.cos.sources = staticConfig.cos.sources.map((item: AnyObject) => ({
        src: item.src,
        target: item.targetDir,
      }));
    }
  }

  if (staticConfig.cdnConf) {
    staticConfig.cdn = deepClone(staticConfig.cdnConf);
    delete staticConfig.cdnConf;
  }

  return staticConfig;
}

export { migrateStatic };
