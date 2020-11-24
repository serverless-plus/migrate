import { AnyObject } from './typings';
import {
  migrateFaas,
  migrateApigw,
  migrateWebsite,
  migrateFramework,
  migratePostgresql,
  migrateVpc,
} from './modules';

interface MigrateMethodMap {
  scf: (a: AnyObject, b?: AnyObject) => AnyObject;
  website: (a: AnyObject, b?: AnyObject) => AnyObject;
  apigateway: (a: AnyObject, b?: AnyObject) => AnyObject;
  framework: (a: AnyObject, b?: AnyObject) => AnyObject;
  postgresql: (a: AnyObject, b?: AnyObject) => AnyObject;
  vpc: (a: AnyObject, b?: AnyObject) => AnyObject;
}

const MIGRATE_METHOD_MAP = {
  scf: migrateFaas,
  apigateway: migrateApigw,
  website: migrateWebsite,
  framework: migrateFramework,
  postgresql: migratePostgresql,
  vpc: migrateVpc,
};

export type SupportComponents = keyof MigrateMethodMap;

export { MIGRATE_METHOD_MAP, migrateFramework, migrateFaas, migrateApigw, migrateWebsite };
