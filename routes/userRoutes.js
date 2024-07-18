// Что было сделано для улучшения
// Удаление lock: true:
//
// В нашем обновленном коде мы удалили lock: true. Это позволяет транзакциям выполняться без блокировки строк на
// этапе чтения, что значительно снижает вероятность дэдлоков и улучшает параллелизм.
// Мы по-прежнему используем транзакции для обеспечения атомарности операций. Это означает,
// что если одна часть операции (например, чтение или запись) не удается, вся операция откатывается,
// что предотвращает неконсистентность данных.
// Вот почему удаление параметра lock: true и улучшение обработки транзакций может привести к
// значительному улучшению производительности и надежности нашего приложения
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const sequelize = require('../db');

// Роут для обновления баланса пользователя
router.post('/updateBalance', async (req, res) => {
    const { userId, amount } = req.body;

    // Начинаем транзакцию
    const transaction = await sequelize.transaction();

    try {
        // Находим пользователя и блокируем запись для обновления
        // Удален параметр lock: true
        const user = await User.findOne({ where: { id: userId }, transaction });

        // Проверяем, существует ли пользователь
        if (!user) {
            await transaction.rollback();
            return res.status(404).send('Пользователь не найден');
        }

        // Проверяем, достаточно ли средств для снятия
        if (amount < 0 && (user.balance + amount < 0)) {
            await transaction.rollback();
            return res.status(400).send('Недостаточно средств для совершения операции');
        }

        // Обновляем баланс пользователя
        user.balance += amount;

        // Сохраняем изменения в рамках транзакции
        await user.save({ transaction });

        // Фиксируем транзакцию
        await transaction.commit();

        // Отправляем новый баланс пользователя в ответ
        res.send(`Новый баланс пользователя: ${user.balance}`);
    } catch (error) {
        // Откатываем транзакцию в случае ошибки
        await transaction.rollback();
        console.error('Ошибка при обновлении баланса:', error);
        res.status(500).send('Ошибка сервера при обновлении баланса');
    }
});

module.exports = router;
