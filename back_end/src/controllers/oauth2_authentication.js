const axios = require("axios");
const moment = require("moment");
const db = require("../models/index.js");
const jwt = require("jsonwebtoken");

const getUrlAuthorization = async (req, res) => {
    const redirectUri = `http://${process.env.HOST}:${process.env.PORT}/api/v1/oauth/code`;
    const authorizeUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=openid%20profile%20email`;

    res.status(200).json({ url: authorizeUri });
};

const getGoogleCode = async (req, res) => {
    res.redirect(
        303,
        `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/auth?code=${req.query.code}`,
    );
};

const getGooleTokenAndResponseUser = async (code) => {
    try {
        const { access_token } = await getGoogleToken(
            code,
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `http://${process.env.HOST}:${process.env.PORT}/api/v1/oauth/code`,
            "authorization_code",
        );

        const response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        return response.data;
    } catch (e) {
        throw e;
    }
};

const getUserDataAndTokenApp = async (req, res) => {
    try {
        const dataUser = await getGooleTokenAndResponseUser(req.query.code);

        let userCheck = await db.User.findOne({ where: { email: dataUser?.email } });

        if (userCheck === null) {
            await db.User.create({
                username: dataUser?.name,
                name_tag: dataUser?.email.split("@")[0],
                email: dataUser?.email,
                avatar: dataUser?.picture,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
        }

        const user = await db.User.findOne({ where: { email: dataUser?.email } });

        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: `${24 * 60 * 60 * 30 * 1000}`,
        });

        const { passwordHash, createdAt, updatedAt, ...userReturned } = user.dataValues;

        return res
            .status(200)
            .cookie("access_token", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 30 * 1000),
            })
            .json({
                ...userReturned,
                access_token: token,
            });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error " });
    }
};

const getGoogleToken = async (code, client_id, client_secret, redirect_uri, grant_type) => {
    const data = serializeData({
        code: code,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        grant_type: grant_type,
    });

    try {
        const tokenResponse = await axios.post(`https://oauth2.googleapis.com/token`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const { access_token } = tokenResponse.data;

        return { access_token };
    } catch (e) {
        throw e;
    }
};

const serializeData = (data) => {
    return Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join("&");
};

module.exports = { getUrlAuthorization, getGoogleCode, getUserDataAndTokenApp };
