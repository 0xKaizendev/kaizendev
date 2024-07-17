import React from 'react'
import clsx from 'clsx';
import Header from './header/';
import Skills from './skills';
const IndexContents = () => {
    return (
        <div className='space-y-12 overflow-auto'>

            <Header />
            <Skills />
        </div>
        // <div className={clsx('content-wrapper')}>FeaturedCardSection</div>
    )
}

export default IndexContents