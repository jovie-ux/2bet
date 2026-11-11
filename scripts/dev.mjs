import { spawn } from 'node:child_process'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const nodeOptions = process.env.NODE_OPTIONS || ''
// NODE_OPTIONS reaches Nuxt's child processes and Nitro's SSR worker as well.
// Keep an explicitly configured heap limit when the developer supplies one.
const hasHeapLimit = /(?:^|\s)--max[-_]old[-_]space[-_]size(?:=|\s)/.test(nodeOptions)
const env = {
  ...process.env,
  NODE_OPTIONS: hasHeapLimit ? nodeOptions : `${nodeOptions} --max-old-space-size=6144`.trim(),
}

const child = spawn(process.execPath, [
  fileURLToPath(new URL('../node_modules/nuxt/bin/nuxt.mjs', import.meta.url)),
  'dev',
  ...process.argv.slice(2),
], { env, stdio: 'inherit' })

child.on('error', (error) => {
  console.error('Could not start the Nuxt dev server:', error.message)
  process.exitCode = 1
})

child.on('exit', (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => child.kill(signal))
}
