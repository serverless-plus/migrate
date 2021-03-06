export default {
  org: 'orgDemo',
  app: 'appDemo',
  stage: 'dev',
  component: 'express',
  name: 'expressDemo',
  inputs: {
    src: {
      src: './',
      exclude: ['.env'],
    },
    framework: 'express',
    region: 'ap-guangzhou',
    functionName: 'expressDemo',
    layers: [
      {
        name: 'layer-test',
        version: 1,
      },
    ],
    serviceId: 'service-abcdefg',
    serviceName: 'express_api',
    functionConf: {
      timeout: 10,
      environment: {
        variables: {
          TEST: 1,
        },
      },
      tags: {
        TEST: 1,
      },
    },
    apigatewayConf: {
      enableCORS: true,
      serviceDesc: 'test',
      protocols: ['http', 'https'],
      customDomains: [
        {
          domain: 'abc.com',
          certificateId: 'abcdef',
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
    },
    staticConf: {
      cosConf: {
        bucket: 'static-bucket',
        acl: {
          permissions: 'public-read',
        },
        sources: [
          {
            src: '.next/static',
            targetDir: '/_next/static',
          },
          {
            src: 'public',
            targetDir: '/',
          },
        ],
      },
      cdnConf: {
        area: 'mainland',
        domain: 'abc.com',
        autoRefresh: true,
        refreshType: 'delete',
        https: {
          http2: 'on',
          certId: 'abc',
          forceRedirect: {
            switch: 'on',
            redirectType: 'https',
            redirectStatusCode: 301,
          },
        },
      },
    },
  },
};
