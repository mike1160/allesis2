'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LINE_URL, LINE_QR, WHATSAPP_URL, type Lang } from '@/lib/translations'
import ThaiContactForm from '@/components/ThaiContactForm'

const LANGS = [
  { code: 'th' as Lang, flag: '🇹🇭', label: 'ไทย', name: 'ภาษาไทย', en: 'Thai' },
  { code: 'en' as Lang, flag: '🇬🇧', label: 'EN', name: 'English', en: 'English' },
  { code: 'nl' as Lang, flag: '🇳🇱', label: 'NL', name: 'Nederlands', en: 'Dutch' },
  { code: 'ru' as Lang, flag: '🇷🇺', label: 'RU', name: 'Русский', en: 'Russian' },
  { code: 'de' as Lang, flag: '🇩🇪', label: 'DE', name: 'Deutsch', en: 'German' },
]

const T = {
  h1a: { th:'เว็บไซต์คุณภาพยุโรป', en:'European quality websites', nl:'Europese kwaliteitswebsites', ru:'Сайты европейского качества', de:'Europäische Qualitätswebsites' },
  h1b: { th:'สำหรับภูเก็ต', en:'for Phuket', nl:'voor Phuket', ru:'для Пхукета', de:'für Phuket' },
  h1c: { th:'ที่ลูกค้าหาเจอ', en:'found by customers', nl:'gevonden door klanten', ru:'которые находят клиенты', de:'von Kunden gefunden' },
  sub: {
    th:'ไม่ใช่ WordPress — เราใช้ Next.js เร็วกว่า 3 เท่า ปลอดภัยกว่า พบได้ใน Google มากกว่า รองรับทุกภาษา',
    en:'Not WordPress — we use Next.js. 3× faster, safer, better found on Google. Every language supported.',
    nl:'Geen WordPress — wij bouwen met Next.js. 3× sneller, veiliger, beter vindbaar. Elke taal mogelijk.',
    ru:'Не WordPress — мы используем Next.js. В 3 раза быстрее, безопаснее, лучше в Google.',
    de:'Kein WordPress — wir nutzen Next.js. 3× schneller, sicherer, besser bei Google gefunden.',
  },
  speed_label: { th:'ความเร็ว — Next.js vs WordPress', en:'Speed — Next.js vs WordPress', nl:'Snelheid — Next.js vs WordPress', ru:'Скорость — Next.js vs WordPress', de:'Geschwindigkeit — Next.js vs WordPress' },
  competitor:  { th:'🐌 คู่แข่ง (WordPress)', en:'🐌 Competitor (WordPress)', nl:'🐌 Concurrent (WordPress)', ru:'🐌 Конкурент (WordPress)', de:'🐌 Konkurrent (WordPress)' },
  faster:      { th:'เร็วกว่า', en:'faster', nl:'sneller', ru:'быстрее', de:'schneller' },
  branches_h:  { th:'เลือกประเภทธุรกิจ', en:'Choose your business type', nl:'Kies uw branche', ru:'Выберите тип бизнеса', de:'Wählen Sie Ihre Branche' },
  branches_sub:{ th:'คลิกที่ธุรกิจของคุณเพื่อดูรายละเอียด ราคา และตัวอย่าง', en:'Click your business type for details, pricing and examples.', nl:'Klik op uw branche voor details, prijzen en voorbeelden.', ru:'Нажмите на свой тип бизнеса для деталей и цен.', de:'Klicken Sie auf Ihre Branche für Details und Preise.' },
  view:        { th:'ดูรายละเอียด →', en:'View →', nl:'Bekijk →', ru:'Подробнее →', de:'Ansehen →' },
  other_h: {
    th: 'ธุรกิจของคุณไม่อยู่ในรายการ?',
    en: 'Is your business type not listed?',
    nl: 'Staat uw branche er niet bij?',
    ru: 'Вашей отрасли нет в списке?',
    de: 'Ist Ihre Branche nicht dabei?',
  },
  other_sub: {
    th: 'ไม่ต้องกังวล — เราสร้างเว็บไซต์ได้ทุกประเภทธุรกิจในภูเก็ต',
    en: 'No worries — we build websites for every type of business in Phuket.',
    nl: 'Geen zorgen — wij bouwen websites voor élke branche in Phuket.',
    ru: 'Не беспокойтесь — мы делаем сайты для любого бизнеса на Пхукете.',
    de: 'Keine Sorge — wir bauen Websites für jede Branche in Phuket.',
  },
  other_cta: {
    th: 'คุยกับเรา →',
    en: 'Talk to us →',
    nl: 'Neem contact op →',
    ru: 'Связаться →',
    de: 'Kontakt aufnehmen →',
  },
  other_examples: {
    th: 'คาเฟ่ · โรงแรม · ยิม · ทัวร์ · ร้านค้า · และอื่นๆ',
    en: 'Cafés · hotels · gyms · tours · shops · and more',
    nl: 'Cafés · hotels · gyms · tours · winkels · en meer',
    ru: 'Кафе · отели · залы · туры · магазины · и другое',
    de: 'Cafés · Hotels · Fitness · Tours · Shops · und mehr',
  },
  migrate_h:   { th:'เบื่อกับ WordPress แล้วหรือยัง?', en:'Done with your current platform?', nl:'Klaar met uw huidige platform?', ru:'Надоел WordPress?', de:'Fertig mit Ihrer alten Plattform?' },
  migrate_sub: {
    th:'Allesis ย้ายเว็บไซต์ของคุณมาที่ Next.js — เร็วกว่า ปลอดภัยกว่า และถูกกว่าที่คุณคิด',
    en:'Allesis migrates your site to Next.js — faster, safer and more affordable than you think.',
    nl:'Allesis migreert uw site naar Next.js — sneller, veiliger en betaalbaarder dan u denkt.',
    ru:'Allesis переносит ваш сайт на Next.js — быстрее, безопаснее и доступнее, чем вы думаете.',
    de:'Allesis migriert Ihre Site zu Next.js — schneller, sicherer und günstiger als Sie denken.',
  },
  how_h:       { th:'วิธีที่เราทำงาน', en:'How we work', nl:'Hoe wij werken', ru:'Как мы работаем', de:'Wie wir arbeiten' },
  tech_h:      { th:'เทคโนโลยีที่เราใช้', en:'Technology we use', nl:'Technologie die wij gebruiken', ru:'Наши технологии', de:'Unsere Technologie' },
  tech_sub:    {
    th:'คู่แข่งในภูเก็ตใช้ WordPress ปลั๊กอิน 50+ และเซิร์ฟเวอร์ที่ช้า เราใช้เทคโนโลยีที่ Google เองใช้',
    en:'Competitors in Phuket use WordPress, 50+ plugins and slow servers. We use the same tech Google itself uses.',
    nl:'Concurrenten in Phuket gebruiken WordPress, 50+ plugins en trage servers. Wij gebruiken wat Google zelf gebruikt.',
    ru:'Конкуренты на Пхукете используют WordPress и 50+ плагинов. Мы используем ту же технологию, что и Google.',
    de:'Konkurrenten in Phuket nutzen WordPress und 50+ Plugins. Wir nutzen dieselbe Technologie wie Google.',
  },
  langs_h:     { th:'เราสร้างเว็บไซต์ในทุกภาษา', en:'We build websites in every language', nl:'Wij bouwen websites in elke taal', ru:'Мы создаём сайты на любом языке', de:'Wir bauen Websites in jeder Sprache' },
  demo_badge: { th:'🚧 กำลังก่อสร้าง · อาจไม่ทำงาน', en:'🚧 Under construction · may not work', nl:'🚧 Under construction · werkt mogelijk niet', ru:'🚧 В разработке · может не работать', de:'🚧 Under construction · funktioniert ggf. nicht' },
  live_badge: { th:'✦ โปรเจกต์ล่าสุดที่ส่งมอบ', en:'✦ Recently delivered', nl:'✦ Recent opgeleverd', ru:'✦ Недавно сдан', de:'✦ Kürzlich geliefert' },
  portfolio_h: { th:'ผลงานของเรา', en:'Our work', nl:'Ons werk', ru:'Наши работы', de:'Unsere Arbeit' },
  portfolio_sub:{ th:'เว็บไซต์จริงที่เราสร้าง — รวมโปรเจกต์ล่าสุดในไทย', en:'Real websites we built — including recent projects in Thailand.', nl:'Echte websites die wij bouwden — inclusief recente projecten in Thailand.', ru:'Реальные сайты — включая недавние проекты в Таиланде.', de:'Echte Websites — inklusive aktueller Projekte in Thailand.' },
  cta_h:       { th:'พร้อมเริ่มต้นแล้วหรือยัง?', en:'Ready to get started?', nl:'Klaar om te starten?', ru:'Готовы начать?', de:'Bereit anzufangen?' },
  cta_sub:     { th:'ปรึกษาฟรี ไม่มีข้อผูกมัด — ตอบกลับภายใน 1 วันทำการ', en:'Free consultation — no obligation. Reply within 1 business day.', nl:'Gratis consult — vrijblijvend. Reactie binnen 1 werkdag.', ru:'Бесплатная консультация. Ответ в течение 1 рабочего дня.', de:'Kostenlose Beratung. Antwort innerhalb 1 Werktages.' },
  line_btn:    { th:'💬 ติดต่อผ่าน LINE', en:'💬 Contact via LINE', nl:'💬 Contact via LINE', ru:'💬 Связаться в LINE', de:'💬 Kontakt über LINE' },
  scan_line:   { th:'สแกน QR เพื่อติดต่อผ่าน LINE', en:'Scan QR to contact via LINE', nl:'Scan QR voor contact via LINE', ru:'Сканируйте QR для связи в LINE', de:'QR scannen für Kontakt via LINE' },
  ready:       { th:'พร้อมแล้ว?', en:'Ready?', nl:'Klaar?', ru:'Готовы?', de:'Bereit?' },
  form_h:     { th:'หรือส่งข้อความถึงเรา', en:'Or send us a message', nl:'Of stuur ons een bericht', ru:'Или напишите нам', de:'Oder schreiben Sie uns' },
  competitors_phuket: { th:'คู่แข่งในภูเก็ต', en:'Competitors in Phuket', nl:'Concurrenten in Phuket', ru:'Конкуренты в Пхукете', de:'Konkurrenten in Phuket' },
}

