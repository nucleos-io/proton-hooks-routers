'use strict'

let Hook = require('proton-hook')
let _ = require('lodash')
let path = require('path')


module.exports = class Router extends Hook {

  constructor(proton) {
    super(proton)
  }

  configure() {
    return new Promise((resolve, reject) => {
      if (!this.proton.app.routers)
        this.proton.app.routers = {}
      resolve()
    })
  }

  initialize() {
    return new Promise((resolve, reject) => {
      try {
        this._bindToApp()
        this._bindToProton()
        resolve()
      } catch(err) {
        reject()
      }
    })
  }

  _bindToApp() {
    let routersPath = path.join(this.proton.app.path, '/api/routes')
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
