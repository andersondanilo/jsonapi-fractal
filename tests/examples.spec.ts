import * as vm from 'vm'
import { promisify } from 'util'
import * as fs from 'fs'
import * as jsonApiFracal from '../src'
import * as acorn from 'acorn'

const readFile = promisify(fs.readFile)

describe('examples', () => {
  const cases = [['simple-serialize'], ['deserialize'], ['serialize-with-transformers']]

  test.each(cases)('%s should return expected result', async (exampleName) => {
    const packageConfig = JSON.parse((await readFile(`${__dirname}/../package.json`)).toString())

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

    expect(JSON.parse(result)).toStrictEqual(JSON.parse(resultComment))
  })
})
