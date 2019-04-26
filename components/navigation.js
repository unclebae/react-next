import Link from 'next/link';

const Navigation = () => (
    <div className="navbar">
        <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
        </ul>

        <style jsx>{`
            div.navbar {
                background-color: #f7cba3;
                margin: 10 0;
                padding: 1px;
            }

            ul {
                list-style: none;
                display: flex;
            }

            ul li {
                font-size: 20px;
                margin-right: 20px;
            }

            ul li a {
                text-decoration: none;
                padding: 10px;
                border-radius: 5px;
            }

            ul li a:hover {
                background-color:#f2c43a;
            }
        `
        }</style>
    </div>
)

export default Navigation;