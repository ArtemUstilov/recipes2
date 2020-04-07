const Repository = require('./../../common/Repository');
const LikeModel = require('./like.schema');

class LikeRepository extends Repository {
	constructor() {
		super();
		this.model = LikeModel;
	}
}

module.exports = new LikeRepository();
