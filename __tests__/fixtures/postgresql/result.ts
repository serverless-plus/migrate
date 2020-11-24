export default {
  component: 'postgresql',
  name: 'demo',
  org: 'test',
  app: 'demoApp',
  stage: 'dev',
  inputs: {
    region: 'ap-guangzhou',
    zone: 'ap-guangzhou-2',
    name: 'serverlessDB',
    vpc: {
      vpcId: 'vpc-123',
      subnetId: 'subnet-123',
    },
    publicAccess: false,
    projectId: 0,
    version: 10.4,
    charset: 'UTF8',
  },
};
