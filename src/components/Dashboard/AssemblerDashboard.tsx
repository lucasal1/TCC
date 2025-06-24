import React from 'react';
import { Calendar, DollarSign, Star, TrendingUp, Clock, MapPin, Award, Users, Target } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { formatCurrency, formatDate, formatRelativeTime } from '../../utils/helpers';

interface AssemblerDashboardProps {
  onNavigate: (page: string) => void;
}

export const AssemblerDashboard: React.FC<AssemblerDashboardProps> = ({ onNavigate }) => {
  const upcomingJobs = [
    {
      id: '1',
      service: 'Montagem de Cozinha Completa',
      client: {
        name: 'Maria Silva',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.9
      },
      date: new Date('2024-01-22'),
      time: '14:00',
      address: 'Rua das Flores, 123 - Vila Madalena',
      price: 350,
      estimatedDuration: 6,
      status: 'confirmed' as const,
      urgency: 'normal' as const
    },
    {
      id: '2',
      service: 'Guarda-roupa de Casal',
      client: {
        name: 'João Santos',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.7
      },
      date: new Date('2024-01-24'),
      time: '09:00',
      address: 'Av. Paulista, 456 - Bela Vista',
      price: 280,
      estimatedDuration: 4,
      status: 'pending' as const,
      urgency: 'high' as const
    }
  ];

  const monthlyStats = {
    totalEarnings: 4200,
    lastMonthEarnings: 3800,
    completedJobs: 18,
    rating: 4.9,
    responseTime: 35, // minutes
    completionRate: 98.5,
    newClients: 7,
    repeatClients: 11
  };

  const recentReviews = [
    {
      id: '1',
      client: 'Ana Costa',
      rating: 5,
      comment: 'Trabalho impecável! Muito profissional e pontual.',
      service: 'Montagem de Estante',
      date: new Date('2024-01-18')
    },
    {
      id: '2',
      client: 'Pedro Lima',
      rating: 5,
      comment: 'Excelente montador, recomendo para todos!',
      service: 'Mesa de Escritório',
      date: new Date('2024-01-16')
    }
  ];

  const getStatusInfo = (status: string) => {
    const statusMap = {
      confirmed: { label: 'Confirmado', variant: 'info' as const },
      pending: { label: 'Pendente', variant: 'warning' as const },
      in_progress: { label: 'Em Andamento', variant: 'info' as const },
      completed: { label: 'Concluído', variant: 'success' as const }
    };
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: 'default' as const };
  };

  const getUrgencyInfo = (urgency: string) => {
    const urgencyMap = {
      low: { label: 'Baixa', variant: 'success' as const },
      normal: { label: 'Normal', variant: 'info' as const },
      high: { label: 'Urgente', variant: 'error' as const }
    };
    return urgencyMap[urgency as keyof typeof urgencyMap] || { label: urgency, variant: 'default' as const };
  };

  const earningsGrowth = ((monthlyStats.totalEarnings - monthlyStats.lastMonthEarnings) / monthlyStats.lastMonthEarnings * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard do Montador</h1>
        <p className="text-gray-600 mt-2">Gerencie seus trabalhos e acompanhe seus ganhos</p>
      </div>

      {/* Monthly Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                <h3 className="font-semibold text-green-800">Ganhos do Mês</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(monthlyStats.totalEarnings)}</p>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600">+{earningsGrowth.toFixed(1)}% vs mês anterior</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <Calendar className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-blue-800">Trabalhos Concluídos</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{monthlyStats.completedJobs}</p>
          <div className="text-sm text-blue-600 mt-2">
            {monthlyStats.newClients} novos clientes
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center space-x-3 mb-3">
            <Star className="h-6 w-6 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Avaliação</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{monthlyStats.rating} ★</p>
          <div className="text-sm text-yellow-600 mt-2">
            {monthlyStats.completionRate}% taxa de conclusão
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center space-x-3 mb-3">
            <Clock className="h-6 w-6 text-purple-600" />
            <h3 className="font-semibold text-purple-800">Tempo Resposta</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">{monthlyStats.responseTime}min</p>
          <div className="text-sm text-purple-600 mt-2">
            Média de resposta
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Jobs */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Próximos Trabalhos</h2>
              <Button variant="outline" size="sm">
                Ver Agenda Completa
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingJobs.map((job) => {
                const statusInfo = getStatusInfo(job.status);
                const urgencyInfo = getUrgencyInfo(job.urgency);
                
                return (
                  <div key={job.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{job.service}</h3>
                          <Badge variant={statusInfo.variant}>
                            {statusInfo.label}
                          </Badge>
                          <Badge variant={urgencyInfo.variant} size="sm">
                            {urgencyInfo.label}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Avatar src={job.client.avatar} alt={job.client.name} size="sm" />
                              <span>{job.client.name}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(job.date)} às {job.time}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{job.estimatedDuration}h</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.address}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">
                          {formatCurrency(job.price)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(job.price / job.estimatedDuration)}/h
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                      {job.status === 'pending' && (
                        <Button size="sm">
                          Aceitar Trabalho
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Performance */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Desempenho</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Taxa de Aprovação</span>
                <span className="font-semibold text-green-600">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tempo Médio</span>
                <span className="font-semibold">3.2h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Clientes Satisfeitos</span>
                <span className="font-semibold text-green-600">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Trabalhos este Mês</span>
                <span className="font-semibold text-blue-600">{monthlyStats.completedJobs}</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => onNavigate('profile')}
            >
              Editar Portfólio
            </Button>
          </Card>

          {/* Recent Reviews */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Avaliações Recentes</h3>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{review.client}</span>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">"{review.comment}"</p>
                  <div className="text-xs text-gray-500">
                    {review.service} • {formatRelativeTime(review.date)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Definir Disponibilidade
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Atualizar Especialidades
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Ver Clientes Favoritos
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};