import generator from '@asw-project/shared';
import express from 'express';

const app = express();

app.use((_, res) => {
  res.json({
    random: generator(),
  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('running...');
});
