import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ComponentPropsWithoutRef, ReactNode, cloneElement, forwardRef } from 'react';

import { classNames, getValidChildren } from '@/libs/utils';

export type BreadcrumbProps = ComponentPropsWithoutRef<'nav'> & {
  separator?: ReactNode;
  addSeparator?: boolean;
};

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    { children, className, separator = <ChevronRight className="h-4 w-4" />, addSeparator = true, ...props },
    forwardedRef,
  ) => {
    const validChildren = getValidChildren(children);
    const clones = validChildren.map((child, index) => {
      return cloneElement(child, {
        addSeparator,
        separator,
        isLastChild: validChildren.length === index + 1,
      });
    });

    return (
      <nav
        className={classNames('relative break-words', className)}
        aria-label="breadcrumb"
        {...props}
        ref={forwardedRef}
      >
        <ol className="flex items-center">{clones}</ol>
      </nav>
    );
  },
);
Breadcrumb.displayName = 'Breadcrumb';

export type BreadcrumbItemProps = BreadcrumbProps & {
  isCurrentPage?: boolean;
  isLastChild?: boolean;
};

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ children, className, isCurrentPage, isLastChild, separator, addSeparator, ...props }, forwardedRef) => {
    const validChildren = getValidChildren(children);
    const clones = validChildren.map((child) => {
      if (child.type === BreadcrumbLink) {
        return cloneElement(child, { isCurrentPage });
      }

      if (child.type === BreadcrumbSeparator) {
        return cloneElement(child, {
          children: separator || child.props.children,
        });
      }

      return child;
    });

    return (
      <li className={classNames('inline-flex items-center', className)} {...props} ref={forwardedRef}>
        {clones}
        {!isLastChild && addSeparator && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
      </li>
    );
  },
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export type BreadcrumbLinkProps = ComponentPropsWithoutRef<'a'> & Pick<BreadcrumbItemProps, 'isCurrentPage'>;

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, isCurrentPage, ...props }, forwardedRef) => {
    const resultClassNames = classNames(
      'text-sm font-medium underline-offset-4 aria-[current]:opacity-60 [&:not([aria-current])]:hover:underline',
      className,
    );

    if (isCurrentPage) {
      return <span className={resultClassNames} aria-current="page" {...props} ref={forwardedRef} />;
    }

    return <Link className={resultClassNames} href={props.href || '#'} {...props} ref={forwardedRef} />;
  },
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export type BreadcrumbSeparatorProps = ComponentPropsWithoutRef<'span'>;

export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <span className={classNames('mx-2 opacity-50', className)} role="presentation" {...props} ref={forwardedRef} />
    );
  },
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
