const BigNumber = require('bignumber.js')

const NAME = 'FakeWallet'

const SECONDS = 1000
const UNSEEN_TIME = 3 * SECONDS
const PUBLISH_TIME = 9 * SECONDS
const AUTHORIZE_TIME = 60 * SECONDS
const BALANCE = 0.01
const REAL_BALANCE = BALANCE / 2

let t0

function multiplier (cryptoCode) {
  if (cryptoCode === 'BTC') return new BigNumber(1e8)
  if (cryptoCode === 'ETH') return new BigNumber(1e18)
  throw new Error('Unsupported crypto: ' + cryptoCode)
}

function balance (account, cryptoCode) {
  return Promise.resolve()
  .then(() => multiplier(cryptoCode).mul(BALANCE))
}

function sendCoins (account, toAddress, cryptoAtoms, cryptoCode) {
  console.log('[%s] DEBUG: Mock wallet about to send %s cryptoAtoms to %s',
    cryptoCode, cryptoAtoms.toString(), toAddress)

  return new Promise(resolve => {
    const realBalance = multiplier(cryptoCode).mul(REAL_BALANCE)
    console.log('DEBUG300: %s', realBalance)

    if (cryptoAtoms.gte(realBalance)) {
      const err = new Error('Insufficient Funds')
      err.name = 'InsufficientFunds'

      throw err
    }

    setTimeout(() => {
      console.log('[%s] DEBUG: Mock wallet sending %s cryptoAtoms to %s',
        cryptoCode, cryptoAtoms.toString(), toAddress)
      resolve('<txHash>')
    }, 2000)
  })
}

function newAddress () {
  t0 = Date.now()
  return Promise.resolve('<Fake address, don\'t send>')
}

function getStatus (account, toAddress, cryptoAtoms, cryptoCode) {
  const elapsed = Date.now() - t0

  if (elapsed < UNSEEN_TIME) return Promise.resolve({status: 'notSeen'})
  if (elapsed < PUBLISH_TIME) return Promise.resolve({status: 'published'})
  if (elapsed < AUTHORIZE_TIME) return Promise.resolve({status: 'authorized'})

  console.log('[%s] DEBUG: Mock wallet has confirmed transaction', cryptoCode)
  return Promise.resolve({status: 'confirmed'})
}

function sweep () {
  return Promise.resolve('<txHash>')
}

module.exports = {
  NAME,
  balance,
  sendCoins,
  newAddress,
  getStatus,
  sweep
}
