export default {
  org: 'orgDemo',
  app: 'appDemo',
  stage: 'dev',
  component: 'scf',
  name: 'scfDemo',
  inputs: {
    src: {
      src: './',
      exclude: ['.env'],
    },
    region: 'ap-guangzhou',
    name: 'scfDemo',
    layers: [
      {
        name: 'layer-test',
        version: 1,
      },
    ],
    timeout: 10,
    environment: {
      variables: {
        TEST: 1,
      },
    },
    tags: {
      TEST: 1,
    },
    events: [
      {
        timer: {
          parameters: {
            name: 'timer',
            qualifier: '$DEFAULT',
            cronExpression: '*/5 * * * * * *',
            enable: true,
            argument: 'argument',
          },
        },
      },
      {
        apigw: {
          parameters: {
            description: 'test',
            protocols: ['http', 'https'],
            endpoints: [
              {
                path: '/',
                method: 'ANY',
                apiId: 'api-abcdef',
                apiName: 'apidemo',
                serviceTimeout: 10,
                enableCORS: true,
              },
            ],
          },
        },
      },
    ],
  },
};
