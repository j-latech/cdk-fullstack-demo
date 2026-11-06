import { App, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi, LambdaIntegration } from '@aws-cdk/aws-apigatewayv2-alpha';
import { Runtime, Code, Function as LambdaFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

class ApiStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloFn = new LambdaFunction(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_18_X,
      entry: 'backend/src/handlers/hello.ts',
      handler: 'handler',
      bundling: {
        externalModules: ['aws-sdk'],
      },
    });

    const api = new LambdaRestApi(this, 'Api', {
      handler: helloFn,
      proxy: false,
    });

    api.addRoutes({
      path: '/hello',
      methods: ['GET'],
      integration: new LambdaIntegration(helloFn),
    });
  }
}

const app = new App();
new ApiStack(app, 'ApiStack');
