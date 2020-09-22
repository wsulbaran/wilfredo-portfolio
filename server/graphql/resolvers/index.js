




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
  createPortfolio: async (root,{input}, ctx) => {
    const portfolioCreate = await ctx.model.Portfolio.create(input)
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

exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  }
}

exports.userMutation = {
  signUp: async (root,{input},ctx)=>{
    const userRegister = await ctx.models.User.signUp(input)
    return userRegister._id ;
  },
  signIn: (root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signOut: (root,args,ctx)=> {
    return ctx.models.User.signOut(ctx);
  }
} 