
const User = require('../models/User');
const JWT_SECRET  = 'kasfjslkmdlj@##%$#frI45YU8N34J09J2M';
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = err => {
    const errors = { password: '', name: '' };

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// create json web token
const maxAge = 1 * 24 * 60 * 60;
const createToken = id => jwt.sign({ id }, JWT_SECRET, { expiresIn: maxAge });

module.exports.Signup = async (req, res) => {
    try {
        await User.create(req.body);
        return res.status(201).send(`User created!`);
    }
    catch (err) {
        const errors = handleErrors(err);
        return res.status(400).send(errors);
    }
}

module.exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken({ user: user._id, permissions: user.permissions });
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ user: { permissions: user.permissions, name: user.name, email: user.email }, jwt: token });
    }
    catch (err) {
        const errors = handleErrors(err);
        return res.status(400).json({ errors });
    }
}

module.exports.checkAuth = async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err)
                return res.status(401).json();
            else {
                const user = await User.findById(decodedToken.id.user);
                const { permissions, name, email } = user;
                return res.status(200).json({ permissions, name, email });
            }
        });
    } else return res.status(401).json();
};

module.exports.Logout = (_, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    return res.status(200).json();
}