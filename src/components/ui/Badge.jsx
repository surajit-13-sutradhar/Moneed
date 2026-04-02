export default function Badge({ label, variant = 'default' }) {
  const styles = {
    income:    'bg-success/10 text-success',
    expense:   'bg-danger/10 text-danger',
    completed: 'bg-success/10 text-success',
    pending:   'bg-warning/10 text-warning',
    failed:    'bg-danger/10 text-danger',
    default:   'bg-secondary/10 text-secondary',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[variant] ?? styles.default}`}>
      {label}
    </span>
  )
}