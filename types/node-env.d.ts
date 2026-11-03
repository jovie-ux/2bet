declare module 'node:fs' {
  export namespace promises {
    function readFile(path: string, encoding: string): Promise<string>
    function writeFile(path: string, data: string, encoding: string): Promise<void>
    function mkdir(path: string, options?: { recursive?: boolean }): Promise<string | undefined>
  }
}

declare module 'node:path' {
  export function resolve(...paths: string[]): string
  export function dirname(path: string): string
}

declare const process: {
  cwd(): string
  env: Record<string, string | undefined>
}

