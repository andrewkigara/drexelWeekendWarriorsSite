import Head from 'next/head';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import { initializeStore } from '../redux/store';

const Layout = ({children, activePage, showNavBar = true}) => (
    <main className='d-flex flex-column overflow-hidden h-100'>
        <Head>
            <title>Weekend Warriors</title>
            <link rel='stylesheet' href='/styles/lux.css' />
            <link rel="stylesheet" href="/styles/wwstyles.css"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#00aba9" />
            <meta name="theme-color" content="#ffffff" />
            <meta property="og:image" content="/favicon/favicon-32x32.png" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="drexelww.com" />
            <meta property="og:title" content="Drexel Weekend Warriors" />
            <meta property="og:description" content="Weekend Warriors offers adventures for our fellow students at Drexel, so what are you waiting for. Join us along for the adventures" />
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
            <script type="module" src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js" />
            <script noModule="" src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.js" />
        </Head>
        {showNavBar ? 
            <>
                <Navbar title="Weekend Warriors" className='header' activePage={activePage}/>
                <div id='childrenNav'>
                    {children}
                </div>
            </> : <>
                <Link href='/'><a><img className='m-3 float-left fixed-top' src='/images/logo-tiny.png' /></a></Link>
                <div id='childrenNoNav'>
                    {children}
                </div>
            </>
        }
        <Footer />
        <style jsx>{`
            #childrenNoNav {
                min-height: 92.4vh;
            }
            #childrenNav {
                min-height: 84.3vh;
            }
            img {
                width: 64px;
                height: 64px;
            }
        `}</style>
    </main>
);

export async function getStaticProps() {
    initializeStore();
    return {
        props: {}
    }
}

export default Layout;