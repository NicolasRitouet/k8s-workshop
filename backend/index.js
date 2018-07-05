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
      console.log(ctx.request);
      const { sentence } = ctx.request.body;
      console.log(sentence);
      if (!sentence) ctx.throw(400, 'sentence required');
      ctx.body = sentiment.analyze(sentence);
    }
});

app.listen(3001);