const BRANCHES = [
  {
    slug:'garage', thaiSlug:'อู่ซ่อมรถ', emoji:'🚗',
    photo:'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    th:'อู่ซ่อมรถ', en:'Garage', nl:'Garage', ru:'Автосервис', de:'Garage',
    tag: {
      th: 'จองนัด · Google Maps · LINE — ให้ลูกค้าหาเจอ',
      en: 'Booking · Google Maps · LINE — found by drivers nearby',
      nl: 'Afspraken · Google Maps · LINE — gevonden in de buurt',
      ru: 'Запись · Google Maps · LINE — вас находят рядом',
      de: 'Termine · Google Maps · LINE — lokal gefunden',
    },
  },
  {
    slug:'restaurant', thaiSlug:'ร้านอาหาร', emoji:'🍽️',
    photo:'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    th:'ร้านอาหาร', en:'Restaurant', nl:'Restaurant', ru:'Ресторан', de:'Restaurant',
    tag: {
      th: 'เมนูออนไลน์ · จองโต๊ะ · นักท่องเที่ยวหาเจอ',
      en: 'Online menu · Reservations · Found by tourists',
      nl: 'Online menu · Reserveren · Gevonden door toeristen',
      ru: 'Меню · Бронь · Находят туристы',
      de: 'Online-Menü · Reservierung · Von Touristen gefunden',
    },
  },
  {
    slug:'spa', thaiSlug:'สปา', emoji:'💆',
    photo:'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    th:'สปา & นวด', en:'Spa & Massage', nl:'Spa', ru:'Спа', de:'Spa',
    tag: {
      th: 'แพ็กเกจ · จองออนไลน์ · รีวิว Google',
      en: 'Packages · Online booking · Google reviews',
      nl: 'Pakketten · Online boeken · Google-reviews',
      ru: 'Пакеты · Онлайн-запись · Отзывы Google',
      de: 'Pakete · Online-Buchung · Google-Bewertungen',
    },
  },
  {
    slug:'clinic', thaiSlug:'คลินิก', emoji:'🏥',
    photo:'https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    th:'คลินิก', en:'Clinic', nl:'Kliniek', ru:'Клиника', de:'Klinik',
    tag: {
      th: 'จองนัด · ความน่าเชื่อถือ · มือถือก่อน',
      en: 'Appointments · Trust signals · Mobile-first',
      nl: 'Afspraken · Vertrouwen · Mobiel eerst',
      ru: 'Запись · Доверие · Сначала мобильный',
      de: 'Termine · Vertrauen · Mobile-first',
    },
  },
  {
    slug:'school', thaiSlug:'โรงเรียน', emoji:'🏫',
    photo:'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    th:'โรงเรียน', en:'School', nl:'School', ru:'Школа', de:'Schule',
    tag: {
      th: 'สมัครเรียน · คอร์ส · พ่อแม่หาเจอ',
      en: 'Enrolment · Courses · Found by parents',
      nl: 'Inschrijven · Cursussen · Gevonden door ouders',
      ru: 'Запись · Курсы · Находят родители',
      de: 'Anmeldung · Kurse · Von Eltern gefunden',
    },
  },
  {
    slug:'realestate', thaiSlug:'อสังหาริมทรัพย์', emoji:'🏠',
    photo:'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&q=80',
    th:'อสังหา · ขาย/เช่า', en:'Real Estate', nl:'Vastgoed', ru:'Недвижимость', de:'Immobilien',
    tag: {
      th: 'รายการขาย/เช่า · ค้นหา · หลายภาษา',
      en: 'Listings · Search · Multilingual buyers',
      nl: 'Objecten · Zoeken · Meertalige kopers',
      ru: 'Объявления · Поиск · Многоязычные покупатели',
      de: 'Angebote · Suche · Mehrsprachige Käufer',
    },
  },
]

