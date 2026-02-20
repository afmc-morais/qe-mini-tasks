import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export type SessionPayload = {
    sub: string; // userId
    email: string;
};

export function signSession(payload: SessionPayload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifySession(token: string) {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
}