

const portfolioFields = `
  title: String,
  company: String,
  companyWebsite: String,
  location: String,
  jobTitle:String,
  description: String,
  startDate: String,
  endDate: String
`


exports.portfoliosTypes = `
  type Portfolio {
    _id: ID,
    ${portfolioFields}
  }

  input PortfolioInput {
    ${portfolioFields}
  }
`

exports.userType = `
  input SignUpInput {
    avatar: String
    name: String
    username: String!
    email: String!
    password: String!
    passwordConfirmation: String
  }
`