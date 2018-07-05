const Sentiment = require('sentiment');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const sentiment = new Sentiment();
const app = new Koa();

// response
app.use(koaBody({multipart: true}))
app.use(cors())
  .use(ctx => {
    if (ctx.request.method == 'POST') {
      const { sentence } = ctx.request.body;
      if (!sentence) ctx.throw(400, 'sentence required');
      console.log(sentence);
      ctx.body = sentiment.analyze(sentence);
    }
});

app.listen(3001);
console.log(`Running on http://localhost:3001`);