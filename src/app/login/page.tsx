'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    setLoading(true); setMsg('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setMsg(error.message); return }
    router.push('/account')
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Вхід</h1>
      <div style={{ display: 'grid', gap: 10 }}>
        <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={loading} onClick={signIn}>{loading ? '...' : 'Увійти'}</button>
        {msg && <p style={{ color: '#c0392b', fontSize: 13 }}>{msg}</p>}
        <p className="muted" style={{ fontSize: 14 }}>Немає акаунта? <Link href="/register" style={{ fontWeight: 700, color: 'var(--accent-deep)' }}>Зареєструватись</Link></p>
        <Link href="/" className="muted" style={{ fontSize: 13 }}>← На головну</Link>
      </div>
    </div>
  )
}
