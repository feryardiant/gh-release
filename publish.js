const pkg = require('./package')
const { readFileSync } = require('fs')

const readChangelogFile = async (version) => {
    const changelog = readFileSync('CHANGELOG.md').toString()
    const changes = changelog.split('\n')

    const [curr, prev] = changes.filter(line => {
        return /^(###?).(?<version>\[?[0-9]\.[0-9]\.[0-9]\]?).\((.*)\)$/.test(line)
    }).slice(0, 2).map(line => {
        const index = changes.findIndex(text => text === line)
        const match = line.match(/\((?<link>https?\:.*)\)./)

        return { index, line, compare: match ? match.groups.link : null }
    })

    console.info(changes.slice(curr.index + 1, prev.index).join('\n').trim())
    console.info('\n---\n')
    console.info('Compare with previous version:', curr.compare)
}

module.exports = readChangelogFile(pkg.version)

