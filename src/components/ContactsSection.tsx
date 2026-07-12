'use client'
import { useState } from 'react'
import { useLang } from '@/components/LanguageContext'

export default function Contacts() {
  const { t } = useLang()
  const [f, setF] = useState({ name: '', phone: '', msg: '' })
  const [sent, setSent] = useState(false)
  return (
    <section id="contacts" className="section">
      <div className="container grid cols-2" style={{ alignItems: 'start' }}>
        <div>
          <span className="eyebrow">{t('contacts_title')}</span>
          <h2 className="h2">{t('contacts_eyebrow')}</h2>
          <p className="lead">{t('contacts_sub')}</p>
        </div>
        <div className="card" style={{ padding: 24 }}>
          {sent ? <p style={{ fontWeight: 700 }}>{t('contacts_thanks')}</p> : (
            <div style={{ display: 'grid', gap: 10 }}>
              <div><label className="fld">{t('c_name')}</label><input className="input" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} /></div>
              <div><label className="fld">{t('c_phone')}</label><input className="input" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} /></div>
              <div><label className="fld">{t('c_message')}</label><textarea className="input" rows={3} value={f.msg} onChange={e => setF({ ...f, msg: e.target.value })} /></div>
              <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setSent(true)}>{t('c_send')}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
