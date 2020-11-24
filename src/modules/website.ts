import { AnyObject } from '../typings';
import { deepClone } from '../utils';

/**
 * migrate website component
 * @param oldConfigs website configs
 */
function migrateWebsite(oldConfigs: AnyObject): AnyObject {
  const websiteConfig = deepClone(oldConfigs || {});
  if (websiteConfig.bucketName) {
    websiteConfig.bucket = websiteConfig.bucketName;
    delete websiteConfig.bucketName;
  }
  if (websiteConfig.hosts) {
    websiteConfig.cdns = websiteConfig.hosts.map((item: AnyObject) => {
      item.domain = item.host;
      delete item.host;
      return item;
    });
    delete websiteConfig.hosts;
  }

  return websiteConfig;
}

export { migrateWebsite };
