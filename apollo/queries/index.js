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
      startDate: "2012-12-12T23:59Z"
      endDate: "2012-11-15T23:59Z"
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
    startDate: "2012-12-12T23:59Z"
    endDate: "2012-11-15T23:59Z"
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
// AUTH QUERIES START -----------------------

export const SIGN_UP = gql`
  mutation SignUp(
    $avatar: String
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(input: {
      avatar: $avatar
      username: $username
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    })
  }
`
export const SIGN_IN = gql`
  mutation SignIn(
    $email: String!
    $password: String!
  ) {
    signIn(input: {
      email: $email
      password: $password
    }) {
      _id
      username
      role
      avatar
    }
  }
`
export const GET_USER =gql`
  query User {
    user {
      _id
      username
      role
    }
  }
`
// AUTH QUERIES END -------------------------