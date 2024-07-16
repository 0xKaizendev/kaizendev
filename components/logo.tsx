import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href='/' className='font-logo flex text-lg gap-2 items-center font-medium  justify-center' >
            <Image
                width={24}
                height={24}
                src='/Logo-KaizenDev-Blue.svg'
                alt='logo'
            />
            <span className='hidden lg:flex'>
            Kaizen dev
            </span>
        </Link>
    )
}

export default Logo