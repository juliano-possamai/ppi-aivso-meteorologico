'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('users', [
			{
				username: 'admin',
				password: 'admin',
				role: 'admin',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				username: 'user',
				password: 'user',
				role: 'user',
				createdAt: new Date(),
				updatedAt: new Date()
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	}
};
