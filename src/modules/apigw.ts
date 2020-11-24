import { AnyObject } from '../typings';
import { deepClone, isUndefined, addProperty } from '../utils';

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

export { migrateApigw };
