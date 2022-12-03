import { Slot } from "@radix-ui/react-slot"
import { clsx } from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from "react";
 
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children?: ReactNode
    asChild?: boolean
}

function Button({ children, asChild, ...props}: ButtonProps){
    const Comp = asChild ? Slot : "button";

    return (
        <Comp className={
            clsx("py-3 px-4 h-10 bg-cyan-500 rounded font-semibold text-black text-sm w-full transition-colors hover:bg-cyan-300 focus:ring-2 ring-white"
        )}{...props}> 
        {children}
        </Comp>
    )

}

export default Button
