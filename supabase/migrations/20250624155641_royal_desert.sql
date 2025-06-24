/*
  # Criação da tabela de notificações

  1. Nova Tabela
    - `notifications`
      - `id` (uuid, primary key) - ID da notificação
      - `user_id` (uuid, foreign key) - ID do usuário que recebe a notificação
      - `type` (text) - Tipo: 'booking', 'payment', 'review', 'system'
      - `title` (text) - Título da notificação
      - `message` (text) - Mensagem da notificação
      - `is_read` (boolean) - Se foi lida
      - `action_url` (text, opcional) - URL de ação
      - `created_at` (timestamp) - Data de criação

  2. Segurança
    - Habilitar RLS na tabela `notifications`
    - Política para usuários lerem suas próprias notificações
    - Política para inserir notificações (sistema)
*/

-- Criar tabela de notificações
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('booking', 'payment', 'review', 'system')),
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can read own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert notifications"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);