'use strict'

exports.NAME = 'FakeWallet'
exports.SUPPORTED_MODULES = ['wallet']

exports.config = function config () {}

exports.balance = function balance (callback) {
  callback(null, {BTC: Math.round(1e8 * 10)})
}

exports.sendBitcoins = function sendBitcoins (address, satoshis, fee, callback) {
  setTimeout(() => callback(null, '<txHash>'), 2000)
}

exports.newAddress = function newAddress (info, callback) {
  callback(null, '<Fake address, don\'t send>')
}

exports.getStatus = function getStatus (toAddress, requested) {
  return Promise.resolve({status: 'confirmed'})
}
