# Локальная разработка админ панели

## Предварительная установка

### 1. Установите Node.js

Минимум версия 18 LTS:
- https://nodejs.org/

### 2. Установите зависимости

```bash
npm install
```

### 3. Создайте GitHub PAT токен

Даже для локальной разработки нужен GitHub токен:

1. https://github.com/settings/tokens
2. Создайте **New classic token** с правами `repo`
3. Скопируйте токен

### 4. Создайте ветку `content`

```bash
git checkout -b content
git push origin content
```

## Настройка .env файла

Создайте файл `.env` в корне проекта (скопируйте из `.env.example`):

```bash
cp .env.example .env
```

Отредактируйте `.env`:

```
# Admin panel
ADMIN_LOGIN=admin
ADMIN_PASSWORD=password123
ADMIN_SESSION_SECRET=very_long_random_string_at_least_32_chars

# GitHub
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
GITHUB_TOKEN=ghp_your_token_here
GITHUB_CONTENT_BRANCH=content

# Email (опционально)
RESEND_API_KEY=
RESEND_FROM=
LEADS_TO_EMAIL=
```

### Генерирование ADMIN_SESSION_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Запуск локально

### Вариант 1: Через Vite dev сервер

```bash
npm run dev
```

Откройте http://localhost:5173

**Важно:** API функции не будут работать в dev режиме!

### Вариант 2: Через Vercel Functions локально (рекомендуется)

Установите Vercel CLI:

```bash
npm install -g vercel
```

Запустите:

```bash
vercel dev
```

Откройте http://localhost:3000

Это запустит как фронтенд, так и API функции.

## Первый вход

1. Перейдите на http://localhost:3000/admin/login (или 5173)
2. Введите логин/пароль из `.env`
3. Вы попадете в админ панель

## Структура проекта

```
src/
├── app/
│   ├── pages/
│   │   ├── admin/           # Админ страницы (React компоненты)
│   │   │   ├── AdminLoginPage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminServicesPage.tsx
│   │   │   ├── AdminEmployeesPage.tsx
│   │   │   ├── AdminLeadsPage.tsx
│   │   │   └── ...
│   │   └── Layout.tsx       # Публичный сайт
│   ├── lib/
│   │   ├── adminApi.ts      # Клиентский API для админ панели
│   │   └── api/
│   │       └── types.ts     # TypeScript типы
│   └── data/
│       └── aboutDefaults.ts # Стандартные данные
├── styles/
└── main.tsx

api/
├── admin/[...path].ts       # API для админ панели (авторизация, CRUD)
├── lead.ts                  # API для обработки заявок
├── content.ts               # API для получения публичного контента
└── _lib/
    ├── adminAuth.ts         # Система авторизации
    ├── contentStore.ts      # Управление контентом
    └── githubContent.ts     # GitHub интеграция
```

## Разработка новой функции в админ панели

### 1. Добавьте новый тип контента

Отредактируйте `api/_lib/contentStore.ts`:

```typescript
type ContentMap = {
  // ... existing types
  my_new_content: MyNewContentRow[];  // Добавьте новый тип
};

const paths: Record<keyof ContentMap, string> = {
  // ... existing paths
  my_new_content: "content/my_new_content.json",  // Добавьте путь
};

const defaults: ContentMap = {
  // ... existing defaults
  my_new_content: [],  // Добавьте значение по умолчанию
};
```

### 2. Создайте React компонент админ страницы

Создайте файл `src/app/pages/admin/AdminMyNewContentPage.tsx`:

```typescript
import { useEffect, useState } from "react";
import { listAdminRows } from "../../lib/adminApi";
import type { MyNewContentRow } from "../../lib/api/types";

export function AdminMyNewContentPage() {
  const [rows, setRows] = useState<MyNewContentRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void listAdminRows("my_new_content")
      .then(setRows)
      .catch(e => setError(e.message));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-950">Мой контент</h1>
      {error && <div className="bg-red-50 border border-red-200 p-4">{error}</div>}
      {/* Your UI here */}
    </div>
  );
}
```

### 3. Добавьте маршрут

Отредактируйте `src/app/router.tsx`:

```typescript
import { AdminMyNewContentPage } from "./pages/admin/AdminMyNewContentPage";

export const router = createBrowserRouter([
  // ... existing routes
  {
    path: "/admin/my-content",
    element: <AdminMyNewContentPage />,
  },
]);
```

### 4. Добавьте ссылку в меню

Отредактируйте `src/app/pages/admin/AdminDashboard.tsx`:

```tsx
<Link to="/admin/my-content" className="...">
  <p className="...">Мой контент</p>
</Link>
```

## Тестирование

### Юнит тесты

```bash
npm run test
```

### Построение продакшена

```bash
npm run build
```

Будет создана папка `dist/` с готовым сайтом.

## Отладка

### Отладка API функций

1. В Vercel CLI логи API видны в консоли
2. Используйте `console.log()` в `api/` файлах
3. В браузере откройте DevTools (F12) → Network → отправьте запрос

### Отладка React компонентов

1. Установите **React DevTools** для браузера
2. Откройте DevTools (F12) → Components tab
3. Проинспектируйте компоненты

## Публикация изменений

### На GitHub

```bash
git add .
git commit -m "feat: добавил новую функцию"
git push origin main
```

### Если изменили контент через админ панель

Контент автоматически коммитится в ветку `content`:

```bash
git log content  # посмотрите историю изменений контента
```

## Частые проблемы

### "Cannot find module 'api'"

Убедитесь что запущен `vercel dev`, а не `npm run dev`.

### "GitHub token invalid"

- Проверьте `GITHUB_TOKEN` в `.env`
- Токен не должен быть истекшим
- Создайте новый токен с правами `repo`

### Ошибки при сохранении контента

- Проверьте права доступа GitHub токена
- Убедитесь что ветка `content` существует
- Посмотрите логи в консоли Vercel

### "Unauthorized" при входе

- Проверьте логин/пароль из `.env`
- Убедитесь что `ADMIN_SESSION_SECRET` установлен
- Очистите куки браузера (F12 → Application → Cookies)

## Полезные ссылки

- [Vite документация](https://vitejs.dev/)
- [React документация](https://react.dev/)
- [TypeScript документация](https://www.typescriptlang.org/)
- [GitHub API](https://docs.github.com/en/rest)
- [Vercel Functions](https://vercel.com/docs/functions/quickstart)
