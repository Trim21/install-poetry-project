import { exec } from '@actions/exec'
import crypto from 'crypto'
import { IN_PROJECT_VENV_PATH } from './constants'
import * as core from '@actions/core'
import path from 'path'

export async function getPythonVersion (): Promise<string> {
  let myOutput = ''
  const options = {
    silent: true,
    listeners: {
      stdout: (data: Buffer) => {
        myOutput += data.toString()
      }
    }
  }

  await exec('python', ['-VV'], options)
  return myOutput
}

export function hashString (s: string): string {
  const md5 = crypto.createHash('sha256')
  return md5.update(s).digest('hex')
}

export function enableVenv (): void {
  if (process.platform === 'linux' || process.platform === 'darwin') {
    core.addPath(path.join(IN_PROJECT_VENV_PATH, 'bin'))
  } else if (process.platform === 'win32') {
    core.addPath(path.join(IN_PROJECT_VENV_PATH, 'Scripts'))
  }
}

export function isWindows (): boolean {
  return process.platform === 'win32'
}