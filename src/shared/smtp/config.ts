import 'dotenv/config';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

export const host = SMTP_HOST;
export const port = Number(SMTP_PORT);
export const user = SMTP_USER;
export const pass = SMTP_PASSWORD;