const PLATFORMS = [
  {
    name: 'WordPress',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg',
    p: { th:'ช้า & ถูกแฮก', en:'Slow & hackable', nl:'Traag & onveilig', ru:'Медленный и уязвимый', de:'Langsam & unsicher' },
  },
  {
    name: 'Wix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg',
    p: { th:'ไม่ใช่ของคุณ', en:'Not yours', nl:'Niet van u', ru:'Не ваш', de:'Nicht Ihres' },
  },
  {
    name: 'Shopify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
    p: { th:'฿10k+/เดือน', en:'€299/month', nl:'€299/mnd', ru:'€299/мес', de:'€299/Monat' },
  },
  {
    name: 'Squarespace',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/squarespace.svg',
    p: { th:'ปรับแต่งไม่ได้', en:'Limited custom', nl:'Beperkt maatwerk', ru:'Ограниченные возм.', de:'Eingeschränkt' },
  },
  {
    name: 'Webflow',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Webflow_logo.svg',
    p: { th:'ซับซ้อนเกิน', en:'Too complex', nl:'Te technisch & duur', ru:'Слишком сложный', de:'Zu komplex & teuer' },
  },
  {
    name: 'Joomla',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/joomla.svg',
    p: { th:'ล้าสมัย', en:'Outdated', nl:'Verouderd', ru:'Устаревший', de:'Veraltet' },
  },
]

