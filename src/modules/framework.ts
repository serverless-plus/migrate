import { AnyObject } from '../typings';
import { typeOf, isEmptyObject } from '../utils';
import { migrateFaas } from './faas';
import { migrateApigw } from './apigw';
import { migrateStatic } from './static';

/**
 * migrate framework configs
 * @param oldConfigs framework inputs in yaml file
 */
function migrateFramework(oldConfigs: AnyObject): AnyObject {
  const newConfigs: AnyObject = {};
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
  // add srcOriginal
  if (oldConfigs.srcOriginal) {
    newConfigs.srcOriginal = oldConfigs.srcOriginal;
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

  return newConfigs;
}

export { migrateFramework };
