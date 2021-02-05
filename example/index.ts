import path from 'path';
import express, { RequestHandler } from 'express';

import {
  getBasicTemplate,
  getBasicWithAvatarTemplate,
  getMonthlyReportCreatorTemplate,
  getMonthlyReportCivicLikerV1Template,
  getMonthlyReportCivicLikerV2Template,
  getNewSupporterTemplate,
  getReferralTxTemplate,
} from '../dist';

import {
  MonthlyReportCivicLikerV1SampleData,
  MonthlyReportCivicLikerV2SampleData,
} from './data/civic-liker';
import {
  MonthlyReportCreatorTemplateSampleData,
} from './data/creator';

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/static', express.static(path.join(__dirname, '../src/assets')));
app.use(express.json());

function handleRequest(path: string, handler: RequestHandler) {
  app.get(path, handler);
  app.post(path, handler);
}

handleRequest('/basic', (req, res) => {
  res.send(getBasicTemplate({ ...req.query, ...req.body }));
});

handleRequest('/basic/avatar', (req, res) => {
  res.send(getBasicWithAvatarTemplate({ ...req.query, ...req.body }));
});

handleRequest('/new-supporter', (req, res) => {
  res.send(getNewSupporterTemplate({ ...req.query, ...req.body }));
});

handleRequest('/referral-tx', (req, res) => {
  res.send(getReferralTxTemplate({ ...req.query, ...req.body }));
});

handleRequest('/monthly-reports/creator', (req, res) => {
  res.send(getMonthlyReportCreatorTemplate({
    ...MonthlyReportCreatorTemplateSampleData,
    ...req.query,
    ...req.body,
  }));
});

handleRequest('/monthly-reports/civic-liker/v1', (req, res ) => {
  res.send(getMonthlyReportCivicLikerV1Template({
    ...MonthlyReportCivicLikerV1SampleData,
    ...req.query,
    ...req.body,
  }));
});

handleRequest('/monthly-reports/civic-liker/v2', (req, res) => {
  res.send(getMonthlyReportCivicLikerV2Template({
    ...MonthlyReportCivicLikerV2SampleData,
    ...req.query,
    ...req.body,
  }));
});

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
