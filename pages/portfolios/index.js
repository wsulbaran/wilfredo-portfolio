import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery , useMutation} from '@apollo/react-hooks';
import  { GET_PORTFOLIOS,  CREATE_PORTFOLIO} from '@/apollo/queries';

import axios from 'axios'
import Link from 'next/link'

import PortfolioCard from '@/components/portfolios/PortfolioCard';

const graphDeletePortfolio = (id) => {
  const query = `
    mutation DeletePortfolio {
      deletePortfolio(id: "${id}")
    }
  `

  return axios.post('http://localhost:3000/graphql', { query })
    .then(({data: graph}) => graph.data)
    .then(data => data.deletePortfolio)
}

const graphUpdatePortfolio = (_id) => {
  const query = `
    mutation UpdatePortfolio {
      updatePortfolio(id:"${_id}",input: {
        title: "update New Job"
        company: "update New Company"
        companyWebsite: "update New Website"
        location: "update New Location"
        jobTitle: "update New Job Title"
        description: "update New Desc"
        startDate: "12/12/2012 update"
        endDate: "14/11/2013 update"
      }) {
        _id,
        title,
        company,
        companyWebsite
        location
        description
        startDate
        endDate
      }
    }`;
  return axios.post('http://localhost:3000/graphql', { query })
    .then(({data: graph}) => graph.data)
    .then(data => data.updatePortfolio)
}


const Portfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [getPortfolios,{loading,data}] = useLazyQuery(GET_PORTFOLIOS);
  const [createPortfolio, {data:dataC}] = useMutation(CREATE_PORTFOLIO)

  useEffect(()=>{
    getPortfolios();
  },[])

  if(data && data.portfolios.length > 0 && portfolios.length === 0){
    setPortfolios(data.portfolios);
  }

  if(loading){return 'Loading...'}

  const updatePortfolio = async  (id) => {
    const update = await graphUpdatePortfolio(id);
    const index = portfolios.findIndex(p => p._id === id);
    const newPortfolio = portfolios.slice();
    newPortfolio[index] = update;
    setPortfolios(newPortfolio);
  }
  const deletePortfolio = async (id) => {
    const deletedId = await graphDeletePortfolio(id);
    const index = portfolios.findIndex(p => p._id === deletedId);
    const newPortfolios = portfolios.slice();
    newPortfolios.splice(index, 1);
    setPortfolios(newPortfolios);
  }
  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button
          onClick={createPortfolio}
          className="btn btn-primary">Create Portfolio
          </button>
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
              <button
              onClick={()=>updatePortfolio(portfolio._id)}
              className="btn btn-warning">Update Portfolio</button>
              <button
                onClick={() => deletePortfolio(portfolio._id)}
                className="btn btn-danger">
                Delete Portfolio
              </button>
              </div>
            )
          }
        </div>
      </section>
    </>
  )
}

export default Portfolios;