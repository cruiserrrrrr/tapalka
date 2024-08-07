/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface Process {
      env: {
        [key: string]: string;
      };
    }
  }
}

declare var process: NodeJS.Process;