const express = require("express");
const { auth, requiresAuth} = require('express-openid-connect');


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'y5LkTzWCDdcX0mA2zsqkfgqqeHgMVaMr',
    issuerBaseURL: 'https://shresth.us.auth0.com'
};

const app = express();
app.use(auth(config));
app.get("/from-python", async (req, res) => {
    try {
        const response = await fetch("http://127.0.0.1:7777/hello");
        const text = await response.text();
        res.send(`Express got this: ${text}`);
    } catch (err) {
        res.status(500).send("Error calling Python backend: " + err.message);
    }
});

app.get("/health", async(req, res) => {
    return res.status(200).json({message: "huhhh it is working"});
})

app.get("/checkAuth", async (req, res) => {
    if(req.oidc.isAuthenticated()) {
        return res.status(200).json({message : "yayyyyyy"})
    }
    return res.status(200).json({erroe : "unyayyyyy"})
})

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', (req, res) => {
    if(!req.oidc.isAuthenticated()) {
        return res.status(200).json({erroe : "log in to continue"})
    }
    res.json({message : req.oidc.user});
});

//better way to do above
app.get('/profiles', requiresAuth(), (req, res) => {
    res.json({message : req.oidc.user, list : "lol"});
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express running on http://0.0.0.0:${PORT}`);
});