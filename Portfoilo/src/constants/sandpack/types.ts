export type SandpackFile = {
  code: string
  active?: boolean
}

export type SandpackExample = {
  id: string
  title: string
  template: "react-ts" | "react"
  files: Record<string, SandpackFile>
  dependencies?: Record<string, string>
}