export const CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Housing',
  'Shopping',
  'Health',
  'Entertainment',
  'Income',
  'Utilities',
]

export const CATEGORY_COLORS = {
  'Food & Dining':  '#0052FF',
  'Transport':      '#16A34A',
  'Housing':        '#EAB308',
  'Shopping':       '#8B5CF6',
  'Health':         '#EF4444',
  'Entertainment':  '#F97316',
  'Income':         '#22C55E',
  'Utilities':      '#06B6D4',
}

export const mockTransactions = [
  // ── January ──────────────────────────────────────────
  { id: 'TXN-001', description: 'Salary Payment',       category: 'Income',         type: 'income',  amount: 8200.00, status: 'completed', date: '2026-01-01' },
  { id: 'TXN-002', description: 'Apartment Rent',       category: 'Housing',        type: 'expense', amount: 1400.00, status: 'completed', date: '2026-01-03' },
  { id: 'TXN-003', description: 'Grocery Store',        category: 'Food & Dining',  type: 'expense', amount: 186.50, status: 'completed', date: '2026-01-05' },
  { id: 'TXN-004', description: 'Netflix',              category: 'Entertainment',  type: 'expense', amount: 15.99,  status: 'completed', date: '2026-01-06' },
  { id: 'TXN-005', description: 'Uber Ride',            category: 'Transport',      type: 'expense', amount: 24.80,  status: 'completed', date: '2026-01-08' },
  { id: 'TXN-006', description: 'Electric Bill',        category: 'Utilities',      type: 'expense', amount: 94.20,  status: 'completed', date: '2026-01-10' },
  { id: 'TXN-007', description: 'Pharmacy',             category: 'Health',         type: 'expense', amount: 52.00,  status: 'completed', date: '2026-01-12' },
  { id: 'TXN-008', description: 'H&M Shopping',         category: 'Shopping',       type: 'expense', amount: 139.90, status: 'completed', date: '2026-01-15' },
  { id: 'TXN-009', description: 'Restaurant Dinner',    category: 'Food & Dining',  type: 'expense', amount: 78.40,  status: 'completed', date: '2026-01-18' },
  { id: 'TXN-010', description: 'Freelance Project',    category: 'Income',         type: 'income',  amount: 1500.00,status: 'completed', date: '2026-01-20' },
  { id: 'TXN-011', description: 'Spotify',              category: 'Entertainment',  type: 'expense', amount: 9.99,   status: 'completed', date: '2026-01-22' },
  { id: 'TXN-012', description: 'Bus Pass',             category: 'Transport',      type: 'expense', amount: 45.00,  status: 'completed', date: '2026-01-25' },

  // ── February ─────────────────────────────────────────
  { id: 'TXN-013', description: 'Salary Payment',       category: 'Income',         type: 'income',  amount: 8200.00, status: 'completed', date: '2026-02-01' },
  { id: 'TXN-014', description: 'Apartment Rent',       category: 'Housing',        type: 'expense', amount: 1400.00, status: 'completed', date: '2026-02-03' },
  { id: 'TXN-015', description: 'Grocery Store',        category: 'Food & Dining',  type: 'expense', amount: 204.30, status: 'completed', date: '2026-02-05' },
  { id: 'TXN-016', description: 'Doctor Visit',         category: 'Health',         type: 'expense', amount: 120.00, status: 'completed', date: '2026-02-07' },
  { id: 'TXN-017', description: 'Amazon Order',         category: 'Shopping',       type: 'expense', amount: 89.99,  status: 'completed', date: '2026-02-09' },
  { id: 'TXN-018', description: 'Netflix',              category: 'Entertainment',  type: 'expense', amount: 15.99,  status: 'completed', date: '2026-02-10' },
  { id: 'TXN-019', description: 'Uber Ride',            category: 'Transport',      type: 'expense', amount: 31.50,  status: 'completed', date: '2026-02-12' },
  { id: 'TXN-020', description: 'Electric Bill',        category: 'Utilities',      type: 'expense', amount: 88.60,  status: 'completed', date: '2026-02-14' },
  { id: 'TXN-021', description: 'Valentine Dinner',     category: 'Food & Dining',  type: 'expense', amount: 112.00, status: 'completed', date: '2026-02-14' },
  { id: 'TXN-022', description: 'Gym Membership',       category: 'Health',         type: 'expense', amount: 49.00,  status: 'completed', date: '2026-02-16' },
  { id: 'TXN-023', description: 'Freelance Project',    category: 'Income',         type: 'income',  amount: 2200.00,status: 'completed', date: '2026-02-20' },
  { id: 'TXN-024', description: 'Spotify',              category: 'Entertainment',  type: 'expense', amount: 9.99,   status: 'completed', date: '2026-02-22' },

  // ── March ────────────────────────────────────────────
  { id: 'TXN-025', description: 'Salary Payment',       category: 'Income',         type: 'income',  amount: 8200.00, status: 'completed', date: '2026-03-01' },
  { id: 'TXN-026', description: 'Apartment Rent',       category: 'Housing',        type: 'expense', amount: 1400.00, status: 'completed', date: '2026-03-03' },
  { id: 'TXN-027', description: 'Grocery Store',        category: 'Food & Dining',  type: 'expense', amount: 193.80, status: 'completed', date: '2026-03-05' },
  { id: 'TXN-028', description: 'Netflix',              category: 'Entertainment',  type: 'expense', amount: 15.99,  status: 'completed', date: '2026-03-06' },
  { id: 'TXN-029', description: 'Flight Ticket',        category: 'Transport',      type: 'expense', amount: 340.00, status: 'completed', date: '2026-03-08' },
  { id: 'TXN-030', description: 'Hotel Stay',           category: 'Housing',        type: 'expense', amount: 280.00, status: 'completed', date: '2026-03-09' },
  { id: 'TXN-031', description: 'Electric Bill',        category: 'Utilities',      type: 'expense', amount: 101.40, status: 'completed', date: '2026-03-11' },
  { id: 'TXN-032', description: 'Pharmacy',             category: 'Health',         type: 'expense', amount: 38.50,  status: 'completed', date: '2026-03-13' },
  { id: 'TXN-033', description: 'Nike Store',           category: 'Shopping',       type: 'expense', amount: 224.00, status: 'completed', date: '2026-03-16' },
  { id: 'TXN-034', description: 'Restaurant Lunch',     category: 'Food & Dining',  type: 'expense', amount: 54.20,  status: 'completed', date: '2026-03-19' },
  { id: 'TXN-035', description: 'Freelance Project',    category: 'Income',         type: 'income',  amount: 3100.00,status: 'completed', date: '2026-03-22' },
  { id: 'TXN-036', description: 'Spotify',              category: 'Entertainment',  type: 'expense', amount: 9.99,   status: 'completed', date: '2026-03-24' },

  // ── April ────────────────────────────────────────────
  { id: 'TXN-037', description: 'Salary Payment',       category: 'Income',         type: 'income',  amount: 8200.00, status: 'completed', date: '2026-04-01' },
  { id: 'TXN-038', description: 'Apartment Rent',       category: 'Housing',        type: 'expense', amount: 1400.00, status: 'pending',   date: '2026-04-03' },
  { id: 'TXN-039', description: 'Grocery Store',        category: 'Food & Dining',  type: 'expense', amount: 167.60, status: 'completed', date: '2026-04-05' },
  { id: 'TXN-040', description: 'Netflix',              category: 'Entertainment',  type: 'expense', amount: 15.99,  status: 'completed', date: '2026-04-06' },
  { id: 'TXN-041', description: 'Uber Ride',            category: 'Transport',      type: 'expense', amount: 18.40,  status: 'completed', date: '2026-04-07' },
  { id: 'TXN-042', description: 'Electric Bill',        category: 'Utilities',      type: 'expense', amount: 97.80,  status: 'pending',   date: '2026-04-09' },
  { id: 'TXN-043', description: 'Gym Membership',       category: 'Health',         type: 'expense', amount: 49.00,  status: 'completed', date: '2026-04-10' },
  { id: 'TXN-044', description: 'Amazon Order',         category: 'Shopping',       type: 'expense', amount: 156.30, status: 'completed', date: '2026-04-11' },
  { id: 'TXN-045', description: 'Coffee Shop',          category: 'Food & Dining',  type: 'expense', amount: 34.50,  status: 'completed', date: '2026-04-12' },
]