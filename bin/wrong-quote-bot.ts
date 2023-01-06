#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { WrongQuoteBotStack } from '../lib/wrong-quote-bot-stack';

const app = new cdk.App();
new WrongQuoteBotStack(app, 'WrongQuoteBotStack');
