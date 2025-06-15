import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    ratelimit.limit(ip)
        .then((result) => {
            if (result.success) {
                next();
            } else {
                res.status(429).json({
                    success: false,
                    message: "Too many requests, please try again later."
                });
            }
        })
        .catch((error) => {
            console.error(`Rate limit error: ${error.message}`);
            next(error);
            res.status(500).json({ message: "Internal Server Error" });
        });
}

export default rateLimiter;