
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./fatt-headspace.cjs.production.min.js')
} else {
  module.exports = require('./fatt-headspace.cjs.development.js')
}
