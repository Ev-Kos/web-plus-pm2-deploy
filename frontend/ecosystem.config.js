require('dotenv').config({ path: '../backend/.env.deploy' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } =
  process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-frontend',
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': 'npm run build',
      'post-deploy': `cd ${DEPLOY_PATH}/source/frontend/ && npm i && npm run build`,
    },
  },
};
