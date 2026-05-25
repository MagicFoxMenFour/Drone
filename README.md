# Drone Services Website - Полная документация

## Обзор проекта

Это полнофункциональный веб-сайт для компании по дронам и электронике. Проект включает публичный сайт и защищённую админ-панель для управления контентом.

**Стек технологий:**
- **Frontend:** React 18.3.1 + TypeScript + Vite
- **Backend:** Node.js + Express
- **База данных:** SQLite
- **Стили:** Tailwind CSS 4.1.12 + Radix UI компоненты
- **Роутинг:** React Router 7.13
- **Хостинг:** Amvera (поддержка персистентного хранилища `/data`)

---

## Структура проекта

```
.
├── src/                          # Frontend код
│   ├── app/
│   │   ├── pages/               # React страницы
│   │   │   ├── admin/           # Защищённые админ-страницы
│   │   │   │   ├── AdminLogin*
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── AdminServices*
│   │   │   │   ├── AdminCases*
│   │   │   │   ├── AdminBlog*
│   │   │   │   ├── AdminAbout*
│   │   │   │   ├── AdminEmployees*
│   │   │   │   └── AdminLeads*
│   │   │   ├── HomePage.tsx      # Главная страница
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── ServiceDetailPage.tsx
│   │   │   ├── CasesPage.tsx
│   │   │   ├── CaseDetailPage.tsx
│   │   │   ├── BlogPage.tsx
│   │   │   ├── BlogPostPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ContactsPage.tsx
│   │   │   ├── Layout.tsx        # Основной лейаут для публичной части
│   │   │   └── AdminLayout.tsx   # Лейаут для админ-панели
│   │   ├── components/          # Переиспользуемые компоненты
│   │   │   ├── ui/              # Базовые UI компоненты (Radix + Tailwind)
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Cases.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Contact.tsx
│   │   ├── lib/                 # Вспомогательные функции
│   │   │   ├── adminApi.ts      # API клиент для админ операций
│   │   │   ├── leadApi.ts       # Отправка лидов
│   │   │   ├── content.ts       # Загрузка контента
│   │   │   ├── slug.ts          # Работа с URL слагами
│   │   │   ├── date.ts          # Форматирование дат
│   │   │   ├── mapRow.ts        # Трансформация данных из БД
│   │   │   └── api/types.ts     # TypeScript типы данных
│   │   ├── data/                # Статичные данные по умолчанию
│   │   │   ├── services.ts
│   │   │   ├── cases.ts
│   │   │   ├── blogPosts.ts
│   │   │   └── aboutDefaults.ts
│   │   ├── router.tsx           # Определение всех маршрутов
│   │   ├── App.tsx              # Корневой компонент
│   │   └── main.tsx             # Точка входа
│   └── styles/
│       └── index.css            # Глобальные стили
├── server/                       # Backend код
│   ├── index.js                 # Главный файл сервера
│   ├── migrate.js               # Миграции БД
│   ├── db/
│   │   ├── init.js              # Инициализация и операции с БД
│   │   └── auth.js              # Аутентификация и сессии
│   └── routes/
│       ├── admin.js             # API endpoints для админ-панели
│       ├── lead.js              # API endpoint для сбора контактов
│       └── content.js           # API endpoints для чтения контента
├── data/                        # Персистентные данные (игнорируется в git)
│   ├── app.db                   # SQLite база данных
│   └── uploads/                 # Загруженные файлы (изображения)
├── dist/                        # Скомпилированный frontend (создаётся при build)
├── package.json                 # Зависимости проекта
├── vite.config.ts               # Конфиг Vite
├── tailwind.config.js           # Конфиг Tailwind CSS
├── .env                         # Переменные окружения
└── amvera.yaml                  # Конфиг для деплоя на Amvera

```

---

## Важные концепции

### 1. Аутентификация админа

Используется простой, но эффективный механизм:

1. **Вход:** POST `/api/admin/login` с `login` и `password`
2. **Токены:** Создаются как Base64 JSON с exp claim (7 дней)
3. **Хранение:** В cookie `admin_session` (httpOnly)
4. **Проверка:** Middleware `adminAuthMiddleware` проверяет токен при каждом запросе
5. **Пароль:** Хешируется с bcrypt, сравнивается при входе

