function buildFileTemplate (portalConfig) {
  const svcAccount = process.env.VUE_APP_ENVIRONMENT === 'clicks'
    ? 'projects/$PROJECT_ID/serviceAccounts/svc-rx@zzz-clickops-temp.iam.gserviceaccount.com'
    : `projects/$PROJECT_ID/serviceAccounts/svc-rx@optoro-${process.env.VUE_APP_ENVIRONMENT}-service.iam.gserviceaccount.com`

  return {
    steps: [
      {
        name: 'node:14',
        entrypoint: 'npm',
        args: ['install'],
        id: 'install'
      },
      {
        name: 'node:14',
        entrypoint: 'npm',
        args: ['run', 'lint'],
        id: 'lint'
      },
      {
        name: 'node:14',
        entrypoint: 'npm',
        env: [
          `VUE_APP_BUILD_VERSION=${process.env.VUE_APP_BUILD_VERSION}`,
          `VUE_APP_ENVIRONMENT=${process.env.VUE_APP_ENVIRONMENT}`,
          `VUE_APP_API_URL=${process.env.VUE_APP_API_URL}`,
          `VUE_APP_OPTITURN_ID=${portalConfig.optiturnId}`,
          `VUE_APP_TITLE=${portalConfig.appTitle}`,
          `VUE_APP_SECURE_TEXT=${process.env.VUE_APP_SECURE_TEXT}`
        ],
        secretEnv: ['VUE_APP_MAPS_API_KEY'],
        args: ['run', 'build'],
        waitFor: ['lint'],
        id: 'build'
      },
      {
        name: 'gcr.io/cloud-builders/gsutil',
        args: ['-m', 'rsync', '-r', '-c', '-d', 'dist', `gs://rx_${process.env.VUE_APP_ENVIRONMENT}_${portalConfig.bucketName || portalConfig.optiturnId}_returns_portal_ui`],
        waitFor: ['build'],
        id: 'publish'
      },
      {
        name: 'gcr.io/cloud-builders/gsutil',
        args: ['web', 'set', '-m', 'index.html', '-e', 'index.html', `gs://rx_${process.env.VUE_APP_ENVIRONMENT}_${portalConfig.bucketName || portalConfig.optiturnId}_returns_portal_ui`],
        waitFor: ['publish'],
        id: 'set-index'
      },
      {
        name: 'gcr.io/cloud-builders/gsutil',
        args: ['-m', 'setmeta', '-h', 'Content-Type:text/html', '-h', 'Cache-Control:private, max-age=0, no-transform', `gs://rx_${process.env.VUE_APP_ENVIRONMENT}_${portalConfig.bucketName || portalConfig.optiturnId}_returns_portal_ui/*.html`],
        waitFor: ['publish'],
        id: 'cache-control'
      }
    ],
    serviceAccount: svcAccount,
    tags: [
      'rousseau-ui-deploy',
      `rousseau-ui-deploy-${portalConfig.optiturnId}`,
      process.env.VUE_APP_BUILD_VERSION.replace(/\s/g, '')
    ],
    options: { logging: 'CLOUD_LOGGING_ONLY' },
    availableSecrets: {
      secretManager: [
        {
          versionName: 'projects/$PROJECT_ID/secrets/maps_api_key/versions/latest',
          env: 'VUE_APP_MAPS_API_KEY'
        }
      ]
    }
  }
}

module.exports = {
  buildFileTemplate
}
