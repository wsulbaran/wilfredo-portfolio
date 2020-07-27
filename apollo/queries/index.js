import { gql } from 'apollo-boost';




export const GET_PORTFOLIO = gql`
  query Portfolio($id: ID) {
    portfolio (id: $id) {
      _id
      title
      location
      startDate
      endDate
      company
      companyWebsite
      description
    }
  }
`

export const GET_PORTFOLIOS = gql`query Portfolios { 
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

export const CREATE_PORTFOLIO = gql`
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
  }
`

export const UPDATE_PORTFOLIO = gql`
mutation UpdatePortfolio($id: ID) {
  updatePortfolio(id: $id,input: {
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
}`

export const DELETE_PORTFOLIO =gql`
  mutation DeletePortfolio($id: ID) {
    deletePortfolio(id: $id)
  }
`