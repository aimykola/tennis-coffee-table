'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import type { Product, Category } from '@/lib/types'

const BUCKET = 'tct-product-images'

export default function Admin() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [tab, setTab] = useState<'products'|'categories'|'orders'|'users'|'settings'>('products')

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: prof } = await supabase.from('tct_profiles').select('is_admin').eq('id', user.id).single()
      setAllowed(!!prof?.is_admin); setChecking(false)
    })()
  }, [router])

  if (checking) return <p style={{ padding: 40 }}>Завантаження...</p>
  if (!allowed) return <p style={{ padding: 40 }}>Доступ лише для адміністраторів. <Link href="/" style={{ color: 'var(--accent-deep)' }}>На головну</Link></p>

  const tabs: [typeof tab, string][] = [['products','Товари'],['categories','Категорії'],['orders','Замовлення'],['users','Користувачі'],['settings','Налаштування']]
  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Адмін-панель</h1>
        <Link href="/" className="btn btn-ghost">На головну</Link>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {tabs.map(([k, label]) => <button key={k} className={'chip' + (tab === k ? ' active' : '')} onClick={() => setTab(k)}>{label}</button>)}
      </div>
      {tab === 'products' && <ProductsTab />}
      {tab === 'categories' && <CategoriesTab />}
      {tab === 'orders' && <OrdersTab />}
      {tab === 'users' && <UsersTab />}
      {tab === 'settings' && <SettingsTab />}
    </div>
  )
}

// ===================== CATEGORIES (add / edit / delete) =====================
function slugify(s: string) {
  const map: any = { а:'a',б:'b',в:'v',г:'h',ґ:'g',д:'d',е:'e',є:'ie',ж:'zh',з:'z',и:'y',і:'i',ї:'i',й:'i',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ь:'',ю:'iu',я:'ia' }
  return s.toLowerCase().trim().split('').map(c => map[c] ?? c).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || ('cat-' + Date.now())
}

function CategoriesTab() {
  const [cats, setCats] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [msg, setMsg] = useState('')

  const load = async () => {
    const { data } = await supabase.from('tct_categories').select('*').order('position')
    setCats(data || [])
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!name.trim()) return
    const pos = cats.length ? Math.max(...cats.map(c => c.position)) + 1 : 1
    const { error } = await supabase.from('tct_categories').insert({ name: name.trim(), slug: slugify(name), position: pos })
    if (error) { setMsg(error.message); return }
    setName(''); setMsg('Категорію додано'); load()
  }
  const saveEdit = async (id: string) => {
    const { error } = await supabase.from('tct_categories').update({ name: editName.trim() }).eq('id', id)
    if (error) { setMsg(error.message); return }
    setEditId(null); setMsg('Збережено'); load()
  }
  const del = async (id: string) => {
    if (!confirm('Видалити категорію? Товари цієї категорії залишаться без категорії.')) return
    const { error } = await supabase.from('tct_categories').delete().eq('id', id)
    if (error) { setMsg(error.message); return }
    setMsg('Видалено'); load()
  }

  return (
    <div>
      <div className="card" style={{ padding: 16, marginBottom: 16, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}><label className="fld">Нова категорія</label><input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Напр. Журнальний столик" /></div>
        <button className="btn btn-primary" onClick={add}>Додати</button>
      </div>
      {msg && <p style={{ fontSize: 13, color: 'var(--accent-deep)', fontWeight: 600, marginBottom: 12 }}>{msg}</p>}
      {cats.map(c => (
        <div key={c.id} className="card" style={{ padding: 14, marginBottom: 8, display: 'flex', gap: 10, alignItems: 'center' }}>
          {editId === c.id ? (
            <><input className="input" value={editName} onChange={e => setEditName(e.target.value)} style={{ flex: 1 }} /><button className="btn btn-primary" onClick={() => saveEdit(c.id)}>Зберегти</button><button className="btn btn-ghost" onClick={() => setEditId(null)}>Скасувати</button></>
          ) : (
            <><span style={{ flex: 1, fontWeight: 700 }}>{c.name}</span><span className="muted" style={{ fontSize: 12 }}>{c.slug}</span><button className="chip" onClick={() => { setEditId(c.id); setEditName(c.name) }}>Редагувати</button><button className="chip" onClick={() => del(c.id)}>Видалити</button></>
          )}
        </div>
      ))}
    </div>
  )
}