**Поток:**
```
Браузер -> login -> adminAuthMiddleware проверяет token -> 
  если валиден -> доступ к защищённым эндпоинтам
```

### 2. База данных (SQLite)

**Основные таблицы:**

#### `admin_users`
```
id (UUID) | login (TEXT) | password_hash (TEXT)
```

#### `services`
```
id | slug | title | short_desc | full_desc | icon | color | 
use_cases (JSON) | process (JSON) | results (JSON) | 
industries (JSON) | price | published | updated_at
```

#### `cases`
```
id | slug | category | title | client | location | year | 
short_desc | challenge | solution | results (JSON) | 
tags (JSON) | gradient | accent_color | published | updated_at
```

#### `blog_posts`
```
id | slug | category | date | read_time | title | excerpt | 
tags (JSON) | accent | content (JSON) | published | updated_at
```

#### `about_page`
```
id | hero_title | hero_text | mission_title | mission_text | 
principles (JSON) | partners (JSON) | licenses (JSON) | updated_at
```

#### `employees`
```
id | name | role | bio | image | initials | color | active | sort | updated_at
```

#### `leads`
```
id | created_at | name | phone | email | service | message | status | source | updated_at
```

### 3. Роутинг

**Публичные маршруты** (src/app/router.tsx):
```
/                 → HomePage
/services         → ServicesPage (список)
/services/:slug   → ServiceDetailPage (деталь)
/cases            → CasesPage
/cases/:slug      → CaseDetailPage
/blog             → BlogPage
/blog/:slug       → BlogPostPage
/about            → AboutPage
/contacts         → ContactsPage
```

**Админ маршруты** (защищены авторизацией):
```
/admin/login               → Форма входа
/admin                     → AdminDashboard (статистика)
/admin/services            → Список услуг
/admin/services/:id        → Редактор услуги
/admin/cases               → Список кейсов
/admin/cases/:id           → Редактор кейса
/admin/blog                → Список постов
/admin/blog/:id            → Редактор поста
/admin/about               → Редактор страницы "О нас"
/admin/employees           → Управление сотрудниками
/admin/leads               → Список заявок с сайта
```

### 4. API Endpoints

#### Публичные (без авторизации)

**POST `/api/lead`** - Отправить заявку
```json
Request: { name, email?, phone?, service?, message? }
Response: { id, created_at, ... }
```

**POST `/api/content/...`** - Загрузка контента (публичная часть)

#### Защищённые (требуют авторизацию)

**POST `/api/admin/login`**
```json
Request: { login, password }
Response: { ok, token }
Cookie: admin_session (httpOnly)
```

**POST `/api/admin/logout`**

**GET `/api/admin/me`** - Проверить текущего пользователя

**GET `/api/admin/dashboard`** - Статистика (новые лиды)

**GET `/api/admin/:kind`** - Получить список элементов
```
:kind = services | cases | blog_posts | about_page | employees | leads
Response: { rows: [...] }
```

**GET `/api/admin/:kind/:id`** - Получить один элемент

**POST `/api/admin/:kind`** - Создать новый элемент

**PATCH `/api/admin/:kind/:id`** - Обновить элемент

**DELETE `/api/admin/:kind/:id`** - Удалить элемент

**POST `/api/admin/upload`** - Загрузить файл (multer)

---

## Запуск и разработка

### Установка зависимостей
```bash
npm install
```

### Разработка (локально)
```bash
# Запустить фронтенд (Vite на порте 5173)
npm run dev

# В отдельном окне: запустить бэкенд (Express на порте 3000)
npm start
```

Vite автоматически проксирует `/api` на `http://localhost:3000`.

### Build для продакшена
```bash
npm run build
```

Создаст оптимизированный `dist/` и построит сервер (всё в `npm start`).

### Переменные окружения (.env)

