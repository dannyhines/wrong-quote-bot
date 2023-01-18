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

The `bin` directory contains the binary that creates the infrastructure, which is a Cloudformation stack from
the definition in the `lib` folder.

The logic for the bot is in the `lambda` folder. The code and node_modules is a separate project within the
project that gets sent to AWS when you deploy the lambda.

To test the quotes you can run the npm script below, which will print a test tweet and the quotes from the
different sources (this was easier than trying to set up Jest within the lambda directory):

```bash
cd lambda
npm run print
```

Output:

```
> tweet-lambda@1.0.0 print [path-to-project]/wrong-quote-bot/lambda
> tsc && node src/print.js

--------------------------------------
"Elementary, my dear Watson."
-Gisele Bundchen
--------------------------------------
LOTR:   "Saved some for you Mr Frodo."
SPORTS: "They started 6-2. Now, they're 6-3."
TRUMP:  "Don't believe the millions of dollars of phony television ads by lightweight Rubio and the R establishment. Dishonest people!"
OFFICE: "Thank you very much. Any other questions? Jim?"
QUOTE:  "Good luck is another name for tenacity of purpose."
MOVIE:  "I've got a feeling we're not in Kansas anymore."
RAP:    "I’ll ignore you sellin crack, killin people, and keepin it real, but disrespect me and my adopted fam and die young like veal."
```

Whether you change the lambda or the infrastructure, simply run `tsc` or `npm run build` from the root
directory, which will convert the code to Javascript.

## Deploy

Run `cdk deploy`. This will deploy / redeploy your Stack to your AWS Account.

You'll need to download the CDK CLI if you don't have it already:

```
npm install -g aws-cdk
```

And set up your AWS account and credentials with `aws configure`.

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
