import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'

// 读取欢迎语文件
const __filename = fileURLToPath(import.meta.url)
// 读取同级目录下的greating.txt文件
const greetingFilePath = __filename.replace(
  /greetingReader\.mjs$/,
  'greeting.txt'
)
const greetingFile = readFileSync(greetingFilePath, 'utf8')
export default greetingFile
