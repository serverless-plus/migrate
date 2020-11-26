import { typeOf, deepClone } from '@ygkit/object';
import { AnyObject } from '../typings';
import { isEmptyObject } from '../utils';
import { migrateFaas } from './faas';
import { migrateApigw } from './apigw';
import { migrateStatic } from './static';

function clearInvalidProps(obj: AnyObject, props: string[]) {
  props.forEach((p: string) => {
    delete obj[p];
  });
}

/**
 * migrate framework configs
 * @param oldConfigs framework inputs in yaml file
 */
function migrateFramework(oldConfigs: AnyObject): AnyObject {
  const newConfigs: AnyObject = deepClone(oldConfigs);
  if (oldConfigs.region) {
    newConfigs.region = oldConfigs.region;
  }
  if (oldConfigs.entryFile) {
    newConfigs.entryFile = oldConfigs.entryFile;
  }
  if (typeOf(oldConfigs.src) === 'String') {
    newConfigs.src = {
      src: oldConfigs.src,
    };
  } else {
    newConfigs.src = oldConfigs.src;
  }

  // faas
  const faasConfig = migrateFaas(oldConfigs, oldConfigs.faas || oldConfigs.functionConf);
  // apigw
  const apigwConfig = migrateApigw(oldConfigs, oldConfigs.apigw || oldConfigs.apigatewayConf);
  // static
  const staticConfig = migrateStatic(oldConfigs.staticConf || oldConfigs.static);

  if (!isEmptyObject(faasConfig)) {
    newConfigs.faas = faasConfig;
  }
  if (!isEmptyObject(apigwConfig)) {
    newConfigs.apigw = apigwConfig;
  }
  if (!isEmptyObject(staticConfig)) {
    newConfigs.static = staticConfig;
  }

  // clear global old configs
  const InvalidProps = [
    'functionName',
    'layers',
    'runtime',
    'functionConf',
    'serviceId',
    'serviceName',
    'serviceDesc',
    'apigatewayConf',
    'staticConf',
  ];
  clearInvalidProps(newConfigs, InvalidProps);

  return newConfigs;
}

export { migrateFramework };
