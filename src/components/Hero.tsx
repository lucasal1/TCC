import React from 'react';
import { ArrowRight, CheckCircle, Star, Users, Clock, Shield, Award, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Shield,
      title: 'Profissionais Verificados',
      description: 'Todos os montadores passam por verificação rigorosa'
    },
    {
      icon: Clock,
      title: 'Agendamento Inteligente',
      description: 'Sistema automatizado com confirmação instantânea'
    },
    {
      icon: Award,
      title: 'Garantia Total',
      description: 'Cobertura completa em todos os serviços realizados'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Cliente',
      content: 'Excelente plataforma! Encontrei um montador qualificado em minutos.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Carlos Silva',
      role: 'Montador',
      content: 'Consegui aumentar minha renda em 40% usando a plataforma.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">C&C</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">Montagens</span>
                <div className="text-xs text-blue-600 font-medium">Conectando Profissionais</div>
              </div>
            </div>
            <Button onClick={onGetStarted} rightIcon={<ArrowRight className="h-4 w-4" />}>
              Entrar na Plataforma
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Zap className="h-4 w-4 mr-2" />
                Mais de 10.000 serviços realizados
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Conectamos você com os{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                melhores montadores
              </span>{' '}
              de móveis
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
              A plataforma mais confiável do Brasil para conectar clientes e profissionais especializados. 
              Agendamento inteligente, profissionais verificados e garantia total.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                rightIcon={<ArrowRight className="h-5 w-5" />}
                className="group"
              >
                <span>Começar Agora</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group"
              >
                <span>Ver Como Funciona</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">2.5k+</div>
                <div className="text-sm text-gray-600">Montadores Ativos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">15k+</div>
                <div className="text-sm text-gray-600">Serviços Concluídos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">4.9★</div>
                <div className="text-sm text-gray-600">Avaliação Média</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-3 opacity-20"></div>
              <img
                src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Profissional montando móveis"
                className="relative rounded-3xl shadow-2xl"
              />
              
              {/* Floating Cards */}
              <Card className="absolute -bottom-6 -left-6 p-4 max-w-xs" hover>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Serviço Concluído</div>
                    <div className="text-sm text-gray-600">Cozinha planejada - 5★</div>
                  </div>
                </div>
              </Card>

              <Card className="absolute -top-6 -right-6 p-4" hover>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-xs text-gray-600">Taxa de Satisfação</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Por que escolher a{' '}
              <span className="text-blue-600">C&C Montagens</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A plataforma mais completa e segura para conectar você com profissionais qualificados
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group" hover>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative" hover>
                <div className="flex items-start space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <span className="text-sm text-gray-500">• {testimonial.role}</span>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.content}"</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de clientes satisfeitos e profissionais qualificados. 
            Cadastre-se gratuitamente e comece hoje mesmo.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={onGetStarted}
            rightIcon={<ArrowRight className="h-5 w-5" />}
            className="bg-white text-blue-600 hover:bg-gray-50 shadow-xl"
          >
            Criar Conta Grátis
          </Button>
          
          <div className="mt-8 text-blue-100 text-sm">
            ✓ Sem taxas de cadastro • ✓ Suporte 24/7 • ✓ Garantia total
          </div>
        </div>
      </section>
    </div>
  );
};