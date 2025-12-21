import api from '../config/api';
import { Revision } from '../types';

// interface RevisionAPI {
//   temario_id: number;
//   oposicion_nombre: string;
//   tema_convocatoria_titulo: string;
//   coincidencia_porcentaje: string;
//   ley_detectada: string;
//   notas: string;
//   url_pdf_evidencia: string;
//   tema_academia_id: number;
// }

export interface RevisionGrupo {
  temarioId: number;
  titulo: string; // oposicion_nombre
  temas: {
    titulo: string;
    detalles: {
      id: string;
      candidato: string;
      coincidenciaPorcentaje: number;
      notas: string;
      documentos: string[];
      estado: 'pendiente' | 'aprobado' | 'corregir';
      temaAcademiaId: number;
    }[];
  }[];
}

interface TemarioDecisionPayload {
  profesor_id: number;
  temario_id: number;
  accion: 'APROBADO' | 'CORRECCION';
  comentarios: string;
}

interface DetalleMapeoAPI {
  tema_academia_id: number;
  coincidencia_porcentaje: string;
  ley_detectada: string;
  notas: string;
  url_pdf_evidencia: string;
}

interface TemaConvocatoriaAPI {
  titulo: string;
  detalles_mapeo: DetalleMapeoAPI[];
}

interface RevisionAPIResponse {
  temario_id: number;
  oposicion_nombre: string;
  temas_convocatoria: TemaConvocatoriaAPI[];
}

export const revisionesService = {
  // Obtener lista de revisiones
async getRevisiones(): Promise<any[]> {
  try {
    const response = await api.get<any[]>('/lista-revisiones');

    return response.data.map(temario => {
      return {
        id: String(temario.temario_id),
        titulo: temario.oposicion_nombre,
        descripcion: 'Revisión del temario',
        candidato: 'Sistema de detección',
        fechaEnvio: new Date().toISOString(),
        estado: 'pendiente' as const,
        temas: temario.temas_convocatoria // 👈 CLAVE
      };
    });
  } catch (error) {
    console.error('Error obteniendo revisiones:', error);
    throw error;
  }
},


  // Enviar decisión sobre temario (aprobar o corregir)
  async enviarDecision(payload: TemarioDecisionPayload): Promise<void> {
    try {
      await api.post('/temario-desicion', payload);
    } catch (error) {
      console.error('Error enviando decisión:', error);
      throw error;
    }
  },

  // Aprobar revisión
  async aprobar(profesorId: number, temarioId: number, comentarios: string = ''): Promise<void> {
    return this.enviarDecision({
      profesor_id: profesorId,
      temario_id: temarioId,
      accion: 'APROBAR',
      comentarios
    });
  },

  // Solicitar corrección
  async solicitarCorreccion(profesorId: number, temarioId: number, comentarios: string): Promise<void> {
    return this.enviarDecision({
      profesor_id: profesorId,
      temario_id: temarioId,
      accion: 'CORRECCION',
      comentarios
    });
  }
};
