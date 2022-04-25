import React, { FC } from 'react';


const Footer: FC = () => {
    return (
        <div className='footer w_100p bg_white pt-2'>
            <div className='footer_content flex d_row nav'>
                <div className='logo c_darker flex pl_1 pr_1 d_row'>
                    <span>L</span>
                    <span>U</span>
                    <span>M</span>
                    <span>I</span>
                    <span>N</span>
                </div>
                <div>&copy;</div>
                <div>2022</div>
            </div>
        </div>
    )
}

export default Footer