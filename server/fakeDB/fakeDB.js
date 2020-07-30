const { portfolios } = require('./data');
const Portfolio = require('../database/models/portfolio');


class FakeDB {
	
  async clean() {
    await Portfolio.deleteMany({})
  }

  async add(){
    await Portfolio.create(portfolios)
  }

  async populate() {
    await this.clean();
    await this.add();
  }
}

module.exports = new FakeDB();