import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

interface DecodedToken {
    id: number;
    username: string;
    iat: number;
    exp: number;
}

export function verifyToken(req: NextApiRequest, res: NextApiResponse, next: Function) {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token required." });
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;
        // Attach user info to the request for downstream use
        req.body.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}
