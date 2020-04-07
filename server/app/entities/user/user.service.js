const jwt = require('jsonwebtoken')
const userRepository = require('./user.repository');

class UserService {
  async login(login, passwordHash){
  	const users = await userRepository.findWhere({login, password: passwordHash});
  	if(!users.length){
  		return null;
		}
		return jwt.sign({_id: users[0]._id}, 'somestring');
	}
}

module.exports = new UserService();
