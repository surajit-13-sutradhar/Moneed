import { createContext, useContext, useReducer, useEffect } from 'react'
import { mockTransactions } from '../data/mockData'

const AppContext = createContext(null)

const initialState = {
  role: 'admin',
  theme: 'light',
  transactions: [],
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    status: 'all',
    sortBy: 'date-desc',
  },
  notifications: [
    {
      id: 1,
      title: 'Salary received',
      message: 'Your salary of $8,200 has been deposited.',
      time: '5m ago',
      read: false,
      icon: 'income',
    },
    {
      id: 2,
      title: 'Budget alert',
      message: "You've used 85% of your Food budget this month.",
      time: '10m ago',
      read: false,
      icon: 'warning',
    },
    {
      id: 3,
      title: 'Subscription renewed',
      message: 'Netflix subscription renewed for $15.99.',
      time: '1h ago',
      read: true,
      icon: 'expense',
    },
  ],
}

function reducer(state, action) {
  switch (action.type) {

    case 'SET_ROLE':
      return { ...state, role: action.payload }

    case 'SET_THEME':
      return { ...state, theme: action.payload }

    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload }

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      }

    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      }

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      }

    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      }

    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters }

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      }

    case 'MARK_ALL_READ':
      return {
        ...state,
        notifications: state.notifications.map(n => ({ ...n, read: true })),
      }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  // ── Load persisted preferences ──────────────────────────────────────
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem('moneed-prefs') ?? '{}')
    } catch {
      return {}
    }
  })()

  // ── Load persisted transactions (admin may have added new ones) ─────
  const storedTxns = (() => {
    try {
      return JSON.parse(localStorage.getItem('moneed-transactions') ?? 'null')
    } catch {
      return null
    }
  })()

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    theme:        stored.theme ?? initialState.theme,
    role:         stored.role  ?? initialState.role,
    transactions: storedTxns   ?? mockTransactions,
  })

  // ── Sync dark/light class on <html> ─────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
  }, [state.theme])

  // ── Persist preferences (theme + role) ──────────────────────────────
  useEffect(() => {
    localStorage.setItem(
      'moneed-prefs',
      JSON.stringify({ theme: state.theme, role: state.role })
    )
  }, [state.theme, state.role])

  // ── Persist transactions ─────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem(
      'moneed-transactions',
      JSON.stringify(state.transactions)
    )
  }, [state.transactions])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}