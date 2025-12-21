import { Oposicion, Revision, Correccion } from '../types';

export const oposiciones: Oposicion[] = [
  {
    id: '1',
    titulo: 'Administrativo del Estado',
    descripcion: 'Convocatoria para plazas de Administrativo en la Administración General del Estado',
    categoria: 'Administrativo',
    provincia: 'Madrid',
    fechaConvocatoria: '2024-03-15',
    plazas: 150,
    estado: 'abierta'
  },
  {
    id: '2',
    titulo: 'Técnico de Hacienda',
    descripcion: 'Oposiciones para Técnico de Hacienda en el Ministerio de Economía',
    categoria: 'Técnico',
    provincia: 'Barcelona',
    fechaConvocatoria: '2024-04-20',
    plazas: 80,
    estado: 'abierta'
  },
  {
    id: '3',
    titulo: 'Auxiliar Administrativo',
    descripcion: 'Plazas de Auxiliar Administrativo para la Junta de Andalucía',
    categoria: 'Auxiliar',
    provincia: 'Sevilla',
    fechaConvocatoria: '2024-02-10',
    plazas: 200,
    estado: 'abierta'
  },
  {
    id: '4',
    titulo: 'Inspector de Trabajo',
    descripcion: 'Convocatoria de Inspectores de Trabajo y Seguridad Social',
    categoria: 'Inspector',
    provincia: 'Valencia',
    fechaConvocatoria: '2024-05-01',
    plazas: 45,
    estado: 'proxima'
  },
  {
    id: '5',
    titulo: 'Gestor de la Administración',
    descripcion: 'Plazas para Gestores de la Administración Civil del Estado',
    categoria: 'Gestor',
    provincia: 'Madrid',
    fechaConvocatoria: '2024-03-28',
    plazas: 120,
    estado: 'abierta'
  },
  {
    id: '6',
    titulo: 'Técnico Superior Informático',
    descripcion: 'Convocatoria para Técnicos Superiores en Informática del Estado',
    categoria: 'Técnico',
    provincia: 'Bilbao',
    fechaConvocatoria: '2024-06-15',
    plazas: 60,
    estado: 'proxima'
  },
  {
    id: '7',
    titulo: 'Auxiliar de Justicia',
    descripcion: 'Plazas de Auxilio Judicial para los Juzgados de Cataluña',
    categoria: 'Auxiliar',
    provincia: 'Barcelona',
    fechaConvocatoria: '2024-01-20',
    plazas: 90,
    estado: 'cerrada'
  },
  {
    id: '8',
    titulo: 'Administrativo de Sanidad',
    descripcion: 'Convocatoria para Administrativos del Servicio de Salud',
    categoria: 'Administrativo',
    provincia: 'Zaragoza',
    fechaConvocatoria: '2024-04-05',
    plazas: 75,
    estado: 'abierta'
  }
];

export const revisiones: Revision[] = [
  {
    id: '1',
    titulo: 'Tema 1: Constitución Española',
    descripcion: 'Revisión del tema sobre la estructura y contenido de la Constitución Española de 1978',
    candidato: 'María García López',
    fechaEnvio: '2024-01-15',
    estado: 'pendiente',
    documentos: ['constitucion_tema1.pdf', 'ejercicios_constitucion.pdf']
  },
  {
    id: '2',
    titulo: 'Tema 3: Derecho Administrativo',
    descripcion: 'Análisis del procedimiento administrativo común y sus fases',
    candidato: 'Carlos Martínez Ruiz',
    fechaEnvio: '2024-01-18',
    estado: 'pendiente',
    documentos: ['derecho_admin.pdf']
  },
  {
    id: '3',
    titulo: 'Tema 5: Organización del Estado',
    descripcion: 'Estudio de la organización territorial del Estado y las Comunidades Autónomas',
    candidato: 'Ana Fernández Gil',
    fechaEnvio: '2024-01-20',
    estado: 'pendiente',
    documentos: ['organizacion_estado.pdf', 'mapas_ccaa.pdf']
  },
  {
    id: '4',
    titulo: 'Tema 2: Derechos Fundamentales',
    descripcion: 'Revisión de los derechos y libertades fundamentales recogidos en la CE',
    candidato: 'Pedro Sánchez Mora',
    fechaEnvio: '2024-01-22',
    estado: 'pendiente',
    documentos: ['derechos_fundamentales.pdf']
  },
  {
    id: '5',
    titulo: 'Tema 7: Hacienda Pública',
    descripcion: 'Análisis del sistema tributario español y los presupuestos generales',
    candidato: 'Laura Jiménez Vega',
    fechaEnvio: '2024-01-25',
    estado: 'pendiente',
    documentos: ['hacienda_publica.pdf', 'ejercicios_tributarios.pdf']
  }
];

export const correcciones: Correccion[] = [
  {
    id: '1',
    titulo: 'Tema 4: Ley de Procedimiento Administrativo',
    descripcion: 'Corrección sobre el análisis de la Ley 39/2015',
    candidato: 'Roberto Díaz Núñez',
    fechaCorreccion: '2024-01-28',
    comentarioCorrector: 'Revisar el apartado de plazos y cómputo de términos. Falta desarrollar el silencio administrativo.',
    estado: 'pendiente'
  },
  {
    id: '2',
    titulo: 'Tema 6: Función Pública',
    descripcion: 'Corrección del tema sobre el estatuto del empleado público',
    candidato: 'Elena Torres Blanco',
    fechaCorreccion: '2024-01-29',
    comentarioCorrector: 'Ampliar el apartado de situaciones administrativas y derechos retributivos.',
    estado: 'pendiente'
  },
  {
    id: '3',
    titulo: 'Tema 8: Contratación Pública',
    descripcion: 'Revisión de correcciones sobre contratos del sector público',
    candidato: 'Miguel Ángel Ramos',
    fechaCorreccion: '2024-01-30',
    comentarioCorrector: 'Mejorar la explicación de los tipos de procedimientos de adjudicación.',
    estado: 'pendiente'
  }
];
