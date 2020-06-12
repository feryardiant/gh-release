const changelog = require('conventional-changelog')
const pkg = require('package.json')

module.exports = new Promise((resolve, reject) => {
    const stream = changelog({
        preset: 'angular',
        tagPrefix: 'v'
    }, { version: pkg.version })
    
    stream.on('error', (err) => {
        return reject(err)
    })
    
    let content = ''
    stream.on('data', (buff) => {
        content += buff.toString()
    })
    
    stream.on('end', () => {
        const changes = content.split('\n').slice(1).join('\n')
        console.info(`\n---\n${changes.trim()}\n---\n`)
        return resolve();
    })
})

