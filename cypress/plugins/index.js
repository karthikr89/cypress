/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 
 */

 const fs = require('fs-extra')
 const path = require('path')
 
 function getConfigurationByFile (file) {
   const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)
   if (!fs.existsSync(pathToConfigFile)) {
     return {};
   }
 
   return fs.readJson(pathToConfigFile)
 }


module.exports = (on, config) => {
  require('cypress-plugin-retries/lib/plugin')(on)

  const file = config.env.configFile

  return getConfigurationByFile(file)
}
