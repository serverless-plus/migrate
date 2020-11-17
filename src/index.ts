import { AnyObject } from './typings';

import { deepClone, typeOf, isUndefined, isEmptyObject } from './utils';

function addProperty(obj: AnyObject, prop: string, value: any) {
  if (!isUndefined(value)) {
    obj = obj || {};
    obj[prop] = value;
    return obj;
  }
}

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

/**
 * migrae apigateway config
 * @param oldConfigs inputs in yaml file
 * @param oldApigwConfigs apigw config in yaml file
 */
function migrateApigw(oldConfigs: AnyObject, oldApigwConfigs?: AnyObject): AnyObject {
  const apigwConfig = deepClone(oldApigwConfigs || oldConfigs || {});

  if (apigwConfig.serviceId || oldConfigs.serviceId) {
    addProperty(apigwConfig, 'id', apigwConfig.serviceId || oldConfigs.serviceId);
    delete apigwConfig.serviceId;
  }

  if (apigwConfig.serviceName || oldConfigs.serviceName) {
    addProperty(apigwConfig, 'name', apigwConfig.serviceName || oldConfigs.serviceName);
    delete apigwConfig.serviceName;
  }

  if (apigwConfig.serviceDesc || oldConfigs.serviceDesc) {
    addProperty(apigwConfig, 'description', apigwConfig.serviceDesc || oldConfigs.serviceDesc);
    delete apigwConfig.serviceDesc;
  }

  if (apigwConfig.serviceTimeout) {
    addProperty(apigwConfig, 'timeout', apigwConfig.serviceTimeout);
    delete apigwConfig.serviceTimeout;
  }

  if (!isUndefined(apigwConfig.enableCORS)) {
    addProperty(apigwConfig, 'cors', apigwConfig.enableCORS);
    delete apigwConfig.enableCORS;
  }

  if (apigwConfig.customDomains) {
    const domains = deepClone(apigwConfig.customDomains);
    apigwConfig.customDomains = domains.map((item: AnyObject) => {
      if (item.certificateId) {
        // old config, directly return
        return {
          domain: item.domain,
          certId: item.certificateId,
          customMap: !item.isDefaultMapping,
          pathMap: item.pathMappingSet,
          protocols: item.protocols,
        };
      }
      return item;
    });
  }

  if (apigwConfig.endpoints && apigwConfig.endpoints.length > 0) {
    let apis = deepClone(apigwConfig.endpoints);
    apis = apis.map((item: AnyObject) => {
      if (item.apiId) {
        item.id = item.apiId;
        delete item.apiId;
      }
      if (item.apiName) {
        item.name = item.apiName;
        delete item.apiName;
      }
      if (item.apiDesc) {
        item.description = item.apiDesc;
        delete item.apiDesc;
      }
      if (item.serviceTimeout) {
        item.timeout = item.serviceTimeout;
        delete item.serviceTimeout;
      }
      if (!isUndefined(item.enableCORS)) {
        item.cors = item.enableCORS;
        delete item.enableCORS;
      }
      return item;
    });
    apigwConfig.apis = apis;
    delete apigwConfig.endpoints;
  }

  return apigwConfig;
}

/**
 * migrate faas config
 * @param oldConfigs inputs in yaml file
 * @param oldFaasConfigs faas config in yaml file
 */
function migrateFaas(oldConfigs: AnyObject, oldFaasConfigs?: AnyObject): AnyObject {
  const faasConfig = deepClone(oldFaasConfigs || oldConfigs || {});

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
        envKey: key,
        envVal: val,
      };
    });
    delete faasConfig.environment;
  }

  if (faasConfig.tags) {
    const tags = deepClone(faasConfig.tags);
    faasConfig.tags = Object.entries(tags).map(([key, val]) => {
      return {
        tagKey: key,
        tagVal: val,
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

/**
 * migrate static config
 * @param oldConfigs static config in yaml file
 */
function migrateStatic(oldConfigs: AnyObject): AnyObject {
  const staticConfig = deepClone(oldConfigs || {});
  if (staticConfig.cosConf) {
    staticConfig.cos = deepClone(staticConfig.cosConf);
    delete staticConfig.cosConf;
  }

  if (staticConfig.cdnConf) {
    staticConfig.cdn = deepClone(staticConfig.cdnConf);
    delete staticConfig.cdnConf;
  }

  return staticConfig;
}

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

interface MigrateMethodMap {
  scf: (a: AnyObject, b?: AnyObject) => AnyObject;
  website: (a: AnyObject, b?: AnyObject) => AnyObject;
  apigateway: (a: AnyObject, b?: AnyObject) => AnyObject;
  framework: (a: AnyObject, b?: AnyObject) => AnyObject;
}

const MIGRATE_METHOD_MAP = {
  scf: migrateFaas,
  apigateway: migrateApigw,
  website: migrateWebsite,
  framework: migrateFramework,
};

export type SupportComponents = keyof MigrateMethodMap;

export { MIGRATE_METHOD_MAP, migrateFramework, migrateFaas, migrateApigw, migrateWebsite };
