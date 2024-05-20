'use client';
import NextLink from 'next/link';
import { useMemo } from 'react';

// export type NavLinkProps = NextLinkProps &
//   PropsWithChildren & {
//     styles?: CSSProperties;
//     borderRadius?: ComponentProps<typeof NextLink>['style']['borderRadius'];
//   };

function NavLink({ className, children, styles, borderRadius, ...props }: any) {
  const memoizedStyles = useMemo(
    () => ({
      borderRadius: borderRadius || 0,
      ...styles,
    }),
    [borderRadius, styles],
  );

  return (
    <NextLink className={`${className}`} style={memoizedStyles} {...props}>
      {children}
    </NextLink>
  );
}

export default NavLink;
