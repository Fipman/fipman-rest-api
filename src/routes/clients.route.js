import express from 'express';
import S3 from '../utils/s3.helper';
import { db } from '../utils/db.provider';

const router = new express.Router();

router.get('/:apiKey/s3', (req, res) => {
  const { apiKey } = req.params;
  const { fileNames } = req.query;

  db.collection('clients').findOne({ apiKey }, (err, client) => {
    if (err) { return req.status(500).send(err); }

    const cridentials = fileNames.split(',').map(fileName => S3.createCridentials(fileName, client.drive));
    res.send(cridentials);
  });
});

export default router;
