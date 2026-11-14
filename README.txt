
Быстрый деплой на Vercel бесплатно
1. Создай аккаунт на vercel.com и залогинься
2. Нажми New Project затем Import и перетащи эту папку как ZIP
3. Vercel сам определит Next.js, просто подтверди Deploy
4. Через ~1 минуту у тебя будет https://xxxx.vercel.app — можно привязать свой домен

Локальный запуск
1. Установи Node.js LTS
2. В папке проекта: npm install
3. Запусти: npm run dev и открой http://localhost:3000

Где менять контент
app/page.tsx — весь интерфейс
app/layout.tsx — метаданные и шрифты
app/globals.css — стили Tailwind

Tailwind уже подключен. 


Чат для багов и идей (расширение Telegram)
Страница: /chat (без входа). API: /api/messages
Без настройки сообщения хранятся в памяти сервера (на Vercel могут пропадать).
Для постоянного хранения: на Vercel добавь Upstash Redis (Storage → Marketplace)
и переменные UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN.
