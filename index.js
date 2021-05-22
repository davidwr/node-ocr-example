const tesseract = require('node-tesseract-ocr')
const fs = require('fs/promises')
const path = require('path')

const config = {
  lang: 'eng',
  oem: 1,
  psm: 3,
}

async function main() {
  try {
    const files = await fs.readdir(path.resolve('.', 'resources'))

    let fileText = ''
    for await (file of files) {
      fileText = fileText + await tesseract.recognize(`./resources/${file}`, config)
    }
    await fs.writeFile(path.join('.', 'resources', 'result.txt'), fileText)
    console.log('Finished!')
  } catch (error) {
    console.log(error)
    console.log('Error!')
  }
}

main()
