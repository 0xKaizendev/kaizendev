import { FC, HTMLAttributes, forwardRef } from 'react';
import { cva, VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils';

// Differents Variant de paragraph selon la taille de l'ecran
const Variants = cva("text-left font-extrabold leading-tight tracking-tighter mb-6", {
    variants: {
        size: {
            default: 'text-2xl md:text-4xl ',
            lg: 'text-4xl md:text-5xl lg:text-6xl',
            sm: 'text-lg  sm:text-base',
        }
    },
    defaultVariants: {
        size: 'default'
    }
})
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof Variants> {

};
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, size, children, ...props }, ref) => {
        return (
            <h1
                ref={ref}
                {...props}
                className={cn(Variants({ size, className }))}>
                {children}
            </h1>
        )
    }
)

Heading.displayName = 'Paragraph'

export default Heading