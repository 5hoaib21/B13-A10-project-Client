// components/ActiveLink.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ActiveLink = ({ 
  href, 
  children, 
  className = "", 
  activeClassName = "",
  inactiveClassName = "",
  exact = false,
  ...props 
}) => {
  const pathname = usePathname();
  
  const isActive = exact 
    ? pathname === href 
    : pathname?.startsWith(href);

  const combinedClassName = `${className} ${isActive ? activeClassName : inactiveClassName}`;

  return (
    <Link 
      href={href} 
      className={combinedClassName}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;