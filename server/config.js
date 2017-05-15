const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

function expressConfig(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    if (process.env.NODE_ENV !== 'production') {
      app.use(setResponseHeaders);
    }

    if (process.env.NODE_ENV === 'production') {
        app.use(morgan('tiny'));
    } else {
        app.use(morgan('dev'));
    }

    app.use(cookieParser());
}

module.exports = expressConfig;

function setResponseHeaders(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Expose-Headers', 'total');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
}
