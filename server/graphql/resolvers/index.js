




const Portfolio = require('../../database/models/portfolio');


exports.portfoliosQueries = {
  portfolio: async (root,{id}, ctx) => {
    return ctx.models.Portfolio.getById(id);
  },
  portfolios: async (root, args, ctx) => {
    return ctx.models.Portfolio.getAll();
  }
}

exports.portfoliosMutation = {
  createPortfolio: async (root,{input}) => {
    const portfolioCreate = await Portfolio.create(input)
    return portfolioCreate;
  },
  updatePortfolio: async (root,{id,input},ctx) => {
    const portfolioUpdate = await ctx.models.Portfolio.findAndUpdate(id,input);
    return portfolioUpdate;
  },
  deletePortfolio: async (root,{id}, ctx) => {
    const deletedPortfolio = await ctx.models.Portfolio.findAndDelete({_id:id});
    return deletedPortfolio._id;
  }
}