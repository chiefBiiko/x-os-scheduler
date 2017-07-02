/* scheduler.js */

const { join } = require('path')
const { spawn } = require('child_process')

const schedule = (taskname, taskfile, freq, starttime) => {
  const cmd = join(process.cwd(), /^win/i.test(process.platform) ?
                   'schedule.bat' : 'schedule.sh')
  const child = spawn(cmd, [taskname, taskfile, freq, starttime], 
                      {shell: true})
  child.stdout.on('data', data => console.log(data.toString()))
  child.stderr.on('data', data => console.error(data.toString()))
  child.on('exit', code => {
    console.log(`[scheduler exited with code ${code}]`)
    process.exit(code)
  })
}

const unschedule = (taskname) => {
  const cmd = join(process.cwd(), /^win/i.test(process.platform) ?
                   'unschedule.bat' : 'unschedule.sh')
  const child = spawn(cmd, [taskname], {shell: true})
  child.stdout.on('data', data => console.log(data.toString()))
  child.stderr.on('data', data => console.error(data.toString()))
  child.on('exit', code => {
    console.log(`[scheduler exited with code ${code}]`)
    process.exit(code)
  })
}

module.exports = {schedule: schedule, unschedule: unschedule}