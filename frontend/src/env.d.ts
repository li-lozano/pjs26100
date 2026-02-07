/* reference types */

interface ImportMetaEnv {
  readonly BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    // El usuario puede ser undefined si no ha iniciado sesión.
    user?: {
      id: number;
      documentId: string;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      role: {
        id: number;
        documentId: string;
        name: string;
        description: string;
        type: string;
      };
    }
  };
}