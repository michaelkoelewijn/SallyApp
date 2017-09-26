import React from 'react';
import Link from 'next/link';

const Navigation = () => (
    <nav>
        <ul>
            <li>
                <Link href="/"><a>Homepage</a></Link>
            </li>
            <li>
                <Link href="about"><a>About</a></Link>
            </li>
        </ul>
    </nav>
)

export default Navigation;