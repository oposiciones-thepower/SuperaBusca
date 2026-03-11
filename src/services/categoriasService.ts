import api from '../config/api';

export interface Categoria {
  id: number;
  nombre: string;
}

export const categoriasService = {
  async getCategorias(): Promise<Categoria[]> {
    try {
      const response = await api.get<Categoria[]>('/categorias');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo categorías:', error);
      throw error;
    }
  },
  
  async createCategoria(nombre: string): Promise<Categoria> {
    try {
      const response = await api.post<Categoria>('/categorias', { nombre });
      return response.data;
    } catch (error) {
      console.error('Error creando categoría:', error);
      throw error;
    }
  },
  async updateCategoria(id: number, nombre: string): Promise<Categoria> {
    try {
      const response = await api.put<Categoria>(`/categorias/${id}`, { nombre });
      return response.data;
    } catch (error) {
      console.error('Error actualizando categoría:', error);
      throw error;
    }
  },
  async deleteCategoria(id: number): Promise<void> {
    try {
      await api.delete(`/categorias/${id}`);
    } catch (error) {
      console.error('Error eliminando categoría:', error);
      throw error;
    }
  }
};