const TECH = [
  { n:'Next.js 15',      logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg',       href:'https://nextjs.org/docs', d:{ th:'เร็วที่สุด', en:'Fastest framework', nl:'Snelste framework', ru:'Быстрейший фреймворк', de:'Schnellstes Framework' } },
  { n:'Vercel CDN',      logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg',         href:'https://vercel.com/docs/edge-network', d:{ th:'CDN ระดับโลก', en:'Global edge network', nl:'Wereldwijd CDN', ru:'Глобальная CDN', de:'Globales CDN' } },
  { n:'Cloudflare',      logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudflare.svg',     href:'https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/', d:{ th:'DDoS ปลอดภัย', en:'DDoS protection', nl:'DDoS-beveiliging', ru:'Защита DDoS', de:'DDoS-Schutz' } },
  { n:'TypeScript',      logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg',     href:'https://www.typescriptlang.org/docs/', d:{ th:'โค้ดไม่มีบัค', en:'Bug-free code', nl:'Foutloze code', ru:'Код без ошибок', de:'Fehlerfreier Code' } },
  { n:'Tailwind CSS',    logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg',    href:'https://tailwindcss.com/docs', d:{ th:'ดีไซน์สวย', en:'Beautiful design', nl:'Mooi design', ru:'Красивый дизайн', de:'Schönes Design' } },
  { n:'DKIM & SPF',      logo:'https://www.google.com/s2/favicons?domain=gmail.com&sz=64',             href:'https://support.google.com/a/answer/33786', d:{ th:'อีเมลน่าเชื่อถือ', en:'Trusted email', nl:'Vertrouwde e-mail', ru:'Надёжная почта', de:'Vertrauensw. E-Mail' } },
  { n:'SSL/TLS',         logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/letsencrypt.svg',    href:'https://letsencrypt.org/getting-started/', d:{ th:'เข้ารหัสทุกอย่าง', en:'Everything encrypted', nl:'Alles versleuteld', ru:'Всё зашифровано', de:'Alles verschlüsselt' } },
  { n:'Schema.org',      logo:'https://www.google.com/s2/favicons?domain=schema.org&sz=64',            href:'https://schema.org/docs/gs.html', d:{ th:'Google เข้าใจ', en:'Google understands', nl:'Google begrijpt', ru:'Google понимает', de:'Google versteht' } },
  { n:'Core Web Vitals', logo:'https://www.google.com/s2/favicons?domain=web.dev&sz=64',               href:'https://web.dev/articles/vitals', d:{ th:'ผ่านทุกเกณฑ์', en:'All metrics green', nl:'Alle metrics groen', ru:'Все метрики зелёные', de:'Alle Metriken grün' } },
  { n:'llms.txt',        logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg',         href:'https://llmstxt.org/', d:{ th:'AI หาเว็บเจอ', en:'Found by AI search', nl:'Vindbaar via AI', ru:'Найдено ИИ', de:'Von KI gefunden' } },
  { n:'Supabase',        logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/supabase.svg',       href:'https://supabase.com/docs', d:{ th:'ฐานข้อมูล RT', en:'Realtime database', nl:'Realtime database', ru:'База данных RT', de:'Echtzeit-DB' } },
  { n:'WAF Firewall',    logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudflare.svg',     href:'https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/', d:{ th:'ไฟร์วอลล์', en:'Firewall protection', nl:'Firewallbeveiliging', ru:'Брандмауэр', de:'Firewall' } },
  { n:'Open Graph',      logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg',       href:'https://ogp.me/', d:{ th:'แชร์สวยใน Social', en:'Beautiful social share', nl:'Mooi op sociale media', ru:'Красиво в соцсетях', de:'Schön in sozialen Medien' } },
  { n:'Sitemap XML',     logo:'https://www.google.com/s2/favicons?domain=google.com&sz=64',             href:'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview', d:{ th:'Google index เร็ว', en:'Fast Google indexing', nl:'Snelle indexering', ru:'Быстрая индексация', de:'Schnelle Indexierung' } },
  { n:'WCAG',            logo:'https://www.google.com/s2/favicons?domain=w3.org&sz=64',                 href:'https://www.w3.org/WAI/standards-guidelines/wcag/', d:{ th:'ทุกคนใช้ได้', en:'Accessible for all', nl:'Toegankelijk', ru:'Доступно для всех', de:'Für alle zugänglich' } },
  { n:'WebP Images',     logo:'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg',         href:'https://developers.google.com/speed/webp', d:{ th:'ภาพโหลดเร็ว', en:'Fast loading images', nl:'Snelle afbeeldingen', ru:'Быстрые изображения', de:'Schnelle Bilder' } },
]

const STEPS = {
  th:[{n:'01',t:'ติดต่อเรา',d:'พูดคุยฟรี ไม่มีข้อผูกมัด ผ่าน LINE หรือ WhatsApp'},{n:'02',t:'ออกแบบ',d:'เราออกแบบเว็บไซต์ให้เหมาะกับธุรกิจของคุณ'},{n:'03',t:'พัฒนา',d:'สร้างด้วย Next.js — เร็ว ปลอดภัย SEO-ready'},{n:'04',t:'เปิดตัว',d:'Online ภายใน 2-4 สัปดาห์'}],
  en:[{n:'01',t:'Contact',d:'Free consultation via LINE or WhatsApp'},{n:'02',t:'Design',d:'Website tailored to your business'},{n:'03',t:'Build',d:'Next.js — fast, secure and SEO-ready'},{n:'04',t:'Launch',d:'Online in 2-4 weeks'}],
  nl:[{n:'01',t:'Contact',d:'Gratis gesprek via LINE of WhatsApp'},{n:'02',t:'Ontwerp',d:'Website op maat voor uw bedrijf'},{n:'03',t:'Bouwen',d:'Next.js — snel, veilig en SEO-klaar'},{n:'04',t:'Live',d:'Online in 2-4 weken'}],
  ru:[{n:'01',t:'Контакт',d:'Бесплатная консультация через LINE'},{n:'02',t:'Дизайн',d:'Сайт под ваш бизнес'},{n:'03',t:'Разработка',d:'Next.js — быстро, безопасно, SEO'},{n:'04',t:'Запуск',d:'Онлайн за 2-4 недели'}],
  de:[{n:'01',t:'Kontakt',d:'Kostenloses Gespräch via LINE'},{n:'02',t:'Design',d:'Website für Ihr Unternehmen'},{n:'03',t:'Entwicklung',d:'Next.js — schnell, sicher, SEO-bereit'},{n:'04',t:'Launch',d:'Online in 2-4 Wochen'}],
}

const HERO_IMG = 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80'

function SpeedBar({ lang }: { lang: Lang }) {
  const [on, setOn] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
      <p className="text-amber-300 text-xs font-bold tracking-widest uppercase mb-5">{T.speed_label[lang]}</p>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/90 font-medium">⚡ Allesis (Next.js)</span>
          <span className="text-green-300 font-black text-xl">0.8s</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-green-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-green-400/50" style={{ width: on ? '24%' : '0%' }} />
        </div>
      </div>
      <div className="text-center text-white/30 text-xs my-3">vs</div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/70">{T.competitor[lang]}</span>
          <span className="text-red-300 font-black text-xl">3.4s</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-red-400 rounded-full transition-all duration-1000 ease-out delay-300" style={{ width: on ? '100%' : '0%' }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { val:'98',  label:'PageSpeed\nAllesis',  color:'text-green-300' },
          { val:'41',  label:'PageSpeed\nWP avg',   color:'text-red-300' },
          { val:'3×',  label:T.faster[lang],         color:'text-amber-300' },
        ].map(s => (
          <div key={s.val} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
            <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
            <div className="text-white/40 text-[10px] mt-1 whitespace-pre-line leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ThPage() {
  const [lang, setLang] = useState<Lang>('th')
  const [scrollY, setScrollY] = useState(0)

  // URL-sync: lees ?lang= bij laden
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const l = p.get('lang')
    if (l && ['th', 'en', 'nl', 'ru', 'de'].includes(l)) setLang(l as Lang)
  }, [])

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // URL-sync: schrijf ?lang= bij wisselen
  const switchLang = (l: Lang) => {
    setLang(l)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', l)
    window.history.replaceState({}, '', url)
  }

  const bl = (b: typeof BRANCHES[0]) => ({ th:b.th, en:b.en, nl:b.nl, ru:b.ru, de:b.de })[lang]
  const branchHref = (b: typeof BRANCHES[0]) =>
    `/th/${lang === 'th' ? b.thaiSlug : b.slug}?lang=${lang}`

  return (
    <main className="min-h-screen bg-white text-zinc-900">

      {/* HERO — donker met parallax */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div
          className="absolute bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('${HERO_IMG}')`,
            top: '-20%', bottom: '-20%', left: 0, right: 0,
            transform: `translateY(${scrollY * 0.35}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/45 via-zinc-900/35 to-zinc-950/70" />

        <div className="relative z-20 flex justify-between items-center px-6 py-5 pt-24 md:pt-5 max-w-6xl mx-auto w-full">
          <Link href="/" className="text-white/60 hover:text-amber-400 text-sm transition-colors font-medium">
            ← allesis.nl
          </Link>
          <div className="flex gap-1 bg-white/10 backdrop-blur border border-white/20 rounded-full p-1">
            {LANGS.map(l => (
              <button key={l.code} type="button" onClick={() => switchLang(l.code)}
                className={`px-2.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  lang === l.code ? 'bg-amber-400 text-zinc-900' : 'text-white/70 hover:text-white'
                }`}>
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 py-12 max-w-6xl mx-auto w-full items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-full px-4 py-2 w-fit">
              <span className="text-amber-300 text-xs font-bold tracking-widest uppercase">
                🇪🇺 Allesis · Netherlands · {lang==='th'?'คุณภาพยุโรป':lang==='nl'?'Europese Kwaliteit':lang==='ru'?'Европейское качество':lang==='de'?'Europäische Qualität':'European Quality'}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-white">
              {T.h1a[lang]}<br />
              <span className="text-amber-400">{T.h1b[lang]}</span><br />
              <span className="text-white/50 text-3xl font-light">{T.h1c[lang]}</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-lg">{T.sub[lang]}</p>
            <div className="flex flex-wrap gap-2">
              {LANGS.map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => switchLang(l.code)}
                  className={`text-xs px-3 py-1.5 rounded-full backdrop-blur border transition-all ${
                    lang === l.code
                      ? 'bg-amber-400 border-amber-400 text-zinc-900 font-bold'
                      : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={LINE_URL}
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-400 text-white font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-green-500/30">
                {T.line_btn[lang]}
              </a>
              <a href={WHATSAPP_URL}
                className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-zinc-900 font-black px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 shadow-lg shadow-amber-400/30">
                📱 WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href={LINE_URL} className="rounded-xl bg-white p-2 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={LINE_QR} alt="LINE QR" width={112} height={112} className="h-28 w-28" />
              </a>
            </div>
            <div className="flex gap-6 pt-2">
              {[['⚡','98/100','PageSpeed'],['🔒','AVG','Certified'],['⭐','4.9/5','Google']].map(([ico,val,lab]) => (
                <div key={lab} className="text-center">
                  <div className="text-lg">{ico}</div>
                  <div className="text-white font-black text-sm">{val}</div>
                  <div className="text-white/40 text-xs">{lab}</div>
                </div>
              ))}
            </div>
          </div>
          <SpeedBar lang={lang} />
        </div>
      </section>

      {/* BRANCHES — wit, foto kaarten */}
      <section className="bg-white px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-3 text-center">
            {T.branches_h[lang]}
          </p>
          <p className="text-zinc-500 text-center mb-12 max-w-xl mx-auto">{T.branches_sub[lang]}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRANCHES.map(b => (
              <div key={b.slug} className="flex flex-col gap-3">
                <Link href={branchHref(b)}
                  className="group relative rounded-3xl overflow-hidden h-72 block shadow-sm hover:shadow-xl transition-all duration-500">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${b.photo}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/30 to-transparent" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="text-4xl mb-3 drop-shadow">{b.emoji}</div>
                    <h3 className="text-2xl font-black text-white leading-tight group-hover:text-amber-400 transition-colors">{bl(b)}</h3>
                    <p className="text-white/50 text-sm mt-1">{b.en}</p>
                    <span className="inline-flex items-center gap-1 text-amber-400 text-sm font-bold mt-3 group-hover:gap-2 transition-all">
                      {T.view[lang]}
                    </span>
                  </div>
                </Link>
                <Link
                  href={branchHref(b)}
                  className="group/banner relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 via-white to-zinc-50 px-4 py-3 shadow-sm transition-all hover:border-amber-300 hover:shadow-md"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-400 to-amber-500" />
                  <p className="pl-2 text-sm font-medium leading-snug text-zinc-700 group-hover/banner:text-zinc-900">
                    {b.tag[lang]}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="group mt-8 flex flex-col sm:flex-row sm:items-center gap-5 overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-6 sm:p-8 shadow-lg transition-all hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-400/10"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-2xl shadow-lg shadow-amber-400/30">
              ✦
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1.5">
                {T.other_examples[lang]}
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2 group-hover:text-amber-300 transition-colors">
                {T.other_h[lang]}
              </h3>
              <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
                {T.other_sub[lang]}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-black text-zinc-900 transition-all group-hover:bg-amber-300 group-hover:scale-105">
              {T.other_cta[lang]}
            </span>
          </a>
        </div>
      </section>      <section className="bg-zinc-50 border-y border-zinc-100 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-3 text-center">⚡ Migration</p>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4 text-zinc-900">{T.migrate_h[lang]}</h2>
          <p className="text-zinc-500 text-center mb-14 text-lg max-w-xl mx-auto">{T.migrate_sub[lang]}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {PLATFORMS.map(p => (
              <div key={p.name} className="bg-white border border-zinc-200 rounded-2xl p-4 text-center hover:border-amber-300 hover:shadow-md transition-all group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-6 w-auto mx-auto mb-2 grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <p className="font-black text-zinc-700 text-xs mb-1.5">{p.name}</p>
                <p className="text-red-500 text-xs mb-1.5">✗ {p.p[lang]}</p>
                <p className="text-amber-500 text-xs font-bold">→ Next.js</p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { val:'฿10,000', l:{ th:'ราคาเริ่มต้น', en:'Starting from', nl:'Vanaf', ru:'От', de:'Ab' } },
              { val:'<3s',     l:{ th:'เวลาโหลด', en:'Load time', nl:'Laadtijd', ru:'Загрузка', de:'Ladezeit' } },
              { val:'98+',    l:{ th:'PageSpeed', en:'PageSpeed', nl:'PageSpeed', ru:'PageSpeed', de:'PageSpeed' } },
              { val:'100%',   l:{ th:'รักษา SEO', en:'SEO retained', nl:'SEO behoud', ru:'SEO сохранён', de:'SEO erhalten' } },
            ].map(s => (
              <div key={s.val}>
                <div className="text-4xl font-black text-amber-400">{s.val}</div>
                <div className="text-zinc-500 text-sm mt-1">{s.l[lang]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOE WE WERKEN — wit */}
      <section className="bg-white px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-3 text-center">{T.how_h[lang]}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
            {STEPS[lang].map((s, i) => (
              <div key={s.n} className="relative">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-zinc-100 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-400/30">
                    <span className="text-zinc-900 font-black text-xl">{s.n}</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 mb-2">{s.t}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEERTALIG — lichtgrijs */}
      <section className="bg-zinc-50 border-y border-zinc-100 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-3 text-center">{T.langs_h[lang]}</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-12">
            {LANGS.map(l => (
              <button
                key={l.code}
                type="button"
                onClick={() => switchLang(l.code)}
                className={`rounded-2xl p-4 text-center transition-all hover:shadow-md border ${
                  lang === l.code
                    ? 'bg-amber-50 border-amber-400'
                    : 'bg-white border-zinc-200 hover:border-amber-300'
                }`}
              >
                <div className="text-3xl mb-2">{l.flag}</div>
                <div className={`font-bold text-sm transition-colors ${lang === l.code ? 'text-amber-600' : 'text-zinc-800 group-hover:text-amber-500'}`}>{l.name}</div>
                <div className="text-zinc-400 text-xs mt-0.5">{l.en}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK — wit */}
      <section className="bg-white px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-3 text-center">{T.tech_h[lang]}</p>
          <p className="text-zinc-500 text-center mb-14 text-lg max-w-2xl mx-auto">{T.tech_sub[lang]}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-7">
              <p className="text-red-500 font-bold mb-5 flex items-center gap-2 text-sm">
                <span className="text-2xl">🐌</span> {T.competitors_phuket[lang]}
              </p>
              {['WordPress + Elementor','Divi / WPBakery','50+ plugins','Shared hosting','Hackable','Avg laadtijd: 3.4s'].map(t => (
                <div key={t} className="flex items-center gap-3 py-2.5 border-b border-zinc-200 last:border-0">
                  <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-xs font-black flex-shrink-0">✗</span>
                  <span className="text-zinc-500 text-sm">{t}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-7 shadow-lg shadow-amber-100">
              <p className="text-green-600 font-bold mb-5 flex items-center gap-2 text-sm">
                <span className="text-2xl">⚡</span> Allesis
              </p>
              {['Next.js 15','Tailwind CSS + TypeScript','Zero plugins','Vercel + Cloudflare CDN','Geen plugin kwetsbaarheden','Avg laadtijd: 0.8s'].map(t => (
                <div key={t} className="flex items-center gap-3 py-2.5 border-b border-amber-200 last:border-0">
                  <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-black flex-shrink-0">✓</span>
                  <span className="text-zinc-800 text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TECH.map(t => (
              <a
                key={t.n}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-50 hover:bg-amber-50 border border-zinc-200 hover:border-amber-300 rounded-2xl p-4 transition-all group block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.logo}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 mb-3 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div className="font-black text-zinc-800 text-sm group-hover:text-amber-600 transition-colors mb-1">{t.n}</div>
                <div className="text-zinc-400 text-xs">{t.d[lang]}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO — lichtgrijs */}
      <section className="bg-zinc-50 border-y border-zinc-100 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-3 text-center">{T.portfolio_h[lang]}</p>
          <p className="text-zinc-500 text-center mb-12">{T.portfolio_sub[lang]}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'ThaiPlot',
                url: 'https://www.thaiplot.com/th',
                img: '/portfolio/thaiplot.jpg',
                recent: true,
                desc: {
                  th: 'ตลาดประกาศที่ดินและอสังหาฯ ทั่วไทย · หลายภาษา · Next.js',
                  en: 'Independent land & property marketplace across Thailand · Multilingual · Next.js',
                  nl: 'Onafhankelijke land- & vastgoedmarktplaats in Thailand · Meertalig · Next.js',
                  ru: 'Площадка объявлений о земле и недвижимости в Таиланде · Next.js',
                  de: 'Unabhängiger Marktplatz für Land & Immobilien in Thailand · Next.js',
                },
                tags: ['Next.js', 'Thailand', 'Marketplace'],
              },
              {
                name: 'Saved Souls Foundation',
                url: 'https://www.savedsouls-foundation.org/th',
                img: '/portfolio/savedsouls-th.jpg',
                recent: true,
                desc: {
                  th: 'มูลนิธิช่วยเหลือสุนัขจรจัด · ขอนแก่น · บริจาคและอาสาสมัคร',
                  en: 'Street dog rescue foundation · Khon Kaen · Donations & volunteering',
                  nl: 'Stichting voor zwerfhonden · Khon Kaen · Donaties & vrijwilligers',
                  ru: 'Фонд помощи бездомным собакам · Кхонкэн · Next.js',
                  de: 'Stiftung für Straßenhunde · Khon Kaen · Spenden & Ehrenamt',
                },
                tags: ['Next.js', 'Nonprofit', 'Thailand'],
              },
              {
                name: 'Hua Hin Land',
                url: 'https://www.hua-hin-land.com/th',
                img: '/portfolio/huahinland.jpg',
                recent: true,
                desc: {
                  th: 'ที่ดินโฉนดซอย 112 หัวหิน · เว็บไซต์ขายที่ดิน · หลายภาษา',
                  en: 'Chanote land Soi 112 Hua Hin · Land sales website · Multilingual',
                  nl: 'Chanote-grond Soi 112 Hua Hin · Verkoopsite voor land · Meertalig',
                  ru: 'Земля с Chanote · Soi 112 Хуа Хин · Многоязычный сайт',
                  de: 'Chanote-Land Soi 112 Hua Hin · Verkaufsseite · Mehrsprachig',
                },
                tags: ['Next.js', 'Hua Hin', 'Real Estate'],
              },
              {
                name: 'รุ่งเจริญชัย ยางยนต์',
                url: 'https://rung-charoen-chai-zeta.vercel.app/',
                img: '/portfolio/rungcharoenchai.jpg',
                demo: true,
                desc: {
                  th: 'ตัวอย่างอู่ยางและซ่อมรถ · under construction · อาจไม่ทำงาน',
                  en: 'Garage example · under construction · may not work',
                  nl: 'Garage-voorbeeld · under construction · werkt mogelijk niet',
                  ru: 'Пример автосервиса · under construction · может не работать',
                  de: 'Garage-Beispiel · under construction · funktioniert ggf. nicht',
                },
                tags: ['Under construction', 'Next.js', 'Garage'],
              },
              {
                name: 'Ren Ji Tang — TCM',
                url: 'https://renjitang.nl',
                img: '/portfolio/renjitang.jpg',
                desc: {
                  th: 'คลินิกแพทย์แผนจีน · Next.js · จองออนไลน์ · 5★ Google',
                  en: 'TCM clinic · Next.js · Online booking · 5★ Google',
                  nl: 'TCM kliniek · Next.js · Online boeking · 5★',
                  ru: 'ТКМ клиника · Next.js · 5★ Google',
                  de: 'TCM Klinik · Next.js · 5★ Google',
                },
                tags: ['Next.js', 'Online Booking', '5★ Google'],
              },
            ].map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                className={`group bg-white border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 ${
                  p.demo ? 'border-red-300 border-dashed' : p.recent ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-zinc-200 hover:border-amber-200'
                }`}>
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.name}
                    className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${p.demo ? 'opacity-80 grayscale-[30%]' : ''}`}
                    onError={e => { (e.target as HTMLImageElement).src='https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&q=70' }} />
                  {p.recent && (
                    <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-4 py-2.5 text-center shadow-lg">
                      <span className="text-[11px] font-black uppercase tracking-[0.14em] text-white drop-shadow-sm">
                        {T.live_badge[lang]}
                      </span>
                    </div>
                  )}
                  {p.demo && (
                    <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-r from-red-700 via-red-600 to-rose-500 px-4 py-2.5 text-center shadow-lg">
                      <span className="text-[11px] font-black uppercase tracking-[0.12em] text-white drop-shadow-sm">
                        {T.demo_badge[lang]}
                      </span>
                    </div>
                  )}
                  {!p.demo && (
                    <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur rounded-full px-3 py-1 text-xs font-bold text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity shadow">
                      Bekijk live →
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-zinc-900 group-hover:text-amber-500 transition-colors mb-2">{p.name}</h3>
                  <p className="text-zinc-500 text-sm mb-4">{p.desc[lang]}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(tag => (
                      <span key={tag} className={`text-xs px-3 py-1 rounded-full font-medium ${
                        tag === 'Under construction' ? 'bg-red-100 text-red-800' : p.recent ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-600'
                      }`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — donker, parallax foto */}
      <section className="relative overflow-hidden py-32">
        <div
          className="absolute bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url('${HERO_IMG}')`,
            top: '-20%', bottom: '-20%', left: 0, right: 0,
            transform: `translateY(${(scrollY - 4000) * 0.2}px)`,
          }}
        />
        <div className="absolute inset-0 bg-zinc-950/85" />
        <div className="relative z-10 px-6 text-center max-w-2xl mx-auto">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-6">{T.cta_h[lang]}</p>
          <h2 className="text-7xl font-black text-white mb-4">{T.ready[lang]}</h2>
          <p className="text-white/60 mb-8 text-xl">{T.cta_sub[lang]}</p>
          <div className="mb-4 flex flex-wrap items-start justify-center gap-6">
            <div className="text-center">
              <a href={LINE_URL} className="inline-block rounded-2xl bg-white p-3 shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={LINE_QR} alt="LINE QR — Allesis" width={148} height={148} className="mx-auto h-[148px] w-[148px]" />
              </a>
              <p className="mt-2 text-xs text-white/50">{T.scan_line[lang]}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <a href={LINE_URL}
              className="bg-green-500 hover:bg-green-400 text-white font-black px-10 py-5 rounded-2xl text-xl transition-all hover:scale-105 shadow-xl shadow-green-500/30">
              {T.line_btn[lang]}
            </a>
            <a href={WHATSAPP_URL}
              className="bg-amber-400 hover:bg-amber-300 text-zinc-900 font-black px-10 py-5 rounded-2xl text-xl transition-all hover:scale-105 shadow-xl shadow-amber-400/30">
              📱 WhatsApp
            </a>
            <a href="mailto:info@allesis.nl"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-10 py-5 rounded-2xl text-xl transition-all hover:scale-105 backdrop-blur">
              ✉️ Email
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="bg-zinc-50 border-t border-zinc-100 px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <p className="mb-10 text-center text-xs font-bold uppercase tracking-widest text-amber-500">
            {T.form_h[lang]}
          </p>
          <ThaiContactForm lang={lang} />
        </div>
      </section>

    </main>
  )
}
