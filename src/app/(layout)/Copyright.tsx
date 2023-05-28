'use client';

// client side so date is always current

type CopyrightProps = {
    name: string,
};

export default function Copyright({name}: CopyrightProps){
    return <small>Copyright © {(new Date()).getFullYear()} {name}</small>;
}