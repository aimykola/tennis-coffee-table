'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function Register() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '', full_name: '', phone: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const signUp = async () => {
    setLoading(true); setMsg('')
    const { error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.full_name, phone: form.phone } },
    })
    setLoading(false)
    if (error) { setMsg(error.message); return }
    setMsg('Готово! Перевірте пошту для підтвердження, потім увійдіть.')
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Реєстрація</h1>
      <div style={{ display: 'grid', gap: 10 }}>
        <input className="input" placeholder="Імʼя" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} />
        <input className="input" placeholder="Телефон" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Пароль" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={loading} onClick={signUp}>{loading ? '...' : 'Створити акаунт'}</button>
        {msg && <p style={{ fontSize: 13, color: 'var(--accent-deep)', fontWeight: 600 }}>{msg}</p>}
        <p className="muted" style={{ fontSize: 14 }}>Вже маєте акаунт? <Link href="/login" style={{ fontWeight: 700, color: 'var(--accent-deep)' }}>Увійти</Link></p>
        <Link href="/" className="muted" style={{ fontSize: 13 }}>← На головну</Link>
      </div>
    </div>
  )
}
