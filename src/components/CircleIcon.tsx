import { SVGAttributes } from "react";

export const CircleIcon = (props: SVGAttributes<SVGElement>) =>  (
    <svg
        width="10"
        height="10"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <circle cx="10" cy="10" r="10" fill="currentColor" />
    </svg>
);