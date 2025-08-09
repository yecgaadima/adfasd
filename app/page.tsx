
'use client';

import { useState } from "react";

export default function Page() {
  const [ageOk, setAgeOk] = useState(false);
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {!ageOk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-sm rounded-2xl bg-neutral-900 p-6 shadow-xl">
            <h2 className="text-2xl font-semibold tracking-tight">Подтвердите возраст</h2>
            <p className="mt-2 text-sm text-neutral-300">Этот сайт содержит материалы для взрослых. Войдя, вы подтверждаете, что вам 18 лет или больше.</p>
            <div className="mt-4 flex gap-3">
              <button onClick={() => setAgeOk(true)} className="flex-1 rounded-xl px-4 py-2 font-medium shadow hover:shadow-lg transition active:scale-[0.99] bg-white text-black">Войти</button>
              <a href="https://www.google.com" className="flex-1 rounded-xl px-4 py-2 text-center font-medium shadow hover:shadow-lg transition active:scale-[0.99] bg-neutral-800 text-neutral-100">Покинуть сайт</a>
            </div>
          </div>
        </div>
      )}

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#top" className="text-lg font-semibold tracking-wide">ANAHORI SIMON</a>
        <nav className="hidden gap-6 md:flex">
          <a href="#about" className="text-sm text-neutral-300 hover:text-white">Обо мне</a>
          <a href="#gallery" className="text-sm text-neutral-300 hover:text-white">Галерея</a>
          <a href="#links" className="text-sm text-neutral-300 hover:text-white">Ссылки</a>
          <a href="#contact" className="text-sm text-neutral-300 hover:text-white">Контакты</a>
        </nav>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-6 pb-20">
        <section className="mt-6 grid items-center gap-6 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">Сайт портфолио и линк ин био</h1>
            <p className="mt-4 text-neutral-300">Чистый дизайн. Быстрая загрузка. Акценты на фото и видео. Прямые призывы к действию.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#links" className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow hover:shadow-lg active:scale-[0.99]">Открыть мои платформы</a>
              <a href="#gallery" className="rounded-2xl bg-neutral-800 px-5 py-3 text-sm font-semibold text-white shadow hover:shadow-lg active:scale-[0.99]">Смотреть превью</a>
            </div>
            <p className="mt-3 text-xs text-neutral-400">Включена страница подтверждения возраста и базовая защита от случайных переходов</p>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl bg-neutral-800 shadow-xl">
              <div className="h-full w-full bg-gradient-to-br from-neutral-700 via-neutral-900 to-black" />
            </div>
          </div>
        </section>

        <section id="about" className="mt-20">
          <h2 className="text-2xl font-semibold">Обо мне</h2>
          <p className="mt-3 max-w-3xl text-neutral-300">Татуированный модель. Делаю сольный и парный контент. Фокус на эстетике и чистой подаче. Работаю с вниманием к свету и деталям. Здесь можно быстро перейти на мои платформы и увидеть несколько безопасных превью.</p>
        </section>

        <section id="gallery" className="mt-16">
          <h2 className="text-2xl font-semibold">Галерея превью</h2>
          <p className="mt-2 text-sm text-neutral-400">Безопасные для соцсетей кадры. Замените плейсхолдеры своими изображениями</p>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-800 shadow">
                <div className="h-full w-full bg-gradient-to-br from-neutral-700 to-neutral-900" />
              </div>
            ))}
          </div>
        </section>

        <section id="links" className="mt-16">
          <h2 className="text-2xl font-semibold">Ссылки</h2>
          <div className="mt-6 grid gap-3 sm:max-w-md">
            <a href="https://fansly.com" className="flex items-center justify-between rounded-2xl bg-neutral-800 px-5 py-4 text-sm shadow hover:shadow-lg">
              <span>Fansly</span>
              <span className="text-neutral-400">Подписка и кастомы</span>
            </a>
            <a href="https://chaturbate.com" className="flex items-center justify-between rounded-2xl bg-neutral-800 px-5 py-4 text-sm shadow hover:shadow-lg">
              <span>Chaturbate</span>
              <span className="text-neutral-400">Онлайн шоу</span>
            </a>
            <a href="https://x.com" className="flex items-center justify-between rounded-2xl bg-neutral-800 px-5 py-4 text-sm shadow hover:shadow-lg">
              <span>Twitter</span>
              <span className="text-neutral-400">Лайф и анонсы</span>
            </a>
            <a href="https://allmylinks.com" className="flex items-center justify-between rounded-2xl bg-neutral-800 px-5 py-4 text-sm shadow hover:shadow-lg">
              <span>AllMyLinks</span>
              <span className="text-neutral-400">Агрегатор ссылок</span>
            </a>
          </div>
          <p className="mt-3 text-xs text-neutral-400">Подставьте свои ссылки. Можно добавить пиксели аналитики и страницу оферты</p>
        </section>

        <section id="contact" className="mt-16">
          <h2 className="text-2xl font-semibold">Контакты</h2>
          <form className="mt-6 max-w-lg space-y-3">
            <input placeholder="Имя" className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm outline-none ring-1 ring-neutral-800 focus:ring-neutral-600" />
            <input placeholder="Email или Telegram" className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm outline-none ring-1 ring-neutral-800 focus:ring-neutral-600" />
            <textarea placeholder="Сообщение" rows={4} className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm outline-none ring-1 ring-neutral-800 focus:ring-neutral-600" />
            <button type="button" className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow hover:shadow-lg active:scale-[0.99]">Отправить</button>
          </form>
          <p className="mt-3 text-xs text-neutral-400">Форма статична. По запросу подключу отправку в Telegram или на почту через API</p>
        </section>
      </main>

      <footer className="border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-6 py-8 text-xs text-neutral-500">© {new Date().getFullYear()} Anahori Simon. Все права защищены</div>
      </footer>
    </div>
  );
}
