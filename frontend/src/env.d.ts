/* reference types */

interface ImportMetaEnv {
  readonly BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import type { User } from "@lib/types/user";

declare global {
  declare namespace App {
    interface Locals {
      user?: User;
      token?: string;
    }
  }
}
