export const SERVICE_TYPES = [
  {
    id: 'wardrobe',
    name: 'Montagem de Guarda-roupa',
    category: 'Quarto',
    estimatedDuration: 4,
    basePrice: 180,
    complexity: 'medium' as const,
    icon: 'Shirt',
    description: 'Montagem completa de guarda-roupas de todos os tamanhos'
  },
  {
    id: 'kitchen',
    name: 'Montagem de Cozinha',
    category: 'Cozinha',
    estimatedDuration: 8,
    basePrice: 350,
    complexity: 'complex' as const,
    icon: 'ChefHat',
    description: 'Montagem de móveis de cozinha planejada ou modulada'
  },
  {
    id: 'desk',
    name: 'Montagem de Mesa',
    category: 'Escritório',
    estimatedDuration: 2,
    basePrice: 80,
    complexity: 'simple' as const,
    icon: 'Desk',
    description: 'Montagem de mesas de escritório, jantar ou centro'
  },
  {
    id: 'shelf',
    name: 'Montagem de Estante',
    category: 'Sala',
    estimatedDuration: 3,
    basePrice: 120,
    complexity: 'medium' as const,
    icon: 'BookOpen',
    description: 'Montagem de estantes, prateleiras e nichos'
  },
  {
    id: 'bed',
    name: 'Montagem de Cama',
    category: 'Quarto',
    estimatedDuration: 2,
    basePrice: 100,
    complexity: 'simple' as const,
    icon: 'Bed',
    description: 'Montagem de camas box, beliches e estruturas'
  },
  {
    id: 'office',
    name: 'Móveis de Escritório',
    category: 'Escritório',
    estimatedDuration: 6,
    basePrice: 250,
    complexity: 'medium' as const,
    icon: 'Building',
    description: 'Montagem completa de móveis para escritório'
  }
];

export const SPECIALTIES = [
  'Cozinhas Planejadas',
  'Guarda-roupas',
  'Estantes e Prateleiras',
  'Mesas e Cadeiras',
  'Camas e Beliches',
  'Móveis de Escritório',
  'Móveis Infantis',
  'Móveis de Banheiro',
  'Racks e Painéis TV',
  'Móveis Modulares'
];

export const CITIES = [
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Brasília',
  'Salvador',
  'Fortaleza',
  'Curitiba',
  'Recife',
  'Porto Alegre',
  'Goiânia'
];

export const TIME_SLOTS = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '14:00 - 16:00',
  '16:00 - 18:00'
];

export const URGENCY_LEVELS = {
  low: {
    label: 'Baixa',
    color: 'green',
    multiplier: 1,
    description: 'Flexível com datas'
  },
  normal: {
    label: 'Normal',
    color: 'blue',
    multiplier: 1.2,
    description: 'Prazo padrão'
  },
  high: {
    label: 'Urgente',
    color: 'red',
    multiplier: 1.5,
    description: 'Precisa ser feito rapidamente'
  }
};

export const BOOKING_STATUS = {
  pending: {
    label: 'Aguardando',
    color: 'yellow',
    description: 'Aguardando confirmação do montador'
  },
  confirmed: {
    label: 'Confirmado',
    color: 'blue',
    description: 'Agendamento confirmado'
  },
  in_progress: {
    label: 'Em Andamento',
    color: 'orange',
    description: 'Serviço sendo executado'
  },
  completed: {
    label: 'Concluído',
    color: 'green',
    description: 'Serviço finalizado'
  },
  cancelled: {
    label: 'Cancelado',
    color: 'red',
    description: 'Agendamento cancelado'
  },
  rescheduled: {
    label: 'Reagendado',
    color: 'purple',
    description: 'Nova data agendada'
  }
};