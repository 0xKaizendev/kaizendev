import clsx from "clsx";
import React, { ButtonHTMLAttributes, HTMLAttributes, ReactNode, } from "react";
import { forwardRef } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean

};

const OuterContainer = forwardRef(function OuterContainer(
  { className, children, ...props }: { className?: string;[key: string]: any },
  ref
): JSX.Element {
  return (
    <div ref={ref as any} className={clsx("sm:px-8 ", className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8 ">{children}</div>
    </div>
  );
});

const InnerContainer = forwardRef(function InnerContainer(
  { className, children, ...props }: { className?: string;[key: string]: any },
  ref
): JSX.Element {
  return (
    <div
      ref={ref as any}
      className={clsx("relative px-4 sm:px-8 lg:px-12 ", className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-6xl ">{children}</div>
    </div>
  );
});
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ children,  ...props }, ref) => {
    return (
      <OuterContainer ref={ref} {...props}>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    );
  },
);

Container.displayName ="Container";