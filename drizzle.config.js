import 'dotenv/config';

export default {
  schema: './src/models/*.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbcredential: {
    url: process.env.DATABASE_URL,
  },
};