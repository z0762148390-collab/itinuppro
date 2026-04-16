import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'whatsapp' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-600',
  secondary:
    'bg-white text-brand-600 border border-brand-600 hover:bg-brand-50 focus-visible:ring-brand-600',
  whatsapp:
    'bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500',
  ghost:
    'text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-400',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

// Button element variant
interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps | 'children'> {
  as?: 'button';
  children: React.ReactNode;
}

// Anchor element variant
interface AnchorProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'children'> {
  as: 'a';
  href: string;
  children: React.ReactNode;
}

type Props = ButtonProps | AnchorProps;

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  as,
  ...rest
}: Props) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (as === 'a') {
    const { href, ...anchorRest } = rest as Omit<AnchorProps, 'as' | 'variant' | 'size' | 'className' | 'children'>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<ButtonProps, 'as' | 'variant' | 'size' | 'className' | 'children'>)}>
      {children}
    </button>
  );
}
