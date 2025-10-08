type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
}

export function Button({ variant, className = '', children, ...rest }: Props) {
  const classes = [
    'btn',
    variant === 'primary' ? 'primary' : '',
    variant === 'ghost' ? 'ghost' : '',
    variant === 'danger' ? 'danger' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
