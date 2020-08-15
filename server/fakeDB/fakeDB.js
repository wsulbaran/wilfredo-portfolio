const { portfolios, users } = require('./data');
const Portfolio = require('../database/models/portfolio');
const User = require('../database/models/user');
const user = require('../database/models/user');


class FakeDB {
	
  async clean() {
    await User.deleteMany({});
    await Portfolio.deleteMany({});
  }

  async add(){
    await User.create(users);
    await Portfolio.create(portfolios);
  }

  async populate() {
    await this.clean();
    await this.add();
  }
}

module.exports = new FakeDB();