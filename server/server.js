require('dotenv').config({ silent: true });

const express = require('express');
const compression = require('compression');
const path = require('path');
const logger = require('./middleware/logger');
const { devMiddleware, hotMiddleware } = require('./middleware/webpack');

const app = express();
const render = require('./render');

app.set('x-powered-by', false);

app.use(compression());
app.use(logger);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
} else {
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

// app.get('*', (req, res) => {
//   if (process.env.NODE_ENV === 'production') {
//     res.sendFile(path.resolve('build', 'index.html'));
//   } else {
//     res.write(devMiddleware.fileSystem.readFileSync(path.resolve('build', 'index.html')));
//     res.end();
//   }
// });
app.get('*', render);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express started at http://localhost:%d\n', server.address().port);
  if (process.env.NODE_ENV !== 'production') {
    console.log('Waiting for webpack...\n');
  }
});
