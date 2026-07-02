import { useState, useEffect, useRef } from 'react'

/* ---------- Demo data (тексти-заглушки) ---------- */
const PRODUCTS = [
  {
    id: 'ace',
    name: 'Ace',
    tag: 'Бестселер',
    eco: true,
    balls: 84,
    price: 7900,
    desc: 'Кругла стільниця зі загартованого скла та основа з вісімдесяти чотирьох м’ячів.',
    hue: '#c8e04f'
  },
  {
    id: 'lob',
    name: 'Lob',
    tag: 'Новинка',
    eco: true,
    balls: 120,
    price: 10500,
    desc: 'Прямокутна модель для вітальні — більша площа та низький силует.',
    hue: '#d7e86f'
  },
  {
    id: 'volley',
    name: 'Volley',
    tag: 'Compact',
    eco: true,
    balls: 56,
    price: 5400,
    desc: 'Компактний приліжковий столик для малих просторів та кави надворі.',
    hue: '#bfd94a'
  },
  {
    id: 'baseline',
    name: 'Baseline',
    tag: 'Signature',
    eco: true,
    balls: 160,
    price: 13800,
    desc: 'Флагманська модель із глибокою текстурою та масивною скляною стільницею.',
    hue: '#cfe25a'
  },
  {
    id: 'spin',
    name: 'Spin',
    tag: 'Лімітована',
    eco: true,
    balls: 72,
    price: 8600,
    desc: 'Овальна форма зі змішаними відтінками м’ячів та латунними ніжками.',
    hue: '#c2dc4f'
  },
  {
    id: 'setpoint',
    name: 'Set Point',
    tag: 'Premium',
    eco: true,
    balls: 200,
    price: 17200,
    desc: 'Великий акцентний стіл для лаунжів та галерей — двісті м’ячів у основі.',
    hue: '#d4e866'
  }
]

