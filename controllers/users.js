const User = require('../models/users');

module.exports.renderSignUp = (req, res) => {
    res.render('users/signup')
}

module.exports.signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to the Massa Art Gallery!');
            res.redirect('/artwork');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    };
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/artwork';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/artwork');
}