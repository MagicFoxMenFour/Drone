# 📖 Документация проекта

## ⚠️ ВАЖНО: Версия 2.0 - Исправлено для Amvera

В версии 2.0 полностью переделана архитектура для корректной работы на **Amvera PaaS**.

**Старые документы удалены**, используйте новые:

---

## 🎯 Главный документ

### 👉 **[START_HERE.md](./START_HERE.md)** - НАЧНИТЕ ОТСЮДА!
Краткий обзор что изменилось и как начать.

---

## 🚀 Для развертывания на Amvera

### 📋 **[AMVERA_EXPRESS_DEPLOYMENT.md](./AMVERA_EXPRESS_DEPLOYMENT.md)** - ОСНОВНОЙ ДОКУМЕНТ
Пошаговая инструкция по развертыванию на Amvera:
- Подготовка репозитория
- Создание проекта на Amvera
- Конфигурация окружения
- Переменные окружения
- Первый вход
- Решение проблем

**Время на выполнение**: ~5-10 минут

---

## 📚 Для локальной разработки

Проект имеет две части:

### Frontend (React + Vite)
```bash
npm run dev          # http://localhost:5173
```

### Backend (Express.js + SQLite)
```bash
node server/index.js # http://localhost:3000
```

---

## 🔄 Что изменилось?

| Аспект | Версия 1 (Неправильная) | Версия 2 (Правильная) |
|--------|----------------------|---------------------|
| Хостинг | Amvera как Vercel (❌) | Amvera PaaS (✅) |
| Backend | Vercel Functions (❌) | Express.js (✅) |
| БД | GitHub JSON (❌) | SQLite (✅) |
| Данные | В Git коммитах (❌) | В `/data/` (✅) |
| Конфиг | amvera.json (❌) | amvera.yaml (✅) |
| Сложность | Высокая (❌) | Простая (✅) |

---

## 📁 Структура проекта (Версия 2)

```
📦 Проект
├── 📁 src/                 # React фронтенд
│   ├── app/
│   │   ├── pages/         # React страницы (+ admin/)
│   │   ├── components/    # Компоненты
│   │   └── lib/           # Утилиты
│   └── main.tsx
├── 📁 server/             # Express.js бэкенд (НОВОЕ!)
│   ├── index.js           # Главное приложение
│   ├── db/
│   │   ├── init.js        # SQLite инициализация
│   │   └── auth.js        # Аутентификация
│   ├── routes/
│   │   ├── admin.js       # API админ панели
│   │   ├── lead.js        # API заявок
│   │   └── content.js     # API контента
│   └── migrate.js         # Импорт из JSON
├── 📁 dist/               # Собранный фронтенд
├── amvera.yaml           # Конфиг Amvera (НОВЫЙ!)
├── package.json          # Обновлен
└── .env.local.example    # Пример переменных
```

---

## 🔧 Новые файлы (Версия 2)

| Файл | Назначение |
|------|-----------|
| `server/index.js` | Express сервер |
| `server/db/init.js` | SQLite инициализация |
| `server/db/auth.js` | Аутентификация |
| `server/routes/admin.js` | Admin API |
| `server/routes/lead.js` | Lead API |
| `server/routes/content.js` | Content API |
| `server/migrate.js` | Миграция данных |
| `amvera.yaml` | Конфиг Amvera |
| `AMVERA_EXPRESS_DEPLOYMENT.md` | Инструкция |

---

## ✅ Функциональность

### ✨ Полностью реализовано

- ✅ Админ панель с авторизацией
- ✅ Управление услугами (CRUD)
- ✅ Управление кейсами (CRUD)
- ✅ Управление блогом (CRUD)
- ✅ Управление командой (добавление/удаление)
- ✅ Получение и управление заявками
- ✅ Email интеграция (Resend)
- ✅ SQLite база данных
- ✅ Express.js backend
- ✅ React фронтенд

---

## 🎯 Быстрый старт

### Вариант 1: Локально

```bash
npm install
node server/index.js
# В другом терминале:
npm run dev
```

### Вариант 2: На Amvera

1. Откройте [AMVERA_EXPRESS_DEPLOYMENT.md](./AMVERA_EXPRESS_DEPLOYMENT.md)
2. Следуйте шагам

---

## 📝 Команды

```bash
npm install               # Установка
npm run dev              # Dev фронтенд
npm run build            # Build фронтенд
npm start                # Запуск production
node server/index.js     # Запуск dev сервера
node server/migrate.js   # Миграция данных
```

---

## 🔐 Переменные окружения

```env
ADMIN_LOGIN=admin
ADMIN_PASSWORD=password
NODE_ENV=production
PORT=3000
DB_PATH=/data/app.db
RESEND_API_KEY=          # опционально
RESEND_FROM=             # опционально
LEADS_TO_EMAIL=          # опционально
```

---

## 📊 БД Schema (SQLite)

Автоматически создаются таблицы:
- `services` - услуги
- `cases` - кейсы
- `blog_posts` - статьи
- `about_page` - о компании
- `employees` - сотрудники
- `leads` - заявки
- `admin_users` - админ пользователи

---

## 🗑️ Удаленные документы (Версия 1)

Следующие документы больше не используются (основаны на неправильной архитектуре Vercel):
- ❌ `AMVERA_DEPLOYMENT.md` (см. запись в начале файла)
- ❌ `ADMIN_PANEL_DEV.md` (для Vercel Functions)
- ❌ `DEPLOYMENT_CHECKLIST.md` (для Vercel)
- ❌ `ADMIN_QUICK_START.md` (для Vercel)
- ❌ `IMPLEMENTATION_REPORT.md` (для Vercel)
- ❌ `SUPABASE_SETUP.md` (для GitHub)
- ❌ `amvera.json` (неправильный формат)

