# My App

## Описание

Это простое веб-приложение, созданное с использованием Node.js (Express, JavaScript) и PostgreSQL (Sequelize ORM). При запуске приложение создаёт таблицу "users" в базе данных с помощью миграции и добавляет в неё один пользовательский аккаунт с полем "balance" со значением 10000. 

Приложение также предоставляет маршрут для обновления баланса пользователя.

## Установка

1. Клонируйте репозиторий на ваш локальный компьютер:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2. Установите зависимости:
    ```bash
    npm install
    ```

## Запуск

1. Убедитесь, что PostgreSQL сервер запущен и настроен правильно.

2. Запустите приложение:
    ```bash
    npm run start
    ```

Приложение будет запущено на `http://localhost:3000`.

## Конфигурационный файл

Конфигурационный файл находится в `config/config.json`. Пример конфигурации:

```json
{
  "development": {
    "username": "postgres",
    "password": "your_password",
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
