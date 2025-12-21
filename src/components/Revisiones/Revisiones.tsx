import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapse, Button, Modal, Input, message, Tag, Space, Spin } from 'antd';
import { 
  CheckCircleOutlined, 
  EditOutlined, 
  FileOutlined,
  UserOutlined,
  PercentageOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { revisionesService } from '../../services/revisionesService';
import { useAuth } from '../../context/AuthContext';
import { Revision } from '../../types';
import './Revisiones.css';
import { log } from 'util';

const { Panel } = Collapse;
const { TextArea } = Input;

const Revisiones: React.FC = () => {
  const { user } = useAuth();
  const [revisiones, setRevisiones] = useState<Revision[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState<string | null>(null);
  const [correccionText, setCorreccionText] = useState('');

  // Cargar revisiones del API
  useEffect(() => {
    const fetchRevisiones = async () => {
      try {
        setLoading(true);
        const data = await revisionesService.getRevisiones();
        setRevisiones(data);
      } catch (error) {
        message.error('Error al cargar las revisiones');
      } finally {
        setLoading(false);
      }
    };

    fetchRevisiones();
  }, []);

  const handleAprobar = async (id: string) => {
    
    setActionLoading(true);
    try {
      await revisionesService.aprobar(
        parseInt(user?.id || '0'),
        parseInt(id)
      );
      
      setRevisiones(prev => 
        prev.map(r => r.id === id ? { ...r, estado: 'aprobado' as const } : r)
      );
      
      message.success('Revisión aprobada correctamente');
    } catch (error) {
      message.error('Error al aprobar la revisión');
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenCorreccion = (id: string) => {
    setSelectedRevision(id);
    setCorreccionText('');
    setModalVisible(true);
  };

  const handleSolicitarCorreccion = async () => {
    if (!correccionText.trim()) {
      message.warning('Debes escribir la corrección requerida');
      return;
    }

    setActionLoading(true);
    try {
      await revisionesService.solicitarCorreccion(
        parseInt(user?.id || '0'),
        parseInt(selectedRevision || '0'),
        correccionText
      );
      
      setRevisiones(prev => 
        prev.map(r => r.id === selectedRevision ? { ...r, estado: 'corregir' as const } : r)
      );
      
      message.success('Corrección solicitada correctamente');
      setModalVisible(false);
      setCorreccionText('');
      setSelectedRevision(null);
    } catch (error) {
      message.error('Error al solicitar la corrección');
    } finally {
      setActionLoading(false);
    }
  };

  const getEstadoTag = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Tag color="blue">Pendiente</Tag>;
      case 'aprobado':
        return <Tag color="green">Aprobado</Tag>;
      case 'corregir':
        return <Tag color="orange">En Corrección</Tag>;
      default:
        return null;
    }
  };

  const revisionesPendientes = revisiones.filter(r => r.estado === 'pendiente');

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Cargando revisiones..." />
      </div>
    );
  }

  return (
    <motion.div
      className="revisiones-container"
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
          Revisiones
        </motion.h1>
        <motion.p 
          className="page-subtitle"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Revisa y evalúa los temarios de las oposiciones
        </motion.p>
      </div>

      <motion.div
        className="stats-bar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="stat-item">
          <span className="stat-number">{revisionesPendientes.length}</span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{revisiones.filter(r => r.estado === 'aprobado').length}</span>
          <span className="stat-label">Aprobadas</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{revisiones.filter(r => r.estado === 'corregir').length}</span>
          <span className="stat-label">En Corrección</span>
        </div>
      </motion.div>

      <AnimatePresence>
      <Collapse
  className="revisiones-collapse"
  accordion
  expandIconPosition="end"
>
  {revisiones.map((revision, index) => (
    <Panel
      key={revision.id}
      header={
        <motion.div
          className="revision-header"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <div className="revision-header-content">
            <h3 className="revision-title">{revision.titulo}</h3>
            <div className="revision-meta">
              <Space size="middle">
                <span><UserOutlined /> {revision.candidato}</span>
                {getEstadoTag(revision.estado)}
              </Space>
            </div>
          </div>

          <div className="revision-actions">
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => handleAprobar(revision.id)}
              loading={actionLoading}
              className="btn-aprobar"
            >
              Aprobar
            </Button>
            <Button
              icon={<EditOutlined />}
              onClick={() => handleOpenCorreccion(revision.id)}
              className="btn-corregir"
            >
              Corregir
            </Button>
          </div>
        </motion.div>
      }
    >
      <div className="revision-content">
        {revision.temas.map((tema, tIndex) => (
          <div key={tIndex} className="tema-section">
            <h4>{tema.titulo}</h4>

            {tema.recursos_vinculados.map((recurso, rIndex) => (
              <div key={rIndex} className="documento-item">
                <Space size="middle">
                  <Tag color="blue">{recurso.ley_detectada}</Tag>
                  <Tag color="green">
                    {parseFloat(recurso.coincidencia_maxima).toFixed(2)}%
                  </Tag>
                  <a
                  href={recurso.url_pdf_evidencia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="documento-link"
                >
                  <LinkOutlined /> Ver PDF Evidencia
                </a>
                </Space>
               
                {/* ✅ NOTAS COMO LISTA (NO CONCATENADAS) */}
                {recurso.fragmentos_notas?.length > 0 && (
                  <div className="notas-section">
                    <h4>Notas:</h4>
                    <ul>
                      {recurso.fragmentos_notas.map((n, i) => (
                        <li key={i}>
                          {n.nota} ({n.coincidencia}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                 

              </div>
            ))}
          </div>
        ))}

      </div>
    </Panel>
  ))}
</Collapse>

      </AnimatePresence>

      <Modal
        title="Solicitar Corrección"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        className="correccion-modal"
      >
        <div className="modal-content">
          <p className="modal-description">
            Indica qué aspectos debe corregir:
          </p>
          <TextArea
            rows={4}
            placeholder="Escribe los aspectos a corregir..."
            value={correccionText}
            onChange={(e) => setCorreccionText(e.target.value)}
            className="correccion-textarea"
          />
          <div className="modal-actions">
            <Button onClick={() => setModalVisible(false)}>
              Cancelar
            </Button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="primary"
                onClick={handleSolicitarCorreccion}
                loading={actionLoading}
                className="btn-solicitar"
              >
                Solicitar Corrección
              </Button>
            </motion.div>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default Revisiones;
