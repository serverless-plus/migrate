import { AnyObject } from '../typings';
import { deepClone, isUndefined } from '../utils';

/**
 * migrate vpc component
 * @param oldConfigs vpc configs
 */
function migratePostgresql(oldConfigs: AnyObject): AnyObject {
  const pgConfig = deepClone(oldConfigs || {});
  if (pgConfig.dbInstanceName) {
    pgConfig.name = pgConfig.dbInstanceName;
    delete pgConfig.dbInstanceName;
  }
  if (pgConfig.dbVersion) {
    pgConfig.version = pgConfig.dbVersion;
    delete pgConfig.dbVersion;
  }
  if (pgConfig.dbCharset) {
    pgConfig.charset = pgConfig.dbCharset;
    delete pgConfig.dbCharset;
  }
  if (!isUndefined(pgConfig.extranetAccess)) {
    pgConfig.publicAccess = pgConfig.extranetAccess;
    delete pgConfig.extranetAccess;
  }

  if (pgConfig.vpcConfig) {
    pgConfig.vpc = pgConfig.vpcConfig;
    delete pgConfig.vpcConfig;
  }

  return pgConfig;
}

export { migratePostgresql };
