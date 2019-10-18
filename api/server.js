const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sessions = require('express-session')

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();


const sessionConfigurations = {
    //by default the cookie will be named SID
    name: 'jokeyjokes',
        secret:'to decrypt or encrypt the cookie',
        //use environment variable for the secret
        coookie: {
            httpOnly: false,
            maxAge: 1000 * 60 * 60,
            secure: false
        },
        resave: false,
        saveUninitialized: true,
}

server.use(sessions(sessionConfigurations))
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
