export interface Degree {
  id: number;
  documentId: string;
  name: string;
  section: string;
  capacity: number;
  level: "Inicial" | "Primaria" | "Secundaria";
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CreateDegreeData {
  name: string;
  section: string;
  capacity: number;
}
