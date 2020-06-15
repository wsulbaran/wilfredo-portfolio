import  ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import 'isomorphic-unfetch';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.scss';

import NavBar from '@/components/shared/NavBar';
import Hero from '@/components/shared/Hero';


const client = new ApolloClient ({
  uri:'http://localhost:3000/graphql'
})
const MyApp = ({Component, pageProps}) => {

  const homePage = () => Component.name === "Home";
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}

export default MyApp;