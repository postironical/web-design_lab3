const Sequelize = require("sequelize");

module.exports = function (sequelize) {
	return sequelize.define(
		"Users",
		{
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			username: {
				type: Sequelize.TEXT,
				allowNull: false,
				unique: true,
			},
			email: {
				type: Sequelize.TEXT,
				allowNull: false,
				unique: true,
			},
			sex: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			birthdate: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			password: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