// ===================== PRODUCTS =====================
const emptyForm = { name: '', description: '', price: '', category_slug: '', discount: '', in_stock: true, images: [] as string[], size_options: [] as any[], color_options: [] as any[] }

function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [cats, setCats] = useState<Category[]>([])
  const [showArchived, setShowArchived] = useState(false)
  const [form, setForm] = useState<any>({ ...emptyForm })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [sizeL, setSizeL] = useState(''); const [sizeP, setSizeP] = useState('')
  const [colorL, setColorL] = useState('')
  const [msg, setMsg] = useState('')

  const load = async () => {
    const [{ data: cs }, { data: ps }] = await Promise.all([
      supabase.from('tct_categories').select('*').order('position'),
      supabase.from('tct_products').select('*').order('created_at', { ascending: false }),
    ])
    setCats(cs || []); setProducts((ps || []) as Product[])
  }
  useEffect(() => { load() }, [])

  const uploadImages = async (files: FileList) => {
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`
      const { error } = await supabase.storage.from(BUCKET).upload(path, file)
      if (error) { setMsg(error.message); continue }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
      urls.push(data.publicUrl)
    }
    setForm((f: any) => ({ ...f, images: [...f.images, ...urls] }))
    setUploading(false)
  }

  const save = async () => {
    if (!form.name.trim()) { setMsg('Вкажіть назву'); return }
    const payload: any = {
      name: form.name, description: form.description, price: Number(form.price) || 0,
      category_slug: form.category_slug || null, discount: Number(form.discount) || 0,
      in_stock: form.in_stock, images: form.images, image: form.images[0] || '',
      size_options: form.size_options, color_options: form.color_options,
    }
    let error
    if (editingId) { ({ error } = await supabase.from('tct_products').update(payload).eq('id', editingId)) }
    else { ({ error } = await supabase.from('tct_products').insert(payload)) }
    if (error) { setMsg(error.message); return }
    setForm({ ...emptyForm }); setEditingId(null); setMsg('Збережено'); load()
  }
  const edit = (p: Product) => {
    setEditingId(p.id)
    setForm({ name: p.name, description: p.description, price: String(p.price), category_slug: p.category_slug || '', discount: String(p.discount || ''), in_stock: p.in_stock, images: p.images || [], size_options: p.size_options || [], color_options: p.color_options || [] })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const toggleArchive = async (p: Product) => { await supabase.from('tct_products').update({ archived: !p.archived }).eq('id', p.id); load() }
  const del = async (p: Product) => { if (!confirm('Видалити товар?')) return; await supabase.from('tct_products').delete().eq('id', p.id); load() }

  const list = products.filter(p => showArchived ? p.archived : !p.archived)

  return (
    <div>
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <h3 style={{ fontWeight: 800, marginBottom: 12 }}>{editingId ? 'Редагувати товар' : 'Додати товар'}</h3>
        <div className="grid cols-2">
          <div><label className="fld">Назва</label><input className="input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
          <div><label className="fld">Категорія</label><select value={form.category_slug} onChange={e => setForm({ ...form, category_slug: e.target.value })}><option value="">— без категорії —</option>{cats.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
          <div><label className="fld">Ціна, ₴</label><input className="input" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
          <div><label className="fld">Знижка, %</label><input className="input" value={form.discount} onChange={e => setForm({ ...form, discount: e.target.value })} /></div>
        </div>
        <div style={{ marginTop: 10 }}><label className="fld">Опис</label><textarea className="input" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
        <label style={{ display: 'flex', gap: 6, alignItems: 'center', margin: '10px 0', fontSize: 14, fontWeight: 600 }}><input type="checkbox" checked={form.in_stock} onChange={e => setForm({ ...form, in_stock: e.target.checked })} />В наявності</label>
        <div><label className="fld">Зображення (можна декілька)</label><input type="file" multiple accept="image/*" onChange={e => e.target.files && uploadImages(e.target.files)} />{uploading && <span className="muted" style={{ fontSize: 13 }}> завантаження...</span>}<div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>{form.images.map((u: string, i: number) => <div key={i} style={{ position: 'relative' }}><img src={u} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} /><button onClick={() => setForm({ ...form, images: form.images.filter((_: any, k: number) => k !== i) })} style={{ position: 'absolute', top: -6, right: -6, background: '#1c1e18', color: '#fff', border: 'none', borderRadius: '50%', width: 18, height: 18, fontSize: 11 }}>✕</button></div>)}</div></div>
        <div className="grid cols-2" style={{ marginTop: 12 }}>
          <div><label className="fld">Розміри з цінами</label><div style={{ display: 'flex', gap: 6 }}><input className="input" placeholder="Розмір" value={sizeL} onChange={e => setSizeL(e.target.value)} /><input className="input" style={{ width: 80 }} placeholder="Ціна" value={sizeP} onChange={e => setSizeP(e.target.value)} /><button className="chip" onClick={() => { if (sizeL) { setForm({ ...form, size_options: [...form.size_options, { label: sizeL, price: Number(sizeP) || 0 }] }); setSizeL(''); setSizeP('') } }}>+</button></div><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>{form.size_options.map((s: any, i: number) => <span key={i} className="chip" onClick={() => setForm({ ...form, size_options: form.size_options.filter((_: any, k: number) => k !== i) })}>{s.label} ✕</span>)}</div></div>
          <div><label className="fld">Кольори</label><div style={{ display: 'flex', gap: 6 }}><input className="input" placeholder="Колір" value={colorL} onChange={e => setColorL(e.target.value)} /><button className="chip" onClick={() => { if (colorL) { setForm({ ...form, color_options: [...form.color_options, { label: colorL, image: '' }] }); setColorL('') } }}>+</button></div><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>{form.color_options.map((c: any, i: number) => <span key={i} className="chip" onClick={() => setForm({ ...form, color_options: form.color_options.filter((_: any, k: number) => k !== i) })}>{c.label} ✕</span>)}</div></div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}><button className="btn btn-primary" onClick={save}>{editingId ? 'Зберегти' : 'Додати товар'}</button>{editingId && <button className="btn btn-ghost" onClick={() => { setForm({ ...emptyForm }); setEditingId(null) }}>Скасувати</button>}</div>
        {msg && <p style={{ fontSize: 13, color: 'var(--accent-deep)', fontWeight: 600, marginTop: 8 }}>{msg}</p>}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}><button className={'chip' + (!showArchived ? ' active' : '')} onClick={() => setShowArchived(false)}>Активні</button><button className={'chip' + (showArchived ? ' active' : '')} onClick={() => setShowArchived(true)}>Архів</button></div>
      {list.map(p => (
        <div key={p.id} className="card" style={{ padding: 12, marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 50, height: 50, borderRadius: 8, background: 'var(--bg-soft)', overflow: 'hidden', flexShrink: 0 }}>{p.image && <img src={p.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}</div>
          <div style={{ flex: 1 }}><b>{p.name}</b><div className="muted" style={{ fontSize: 12 }}>{p.price} ₴ · {cats.find(c => c.slug === p.category_slug)?.name || 'без категорії'}{Number(p.discount) > 0 ? ` · -${p.discount}%` : ''}</div></div>
          <button className="chip" onClick={() => edit(p)}>Редагувати</button>
          <button className="chip" onClick={() => toggleArchive(p)}>{p.archived ? 'З архіву' : 'В архів'}</button>
          <button className="chip" onClick={() => del(p)}>Видалити</button>
        </div>
      ))}
    </div>
  )
}

// ===================== ORDERS =====================
function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([])
  const [showArchived, setShowArchived] = useState(false)
  const load = async () => { const { data } = await supabase.from('tct_orders').select('*').order('created_at', { ascending: false }); setOrders(data || []) }
  useEffect(() => { load() }, [])
  const archive = async (o: any) => { await supabase.from('tct_orders').update({ archived: !o.archived }).eq('id', o.id); load() }
  const setStatus = async (o: any, status: string) => { await supabase.from('tct_orders').update({ status }).eq('id', o.id); load() }
  const list = orders.filter(o => showArchived ? o.archived : !o.archived)
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}><button className={'chip' + (!showArchived ? ' active' : '')} onClick={() => setShowArchived(false)}>Активні</button><button className={'chip' + (showArchived ? ' active' : '')} onClick={() => setShowArchived(true)}>Архів</button></div>
      {list.length === 0 ? <p className="muted">Замовлень поки немає</p> : list.map(o => (
        <div key={o.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}><b>{o.customer_name}</b><span className="muted" style={{ fontSize: 13 }}>{new Date(o.created_at).toLocaleString('uk')}</span></div>
          <div className="muted" style={{ fontSize: 14 }}>{o.customer_phone} · {o.customer_email}</div>
          <div style={{ fontSize: 14, margin: '6px 0' }}>{(o.items || []).map((i: any, k: number) => <div key={k}>{i.name} ×{i.qty} — {i.price} ₴</div>)}</div>
          <div className="muted" style={{ fontSize: 13 }}>{o.delivery} · {o.payment_method}{o.comment ? ' · ' + o.comment : ''}</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10 }}><b style={{ marginRight: 'auto' }}>{o.total} ₴</b><select value={o.status} onChange={e => setStatus(o, e.target.value)} style={{ width: 150 }}><option value="new">Нове</option><option value="processing">В обробці</option><option value="done">Виконано</option><option value="canceled">Скасовано</option></select><button className="chip" onClick={() => archive(o)}>{o.archived ? 'З архіву' : 'В архів'}</button></div>
        </div>
      ))}
    </div>
  )
}

// ===================== USERS =====================
function UsersTab() {
  const [users, setUsers] = useState<any[]>([])
  const load = async () => { const { data } = await supabase.from('tct_profiles').select('*').order('created_at', { ascending: false }); setUsers(data || []) }
  useEffect(() => { load() }, [])
  const toggleAdmin = async (u: any) => { await supabase.from('tct_profiles').update({ is_admin: !u.is_admin }).eq('id', u.id); load() }
  const setDiscount = async (u: any, d: string) => { await supabase.from('tct_profiles').update({ discount: Number(d) || 0 }).eq('id', u.id); load() }
  return (
    <div>
      {users.map(u => (
        <div key={u.id} className="card" style={{ padding: 14, marginBottom: 8, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 150 }}><b>{u.full_name || '—'}</b><div className="muted" style={{ fontSize: 12 }}>{u.phone}</div></div>
          <div><label className="fld">Знижка %</label><input className="input" style={{ width: 80 }} defaultValue={u.discount} onBlur={e => setDiscount(u, e.target.value)} /></div>
          <span className="chip" style={{ background: u.is_admin ? 'var(--accent)' : undefined }}>{u.is_admin ? 'Адмін' : 'Користувач'}</span>
          <button className="chip" onClick={() => toggleAdmin(u)}>{u.is_admin ? 'Зняти адміна' : 'Зробити адміном'}</button>
        </div>
      ))}
    </div>
  )
}

// ===================== SETTINGS =====================
function SettingsTab() {
  const [s, setS] = useState<any>({})
  const [msg, setMsg] = useState('')
  useEffect(() => { supabase.from('tct_site_settings').select('*').then(({ data }) => { const m: any = {}; (data || []).forEach((r: any) => m[r.key] = r.value); setS(m) }) }, [])
  const save = async () => {
    const rows = Object.entries(s).map(([key, value]) => ({ key, value: value as string }))
    const { error } = await supabase.from('tct_site_settings').upsert(rows)
    setMsg(error ? error.message : 'Збережено')
  }
  const field = (key: string, label: string) => (
    <div style={{ marginBottom: 10 }}><label className="fld">{label}</label><input className="input" value={s[key] || ''} onChange={e => setS({ ...s, [key]: e.target.value })} /></div>
  )
  return (
    <div className="card" style={{ padding: 20 }}>
      {field('hero_title', 'Заголовок (hero)')}
      {field('hero_subtitle', 'Опис (hero)')}
      {field('phone', 'Телефон')}
      {field('email', 'Email')}
      {field('viber', 'Viber (номер або посилання)')}
      {field('telegram', 'Telegram (посилання або @username)')}
      {field('instagram_url', 'Посилання Instagram')}
      {field('instagram_label', 'Підпис кнопки Instagram')}
      {field('facebook', 'Facebook (посилання)')}
      {field('tiktok', 'TikTok (посилання)')}
      <button className="btn btn-primary" onClick={save}>Зберегти</button>
      {msg && <p style={{ fontSize: 13, color: 'var(--accent-deep)', fontWeight: 600, marginTop: 8 }}>{msg}</p>}
    </div>
  )
}
