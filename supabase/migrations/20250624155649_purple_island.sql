/*
  # Criação da tabela de agendamentos

  1. Nova Tabela
    - `bookings`
      - `id` (uuid, primary key) - ID do agendamento
      - `client_id` (uuid, foreign key) - ID do cliente
      - `assembler_id` (uuid, foreign key, opcional) - ID do montador
      - `service_type` (text) - Tipo de serviço
      - `description` (text) - Descrição detalhada
      - `scheduled_date` (date) - Data agendada
      - `time_slot` (text) - Horário
      - `status` (text) - Status do agendamento
      - `estimated_price` (numeric) - Preço estimado
      - `actual_price` (numeric, opcional) - Preço final
      - `urgency` (text) - Nível de urgência
      - `address` (jsonb) - Endereço completo
      - `created_at` (timestamp) - Data de criação
      - `updated_at` (timestamp) - Data de atualização

  2. Segurança
    - Habilitar RLS na tabela `bookings`
    - Políticas para clientes e montadores acessarem seus agendamentos
*/

-- Criar tabela de agendamentos
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assembler_id uuid REFERENCES users(id) ON DELETE SET NULL,
  service_type text NOT NULL,
  description text NOT NULL,
  scheduled_date date NOT NULL,
  time_slot text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  estimated_price numeric(10,2) NOT NULL,
  actual_price numeric(10,2),
  urgency text DEFAULT 'normal' CHECK (urgency IN ('low', 'normal', 'high')),
  address jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Clients can manage own bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Assemblers can view assigned bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (assembler_id = auth.uid());

CREATE POLICY "Assemblers can update assigned bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (assembler_id = auth.uid());

-- Trigger para atualizar updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_bookings_client_id ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_assembler_id ON bookings(assembler_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_date ON bookings(scheduled_date);