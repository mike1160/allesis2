'use client'

import { useState } from 'react'
import Link from 'next/link'
import TurnstileWidget from '@/components/forms/TurnstileWidget'
import { PRIVACY_CONSENT_ERROR } from '@/lib/form-consent'
import type { Lang } from '@/lib/translations'

const VERIFY_SERVER = 'Verificatie mislukt. Probeer het opnieuw.'
const VERIFY_CLIENT = 'Verificatie mislukt. Vernieuw de pagina en probeer opnieuw.'

const L = {
  title: {
    th: 'ส่งข้อความถึงเรา',
    en: 'Send us a message',
    nl: 'Stuur ons een bericht',
    ru: 'Напишите нам',
    de: 'Schreiben Sie uns',
  },
  sub: {
    th: 'กรอกแบบฟอร์ม — เราตอบกลับภายใน 1 วันทำการ',
    en: 'Fill in the form — we reply within 1 business day',
    nl: 'Vul het formulier in — reactie binnen 1 werkdag',
    ru: 'Заполните форму — ответ в течение 1 рабочего дня',
    de: 'Formular ausfüllen — Antwort innerhalb 1 Werktages',
  },
  name: { th: 'ชื่อ *', en: 'Name *', nl: 'Naam *', ru: 'Имя *', de: 'Name *' },
  name_ph: { th: 'ชื่อของคุณ', en: 'Your name', nl: 'Uw naam', ru: 'Ваше имя', de: 'Ihr Name' },
  email: { th: 'อีเมล *', en: 'Email *', nl: 'E-mail *', ru: 'Эл. почта *', de: 'E-Mail *' },
  email_ph: { th: 'you@email.com', en: 'you@email.com', nl: 'u@email.com', ru: 'you@email.com', de: 'you@email.com' },
  phone: { th: 'โทรศัพท์ / LINE', en: 'Phone / LINE', nl: 'Telefoon / LINE', ru: 'Телефон / LINE', de: 'Telefon / LINE' },
  phone_ph: { th: '08x-xxx-xxxx หรือ LINE ID', en: 'Phone or LINE ID', nl: 'Telefoon of LINE ID', ru: 'Телефон или LINE ID', de: 'Telefon oder LINE ID' },
  subject: { th: 'หัวข้อ', en: 'Subject', nl: 'Onderwerp', ru: 'Тема', de: 'Betreff' },
  subject_ph: {
    th: 'เช่น ต้องการเว็บไซต์ร้านอาหาร',
    en: 'e.g. Restaurant website',
    nl: 'bijv. Website restaurant',
    ru: 'напр. сайт ресторана',
    de: 'z.B. Restaurant-Website',
  },
  message: { th: 'ข้อความ *', en: 'Message *', nl: 'Bericht *', ru: 'Сообщение *', de: 'Nachricht *' },
  message_ph: {
    th: 'เล่าธุรกิจของคุณและสิ่งที่ต้องการ...',
    en: 'Tell us about your business and what you need...',
    nl: 'Vertel over uw bedrijf en wat u nodig heeft...',
    ru: 'Расскажите о бизнесе и что вам нужно...',
    de: 'Erzählen Sie von Ihrem Unternehmen...',
  },
  privacy: {
    th: 'ฉันยอมรับการประมวลผลข้อมูลตาม',
    en: 'I agree to data processing per the',
    nl: 'Ik ga akkoord met verwerking volgens de',
    ru: 'Я согласен с обработкой данных по',
    de: 'Ich stimme der Datenverarbeitung gemäß',
  },
  privacy_link: {
    th: 'นโยบายความเป็นส่วนตัว',
    en: 'privacy policy',
    nl: 'privacyverklaring',
    ru: 'политике конфиденциальности',
    de: 'Datenschutzerklärung',
  },
  newsletter: {
    th: 'ฉันต้องการรับข่าวสารจาก Allesis',
    en: 'I want to receive Allesis updates',
    nl: 'Ik wil updates van Allesis ontvangen',
    ru: 'Хочу получать новости Allesis',
    de: 'Ich möchte Updates von Allesis erhalten',
  },
  submit: { th: 'ส่งข้อความ →', en: 'Send message →', nl: 'Bericht versturen →', ru: 'Отправить →', de: 'Nachricht senden →' },
  submitting: { th: 'กำลังส่ง...', en: 'Sending...', nl: 'Verzenden...', ru: 'Отправка...', de: 'Senden...' },
  verifying: {
    th: 'กำลังตรวจสอบ...',
    en: 'Verifying...',
    nl: 'Bezig met verificatie...',
    ru: 'Проверка...',
    de: 'Wird geprüft...',
  },
  required: {
    th: '* ช่องที่จำเป็น',
    en: '* Required fields',
    nl: '* Verplichte velden',
    ru: '* Обязательные поля',
    de: '* Pflichtfelder',
  },
  success_h: {
    th: 'ส่งข้อความแล้ว!',
    en: 'Message sent!',
    nl: 'Bericht verzonden!',
    ru: 'Сообщение отправлено!',
    de: 'Nachricht gesendet!',
  },
  success_p: {
    th: 'ขอบคุณครับ/ค่ะ เราจะตอบกลับภายใน 1 วันทำการ',
    en: 'Thank you. We will reply within 1 business day.',
    nl: 'Bedankt. Wij reageren binnen 1 werkdag.',
    ru: 'Спасибо. Ответим в течение 1 рабочего дня.',
    de: 'Danke. Wir antworten innerhalb 1 Werktages.',
  },
  error_generic: {
    th: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
    en: 'Something went wrong. Please try again.',
    nl: 'Er ging iets mis. Probeer het opnieuw.',
    ru: 'Что-то пошло не так. Попробуйте снова.',
    de: 'Etwas ist schiefgelaufen. Bitte erneut versuchen.',
  },
} as const

