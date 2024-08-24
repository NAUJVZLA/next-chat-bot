'use client'
import type { NextPage } from 'next';
import RuleChatbot from './chatBot';

const HomeCHAT: NextPage = () => {
    return (
        <div className="container">
            <h1>Mi Chat Box</h1>
            <RuleChatbot />
        </div>
    );
};

export default HomeCHAT;