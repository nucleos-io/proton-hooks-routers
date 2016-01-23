'use strict'

let Hook = require('proton-hook')
let _ = require('lodash')
let path = require('path')


module.exports = class Router extends Hook {

  constructor(proton) {
    super(proton)
  }

  configure() {
    if (!this.proton.app.routers)
      this.proton.app.routers = {}
    return true
  }

  initialize() {
    this._bindToApp()
    this._bindToProton()
  }

  _bindToApp() {
    let routersPath = path.join(this.proton.app.path, '/routes')
    this.proton.app.routers = require('require-all')(routersPath)
  }

  _bindToProton() {
    let routers = this.proton.app.routers
    _.forEach(routers, router => {
      if (router && router.routes) {
        this.proton.use(router.routes())
      }
    })
  }


}
