import axios from 'axios'
import Link from 'next/link'

import PortfolioCard from '@/components/portfolios/PortfolioCard';


const fetchData = () => {
  const query = `query Portfolios { 
    portfolios { 
      _id
      title
      location
      startDate
      endDate
      company
      companyWebsite
      description}
    }`

    return axios.post('http://localhost:3000/graphql',{query})
    .then(({data:graph}) => graph.data)
    .then(data => data.portfolios)
}
const Portfolios = ({portfolios}) => {
  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>

      </section>
      <section className="pb-5">
        <div className="row">
          {
            portfolios.map(portfolio => 
              <div key={portfolio._id} className="col-md-4">
                <Link
                href='/portfolios/[id]'
                as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
              </div>
            )
          }
        </div>
      </section>
    </>
  )
}

Portfolios.getInitialProps = async () =>{
  const portfolios = await fetchData();

  return {portfolios};
}

export default Portfolios;