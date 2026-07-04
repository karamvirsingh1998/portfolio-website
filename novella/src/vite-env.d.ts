/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LABS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
