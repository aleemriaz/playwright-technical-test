import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { request } from 'undici';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const API_BASE_URL = process.env.RISK_ASSESSMENT_API_URL;
const dynamoClient = new DynamoDBClient({ region: 'eu-west-2' });

let payload: any;
let responseStatusCode: number;
let assessmentId: string;

Given('a valid customer risk assessment payload', function () {
  assessmentId = 'test-assessment-001';
  payload = {
    assessmentId: assessmentId,
    customerId: 'cust-12345',
    riskFactors: ['new-device', 'unusual-location'],
  };
});

When('I submit the risk assessment request', function () {
  const { statusCode } = request(`${API_BASE_URL}/risk-assessment`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  responseStatusCode = statusCode;
});

Then('a risk assessment record should be created in DynamoDB', async function () {
  const result = await dynamoClient.send(
    new GetItemCommand({
      TableName: 'RiskAssessments',
      Key: { assessmentId: { S: assessmentId } },
    })
  );

  assert.ok(result.Item);
});