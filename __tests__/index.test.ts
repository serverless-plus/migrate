import { MIGRATE_METHOD_MAP } from '../src';
import { typeOf } from '../src/utils';

// migrate results
import expressSource from './fixtures/express/source';
import expressResult from './fixtures/express/result';
import scfSource from './fixtures/scf/source';
import scfResult from './fixtures/scf/result';
import apigwSource from './fixtures/apigw/source';
import apigwResult from './fixtures/apigw/result';
import websiteSource from './fixtures/website/source';
import websiteResult from './fixtures/website/result';

describe('Migrate command test', () => {
  test(`[framework] should migrate config file success`, async () => {
    const migrateMethod = MIGRATE_METHOD_MAP.framework;

    expect(typeOf(migrateMethod)).toBe('Function');
    expect(migrateMethod(expressSource.inputs)).toEqual(expressResult.inputs);
  });

  test(`[scf] should migrate config file success`, async () => {
    const migrateMethod = MIGRATE_METHOD_MAP.scf;

    expect(typeOf(migrateMethod)).toBe('Function');
    expect(migrateMethod(scfSource.inputs)).toEqual(scfResult.inputs);
  });

  test(`[apigateway] should migrate config file success`, async () => {
    const migrateMethod = MIGRATE_METHOD_MAP.apigateway;

    expect(typeOf(migrateMethod)).toBe('Function');
    expect(migrateMethod(apigwSource.inputs)).toEqual(apigwResult.inputs);
  });

  test(`[website] should migrate config file success`, async () => {
    const migrateMethod = MIGRATE_METHOD_MAP.website;

    expect(typeOf(migrateMethod)).toBe('Function');
    expect(migrateMethod(websiteSource.inputs)).toEqual(websiteResult.inputs);
  });
});
