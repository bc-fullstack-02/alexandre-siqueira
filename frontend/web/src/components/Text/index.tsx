import { Slot } from "@radix-ui/react-slot"
import clsx from "clsx"
import { ReactNode } from "react"
import { HeadingProps } from "../Heading"

export interface TextProps {
    size?: "sm" | "md" | "lg"
    children: ReactNode
    asChild?: boolean
    className?: string
}

function Text({ size = "md", children, asChild, className }: TextProps){
    const Comp = asChild ?  Slot : "span";
    return(
        <Comp className={clsx("text-gray-100 font-sans font-bold", 
        {"text-xs": size ==="sm"},
        {"text-sm": size ==="md"},
        {"text-base": size ==="lg"}
        )}
        >{children}</Comp>
    );
}

export default Text;