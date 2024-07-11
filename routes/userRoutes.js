const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sequelize = require('../db');

// Маршрут для обновления баланса пользователя
router.post('/updateBalance', async (req, res) => {
    const { userId, amount } = req.body;
    const transaction = await sequelize.transaction();
    try {
        const user = await User.findOne({ where: { id: userId }, lock: true, transaction });
        if (!user) {
            await transaction.rollback();
            return res.status(404).send('Пользователь не найден');
        }

        if (amount < 0 && (user.balance + amount < 0)) {
            await transaction.rollback();
            return res.status(400).send('Недостаточно средств для совершения операции');
        }

        user.balance += amount;
        await user.save({ transaction });
        await transaction.commit();
        res.send(`Новый баланс пользователя: ${user.balance}`);
    } catch (error) {
        await transaction.rollback();
        console.error('Ошибка при обновлении баланса:', error);
        res.status(500).send('Ошибка сервера при обновлении баланса');
    }
});

module.exports = router;
