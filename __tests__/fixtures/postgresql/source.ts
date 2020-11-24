export default {
  component: 'postgresql',
  name: 'demo',
  org: 'test',
  app: 'demoApp',
  stage: 'dev',
  inputs: {
    region: 'ap-guangzhou',
    zone: 'ap-guangzhou-2',
    dbInstanceName: 'serverlessDB',
    vpcConfig: {
      vpcId: 'vpc-123',
      subnetId: 'subnet-123',
    },
    extranetAccess: false,
    projectId: 0,
    dbVersion: 10.4,
    dbCharset: 'UTF8',
  },
};
