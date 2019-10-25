  
require('dotenv').config()
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack(config) {
    config.plugins = config.plugins.filter(plugin => {
      if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin') return false;
      return true;
    })
    return config
  }
})