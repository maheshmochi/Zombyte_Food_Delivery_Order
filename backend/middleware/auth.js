import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {

    const token = req.headers.token;

    if (!token) {
        return res.json({
            success: false,
            message: "Not Authorized Login Again"
        });
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log("TOKEN DECODE =", token_decode);

        // ✅ FIX HERE (IMPORTANT)
        req.body.userId = token_decode.id || token_decode.userId;

        next();

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Invalid Token"
        });
    }
};

export default authMiddleware;