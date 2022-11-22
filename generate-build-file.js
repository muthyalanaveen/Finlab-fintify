const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const optiturnId = process.argv.slice(2)
const portalConfigFilePath = path.resolve(`./src/branding/${optiturnId}/config.json`)
let portalConfig

if (fs.existsSync(portalConfigFilePath)) {
  portalConfig = require(portalConfigFilePath)
} else {
  throw new Error(`${optiturnId} config file not found`)
}

const { buildFileTemplate } = require('./portal-buildfile-template.js')

const cloudEnv = !!process.env.VUE_APP_BUILD_VERSION
const buildFilePath = cloudEnv ? `/workspace/build-configs/cloudbuild.deploy.${optiturnId}.yaml` : `./src/branding/${optiturnId}/cloudbuild.deploy.${optiturnId}.yaml`

fs.writeFile(
  path.resolve(buildFilePath),
  yaml.dump(buildFileTemplate(portalConfig)),
  (err) => {
    if (err) {
      throw err
    } else {
      console.info(`${optiturnId} buildfile written`)
    }
  }
)
