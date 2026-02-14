export interface Student {
  id: number;
  documentId: string;
  names: string;
  surnames: string;
  dni: string;
  birthday: string;
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
}