/* ---------- Плейсхолдер фото: SVG-ілюстрація столика ---------- */
function TableArt({ hue = '#c8e04f', seed = 0 }) {
  const rows = 4
  const cols = 5
  const balls = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 60 + c * 70 + (r % 2) * 12
      const y = 150 + r * 46
      const jitter = ((seed + r * 7 + c * 13) % 5) - 2
      balls.push(
        <g key={r + '-' + c}>
          <circle cx={x} cy={y + jitter} r={26} fill={hue} opacity={0.92} />
          <path d={'M' + (x - 24) + ' ' + (y + jitter) + ' q 24 -22 48 0'} stroke="#ffffff" strokeWidth={2} fill="none" opacity={0.85} />
          <path d={'M' + (x - 24) + ' ' + (y + jitter) + ' q 24 22 48 0'} stroke="#ffffff" strokeWidth={2} fill="none" opacity={0.85} />
        </g>
      )
    }
  }
  return (
    <svg viewBox="0 0 460 460" role="img" aria-label="Кавовий столик із тенісних м’ячів">
      <rect width="460" height="460" fill="#fbfcfa" />
      <ellipse cx="230" cy="120" rx="170" ry="40" fill="#ffffff" stroke="#e8e8e8" />
      <ellipse cx="230" cy="120" rx="170" ry="40" fill="url(#glass)" opacity="0.5" />
      <rect x="56" y="120" width="348" height="200" fill="#fbfcfa" />
      {balls}
      <ellipse cx="230" cy="320" rx="170" ry="40" fill="#f2f3ef" stroke="#e8e8e8" />
      <rect x="96" y="320" width="8" height="70" fill="#d7d9d2" />
      <rect x="356" y="320" width="8" height="70" fill="#d7d9d2" />
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#eef0ea" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function EcoArt() {
  return (
    <svg viewBox="0 0 520 420" role="img" aria-label="Переробка тенісних м’ячів">
      <rect width="520" height="420" fill="#ffffff" />
      <circle cx="260" cy="210" r="150" fill="#f5f7f0" />
      {[0,1,2,3,4,5,6].map(i => {
        const a = (i / 7) * Math.PI * 2
        const x = 260 + Math.cos(a) * 96
        const y = 210 + Math.sin(a) * 96
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={30} fill="#c8e04f" opacity={0.9} />
            <path d={'M' + (x-28) + ' ' + y + ' q 28 -26 56 0'} stroke="#fff" strokeWidth={2.5} fill="none" />
          </g>
        )
      })}
      <circle cx="260" cy="210" r="46" fill="#ffffff" stroke="#e5e5e5" />
      <path d="M244 210 l10 10 l20 -22" stroke="#b6d13a" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const fmt = (n) => n.toLocaleString('uk-UA')

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', model: 'Ace', message: '' })

  /* reveal on scroll */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const orderModel = (name) => {
    setForm((f) => ({ ...f, model: name }))
    setSent(false)
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
  }

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const nav = (id) => (e) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ---------- Header ---------- */}
      <header className="site-header">
        <div className="container">
          <nav className={'nav' + (menuOpen ? ' open' : '')}>
            <a className="brand" href="#top" onClick={nav('top')}>
              <span className="brand-dot" />
              <span>Tennis Coffee Table<small>eco design studio</small></span>
            </a>
            <ul className="nav-links">
              <li><a href="#catalog" onClick={nav('catalog')}>Каталог</a></li>
              <li><a href="#about" onClick={nav('about')}>Про нас</a></li>
              <li><a href="#order" onClick={nav('order')}>Контакти</a></li>
            </ul>
            <a className="nav-cta" href="#order" onClick={nav('order')}>Замовити</a>
            <button className="nav-toggle" aria-label="Меню" onClick={() => setMenuOpen((v) => !v)}>
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="reveal in">
              <span className="eyebrow"><span className="accent-line" />&nbsp;&nbsp;екодизайн • ручна робота</span>
              <h1 className="hero-title">Кавові столики зі <em>старих м’ячів</em> та скла</h1>
              <p className="hero-sub">Ми перетворюємо відпрацьовані тенісні м’ячі на скульптурні кавові столики зі скляною стільницею. Мінімалізм, чиста геометрія та друге життя матеріалів.</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#catalog" onClick={nav('catalog')}>Переглянути каталог &rarr;</a>
                <a className="btn btn-ghost" href="#about" onClick={nav('about')}>Наша історія</a>
              </div>
              <div className="hero-stats">
                <div><div className="num">12&nbsp;000+</div><div className="lbl">м’ячів перероблено</div></div>
                <div><div className="num">100%</div><div className="lbl">ручна збірка</div></div>
                <div><div className="num">6</div><div className="lbl">моделей у колекції</div></div>
              </div>
            </div>
            <div className="hero-visual reveal in">
              <div className="hero-card">
                <TableArt hue="#c8e04f" seed={3} />
                <div className="hero-badge"><span className="dot" />100% перероблені матеріали</div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Catalog ---------- */}
        <section id="catalog" className="catalog section-pad">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow"><span className="accent-line" />&nbsp;&nbsp;каталог</span>
              <h2>Колекція столиків</h2>
              <p>Кожен стіл виготовлено вручну та є унікальним. Ціни та фото — демонстраційні плейсхолдери.</p>
            </div>
            <div className="grid">
              {PRODUCTS.map((p, i) => (
                <article className="card reveal" key={p.id} style={{ transitionDelay: (i % 3) * 60 + 'ms' }}>
                  <div className="card-media">
                    <span className={'card-tag' + (p.eco ? ' eco' : '')}>{p.tag}</span>
                    <TableArt hue={p.hue} seed={i + 1} />
                  </div>
                  <div className="card-body">
                    <h3>{p.name}</h3>
                    <p className="desc">{p.desc}</p>
                    <div className="card-meta">
                      <span className="price">{fmt(p.price)} <small>грн</small></span>
                      <span className="lbl" style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>{p.balls} м’ячів</span>
                    </div>
                    <button className="card-btn buy" onClick={() => orderModel(p.name)}>Замовити &rarr;</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="about section-pad">
          <div className="container about-grid">
            <div className="about-visual reveal"><EcoArt /></div>
            <div className="reveal">
              <span className="eyebrow"><span className="accent-line" />&nbsp;&nbsp;про нас</span>
              <h2>Друге життя тенісного м’яча</h2>
              <p>Щороку мільйони тенісних м’ячів опиняються на звалищах і розкладаються сотні років. Ми збираємо їх на кортах та в клубах, очищаємо та даємо їм нову роль — стати частиною інтер’єру.</p>
              <p>Це текст-заглушка про бренд: мінімалізм, екологічність та повага до матеріалу. Кожен стіл — це десятки врятованих м’ячів та години ручної праці.</p>
              <div className="about-points">
                <div className="about-point"><div className="ic"><span /></div><div><b>Екологічність</b><p>Зменшуємо кількість відходів та продовжуємо продуктовий цикл.</p></div></div>
                <div className="about-point"><div className="ic"><span /></div><div><b>Ручна робота</b><p>Кожна модель збирається вручну у нашій майстерні.</p></div></div>
                <div className="about-point"><div className="ic"><span /></div><div><b>Міцне скло</b><p>Загартована стільниця витримує щоденне використання.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Order / Contact ---------- */}
        <section id="order" className="order section-pad">
          <div className="container order-grid">
            <div className="order-aside reveal">
              <span className="eyebrow"><span className="accent-line" />&nbsp;&nbsp;замовлення</span>
              <h2>Замовте свій стіл</h2>
              <p>Залиште заявку — ми зв’яжемося протягом доби, уточнимо деталі та терміни виготовлення.</p>
              <div className="contact-list">
                <div className="contact-item"><span className="k">Email</span><a href="mailto:hello@tenniscoffee.example">hello@tenniscoffee.example</a></div>
                <div className="contact-item"><span className="k">Телефон</span><a href="tel:+380000000000">+38 (000) 000 00 00</a></div>
                <div className="contact-item"><span className="k">Майстерня</span><span>м. Київ • за попереднім записом</span></div>
              </div>
            </div>
            <form className="form reveal" onSubmit={submit}>
              <div className="form-row two">
                <div className="form-row" style={{ margin: 0 }}>
                  <label htmlFor="f-name">Ім’я</label>
                  <input id="f-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ваше ім’я" />
                </div>
                <div className="form-row" style={{ margin: 0 }}>
                  <label htmlFor="f-email">Email</label>
                  <input id="f-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
                </div>
              </div>
              <div className="form-row">
                <label htmlFor="f-model">Модель</label>
                <select id="f-model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })}>
                  {PRODUCTS.map((p) => <option key={p.id} value={p.name}>{p.name} — {fmt(p.price)} грн</option>)}
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="f-msg">Коментар</label>
                <textarea id="f-msg" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Побажання щодо кольору, розміру тощо" />
              </div>
              <button type="submit" className="btn btn-primary">Надіслати заявку</button>
              {sent && <div className="form-success">Дякуємо! Заявку на модель «{form.model}» отримано (демо).</div>}
              <p className="form-note">Це демо-форма: дані не надсилаються на сервер.</p>
            </form>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a className="brand" href="#top" onClick={nav('top')}>
                <span className="brand-dot" />
                <span style={{ color: '#fff' }}>Tennis Coffee Table<small>eco design studio</small></span>
              </a>
              <p>Дизайнерські кавові столики із перероблених тенісних м’ячів та скла.</p>
            </div>
            <div className="footer-col">
              <h4>Навігація</h4>
              <a href="#catalog" onClick={nav('catalog')}>Каталог</a>
              <a href="#about" onClick={nav('about')}>Про нас</a>
              <a href="#order" onClick={nav('order')}>Контакти</a>
            </div>
            <div className="footer-col">
              <h4>Контакти</h4>
              <a href="mailto:hello@tenniscoffee.example">hello@tenniscoffee.example</a>
              <a href="tel:+380000000000">+38 (000) 000 00 00</a>
              <div className="socials">
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="Facebook">FB</a>
                <a href="#" aria-label="Pinterest">Pin</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Tennis Coffee Table. Демо-проєкт.</span>
            <span>Зроблено з перероблених матеріалів • React + Vite</span>
          </div>
        </div>
      </footer>
    </>
  )
}

