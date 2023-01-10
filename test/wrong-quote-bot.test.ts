import { expect as expectCDK, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as WrongQuoteBot from "../lib/wrong-quote-bot-stack";

test("Lambda Created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new WrongQuoteBot.WrongQuoteBotStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::Lambda::Function", {
      FunctionName: "WrongQuoteBot",
    })
  );
});

test("Cloudwatch Event Created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new WrongQuoteBot.WrongQuoteBotStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(
    haveResource("AWS::Events::Rule", {
      ScheduleExpression: "cron(0 0/1 * * ? *)",
    })
  );
});
