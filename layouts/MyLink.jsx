import Link from 'next/link'
import {forwardRef} from "react";

// `onClick`, `href`, and `ref` need to be passed to the DOM element
// for proper handling
export const MyLink = forwardRef(({ onClick, href, className, children }, ref) => {
    return (
        <Link href={href} passHref>
            <a href={href} onClick={onClick} ref={ref} className={className}>
                {children}
            </a>
        </Link>
    )
})
