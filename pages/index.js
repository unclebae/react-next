import Link from 'next/link';

export default() => (
    <div>
        <h1>Hello React Next</h1>

        <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
        </ul>
    </div>

)