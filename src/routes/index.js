import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/', (req, res, next) => {
    res.send('index');
});

router.get('/auth/signup', (req, res, next) => {
    res.send('signup');
});

router.post(
    '/auth/signup',
    passport.authenticate('local-signup', {
        successRedirect: '/api/profile',
        failureRedirect: '/api/auth/signup',
        failureFlash: true
    })
);

router.get('/auth/signin', (req, res, next) => {
    res.send('signin');
});

router.post(
    '/auth/signin',
    passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/api/auth/signin',
        failureFlash: true
    })
);

router.get('/profile', isAuthenticated, (req, res, next) => {
    res.send('Profile');
});

router.get('/auth/logout', (req, res, next) => {
    req.logout();
    res.redirect('/api');
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api');
}

export default router;
