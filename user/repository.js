const repository = require('../repository')
const { paginate, getPageInfo } = require('../pagination')

const COLLECTION_KEY = 'users'

module.exports = {
  async save(user) {    
    return await repository.save(COLLECTION_KEY, user)
  },

  async findByEmail(email) {
    return await repository.find(COLLECTION_KEY, {email: email})
  },

  async findByEmailAndPassword(email, password) {
    return await repository.find(COLLECTION_KEY, {email: email, password:password})
  },

  
}