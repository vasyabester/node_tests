'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Убедитесь, что в аргументе передается правильное имя таблицы
        // и правильная структура данных
        await queryInterface.bulkInsert('Users', [{
            balance: 10000,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: async (queryInterface, Sequelize) => {
        // Очистка таблицы при откате
        await queryInterface.bulkDelete('Users', null, {});
    }
};
