import { AnyObject } from '../typings';
import { deepClone } from '../utils';

/**
 * migrate vpc component
 * @param oldConfigs vpc configs
 */
function migrateVpc(oldConfigs: AnyObject): AnyObject {
  const vpcConfig = deepClone(oldConfigs || {});
  if (vpcConfig.tags) {
    vpcConfig.tags = vpcConfig.tags.map((item: AnyObject) => {
      return {
        key: item.Key,
        value: item.Value,
      };
    });
  }
  if (vpcConfig.subnetTags) {
    vpcConfig.subnetTags = vpcConfig.subnetTags.map((item: AnyObject) => {
      return {
        key: item.Key,
        value: item.Value,
      };
    });
  }

  return vpcConfig;
}

export { migrateVpc };
