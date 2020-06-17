const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const app = restify.createServer({ name: 'watson-speecher', version: '1.0.0' });

app.use(restify.plugins.acceptParser(app.acceptable));
app.use(restify.plugins.queryParser());
app.use(restify.plugins.bodyParser());

const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"]
})

app.pre(cors.preflight);
app.use(cors.actual);


// DATABASE CONNECTION
const database = require('./config/database');
const knex = require('knex')(database);


// ROTAS
app.get('/api/v1/comentarios/view', (req, res, next) => {
  knex('comentarios').then((data => { res.send(data), next }))
});

app.post('/api/v1/comentarios/insert', (req, res, next) => {
  knex('comentarios')
    .insert(req.body)
    .then((data => { res.send(data), next }))
});

module.exports = app;
