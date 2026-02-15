export interface AcademicPeriod {
  id: number;
  documentId: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CreateAcademicPeriodData {
  name: string;
  active: boolean;
}
