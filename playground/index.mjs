import chalk from 'chalk'
import os from 'os'

import greetingFile from './config/greetingReader.mjs'
const log = console.log

/**
 * 测试 chalk
 * @returns {void}
 */
function testChalk() {
  const cpus = os.cpus()
  let user = 0
  let nice = 0
  let sys = 0
  let idle = 0
  let irq = 0
  let total = 0

  for (let cpu of cpus) {
    user += cpu.times.user
    nice += cpu.times.nice
    sys += cpu.times.sys
    idle += cpu.times.idle
    irq += cpu.times.irq
  }

  total = user + nice + sys + idle + irq

  console.log(chalk.red('--CURRENT CPU STATUS--'))
  const userPercent = ((user / total) * 100).toFixed(2)
  const nicePercent = ((nice / total) * 100).toFixed(2)
  const sysPercent = ((sys / total) * 100).toFixed(2)
  const idlePercent = ((idle / total) * 100).toFixed(2)
  const irqPercent = ((irq / total) * 100).toFixed(2)
  log(chalk.red('当前 CPU 状态:'))
  log(`用户态: ${userPercent}%`)
  log(`良好态: ${nicePercent}%`)
  log(`系统态: ${sysPercent}%`)
  log(`空闲态: ${idlePercent}%`)
  log(`中断态: ${irqPercent}%`)
}

/**
 * 分割字符串
 * @param {string} greetingWords
 * @returns
 */
function spiltLine(greetingWords) {
  log(chalk.red('---------------------------------'))
  const splitSign = [',', '，', '。', '!', '！', '；', ';']
  const regex = new RegExp(`[${splitSign.join('')}]`, 'g')
  return greetingWords.split(regex)
}

/**
 * 欢迎语
 * @returns {string[]} 欢迎语数组
 */
function greeting() {
  // 闭包是指一个函数可以访问并操作其外部函数的变量，即使外部函数已经返回。但是，外部函数的变量不会被释放，直到内部函数被释放。
  var times = 0
  var greeting_words = greetingFile
  return () => {
    setInterval(() => {
      log(
        chalk.bold.rgb(255, 246, 115).bgAnsi256(21)(
          spiltLine(greeting_words)[times++ % spiltLine(greeting_words).length]
        )
      )
    }, 800)
  }
}

testChalk()
greeting()()
