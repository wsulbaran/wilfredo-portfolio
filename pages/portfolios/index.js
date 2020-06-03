import { useState } from 'react';

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

const graphCreatePortfolio = () => {
  const query = `
    mutation CreatePortfolio {
      createPortfolio(input: {
        title: "New Job"
        company: "New Company"
        companyWebsite: "New Website"
        location: "New Location"
        jobTitle: "New Job Title"
        description: "New Desc"
        startDate: "12/12/2012"
        endDate: "14/11/2013"
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
    .then(data => data.createPortfolio)
}

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
const Portfolios = ({data}) => {
  const [portfolios, setPortfolios] = useState(data.portfolios);

  const createPortfolio = async () => {
    const newPortfolio = await graphCreatePortfolio();
    const newPortfolios = [...portfolios, newPortfolio];
    setPortfolios(newPortfolios);
  }
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

Portfolios.getInitialProps = async () =>{
  const portfolios = await fetchData();
  return { data: { portfolios }};
}

export default Portfolios;