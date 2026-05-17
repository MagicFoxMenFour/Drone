# Drone Services Website

Профессиональный сайт для компании, занимающейся услугами дронов. Включает публичный сайт и полнофункциональную админ панель.

## Функциональность

### 🌐 Публичный сайт
- Главная страница
- Услуги (Services)
- Портфолио проектов (Cases)
- Блог
- Страница "О нас" с командой
- Контактная форма

### 🛡️ Админ панель
- Система авторизации
- Управление услугами (CRUD)
- Управление кейсами (CRUD)
- Управление статьями блога (CRUD)
- Управление информацией "О нас" и членами команды
- Получение заявок с формы обратной связи
- Отправка заявок на email (через Resend)
- Изменение статуса заявок

## Быстрый старт

### Установка

```bash
npm install
```

### Локальная разработка

#### Вариант 1: Fron-end только
```bash
npm run dev
```
Откройте http://localhost:5173

#### Вариант 2: Front-end + API (рекомендуется)
```bash
# Установите Vercel CLI
npm install -g vercel

# Запустите с API функциями
vercel dev
```
Откройте http://localhost:3000

### Первый вход в админ панель

1. Откройте `/admin/login`
2. Логин по умолчанию: `admin`
3. Пароль: смотрите в `.env` файле
4. После входа: `/admin`

## Развертывание

### На Amvera (рекомендуется)
- [Инструкция по развертыванию на Amvera](./AMVERA_DEPLOYMENT.md)

### На других хостингах
- Поддерживается Vercel, Netlify, любой Node.js хостинг
- Используется Vite для сборки + Vercel Functions для API

## Документация

- [Развертывание на Amvera](./AMVERA_DEPLOYMENT.md) - Подробная инструкция
- [Локальная разработка админ панели](./ADMIN_PANEL_DEV.md) - Для разработчиков
- [Setup GitHub backend](./SUPABASE_SETUP.md) - Настройка GitHub хранилища

## Структура проекта

```
├── src/                    # Frontend React приложение
│   ├── app/
│   │   ├── pages/         # React Page компоненты
│   │   │   ├── admin/     # Админ панель
│   │   │   └── ...        # Публичные страницы
│   │   ├── components/    # Переиспользуемые компоненты
│   │   ├── lib/           # Утилиты и API клиент
│   │   └── data/          # Статические данные
│   └── styles/            # CSS стили (Tailwind)
├── api/                    # Vercel Functions (backend)
│   ├── admin/[...path].ts # API админ панели
│   ├── lead.ts            # API обработки заявок
│   ├── content.ts         # API получения контента
│   └── _lib/              # Утилиты сервера
├── vercel.json            # Конфиг Vercel
├── amvera.json            # Конфиг Amvera
├── vite.config.ts         # Конфиг Vite
└── package.json
```

## Технологический стек

### Frontend
- **React 18** - UI библиотека
- **React Router 7** - Маршрутизация
- **Vite 6** - Build tool
- **Tailwind CSS 4** - Стили
- **TypeScript** - Type safety
- **Shadcn/ui** - UI компоненты
- **Recharts** - Графики и диаграммы

### Backend
- **Vercel Functions** - Serverless API
- **GitHub API** - Хранилище контента
- **Resend** - Отправка email

### Данные
- **GitHub (JSON)** - Хранилище контента
- **Git** - История изменений

## Переменные окружения

Создайте файл `.env` в корне (скопируйте из `.env.example`):

```env
# Admin panel
ADMIN_LOGIN=admin
ADMIN_PASSWORD=your_password
ADMIN_SESSION_SECRET=random_long_string

# GitHub
GITHUB_OWNER=your_username
GITHUB_REPO=your_repo
GITHUB_TOKEN=ghp_xxxxx
GITHUB_CONTENT_BRANCH=content

# Email (опционально)
RESEND_API_KEY=re_xxxxx
RESEND_FROM=noreply@yourdomain.com
LEADS_TO_EMAIL=admin@yourdomain.com
```

## Безопасность

- 🔒 Admin панель защищена cookie-based сессией
- 🔐 Пароли не хранятся в коде (только в переменных окружения)
- ✅ CSRF защита и HttpOnly cookies
- ✅ Timing-safe сравнение паролей

## Сборка

```bash
npm run build
```

Создаст оптимизированную сборку в `dist/` папке.

## Лицензия

Proprietary - для использования в проекте Drone

## Поддержка

Для вопросов:
1. Проверьте документацию в папке проекта
2. Посмотрите логи в консоли браузера (F12)
3. Для Amvera - https://docs.amvera.io
  