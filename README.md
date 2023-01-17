# Wrong Quote Bot

![GitHub repo size](https://img.shields.io/github/repo-size/dannyhines/wrong-quote-bot?style=for-the-badge)
![GitHub repo file count (custom path)](https://img.shields.io/github/directory-file-count/dannyhines/wrong-quote-bot/lambda?label=lambda%20files&style=for-the-badge)
![GitHub](https://img.shields.io/github/license/dannyhines/wrong-quote-bot?style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/dannyhines/wrong-quote-bot?style=for-the-badge)

This is a Twitter bot ([@onlywrongquotes](https://twitter.com/onlywrongquotes)) that publishes random quotes,
quoting the wrong person.

The project is hosted in AWS, and the deployment is implemented with AWS CDK.

The `lib/` folder has the code that creates the stack itself (`WrongQuoteBotStack`) which provisions a
Cloudwatch rule that triggers a lambda function every 2 hours. The lambda gets a random quote, a random name,
and tweets it out.

## Setup

To get access to the [Twitter API](https://developer.twitter.com/en/docs/twitter-api) you'll need to create a
new App with Read and Write access. More info on that
[here](https://developer.twitter.com/en/docs/apps/app-permissions), then create a .env file based on the info
in `.env.example`:

```
TWITTER_API_KEY=
TWITTER_API_SECRET=

TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_SECRET=
```

## Building/Deploying

The lambda code is hosted in the `lambda/` folder - before deploying you'll need to run `npm install` in both
the root project and the lambda folder.

In the root directory:

```
cd lambda
npm install      // download lambda's dependencies
cd ..
npm install      // download cdk's dependencies
tsc
```

This will download npm modules for both the infrastructure and the lambda code itself, and compile the
typescript to javascript.

## Making Changes

The `bin` directory contains the binary that creates the Cloudformation stack, and the `lib` folder is where
you'll build the stack itself.

Whether you change the lambda or the infrastructure, simply run `npm run build` from the root directory.

## Deploy

Run `cdk deploy`. This will deploy / redeploy your Stack to your AWS Account.

You'll need to download the CDK CLI if you don't have it already:

```
npm install -g aws-cdk
```

### Commands

- `npm run build` compile typescript to js
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` prints the generated CloudFormation template

## APIs used for quotes:

- **Quotable API:** https://github.com/lukePeavey/quotable
- **Lord of the Rings API:** https://the-one-api.dev/
- **Trump Quotes:** https://www.tronalddump.io/
- **Emmitt Smith:**: https://walterfootball.com/emmitt.php
- **The Office Quotes:** https://www.kaggle.com/datasets/fabriziocominetti/the-office-lines
