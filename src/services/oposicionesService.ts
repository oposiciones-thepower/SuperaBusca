import api from '../config/api';
import { Oposicion } from '../types';

interface OposicionAPI {
  id: number;
  titulo: string;
  num_plazas: number;
  url_bases_oficiales: string;
  fecha_convocatoria: string;
  tiene_temario_listo: boolean;
  provincia_id: number;
  nombre_provincia: string;
  categoria_id: number;
  nombre_categoria: string;
}

interface CompararTemarioPayload {
  user_id: number;
  oposicion_id: number;
}

export const oposicionesService = {
  // Obtener lista de oposiciones
  async getOposiciones(): Promise<Oposicion[]> {
    try {
      const response = await api.get<OposicionAPI[]>('/lista-oposiciones');
      
      return response.data.map(item => ({
        id: item.id.toString(),
        titulo: item.titulo,
        descripcion: `${item.nombre_categoria} - ${item.nombre_provincia}`,
        categoria: item.nombre_categoria,
        categoriaId: item.categoria_id,
        provincia: item.nombre_provincia,
        provinciaId: item.provincia_id,
        fechaConvocatoria: item.fecha_convocatoria,
        plazas: item.num_plazas,
        estado: item.tiene_temario_listo ? 'abierta' : 'proxima',
        urlBasesOficiales: item.url_bases_oficiales,
        tieneTemarioListo: item.tiene_temario_listo
      }));
    } catch (error) {
      console.error('Error obteniendo oposiciones:', error);
      throw error;
    }
  },

  // Solicitar comparar temario
  async compararTemario(payload: CompararTemarioPayload): Promise<void> {
    try {
      await api.post('/comparar-temario', payload);
    } catch (error) {
      console.error('Error comparando temario:', error);
      throw error;
    }
  }
};
