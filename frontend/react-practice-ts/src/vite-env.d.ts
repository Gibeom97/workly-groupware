/// <reference types="vite/client" />

declare module "*.json" {
    const value: any;
    export default value;
  }

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}