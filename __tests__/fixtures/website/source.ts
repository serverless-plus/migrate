export default {
  component: 'website',
  name: 'websitedemo',
  org: 'test',
  app: 'websiteApp',
  stage: 'dev',
  inputs: {
    src: {
      src: './src',
      index: 'index.html',
      error: 'index.html',
    },
    region: 'ap-guangzhou',
    bucketName: 'my-bucket',
    replace: false,
    hosts: [
      {
        host: 'abc.com',
      },
    ],
  },
};
