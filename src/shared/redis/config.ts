import 'dotenv/config';
const { REDIS_HOST, REDIS_PORT } = process.env;

export default { host: REDIS_HOST, port: Number(REDIS_PORT) };
