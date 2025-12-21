import React from 'react';
import { motion } from 'framer-motion';
import { Card, Tag, Button, Tooltip } from 'antd';
import { 
  CalendarOutlined, 
  EnvironmentOutlined, 
  TeamOutlined,
  BookOutlined
} from '@ant-design/icons';
import { Oposicion } from '../../types';
import './OposicionCard.css';

interface OposicionCardProps {
  oposicion: Oposicion;
  index: number;
  onSolicitarTemario: (id: string) => void;
}

const OposicionCard: React.FC<OposicionCardProps> = ({ oposicion, index, onSolicitarTemario }) => {
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'abierta':
        return '#22c55e';
      case 'cerrada':
        return '#ef4444';
      case 'proxima':
        return '#f59e0b';
      default:
        return '#94a3b8';
    }
  };

  const getEstadoLabel = (estado: string) => {
    switch (estado) {
      case 'abierta':
        return 'Abierta';
      case 'cerrada':
        return 'Cerrada';
      case 'proxima':
        return 'Próxima';
      default:
        return estado;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Card className="oposicion-card">
        <div className="card-header">
          <Tag 
            color={getEstadoColor(oposicion.estado)}
            className="estado-tag"
          >
            {getEstadoLabel(oposicion.estado)}
          </Tag>
          <Tag className="categoria-tag">{oposicion.categoria}</Tag>
        </div>

        <h3 className="card-title">{oposicion.titulo}</h3>
        <p className="card-description">{oposicion.descripcion}</p>

        <div className="card-info">
          <Tooltip title="Provincia">
            <div className="info-item">
              <EnvironmentOutlined />
              <span>{oposicion.provincia}</span>
            </div>
          </Tooltip>
          
          <Tooltip title="Fecha de Convocatoria">
            <div className="info-item">
              <CalendarOutlined />
              <span>{new Date(oposicion.fechaConvocatoria).toLocaleDateString('es-ES')}</span>
            </div>
          </Tooltip>
          
          <Tooltip title="Plazas Disponibles">
            <div className="info-item">
              <TeamOutlined />
              <span>{oposicion.plazas} plazas</span>
            </div>
          </Tooltip>
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="primary"
            icon={<BookOutlined />}
            className="solicitar-btn"
            onClick={() => onSolicitarTemario(oposicion.id)}
            block
          >
            Solicitar Temario
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default OposicionCard;
