import clsx from "clsx";
import Link from "next/link";
import { ChevronRightIcon } from "./icons";

export function Card({
  as: Component = "div",
  className,
  children,
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Component
      className={clsx(className, "group relative flex flex-col items-start ")}
    >
      <div className="absolute border border-sky-500 -inset-y-6 -inset-x-4 z-0  scale-95  opacity-50 transition group-hover:scale-100 group-hover:opacity-100 bg-accent sm:-inset-x-6 sm:rounded-2xl shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_2px_#08f,0_0_15px_#08f,0_0_30px_#08f] " />
      {children}
    </Component>
  );
}

Card.Link = function CardLink({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}): JSX.Element {
  return (
    <>
      <Link href={""} {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

Card.Title = function CardTitle({
  as: Component = "h2",
  href,
  children,
}: {
  as?: React.ElementType;
  href?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Component className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

Card.Description = function CardDescription({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 text-justify">
      {children}
    </p>
  );
};

Card.Cta = function CardCta({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

Card.Eyebrow = function CardEyebrow({
  as: Component = "p",
  decorate = false,
  className,
  children,
  ...props
}: {
  as?: React.ElementType;
  decorate?: boolean;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}): JSX.Element {
  return (
    <Component
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5"
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  );
};