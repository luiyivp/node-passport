import express from 'express';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';

import authRoutes from './routes/index';

// initializations
const app = express();
import './database';
import './passport/local-auth';

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'mysecretsession',
        resave: false,
        saveUninitialized: false
    })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    console.log(app.locals);
    next();
});

// routes
app.use(authRoutes);

export default app;
