const express = require('express');
const sequelize = require('./db');
const app = express();
const port = 3000;
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: true });

        // Подключение сидера
        const seeder = require('./seeders/20240707-seed-user');
        await seeder.up(sequelize.getQueryInterface());
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