| Переменная | Значение | Назначение |
|-----------|----------|-----------|
| `ADMIN_LOGIN` | admin | Логин для админ-панели |
| `ADMIN_PASSWORD` | Mnbg78Mnbg78 | Пароль админа |
| `PORT` | 3000 | Порт сервера Express |
| `NODE_ENV` | production | Режим работы |
| `DB_PATH` | /data/app.db | Путь к базе данных (Amvera: /data/) |
| `DATA_DIR` | ./data | Директория для всех данных |
| `RESEND_API_KEY` | (опционально) | API ключ для отправки email |
| `RESEND_FROM` | (опционально) | Email отправителя |
| `LEADS_TO_EMAIL` | (опционально) | Email для получения лидов |

---

## Основные возможности

### 1. Управление услугами (Services)
- Список услуг на главной
- Детальные страницы с описанием
- Админ-панель для создания, редактирования, удаления
- Публикация/скрытие услуги
- SEO-friendly URL (slug)
- Структурированные данные (use cases, process, results)

### 2. Портфолио (Cases)
- Галерея выполненных проектов
- Детальное описание (challenge → solution → results)
- Теги и категоризация
- Фильтрация по категориям
- Цветовое оформление (gradient, accent)

### 3. Блог
- Публикация статей с датой и временем чтения
- Архивирование по датам
- Теги и категории
- SEO-оптимизированные URL
- Редактор контента в админке

### 4. О компании (About)
- Редактируемая hero секция
- Миссия и принципы
- Партнёры и лицензии
- Список сотрудников
- Фотографии и биографии

### 5. Лиды (Leads Management)
- Форма контактов на сайте
- Автоматический сбор в БД
- Админ-панель для просмотра
- Смена статуса (new, contacted, closed)
- Опциональная отправка email через Resend API

### 6. Встроенные компоненты
- **Header** - навигация, мобильное меню
- **Footer** - ссылки, контакты
- **Hero** - красивая главная секция
- **FAQ** - часто задаваемые вопросы
- **Testimonials** - отзывы клиентов
- **Pricing** - таблица цен
- **Contact** - форма обратной связи

---

## Рабочий процесс для новых разработчиков

### 1. Первый запуск
```bash
git clone <repo>
cd Drone
npm install
npm run build
npm start
```

Откройте http://localhost:3000

### 2. Вход в админ-панель
- URL: http://localhost:3000/admin/login
- Login: `admin`
- Password: `Mnbg78Mnbg78`

### 3. Изменение контента
- **Услуги/Кейсы/Блог:** Используйте админ-панель
- **О компании, Сотрудники:** Только в админке
- **Структура сайта:** Изменяйте код в `src/app/`

### 4. Добавление нового маршрута
1. Создайте компонент в `src/app/pages/`
2. Добавьте маршрут в `src/app/router.tsx`
3. Обновите навигацию в `Header.tsx`

### 5. Добавление новой таблицы в БД
1. Создайте миграцию в `server/db/init.js` (функция `initializeDatabase`)
2. Добавьте CRUD операции в `server/routes/admin.js`
3. Создайте TypeScript тип в `src/app/lib/api/types.ts`
4. Напишите клиентский код в `src/app/lib/adminApi.ts`

### 6. Стилизация
- Используйте Tailwind CSS классы
- Базовые компоненты в `src/app/components/ui/`
- Глобальные стили в `src/styles/index.css`

---

## Деплой на Amvera

1. **Конфиг:** `amvera.yaml` уже настроена
   - Node.js 20
   - Команда build: `npm run build`
   - Команда старта: `npm start`
   - Порт: 3000
   - Персистентность: `/data`

2. **Переменные окружения:** Установите в Amvera dashboard
   ```
   ADMIN_LOGIN=admin
   ADMIN_PASSWORD=<сложный пароль>
   DB_PATH=/data/app.db
   NODE_ENV=production
   ```

3. **Миграция данных:**
   - База данных хранится в `/data/app.db`
   - Загруженные файлы в `/data/uploads/`
   - При переустановке данные сохраняются

4. **Развёртывание:**
   ```bash
   git push  # Amvera автоматически создаст контейнер и запустит
   ```

---

## Важные файлы для изучения (в порядке)

1. **`package.json`** - зависимости и скрипты
2. **`vite.config.ts`** - конфиг Vite, proxy для API
3. **`server/index.js`** - главный сервер Express
4. **`src/app/router.tsx`** - все маршруты
5. **`src/app/lib/adminApi.ts`** - клиентский API
6. **`server/routes/admin.js`** - серверный API для админки
7. **`server/db/init.js`** - инициализация БД и таблицы
8. **`src/app/pages/HomePage.tsx`** - пример страницы

