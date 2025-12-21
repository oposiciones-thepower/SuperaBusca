import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapse, Button, message, Tag, Space, Spin } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  UserOutlined,
  PercentageOutlined,
  CommentOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { correccionesService } from '../../services/correccionesService';
import { useAuth } from '../../context/AuthContext';
import { Correccion } from '../../types';
import './Correcciones.css';

const { Panel } = Collapse;

const Correcciones: React.FC = () => {
  const { user } = useAuth();
  const [correcciones, setCorrecciones] = useState<Correccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Cargar correcciones del API
  useEffect(() => {
    const fetchCorrecciones = async () => {
      try {
        setLoading(true);
        const data = await correccionesService.getCorrecciones();
        setCorrecciones(data);
      } catch (error) {
        message.error('Error al cargar las correcciones');
      } finally {
        setLoading(false);
      }
    };

    fetchCorrecciones();
  }, []);

  const handleAprobar = async (id: string) => {
    setActionLoading(true);
    try {
      await correccionesService.aprobar(
        parseInt(user?.id || '0'),
        parseInt(id)
      );
      
      setCorrecciones(prev => 
        prev.map(c => c.id === id ? { ...c, estado: 'aprobado' as const } : c)
      );
      
      message.success('Corrección aprobada correctamente');
    } catch (error) {
      message.error('Error al aprobar la corrección');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRechazar = async (id: string) => {
    setActionLoading(true);
    try {
      await correccionesService.rechazar(
        parseInt(user?.id || '0'),
        parseInt(id)
      );
      
      setCorrecciones(prev => 
        prev.map(c => c.id === id ? { ...c, estado: 'rechazado' as const } : c)
      );
      
      message.warning('Corrección rechazada');
    } catch (error) {
      message.error('Error al rechazar la corrección');
    } finally {
      setActionLoading(false);
    }
  };

  const getEstadoTag = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Tag color="blue">Pendiente de Revisión</Tag>;
      case 'aprobado':
        return <Tag color="green">Aprobado</Tag>;
      case 'rechazado':
        return <Tag color="red">Rechazado</Tag>;
      default:
        return null;
    }
  };

  const correccionesPendientes = correcciones.filter(c => c.estado === 'pendiente');

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Cargando correcciones..." />
      </div>
    );
  }

  return (
    <motion.div
      className="correcciones-container"
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
          Correcciones
        </motion.h1>
        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Revisa las correcciones realizadas
        </motion.p>
      </div>

      <motion.div
        className="stats-bar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="stat-item">
          <span className="stat-number">{correccionesPendientes.length}</span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-item stat-aprobado">
          <span className="stat-number">{correcciones.filter(c => c.estado === 'aprobado').length}</span>
          <span className="stat-label">Aprobadas</span>
        </div>
        <div className="stat-item stat-rechazado">
          <span className="stat-number">{correcciones.filter(c => c.estado === 'rechazado').length}</span>
          <span className="stat-label">Rechazadas</span>
        </div>
      </motion.div>

      <AnimatePresence>
        <Collapse 
          className="correcciones-collapse"
          accordion
          expandIconPosition="end"
        >
          {correcciones.map((correccion, index) => (
            <Panel
              key={correccion.id}
              header={
                <motion.div 
                  className="correccion-header"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="correccion-header-content">
                    <h3 className="correccion-title">{correccion.titulo}</h3>
                    <div className="correccion-meta">
                      <Space size="middle">
                        <span><UserOutlined /> {correccion.candidato}</span>
                        <span><PercentageOutlined /> {correccion.coincidenciaPorcentaje?.toFixed(2)}%</span>
                        {getEstadoTag(correccion.estado)}
                      </Space>
                    </div>
                  </div>
                </motion.div>
              }
            >
              <div className="correccion-content">
                <p className="correccion-description">{correccion.descripcion}</p>
                
                <div className="comentario-section">
                  <div className="comentario-header">
                    <CommentOutlined />
                    <h4>Notas:</h4>
                  </div>
                  <p className="comentario-text">{correccion.comentarioCorrector}</p>
                </div>

                {correccion.urlPdfEvidencia && (
                  <div className="documentos-section">
                    <a href={correccion.urlPdfEvidencia} target="_blank" rel="noopener noreferrer" className="documento-item">
                      <LinkOutlined />
                      <span>Ver PDF Evidencia</span>
                    </a>
                  </div>
                )}

                {correccion.estado === 'pendiente' && (
                  <div className="correccion-actions">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="primary"
                        icon={<CheckCircleOutlined />}
                        onClick={() => handleAprobar(correccion.id)}
                        loading={actionLoading}
                        className="btn-aprobar"
                      >
                        Aprobar
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        danger
                        icon={<CloseCircleOutlined />}
                        onClick={() => handleRechazar(correccion.id)}
                        loading={actionLoading}
                        className="btn-rechazar"
                      >
                        Rechazar
                      </Button>
                    </motion.div>
                  </div>
                )}
              </div>
            </Panel>
          ))}
        </Collapse>
      </AnimatePresence>
    </motion.div>
  );
};

export default Correcciones;
