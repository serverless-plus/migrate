export default {
  org: 'orgDemo',
  app: 'appDemo',
  stage: 'dev',
  component: 'apigateway',
  name: 'apigatewayDemo',
  inputs: {
    region: 'ap-guangzhou',
    serviceId: 'service-abcdef',
    serviceName: 'apigateway_demo',
    environment: 'release',
    description: 'apigw desc',
    protocols: ['http', 'https'],
    netTypes: ['OUTER', 'INNER'],
    customDomains: [
      {
        domain: 'abc.com',
        certificateId: 'abcdefg',
        isDefaultMapping: false,
        pathMappingSet: [
          {
            path: '/',
            environment: 'release',
          },
        ],
        protocols: ['http', 'https'],
      },
    ],
    endpoints: [
      {
        path: '/',
        method: 'ANY',
        apiId: 'api-abcdef',
        apiName: 'apidemo',
        description: 'api desc',
        serviceTimeout: 10,
        enableCORS: true,
        function: {
          isIntegratedResponse: true,
          functionQualifier: '$LATEST',
          functionName: 'myFunction',
        },
      },
    ],
  },
};
