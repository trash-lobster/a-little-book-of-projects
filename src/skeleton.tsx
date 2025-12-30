import { useState } from 'react';
import { Navbar } from './component/navbar/navbar';

export function Skeleton() {
    const [isProjectActive, setIsProjectActive] = useState(false);
    
    return (
        <>
            <nav id='navbar'>
                <h1>A Little Book of Projects</h1>
                <div>A Portolio Site of Random Things<br/>By Vincent Sit</div>
            </nav>
            <svg width="100%" height="14">
                <defs>
                    <pattern id="pattern1" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                        <text x="0" y="6" id="background-text" fill="currentColor">-</text>
                    </pattern>
                </defs>
                <rect id="background-rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern1)"></rect>
            </svg>
            <main id='main-body'>
                <Navbar isProjectActive={isProjectActive} onToggle={() => setIsProjectActive(!isProjectActive)} />
                <div id='content'>
                    I like making things. Finishing things is also incredibly difficult. So... it's worth the time to record the wins! 
                </div>
            </main>
        </>
    );
}