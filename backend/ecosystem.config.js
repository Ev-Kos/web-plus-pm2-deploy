const dotenv = require('dotenv');

dotenv.config({ path: '.env.deploy' });

const {
  PORT,
  JWT_SECRET,
  DB_ADDRESS,
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto',
      script: './dist/app.js',
      env_production: {
        NODE_ENV: 'production',
        PORT,
        JWT_SECRET,
        DB_ADDRESS,
      },
      env_development: {
        NODE_ENV: 'development',
        PORT,
        JWT_SECRET,
        DB_ADDRESS,
      },
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
    },
  },
};
