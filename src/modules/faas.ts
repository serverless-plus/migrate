import { AnyObject } from '../typings';
import { typeOf, deepClone, addProperty } from '../utils';
import { migrateApigw } from './apigw';

/**
 * migrate faas config
 * @param oldConfigs inputs in yaml file
 * @param oldFaasConfigs faas config in yaml file
 */
function migrateFaas(oldConfigs: AnyObject, oldFaasConfigs?: AnyObject): AnyObject {
  const faasConfig = deepClone(oldFaasConfigs || oldConfigs || {});

  if (typeOf(faasConfig.src) === 'String') {
    faasConfig.src = {
      src: faasConfig.src,
    };
  } else {
    faasConfig.src = faasConfig.src;
  }

  if (faasConfig.functionName || oldConfigs.functionName) {
    addProperty(faasConfig, 'name', oldConfigs.functionName || oldConfigs.functionName);
    delete faasConfig.functionName;
  }

  if (oldConfigs.runtime) {
    addProperty(faasConfig, 'runtime', oldConfigs.runtime);
  }

  if (oldConfigs.layers) {
    addProperty(faasConfig, 'layers', oldConfigs.layers);
  }

  if (faasConfig.environment && faasConfig.environment.variables) {
    const { variables } = deepClone(faasConfig.environment);
    faasConfig.environments = Object.entries(variables).map(([key, val]) => {
      return {
        key: key,
        value: val,
      };
    });
    delete faasConfig.environment;
  }

  if (faasConfig.tags) {
    const tags = deepClone(faasConfig.tags);
    faasConfig.tags = Object.entries(tags).map(([key, val]) => {
      return {
        key: key,
        value: val,
      };
    });
  }

  if (faasConfig.vpcConfig) {
    faasConfig.vpc = deepClone(faasConfig.vpcConfig);
    delete faasConfig.vpcConfig;
  }

  // transfer events -> triggers
  if (faasConfig.events && faasConfig.events.length > 0) {
    const events = deepClone(faasConfig.events);
    const newEvents: AnyObject[] = [];
    events.forEach((item: AnyObject) => {
      Object.entries(item).forEach(([key, value]) => {
        let triggerConfigs = value.parameters || value;
        if (key === 'apigw') {
          triggerConfigs = migrateApigw(triggerConfigs);
        }
        newEvents.push({
          type: key,
          ...(triggerConfigs as AnyObject),
        });
      });
    });
    faasConfig.triggers = newEvents;
    delete faasConfig.events;
  }

  return faasConfig;
}

export { migrateFaas };
