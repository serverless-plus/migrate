export default {
  component: 'vpc',
  name: 'vpcDemo',
  org: 'orgDemo',
  app: 'appDemo',
  stage: 'dev',
  inputs: {
    region: 'ap-guangzhou',
    zone: 'ap-guangzhou-2',
    vpcName: 'serverless',
    subnetName: 'serverless',
    cidrBlock: '10.0.0.0/16',
    enableMulticast: 'FALSE',
    enableSubnetBroadcast: 'FALSE',
    dnsServers: ['127.0.0.1'],
    domainName: 'demo',
    tags: [
      {
        key: 'City',
        value: 'guangzhou',
      },
    ],
    subnetTags: [
      {
        key: 'City',
        value: 'guangzhou',
      },
    ],
  },
};
