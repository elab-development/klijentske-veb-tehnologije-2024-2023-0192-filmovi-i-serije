type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'default' }
export function Button({variant='default', ...props}:Props){
  const cls = 'btn ' + (variant==='primary' ? 'primary' : '')
  return <button className={cls} {...props} />
}
