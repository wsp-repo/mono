# Конфигурация catalogs-service

Этот документ описывает структуру конфигурационного файла `config.default.yml` для сервиса catalogs-service.

## Секции конфигурации

### config
Ключ конфигурации.
- `config`: название профиля (например, 'default')

### databases
Настройки подключения к базе данных.
- `postgres.url`: строка подключения к PostgreSQL
- `postgres.mainSchema`: основная схема БД
- `postgres.pool.min`: минимальное количество соединений
- `postgres.pool.max`: максимальное количество соединений

### kafka
Настройки подключения к Apache Kafka.
- `brokers`: список адресов брокеров Kafka
- `clientId`: идентификатор приложения

### proculture
Настройки интеграции с ProCulture.
- `apiKey`: API ключ для доступа
- `url`: URL API ProCulture

### eventsService
Настройки сервиса событий.
- `url`: URL сервиса событий

### kafkaOutbox
Настройки для паттерна Kafka Outbox.
- `schema`: схема для outbox таблиц
- `source`: источник сообщений

### application
Общие настройки приложения.
- `name`: название приложения
- `prefix`: префикс для API маршрутов
- `rest.host`: хост для REST API
- `rest.port`: порт для REST API
- `metrics.route`: эндпоинт для метрик
- `pagination.limit`: лимит по умолчанию для пагинации
- `pagination.maxLimit`: максимальный лимит
- `pagination.minLimit`: минимальный лимит
- `catalogs.importCheckInterval`: интервал проверки необходимости импорта
- `catalogs.importTotalInterval`: интервал между полными импортами
