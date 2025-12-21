export interface Oposicion {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  categoriaId?: number;
  provincia: string;
  provinciaId?: number;
  fechaConvocatoria: string;
  plazas: number;
  estado: 'abierta' | 'cerrada' | 'proxima';
  urlBasesOficiales?: string;
  tieneTemarioListo?: boolean;
}

export interface Revision {
  id: string;
  temario_id: number;
  titulo: string;
  descripcion: string;
  candidato: string;
  fechaEnvio: string;
  estado: 'pendiente' | 'aprobado' | 'corregir';
  documentos: string[];
  coincidenciaPorcentaje?: number;
  notas?: string;
  temaAcademiaId?: number;
}

export interface Correccion {
  id: string;
  titulo: string;
  descripcion: string;
  candidato: string;
  fechaCorreccion: string;
  comentarioCorrector: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  coincidenciaPorcentaje?: number;
  urlPdfEvidencia?: string;
  temaAcademiaId?: number;
}

export interface User {
  id: string;
  username: string;
  nombre: string;
  rol: 'PROFESOR' | 'ESTUDIANTE';
}
