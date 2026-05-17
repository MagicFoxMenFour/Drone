# ⚠️ УСТАРЕВШИЙ ДОКУМЕНТ - Используйте AMVERA_EXPRESS_DEPLOYMENT.md

> Этот документ устарел и основан на неправильном предположении что Amvera работает как Vercel.
> 
> **Amvera - это контейнерный PaaS хостинг, а не Serverless Functions!**
>
> ✅ **Используйте новый документ**: [AMVERA_EXPRESS_DEPLOYMENT.md](./AMVERA_EXPRESS_DEPLOYMENT.md)

---

# Развертывание на Amvera (УСТАРЕВШИЙ МЕТОД)

⚠️ **ВНИМАНИЕ**: Этот документ оставлен только для справки. Используйте новый метод с Express.js и SQLite.

## Предварительные требования

1. **GitHub репозиторий** с вашим кодом
2. **Аккаунт на Amvera** (https://amvera.io)
3. **Подготовленные переменные окружения**

## Шаг 1: Подготовка окружения

### 1.1 Создайте GitHub PAT (Personal Access Token)

Админ панель использует GitHub для хранения контента (JSON файлы в ветке `content`).

1. Перейдите на https://github.com/settings/tokens
2. Создайте **New classic token** или **Fine-grained token**
3. Дайте права на:
   - **repo** (все права на репозиторий) - для classic token
   - **contents: read and write** - для fine-grained token
4. Скопируйте токен (больше он не будет виден!)

### 1.2 Создайте ветку `content` в GitHub

```bash
git checkout -b content
git push origin content
```

Эта ветка будет хранить JSON файлы с контентом.

### 1.3 Установите Resend для отправки email (опционально)

Если хотите получать заявки по почте:

1. Зарегистрируйтесь на https://resend.com
2. Создайте API key в Personal tokens
3. Добавьте домен на Resend (получите `noreply@yourdomain.com`)

## Шаг 2: Развертывание на Amvera

### 2.1 Подключите GitHub репозиторий

1. Перейдите в **Amvera Console** (https://console.amvera.io)
2. Создайте новый проект
3. Выберите **GitHub** как источник кода
4. Авторизуйтесь и выберите ваш репозиторий
5. Выберите **main** или **master** ветку

### 2.2 Настройте конфигурацию

При создании проекта Amvera автоматически найдет `package.json` и `vite.config.ts`.

**Убедитесь, что настроены:**
- **Build command**: `npm install && npm run build`
- **Start command**: Amvera сам обслужит статический контент из `dist/`
- **Environment**: Node.js 18+ (LTS версия рекомендуется)

### 2.3 Добавьте переменные окружения

В **Environment Variables** на Amvera Console добавьте:

```
# Обязательно для админ панели
ADMIN_LOGIN=admin
ADMIN_PASSWORD=your_secure_password_here
ADMIN_SESSION_SECRET=generate_random_long_string_here

# GitHub интеграция
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
GITHUB_TOKEN=your_github_pat_token
GITHUB_CONTENT_BRANCH=content

# Email (опционально)
RESEND_API_KEY=re_xxxxx
RESEND_FROM=Drone <noreply@yourdomain.com>
LEADS_TO_EMAIL=admin@yourdomain.com

# Опционально (Supabase, оставьте пустыми если не используете)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Генерирование ADMIN_SESSION_SECRET

```bash
# На вашем локальном компьютере
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Или используйте любой генератор случайных строк (минимум 32 символа).

## Шаг 3: Настройка API функций на Amvera

### 3.1 Структура API

Ваш проект содержит API функции в папке `api/`:

```
api/
├── admin/[...path].ts      # API админ панели
├── lead.ts                  # API для обработки заявок
├── content.ts               # API для получения контента
└── _lib/                    # Утилиты (auth, storage, GitHub)
```

Amvera должен автоматически распознать эту структуру как Vercel Functions.

### 3.2 Проверка API маршрутов

После развертывания API будут доступны по:

- `https://yourdomain.amvera.io/api/admin/login` - вход
- `https://yourdomain.amvera.io/api/admin/services` - получить услуги
- `https://yourdomain.amvera.io/api/lead` - отправить заявку
- `https://yourdomain.amvera.io/api/content/services` - публичный контент

## Шаг 4: Развертывание

1. Нажмите **Deploy** в Amvera Console
2. Следите за логами сборки
3. Дождитесь завершения (обычно 2-5 минут)
4. Перейдите на ваш домен

## Шаг 5: Первый вход

1. Откройте `https://yourdomain.amvera.io/admin/login`
2. Введите логин и пароль из переменных окружения
3. Вы попадете в админ панель

## Структура админ панели

| Раздел | Функция |
|--------|---------|
| **Панель** | Дашборд с числом новых заявок |
| **Услуги** | Создание, редактирование, удаление услуг |
| **Блог** | Управление статьями |
| **Кейсы** | Портфолио проектов |
| **О нас** | Информация о компании |
| **Сотрудники** | Добавление/удаление членов команды |
| **Заявки** | Просмотр форм обратной связи, изменение статуса |

## Работа с контентом

### Как контент сохраняется

- Все изменения в админ панели **автоматически коммитятся в GitHub**
- Ветка `content` содержит JSON файлы:
  - `content/services.json`
  - `content/cases.json`
  - `content/blog_posts.json`
  - `content/employees.json`
  - `content/about_page.json`
  - `content/leads.json`

### Восстановление данных

Если что-то сломалось, просто откатитесь в GitHub:

```bash
git checkout main  # вернитесь на основную ветку
git revert <commit_hash>  # отмените нежелательный коммит
```

## Дополнительные советы

### 1. Доменное имя

- Используйте бесплатный поддомен Amvera (*.amvera.io)
- Или подключите собственный домен через **Custom Domain** в Amvera Console

### 2. SSL сертификат

Amvera автоматически выдает SSL сертификаты для всех доменов.

### 3. Мониторинг

- Следите за логами в **Logs** на Amvera Console
- Ошибки API видны в браузере (DevTools → Console)

### 4. Обновления

Каждый раз когда вы пушите в main:

```bash
git push origin main
```

Amvera автоматически переделывает сайт.

## Решение проблем

### "Неверный логин или пароль"

Проверьте переменные `ADMIN_LOGIN` и `ADMIN_PASSWORD` в Amvera Console.

### "Leads to email не отправляются"

- Проверьте `RESEND_API_KEY` и `RESEND_FROM` в переменных окружения
- Убедитесь что домен верифицирован на Resend
- Проверьте `LEADS_TO_EMAIL`

### "GitHub token не работает"

- Убедитесь что токен не истек
- Проверьте что у токена есть права на `repo` и `contents`
- Создайте новый токен и обновите в Amvera

### API возвращает 404

Проверьте что файлы в папке `api/` имеют расширение `.ts` и структура совпадает с требуемой.

## Безопасность

⚠️ **Важно:**

- **Никогда** не коммитьте `.env` файл в GitHub
- Все пароли должны быть в переменных окружения Amvera Console
- Используйте сильные пароли для админ панели (минимум 12 символов)
- Регулярно ротируйте GitHub токены

## Поддержка

Если возникли проблемы с Amvera:
- https://docs.amvera.io
- support@amvera.io

Если проблемы с вашим кодом:
- Проверьте логи в Amvera Console
- Откройте DevTools браузера (F12) для ошибок клиента
