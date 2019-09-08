const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { postgraphile } = require('postgraphile');

const app = express();

app.use(cors({ origin: true, credentials: true, optionsSuccessStatus: 200 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/api', cors(), postgraphile(
    'postgres://postgres:root@localhost:5432/postgres',
    'public',
    {
        graphqlRoute: "/graphql",
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    })
);


app.use('/', (req, res) => {
    res.send('Server is up');
});


app.listen(4200, () => {
    console.log('Listening to server at PORT:', 4200);
});