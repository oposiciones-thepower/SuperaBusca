import api from '../config/api';
import { Correccion } from '../types';

interface CorreccionAPI {
  temario_id: number;
  oposicion_nombre: string;
  tema_convocatoria_titulo: string;
  coincidencia_porcentaje: string;
  ley_detectada: string;
  notas: string;
  url_pdf_evidencia: string;
  tema_academia_id: number;
}

interface TemarioDecisionPayload {
  profesor_id: number;
  temario_id: number;
  accion: 'APROBADO' | 'RECHAZADO';
  comentarios: string;
}

export const correccionesService = {
  // Obtener lista de correcciones
  async getCorrecciones(): Promise<Correccion[]> {
    try {
      const response = await api.get<CorreccionAPI[]>('/lista-correciones');
      
      return response.data.map(item => ({
        id: item.temario_id.toString(),
        titulo: item.oposicion_nombre,
        descripcion: item.tema_convocatoria_titulo,
        candidato: item.ley_detectada,
        fechaCorreccion: new Date().toISOString(),
        comentarioCorrector: item.notas,
        estado: 'pendiente' as const,
        coincidenciaPorcentaje: parseFloat(item.coincidencia_porcentaje),
        urlPdfEvidencia: item.url_pdf_evidencia,
        temaAcademiaId: item.tema_academia_id
      }));
    } catch (error) {
      console.error('Error obteniendo correcciones:', error);
      throw error;
    }
  },

  // Enviar decisión sobre corrección (aprobar o rechazar)
  async enviarDecision(payload: TemarioDecisionPayload): Promise<void> {
    try {
      await api.post('/temario-desicion', payload);
    } catch (error) {
      console.error('Error enviando decisión:', error);
      throw error;
    }
  },

  // Aprobar corrección
  async aprobar(profesorId: number, temarioId: number, comentarios: string = ''): Promise<void> {
    return this.enviarDecision({
      profesor_id: profesorId,
      temario_id: temarioId,
      accion: 'APROBADO',
      comentarios
    });
  },

  // Rechazar corrección
  async rechazar(profesorId: number, temarioId: number, comentarios: string = ''): Promise<void> {
    return this.enviarDecision({
      profesor_id: profesorId,
      temario_id: temarioId,
      accion: 'RECHAZADO',
      comentarios
    });
  }
};