export default function ThaiContactForm({ lang }: { lang: Lang }) {
  const [form, setForm] = useState({ naam: '', email: '', onderwerp: '', bericht: '', telefoon: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [nieuwsbrief, setNieuwsbrief] = useState(false)
  const [privacyError, setPrivacyError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!privacyAccepted) {
      setPrivacyError(true)
      return
    }
    if (!turnstileToken) return
    setLoading(true)
    setError('')

    try {
      const onderwerp = [form.onderwerp, form.telefoon ? `Tel/LINE: ${form.telefoon}` : '']
        .filter(Boolean)
        .join(' · ')
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          turnstileToken,
          privacyAccepted: true,
          nieuwsbrief,
          naam: form.naam,
          email: form.email,
          onderwerp: onderwerp || `Phuket /th contact (${lang})`,
          bericht: form.bericht,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setTurnstileToken(null)
        if (data.error === PRIVACY_CONSENT_ERROR) {
          setPrivacyError(true)
          setError('')
        } else {
          setError(data.error === VERIFY_SERVER ? VERIFY_CLIENT : data.error || L.error_generic[lang])
        }
        return
      }
      setSuccess(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : L.error_generic[lang])
    } finally {
      setLoading(false)
    }
  }

  const submitDisabled = loading || !turnstileToken
  const submitLabel = loading
    ? L.submitting[lang]
    : !turnstileToken
      ? L.verifying[lang]
      : L.submit[lang]

  if (success) {
    return (
      <div className="rounded-3xl border border-green-200 bg-white p-10 text-center shadow-sm">
        <div className="mb-4 text-5xl">✅</div>
        <h3 className="mb-2 text-2xl font-black text-zinc-900">{L.success_h[lang]}</h3>
        <p className="text-zinc-500">{L.success_p[lang]}</p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-amber-500">{L.title[lang]}</p>
      <p className="mb-8 text-center text-zinc-500">{L.sub[lang]}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-zinc-700">{L.name[lang]}</label>
            <input
              type="text"
              required
              value={form.naam}
              onChange={(e) => setForm({ ...form, naam: e.target.value })}
              placeholder={L.name_ph[lang]}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-zinc-700">{L.email[lang]}</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={L.email_ph[lang]}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-zinc-700">{L.phone[lang]}</label>
            <input
              type="text"
              value={form.telefoon}
              onChange={(e) => setForm({ ...form, telefoon: e.target.value })}
              placeholder={L.phone_ph[lang]}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-bold text-zinc-700">{L.subject[lang]}</label>
            <input
              type="text"
              value={form.onderwerp}
              onChange={(e) => setForm({ ...form, onderwerp: e.target.value })}
              placeholder={L.subject_ph[lang]}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-bold text-zinc-700">{L.message[lang]}</label>
          <textarea
            required
            rows={5}
            value={form.bericht}
            onChange={(e) => setForm({ ...form, bericht: e.target.value })}
            placeholder={L.message_ph[lang]}
            className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-amber-400 focus:bg-white"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-600">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => {
              setPrivacyAccepted(e.target.checked)
              if (e.target.checked) setPrivacyError(false)
            }}
            className="mt-0.5 h-4 w-4 accent-amber-500"
          />
          <span>
            {L.privacy[lang]}{' '}
            <Link href="/privacy" className="font-semibold text-amber-600 underline-offset-2 hover:underline">
              {L.privacy_link[lang]}
            </Link>
            <span className="text-red-500"> *</span>
          </span>
        </label>
        {privacyError && (
          <p className="text-sm text-red-600" role="alert">
            {PRIVACY_CONSENT_ERROR}
          </p>
        )}
        <label className="flex cursor-pointer items-start gap-3 text-sm text-zinc-600">
          <input
            type="checkbox"
            checked={nieuwsbrief}
            onChange={(e) => setNieuwsbrief(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-amber-500"
          />
          <span>{L.newsletter[lang]}</span>
        </label>

        <TurnstileWidget
          onToken={setTurnstileToken}
          onVerificationFailed={() => setError(VERIFY_CLIENT)}
        />

        <button
          type="submit"
          disabled={submitDisabled}
          className="rounded-xl bg-amber-400 px-6 py-4 text-lg font-black text-zinc-900 transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitLabel}
        </button>
        <p className="text-center text-xs text-zinc-400">{L.required[lang]}</p>
      </form>
    </div>
  )
}
