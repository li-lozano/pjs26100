export interface Student {
  id: number;
  documentId: string;
  names: string;
  surnames: string;
  dni: string;
  birthday: string;
  gender: string;
  address: string;
  profile?: {
    id: number;
    documentId: string;
    names: string;
    surnames: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CreateStudentData {
  names: string;
  surnames: string;
  dni: string;
  birthday: string;
  gender: string;
  address: string;
  profile?: string;
}