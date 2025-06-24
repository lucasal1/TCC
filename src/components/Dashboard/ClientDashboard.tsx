import React from 'react';
import { Calendar, Clock, Star, MapPin, Plus, TrendingUp, Award, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Rating } from '../ui/Rating';
import { Avatar } from '../ui/Avatar';
import { formatCurrency, formatDate } from '../../utils/helpers';

interface ClientDashboardProps {
  onNavigate: (page: string) => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onNavigate }) => {
  const recentBookings = [
    {
      id: '1',
      service: 'Montagem de Guarda-roupa',
      assembler: {
        name: 'Carlos Mendes',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.9
      },
      date: new Date('2024-01-20'),
      status: 'completed' as const,
      rating: 5,
      price: 180,
      duration: 3
    },
    {
      id: '2',
      service: 'Montagem de Mesa de Escritório',
      assembler: {
        name: 'Ana Santos',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.8
      },
      date: new Date('2024-01-25'),
      status: 'confirmed' as const,
      price: 120,
      estimatedDuration: 2
    },
    {
      id: '3',
      service: 'Montagem de Cozinha Planejada',
      assembler: {
        name: 'Roberto Silva',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 5.0
      },
      date: new Date('2024-02-01'),
      status: 'pending' as const,
      price: 450,
      estimatedDuration: 8
    }
  ];

  const stats = {
    totalServices: 12,
    completedServices: 8,
    totalSpent: 2340,
    averageRating: 4.8,
    savedTime: 24,
    favoriteAssemblers: 3
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      completed: { label: 'Concluído', variant: 'success' as const },
      confirmed: { label: 'Confirmado', variant: 'info' as const },
      pending: { label: 'Pendente', variant: 'warning' as const },
      cancelled: { label: 'Cancelado', variant: 'error' as const }
    };
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: 'default' as const };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard do Cliente</h1>
        <p className="text-gray-600 mt-2">Gerencie seus agendamentos e acompanhe seus serviços</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="group cursor-pointer" hover onClick={() => onNavigate('book-service')}>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Novo Agendamento</h3>
            <p className="text-gray-600 text-sm">Agende um novo serviço</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.completedServices}</div>
            <div className="text-sm text-gray-600">Serviços Concluídos</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-1">{recentBookings.filter(b => b.status !== 'completed').length}</div>
            <div className="text-sm text-gray-600">Próximos Agendamentos</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1">{stats.averageRating}</div>
            <div className="text-sm text-gray-600">Avaliação Média</div>
          </div>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Agendamentos Recentes</h2>
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </div>
        
        <div className="space-y-4">
          {recentBookings.map((booking) => {
            const statusInfo = getStatusInfo(booking.status);
            
            return (
              <div key={booking.id} className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                      <Badge variant={statusInfo.variant}>
                        {statusInfo.label}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Avatar src={booking.assembler.avatar} alt={booking.assembler.name} size="sm" />
                        <span>{booking.assembler.name}</span>
                        <Rating rating={booking.assembler.rating} size="sm" />
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{booking.duration || booking.estimatedDuration}h</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {formatCurrency(booking.price)}
                    </div>
                    {booking.rating && (
                      <Rating rating={booking.rating} size="sm" showValue />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{formatCurrency(stats.totalSpent)}</div>
            <div className="text-sm text-gray-600">Total Investido</div>
            <div className="flex items-center justify-center mt-2 text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Economia de tempo</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.savedTime}h</div>
            <div className="text-sm text-gray-600">Tempo Economizado</div>
            <div className="text-xs text-gray-500 mt-2">vs. fazer sozinho</div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{stats.favoriteAssemblers}</div>
            <div className="text-sm text-gray-600">Montadores Favoritos</div>
            <div className="flex items-center justify-center mt-2 text-xs text-orange-600">
              <Users className="h-3 w-3 mr-1" />
              <span>Rede de confiança</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Taxa de Satisfação</div>
            <div className="text-xs text-gray-500 mt-2">Baseado em avaliações</div>
          </div>
        </Card>
      </div>
    </div>
  );
};