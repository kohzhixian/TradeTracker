import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });

const SERVER_PORT = process.env.PORT || 4000;
const MONGO_URL = String(process.env.MONGODB_URL);

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
};
