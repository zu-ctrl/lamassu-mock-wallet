'use strict'

exports.NAME = 'FakeWallet'
exports.SUPPORTED_MODULES = ['wallet']

const SECONDS = 1000
const UNSEEN_TIME = 6 * SECONDS
const PUBLISH_TIME = 12 * SECONDS
const AUTHORIZE_TIME = 60 * SECONDS

let t0

exports.config = function config () {}

exports.balance = function balance (callback) {
  callback(null, {BTC: Math.round(1e8 * 10)})
}

exports.sendBitcoins = function sendBitcoins (address, satoshis, fee, callback) {
  setTimeout(() => callback(null, '<txHash>'), 2000)
}

exports.newAddress = function newAddress (info, callback) {
  t0 = Date.now()
  callback(null, '<Fake address, don\'t send>')
}

exports.getStatus = function getStatus (toAddress, requested) {
  const elapsed = Date.now() - t0

  if (elapsed < UNSEEN_TIME) return Promise.resolve({status: 'notSeen'})
  if (elapsed < PUBLISH_TIME) return Promise.resolve({status: 'published'})
  if (elapsed < AUTHORIZE_TIME) return Promise.resolve({status: 'authorized'})

  return Promise.resolve({status: 'confirmed'})
}
