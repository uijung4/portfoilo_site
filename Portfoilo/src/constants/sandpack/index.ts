import { mousePointer } from "./mousePointer"
import { timmer } from "./timmer"
import type { SandpackExample } from "./types"

export const BOOKS_SANDPACK_EXAMPLES: Record<string, SandpackExample> = {
  [mousePointer.id]: mousePointer,
  [timmer.id]: timmer,
}

export const getBooksSandpackExampleById = (id: string) =>
  BOOKS_SANDPACK_EXAMPLES[id]

export type { SandpackExample, SandpackFile } from "./types"