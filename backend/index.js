const Sentiment = require('sentiment');
const os = require('os');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

const sentiment = new Sentiment();
const app = new Koa();

// response
app.use(koaBody({multipart: true}))
app.use(cors())
  .use(ctx => {
    console.log(`Hit ${ ctx.request.href } on ${ os.hostname() }`);
    if (ctx.request.method === 'POST') {
      const { sentence } = ctx.request.body;
      if (!sentence) ctx.throw(400, `sentence required (${os.hostname()}`);
      console.log(sentence);
      sentence.hostname = os.hostname();
      ctx.body = sentiment.analyze(sentence);
    } else {
      ctx.body = `you've hit ${ os.hostname() }`;
    }
});

app.listen(3001);
console.log(`Running on http://localhost:3001`);