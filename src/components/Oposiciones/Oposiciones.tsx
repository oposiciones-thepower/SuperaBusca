import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Select, Input, Empty, message, Row, Col, Spin } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { oposicionesService } from '../../services/oposicionesService';
import { useAuth } from '../../context/AuthContext';
import { Oposicion } from '../../types';
import OposicionCard from './OposicionCard';
import './Oposiciones.css';

const Oposiciones: React.FC = () => {
  const { user } = useAuth();
  const [oposiciones, setOposiciones] = useState<Oposicion[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaFilter, setCategoriaFilter] = useState<string>('');
  const [provinciaFilter, setProvinciaFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Cargar oposiciones del API
  useEffect(() => {
    const fetchOposiciones = async () => {
      try {
        setLoading(true);
        const data = await oposicionesService.getOposiciones();
        setOposiciones(data);
      } catch (error) {
        message.error('Error al cargar las oposiciones');
      } finally {
        setLoading(false);
      }
    };

    fetchOposiciones();
  }, []);

  // Extraer categorías y provincias únicas del mismo GET de oposiciones
  const categorias = useMemo(() => {
    const uniqueCategorias = [...new Set(oposiciones.map(o => o.categoria))];
    return uniqueCategorias.sort();
  }, [oposiciones]);

  const provincias = useMemo(() => {
    const uniqueProvincias = [...new Set(oposiciones.map(o => o.provincia))];
    return uniqueProvincias.sort();
  }, [oposiciones]);

  // Filtrar oposiciones
  const oposicionesFiltradas = useMemo(() => {
    return oposiciones.filter(o => {
      const matchCategoria = !categoriaFilter || o.categoria === categoriaFilter;
      const matchProvincia = !provinciaFilter || o.provincia === provinciaFilter;
      const matchSearch = !searchTerm || 
        o.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategoria && matchProvincia && matchSearch;
    });
  }, [oposiciones, categoriaFilter, provinciaFilter, searchTerm]);

  const handleSolicitarTemario = async (id: string) => {
    try {
      const oposicion = oposiciones.find(o => o.id === id);
      await oposicionesService.compararTemario({
        user_id: parseInt(user?.id || '0'),
        oposicion_id: parseInt(id)
      });
      message.success(`Temario solicitado para: ${oposicion?.titulo}`);
    } catch (error) {
      message.error('Error al solicitar el temario');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Cargando oposiciones..." />
      </div>
    );
  }

  return (
    <motion.div
      className="oposiciones-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-header">
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Oposiciones
        </motion.h1>
        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Explora las convocatorias disponibles y solicita tu temario
        </motion.p>
      </div>

      <motion.div 
        className="filters-container"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="filters-row">
          <div className="filter-item search-filter">
            <Input
              placeholder="Buscar oposición..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              allowClear
            />
          </div>

          <div className="filter-item">
            <Select
              placeholder={
                <span>
                  <FilterOutlined /> Categoría
                </span>
              }
              value={categoriaFilter || undefined}
              onChange={setCategoriaFilter}
              allowClear
              className="filter-select"
            >
              {categorias.map(cat => (
                <Select.Option key={cat} value={cat}>{cat}</Select.Option>
              ))}
            </Select>
          </div>

          <div className="filter-item">
            <Select
              placeholder={
                <span>
                  <FilterOutlined /> Provincia
                </span>
              }
              value={provinciaFilter || undefined}
              onChange={setProvinciaFilter}
              allowClear
              className="filter-select"
            >
              {provincias.map(prov => (
                <Select.Option key={prov} value={prov}>{prov}</Select.Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="results-count">
          {oposicionesFiltradas.length} oposiciones encontradas
        </div>
      </motion.div>

      {oposicionesFiltradas.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row gutter={[24, 24]}>
            {oposicionesFiltradas.map((oposicion, index) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={oposicion.id}>
                <OposicionCard
                  oposicion={oposicion}
                  index={index}
                  onSolicitarTemario={handleSolicitarTemario}
                />
              </Col>
            ))}
          </Row>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="empty-container"
        >
          <Empty
            description={
              <span className="empty-text">
                No se encontraron oposiciones con los filtros seleccionados
              </span>
            }
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Oposiciones;
