import { MIGRATE_METHOD_MAP, SupportComponents } from '../src';
import { typeOf } from '../src/utils';

const TEST_MODULES: SupportComponents[] = [
  'framework',
  'scf',
  'apigateway',
  'website',
  'postgresql',
  'vpc',
];

describe('Migrate test', () => {
  TEST_MODULES.forEach(async (module: SupportComponents) => {
    test(`[${module}] should migrate config file success`, async () => {
      /* eslint-disable @typescript-eslint/no-var-requires */
      const source = require(`./fixtures/${module}/source.ts`).default;
      const result = require(`./fixtures/${module}/result.ts`).default;
      const migrateMethod = MIGRATE_METHOD_MAP[module];

      expect(typeOf(migrateMethod)).toBe('Function');
      expect(migrateMethod(source.inputs)).toEqual(result.inputs);
    });
  });
});
