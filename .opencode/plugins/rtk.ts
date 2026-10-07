import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

// RTK OpenCode plugin — rewrites bash commands to rtk for token savings.
// Requires: rtk in PATH.
//
// OpenCode local plugins expose a V1-style return value from setup().
// Return the hooks record from setup and do not depend on ctx.$.

async function rewriteCommand(command: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync('rtk', ['rewrite', command])
    const out = String(stdout || '').trim()
    return out === '' || out === command ? null : out
  } catch {
    return null
  }
}

export const RtkOpenCodePlugin = async ({ directory }) => {
  let checked = false
  let available = false

  return {
    'tool.execute.before': async (input, output) => {
      try {
        if (!checked) {
          checked = true
          try {
            await execFileAsync('rtk', ['--version'])
            available = true
          } catch {
            available = false
            console.warn('[rtk] rtk binary not found in PATH — plugin disabled')
          }
        }
        if (!available) return

        const tool = String(input?.tool ?? '').toLowerCase()
        if (tool !== 'bash' && tool !== 'shell') return

        const args = output?.args
        if (!args || typeof args !== 'object') return

        const command = (args as Record<string, unknown>).command
        if (typeof command !== 'string' || command.trim() === '') return
        if (command.trimStart().startsWith('rtk ')) return

        const rewritten = await rewriteCommand(command)
        if (rewritten) {
          ;(args as Record<string, unknown>).command = rewritten
        }
      } catch {
        // Keep the command unchanged on any failure.
      }
    },
  }
}

export default {
  id: 'rtk',
  async setup(ctx) {
    return RtkOpenCodePlugin(ctx)
  },
}
