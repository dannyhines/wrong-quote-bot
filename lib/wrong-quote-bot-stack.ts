import * as lambda from "@aws-cdk/aws-lambda";
import * as targets from "@aws-cdk/aws-events-targets";
import * as events from "@aws-cdk/aws-events";
import * as cdk from "@aws-cdk/core";
require("dotenv").config();

export class WrongQuoteBotStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET } = process.env;

    const lambdaFunction = new lambda.Function(this, "CryptoTradingBot", {
      code: new lambda.AssetCode("lambda", {
        exclude: ["*.ts", "*.d.ts"],
      }),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      functionName: "WrongQuoteBot",
      environment: {
        TWITTER_API_KEY: TWITTER_API_KEY || "",
        TWITTER_API_SECRET: TWITTER_API_SECRET || "",
        TWITTER_ACCESS_TOKEN: TWITTER_ACCESS_TOKEN || "",
        TWITTER_ACCESS_SECRET: TWITTER_ACCESS_SECRET || "",
      },
    });

    const eventRule = new events.Rule(this, "quoteBotCronJob", {
      schedule: events.Schedule.cron({ minute: "0", hour: "0/3" }),
    });
    eventRule.addTarget(new targets.LambdaFunction(lambdaFunction));
  }
}
