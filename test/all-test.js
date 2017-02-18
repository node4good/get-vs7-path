/* global describe, it */
'use strict'

const fs = require('fs')
const assert = require('assert')
const execSync = require('child_process').execSync
const getter = require('../')

describe('Try cmd tools', () => {

  it('Powershell', () => {
    const ret = execSync(getter.try_powershell_path).toString()
    assert(ret.includes('InstallationPath'))
    assert(ret.includes('SDK'))
    assert(ret.includes('CmdPath'))
    assert(ret.includes('\\Common7\\'))
  })

  it('Compile and run', () => {
    const ret = execSync(getter.compile_run_path).toString()
    assert(ret.includes('InstallationPath'))
    assert(ret.includes('SDK'))
    assert(ret.includes('CmdPath'))
    assert(ret.includes('\\Common7\\'))
  })

  it('Registry', () => {
    const ret = execSync(getter.try_registry_path).toString()
    assert(ret.includes('InstallationPath'))
    assert(ret.includes('CmdPath'))
    assert(ret.includes('\\Common7\\'))
  })

})

describe('Try node wrapper', () => {

  it('getVS2017Path', () => {
    const ret = getter.getVS2017Path(64, 'x64')
    const parts = ret.split('\\')
    assert(parts.length >= 4)
    assert(parts.includes('Common7'))
    assert(ret.includes('VsDevCmd.bat'))
  })

  it('getVS2017Setup', () => {
    const vsSetup = getter.getVS2017Setup()
    assert(vsSetup.InstallationPath)
    const parts = vsSetup.InstallationPath.split('\\')
    assert(parts.length >= 4)
    assert(parts.includes('BuildTools'))
    assert(vsSetup.CmdPath)
  })

  it('locateMsbuild', () => {
    const path = getter.locateMsbuild()
    const parts = path.split('\\')
    assert(parts.length >= 4)
    assert(path.includes('\\MSBuild.exe'))
    assert(fs.existsSync(path))
  })

})