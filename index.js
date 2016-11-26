const NAME = 'FakeWallet'

const SECONDS = 1000
const UNSEEN_TIME = 6 * SECONDS
const PUBLISH_TIME = 12 * SECONDS
const AUTHORIZE_TIME = 60 * SECONDS

let t0

function balance () {
  return Promise.resolve({BTC: Math.round(1e8 * 10), ETH: Math.round(1e18 * 10)})
}

function sendCoins () {
  return new Promise(resolve => {
    setTimeout(() => resolve('<txHash>'), 2000)
  })
}

function newAddress () {
  t0 = Date.now()
  return Promise.resolve('<Fake address, don\'t send>')
}

function getStatus () {
  const elapsed = Date.now() - t0

  if (elapsed < UNSEEN_TIME) return Promise.resolve({status: 'notSeen'})
  if (elapsed < PUBLISH_TIME) return Promise.resolve({status: 'published'})
  if (elapsed < AUTHORIZE_TIME) return Promise.resolve({status: 'authorized'})

  return Promise.resolve({status: 'confirmed'})
}

module.exports = {
  NAME,
  balance,
  sendCoins,
  newAddress,
  getStatus
}
