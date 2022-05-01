import * as vm from 'vm'
import { promisify } from 'util'
import * as fs from 'fs'
import * as jsonApiFracal from '../src'
import * as acorn from 'acorn'

const readFile = promisify(fs.readFile)

describe('examples', () => {
  const cases = [['simple-serialize'], ['deserialize'], ['serialize-with-transformers']]

  test.each(cases)('%s should return expected result', async (exampleName) => {
    // eslint-disable-next-line unicorn/no-await-expression-member,unicorn/prefer-module
    const packageConfig = JSON.parse((await readFile(`${__dirname}/../package.json`)).toString())

    // eslint-disable-next-line unicorn/no-await-expression-member,unicorn/prefer-module
    const scriptText = (await readFile(`${__dirname}/../examples/${exampleName}.js`)).toString()

    let resultComment = ''
    acorn.parse(scriptText, { ecmaVersion: 2020, onComment: (_block, text) => (resultComment = text) })

    resultComment = resultComment.replace(/^\s*\*\s?/gm, '')
    resultComment = resultComment.replace('OUTPUT:', '')

    let result = ''

    const context = vm.createContext({
      require: (name: string) => (name === packageConfig.name ? jsonApiFracal : undefined),
      console: {
        log: (text: string) => (result = text),
      },
    })

    const script = new vm.Script(scriptText)
    script.runInContext(context)

    expect(JSON.parse(result)).toEqual(JSON.parse(resultComment))
  })
})
