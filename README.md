# Ballcraft

Ballcraft — Інтернет-магазин дизайнерських кавових столиків зі старих тенісних мʼячів та скла.
Next.js 14 (App Router) + Supabase. Кошик, акаунти, замовлення та повноцінна адмін-панель
(товари, динамічні категорії, замовлення, користувачі, налаштування сайту).

## Стек
- Next.js 14 + React 18 + TypeScript
- Supabase (Postgres, Auth, Storage)
- Деплой на Vercel

## Налаштування Supabase
1. Відкрий SQL Editor у своєму Supabase-проєкті і виконай `supabase-schema.sql`.
2. У розділі Storage створи публічний бакет `tct-product-images`.
3. Зареєструйся на сайті, потім признач себе адміном (див. кінець SQL-файлу).

## Змінні середовища (Vercel → Settings → Environment Variables)
```
NEXT_PUBLIC_SUPABASE_URL=...        # Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=...   # anon public key
SUPABASE_SERVICE_ROLE_KEY=...       # service_role key (для API замовлень)
```
Опційно (сповіщення на пошту про замовлення):
```
RESEND_API_KEY=...
ORDER_EMAIL_FROM=...
ORDER_EMAIL_TO=...
```

## Локальний запуск
```bash
npm install
npm run dev
```

## Деплой
Репозиторій підключено до Vercel — кожен push у `main` перевикатує сайт автоматично.
