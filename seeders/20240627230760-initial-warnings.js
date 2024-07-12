'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('warnings', [
			{
				name: 'Aviso teste',
				email: 'teste@email.com',
				maxDaysUntilEvent: 10,
				minimunProbability: 60,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('users', null, {});
	}
};
