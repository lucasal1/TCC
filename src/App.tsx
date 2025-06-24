import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Hero } from './components/Hero';
import { LoginForm } from './components/Auth/LoginForm';
import { Header } from './components/Header';
import { ClientDashboard } from './components/Dashboard/ClientDashboard';
import { AssemblerDashboard } from './components/Dashboard/AssemblerDashboard';
import { BookServiceForm } from './components/BookService/BookServiceForm';
import { ProfileForm } from './components/Profile/ProfileForm';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  // Show loading spinner during authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Show login/hero for unauthenticated users
  if (!user) {
    if (currentPage === 'login') {
      return <LoginForm onBack={() => setCurrentPage('home')} />;
    }
    return <Hero onGetStarted={handleGetStarted} />;
  }

  // Render appropriate page for authenticated users
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return user.type === 'client' 
          ? <ClientDashboard onNavigate={handleNavigate} />
          : <AssemblerDashboard onNavigate={handleNavigate} />;
      case 'book-service':
        return user.type === 'client' 
          ? <BookServiceForm onBack={() => handleNavigate('dashboard')} />
          : <ClientDashboard onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileForm onBack={() => handleNavigate('dashboard')} />;
      case 'jobs':
        return user.type === 'assembler'
          ? <AssemblerDashboard onNavigate={handleNavigate} />
          : <ClientDashboard onNavigate={handleNavigate} />;
      default:
        return user.type === 'client' 
          ? <ClientDashboard onNavigate={handleNavigate} />
          : <AssemblerDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </AuthProvider>
  );
};

export default App;