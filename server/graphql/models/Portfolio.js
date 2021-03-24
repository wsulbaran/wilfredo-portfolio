



class Portfolio {

    constructor(model, user) {
      // this.Model === Portfolio
      this.Model = model;
      this.user = user;
      this.roles = ['admin', 'instructor']
    }

    getAll() {
      return this.Model.find({});
    }

    getById(id) {
      return this.Model.findById(id);
    }

    create(data) {
      if(!this.user || !this.roles.includes(this.user.role)){
        throw Error('Not Authorize!!!')
      }
      data.user = this.user;
      return this.Model.create(data);
    }

    findAndUpdate(id, data) {
      return this.Model.findOneAndUpdate({_id: id}, data, {new: true});
    }

    findAndDelete(id) {
      return this.Model.findOneAndRemove({_id: id})
    }
  }

  module.exports = Portfolio;
