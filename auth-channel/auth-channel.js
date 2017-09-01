const net = require('net')
const streamSet = require('stream-set')

class Commander extends net.Server {
  constructor(port, host='127.0.0.1') {
    super()
    this.activeConsumers = streamSet()
    this.host = host
    this.port = port
    this.validUsers = new Set()
    this.on('error', this.errorLogger)
    this.on('connection', this.connectionHandler)
    this.on('listening', this.listeningLogger)
    this.listen(port, host)
  }
  cmdAdd(value) {
    this.validUsers.add(value)
    this.activeConsumers.forEach(consumer => consumer.write(`add ${value}`))
  }
  cmdDelete(value) {
    this.validUsers.delete(value)
    this.activeConsumers.forEach(consumer => consumer.write(`delete ${value}`))
  }
  scheduleDelete(delay, value) {  // delay in minutes
    setTimeout(this.cmdDelete.bind(this, value), delay * 60 * 1000)
  }
  errorLogger(err) {
    console.error(`[auth-channel error: ${err}]`)
  }
  connectionHandler(socket) {
    console.log(`[new auth-channel consumer: ${socket.remoteAddress}:?]`)
    this.activeConsumers.add(socket)
  }
  listeningLogger() {
    console.log(`[auth-channnel commander serving on port ${this.port}]`)
  }
}

class Consumer extends net.Socket {
  constructor(port, host='127.0.0.1') {
    super()
    this.setEncoding('utf8')
    this.commander = `${host}:${port}`
    this.validUsers = new Set()
    this.on('error', this.errorLogger)
    this.on('connect', this.connectLogger)
    this.on('data', this.dataHandler)
    this.connect(port, host)
  }
  errorLogger(err) {
    console.error(`[auth-channel error: ${err}]`)
  }
  connectLogger() {
    console.log(`[auth-channel consuming from: ${this.commander}]`)
  }
  dataHandler(cmd) {
    console.log(`[auth-channel incoming command: ${cmd}]`)
    if (cmd.startsWith('add')) {
      this.validUsers.add(cmd.replace(/^add/i, '').trim())
    } else if (cmd.startsWith('delete')) {
      this.validUsers.delete(cmd.replace(/^delete/i, '').trim())
    }
  }
}

module.exports = { Commander: Commander, Consumer: Consumer }
