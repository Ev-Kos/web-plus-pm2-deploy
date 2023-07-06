require('dotenv').config({ path: './.env.deploy' });

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
      name: 'mesto-backend',
      script: './dist/app.js',
      env_production: {
        NODE_ENV: 'production',
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
      'pre-deploy-local': `scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'post-deploy': `cd ${DEPLOY_PATH}/source/backend/ && npm i && npm run build && pm2 start`,
    },
  },
};