---

## 🎉 Статус

**Версия:** 2.0 (Express.js + SQLite)
**Статус:** ✅ Production Ready
**Хостинг:** Amvera PaaS (контейнеры)
**Готово к развертыванию:** ✅ ДА

---

## 📞 Нужна помощь?

1. Прочитайте [AMVERA_EXPRESS_DEPLOYMENT.md](./AMVERA_EXPRESS_DEPLOYMENT.md)
2. Смотрите логи: `node server/index.js`
3. Проверьте переменные окружения

---

**Обновлено:** 17 мая 2026
**Версия:** 2.0


---

## 🚀 Для развертывания на Amvera

### 📋 **[AMVERA_DEPLOYMENT.md](./AMVERA_DEPLOYMENT.md)** - Пошаговая инструкция
Полное руководство по развертыванию на хостинг Amvera:
- Подготовка окружения (GitHub PAT, переменные)
- Создание проекта на Amvera
- Конфигурация переменных окружения
- Проверка API функций
- Первый вход в админ панель
- Решение проблем

**Время на выполнение**: ~5-10 минут

---

## 💻 Для локальной разработки

### 📚 **[ADMIN_PANEL_DEV.md](./ADMIN_PANEL_DEV.md)** - Руководство разработчика
Как работать с админ панелью локально:
- Установка и запуск
- Настройка окружения
- Структура проекта
- Как развивать новые функции
- Тестирование и отладка

---

## ⚡ Быстрый старт

### 🏃 **[ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md)** - Краткое руководство
Быстрая справка:
- Что реализовано
- Быстрый старт (локально и Amvera)
- Структура админ панели
- Примеры использования
- Где хранятся данные

---

## ✅ Проверка перед развертыванием

### 📝 **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Полный чеклист
Чеклист для всех этапов:
- До развертывания
- При развертывании
- Проверки после развертывания
- Оптимизация
- Безопасность
- Решение проблем

---

## 📊 Детальный отчет

### 📈 **[IMPLEMENTATION_REPORT.md](./IMPLEMENTATION_REPORT.md)** - Полный отчет
Детальный технический отчет:
- Что было сделано
- Структура данных
- Переменные окружения
- Безопасность и надежность
- Интеграции

---

## 🔧 Техническая настройка

### 🗂️ **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - GitHub backend
Техническая информация о GitHub интеграции:
- GitHub backend для хранения контента
- Как работает версионизация
- Структура JSON файлов

---

## 📚 Другие файлы

### **amvera.json**
Конфиг для Amvera с предзаполненными переменными окружения.

### **vercel.json**
Конфиг для Vercel (если вдруг захотите там развернуть).

### **README.md**
Основной README проекта с описанием функций и технического стека.

---

## 🎯 Рекомендуемый порядок чтения

### Новые пользователи (не разработчики)
1. ✅ [START_HERE.md](./START_HERE.md) - 5 минут
2. ✅ [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) - 10 минут
3. ✅ [AMVERA_DEPLOYMENT.md](./AMVERA_DEPLOYMENT.md) - 15 минут (во время развертывания)

### Разработчики
1. ✅ [START_HERE.md](./START_HERE.md) - 5 минут
2. ✅ [ADMIN_PANEL_DEV.md](./ADMIN_PANEL_DEV.md) - 20 минут (локальная разработка)
3. ✅ [IMPLEMENTATION_REPORT.md](./IMPLEMENTATION_REPORT.md) - для понимания архитектуры

### DevOps / Администраторы
1. ✅ [AMVERA_DEPLOYMENT.md](./AMVERA_DEPLOYMENT.md)
2. ✅ [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
3. ✅ [IMPLEMENTATION_REPORT.md](./IMPLEMENTATION_REPORT.md)

---

## 📞 Поддержка

| Вопрос | Ответ |
|--------|-------|
| Как разместить на Amvera? | → [AMVERA_DEPLOYMENT.md](./AMVERA_DEPLOYMENT.md) |
| Как запустить локально? | → [ADMIN_PANEL_DEV.md](./ADMIN_PANEL_DEV.md) |
| Что нужно проверить? | → [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) |
| Как использовать админ панель? | → [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) |
| Как это работает? | → [IMPLEMENTATION_REPORT.md](./IMPLEMENTATION_REPORT.md) |

---

## ✨ Статус проекта

**Status**: ✅ Production Ready

- ✅ Админ панель реализована
- ✅ Авторизация работает
- ✅ Управление контентом работает
- ✅ Email интеграция готова
- ✅ GitHub версионизация работает
- ✅ Документация полная

**Готово к развертыванию!**

---

## 🗺️ Файловая структура документации

```
📁 Документация
├── START_HERE.md                    ← Начните здесь!
├── AMVERA_DEPLOYMENT.md             ← Для развертывания
├── ADMIN_QUICK_START.md             ← Для быстрого старта
├── ADMIN_PANEL_DEV.md               ← Для разработчиков
├── DEPLOYMENT_CHECKLIST.md          ← Для проверки
├── IMPLEMENTATION_REPORT.md         ← Для понимания
├── SUPABASE_SETUP.md                ← Техническая информация
├── amvera.json                      ← Конфиг Amvera
└── vercel.json                      ← Конфиг Vercel
```

---

**Создано**: 17 мая 2026
**Последнее обновление**: 17 мая 2026
**Версия**: 1.0.0
