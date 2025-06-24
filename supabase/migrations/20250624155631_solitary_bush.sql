/*
  # Criação da tabela de usuários

  1. Nova Tabela
    - `users`
      - `id` (uuid, primary key) - ID do usuário (mesmo do auth.users)
      - `email` (text, unique) - Email do usuário
      - `name` (text) - Nome completo
      - `phone` (text) - Telefone
      - `type` (text) - Tipo: 'client' ou 'assembler'
      - `avatar_url` (text, opcional) - URL do avatar
      - `is_verified` (boolean) - Se o usuário está verificado
      - `status` (text) - Status: 'active', 'inactive', 'suspended'
      - `created_at` (timestamp) - Data de criação
      - `updated_at` (timestamp) - Data de atualização

  2. Segurança
    - Habilitar RLS na tabela `users`
    - Política para usuários autenticados lerem seus próprios dados
    - Política para usuários autenticados atualizarem seus próprios dados
*/

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  type text NOT NULL CHECK (type IN ('client', 'assembler')),
  avatar_url text,
  is_verified boolean DEFAULT false,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();