---

## Частые задачи

### Добавить новую услугу
1. Администратор входит в `/admin/services`
2. Нажимает "Добавить"
3. Заполняет форму (title, description, price и т.д.)
4. Загружает изображение (icon)
5. Публикует

### Отправить email при новой заявке
1. Настройте Resend API:
   - Получите ключ на https://resend.com
   - Установите в `.env`: `RESEND_API_KEY=<key>` и `RESEND_FROM=<email>`
2. Установите email для получения: `LEADS_TO_EMAIL=business@company.com`
3. При отправке формы контакта письмо будет отправлено автоматически

### Изменить дизайн кнопок
- Компонент: `src/app/components/ui/button.tsx`
- Используется `class-variance-authority` для вариантов
- Основная палитра в `tailwind.config.js`

### Добавить новую страницу
1. Создайте файл в `src/app/pages/MyPage.tsx`:
```tsx
export function MyPage() {
  return <div>Содержимое</div>;
}
```

2. Добавьте в `router.tsx`:
```tsx
{ path: "my-path", element: <MyPage /> }
```

3. Добавьте ссылку в `Header.tsx`:
```tsx
<Link to="/my-path">Моя страница</Link>
```

---

## Архитектурные решения

### Почему SQLite?
- Простая развёртка (один файл)
- Достаточно для малого-среднего сайта
- Отличная интеграция с Node.js
- Персистентность на Amvera

### Почему React Router v7?
- Современный, с поддержкой action/loader
- Гибкий, подходит для любого размера приложения
- Хорошая интеграция с TypeScript

### Почему Radix UI + Tailwind?
- Radix UI - доступные, базовые компоненты
- Tailwind - быстрая стилизация
- Вместе - максимальная гибкость и скорость разработки

### Почему Vite?
- Быстрый dev server (HMR)
- Быстрый build
- Минимальная конфигурация
- Отличная поддержка TypeScript

---

## Возможные проблемы и решения

### "Не могу войти в админку"
- Проверьте .env: `ADMIN_LOGIN` и `ADMIN_PASSWORD`
- Убедитесь, что база данных инициализирована
- Проверьте логи сервера: `npm start`

### "Загруженные файлы не появляются"
- Проверьте права на директорию `/data/uploads/`
- Убедитесь, что сервер запущен с правами на запись
- На Amvera: убедитесь, что используется `/data` директория

### "Изменения не появляются на сайте"
- Перебилдьте фронтенд: `npm run build`
- Перезагрузите сервер: Ctrl+C, затем `npm start`
- В режиме разработки: сохраните файл, Vite перезагрузит автоматически

### "CORS ошибка при загрузке данных"
- Проверьте, что Vite прокси настроен правильно в `vite.config.ts`
- В продакшене убедитесь, что сервер Express запущен и доступен

---

## Контрольный список для передачи другому разработчику

- [ ] Прочитал эту документацию
- [ ] Установил зависимости: `npm install`
- [ ] Успешно запустил фронтенд: `npm run dev`
- [ ] Успешно запустил бэкенд: `npm start`
- [ ] Зашёл на http://localhost:3000
- [ ] Зашёл в админку с логином admin и паролем
- [ ] Понимаю структуру папок в `src/app/`
- [ ] Понимаю, как работают маршруты в `router.tsx`
- [ ] Могу добавить новую услугу через админку
- [ ] Могу создать новую публичную страницу
- [ ] Изучил основные компоненты в `components/`
- [ ] Знаю, где находится API клиент (`lib/adminApi.ts`)
- [ ] Знаю, как работает аутентификация админа

---

## Дополнительные ресурсы

- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Radix UI:** https://radix-ui.com
- **React Router:** https://reactrouter.com
- **TypeScript:** https://www.typescriptlang.org
- **SQLite:** https://www.sqlite.org
- **Express:** https://expressjs.com

---

**Версия документации:** 1.0  
**Последнее обновление:** май 2026  
**Автор:** ИИ ассистент OpenCode
