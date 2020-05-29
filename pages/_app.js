import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';
import App from 'next/app';

import NavBar from '@/components/shared/NavBar';
import Hero from '@/components/shared/Hero';

const MyApp = ({Component, pageProps}) => {

  const homePage = () => Component.name === "Home";
  return (
    <div className="portfolio-app">
      <NavBar />
      { homePage() && <Hero/>}
      <div className="container">
        <Component {...pageProps}/>
      </div>
      
        {/* FOOTER STARTS */}
        { homePage() &&
          <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
            <div className="container text-center">
              <small>Copyright &copy; Your Website</small>
            </div>
          </footer>
        }
        {/* FOOTER ENDS */}
      
    </div>
    
  )
}

export default MyApp;