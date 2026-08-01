import type { Lang } from "@/lib/translations";

export type FeatureSlug =
  | "listings"
  | "search"
  | "gallery"
  | "reviews"
  | "mobile"
  | "multilang"
  | "booking"
  | "menu"
  | "packages"
  | "team"
  | "trust"
  | "forms";

type FeatureCopy = {
  title: Record<Lang, string>;
  lead: Record<Lang, string>;
  body: Record<Lang, string>;
  img: string;
};

export const FEATURES: Record<FeatureSlug, FeatureCopy> = {
  listings: {
    title: {
      th: "รายการขาย & เช่า",
      en: "Sales & rental listings",
      nl: "Verkoop- & verhuurobjecten",
      ru: "Объявления о продаже и аренде",
      de: "Verkaufs- & Mietobjekte",
    },
    lead: {
      th: "โชว์บ้าน คอนโด และวิลล่าทั้งหมดบนเว็บไซต์ของคุณ",
      en: "Show every villa, condo and home on your own website.",
      nl: "Toon al uw villa’s, condo’s en huizen op uw eigen website.",
      ru: "Показывайте все виллы, кондо и дома на своём сайте.",
      de: "Zeigen Sie alle Villen, Condos und Häuser auf Ihrer Website.",
    },
    body: {
      th: "ลูกค้าเลื่อนดูรายการ ดูรูป และติดต่อผ่าน LINE หรือ WhatsApp ได้ทันที ไม่ต้องพึ่ง Facebook หรือเอเจนต์ภายนอก",
      en: "Buyers browse listings, photos and contact you via LINE or WhatsApp — without relying on Facebook or third-party agents.",
      nl: "Kopers bekijken objecten, foto’s en nemen direct contact op via LINE of WhatsApp — zonder Facebook of externe platforms.",
      ru: "Покупатели смотрят объекты, фото и пишут вам в LINE или WhatsApp — без Facebook и сторонних площадок.",
      de: "Käufer sehen Objekte, Fotos und kontaktieren Sie per LINE oder WhatsApp — ohne Facebook oder externe Portale.",
    },
    img: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  search: {
    title: {
      th: "ค้นหาและกรอง",
      en: "Search & filters",
      nl: "Zoeken & filters",
      ru: "Поиск и фильтры",
      de: "Suche & Filter",
    },
    lead: {
      th: "กรองตามราคา พื้นที่ จำนวนห้อง และประเภททรัพย์สิน",
      en: "Filter by price, area, bedrooms and property type.",
      nl: "Filter op prijs, gebied, slaapkamers en type object.",
      ru: "Фильтр по цене, району, спальням и типу объекта.",
      de: "Filtern nach Preis, Gebiet, Schlafzimmern und Objekttyp.",
    },
    body: {
      th: "ช่วยให้ลูกค้าเจอบ้านที่ใช่เร็วขึ้น ลดงานตอบแชทซ้ำๆ ของทีมคุณ",
      en: "Help clients find the right home faster — and cut repetitive chat work for your team.",
      nl: "Help klanten sneller het juiste huis te vinden — en minder herhaalde chatvragen voor uw team.",
      ru: "Клиенты быстрее находят нужный дом — меньше однотипных вопросов в чате.",
      de: "Kunden finden schneller das richtige Haus — weniger wiederholte Chat-Fragen für Ihr Team.",
    },
    img: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  gallery: {
    title: {
      th: "แกลเลอรีรูป",
      en: "Photo gallery",
      nl: "Fotogalerij",
      ru: "Фотогалерея",
      de: "Fotogalerie",
    },
    lead: {
      th: "ภาพสวยโหลดเร็ว รองรับมือถือและ SEO",
      en: "Beautiful images that load fast — mobile and SEO ready.",
      nl: "Mooie foto’s die snel laden — mobiel en SEO-klaar.",
      ru: "Красивые фото, быстрая загрузка — mobile и SEO.",
      de: "Schöne Fotos, schnelle Ladezeiten — mobil und SEO-bereit.",
    },
    body: {
      th: "เราใช้ WebP, lazy loading และแกลเลอรีเต็มจอ เพื่อให้ทรัพย์สินของคุณดูพรีเมียม",
      en: "We use WebP, lazy loading and fullscreen galleries so your properties look premium.",
      nl: "Wij gebruiken WebP, lazy loading en fullscreen-galerijen zodat uw objecten premium aanvoelen.",
      ru: "WebP, lazy loading и полноэкранные галереи — объекты выглядят премиально.",
      de: "WebP, Lazy Loading und Vollbild-Galerien — Ihre Objekte wirken premium.",
    },
    img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  reviews: {
    title: {
      th: "รีวิวลูกค้า",
      en: "Client reviews",
      nl: "Klantreviews",
      ru: "Отзывы клиентов",
      de: "Kundenbewertungen",
    },
    lead: {
      th: "แสดงรีวิว Google จริงบนเว็บไซต์ สร้างความน่าเชื่อถือทันที",
      en: "Show real Google reviews on your site — instant trust.",
      nl: "Toon echte Google-reviews op uw site — direct vertrouwen.",
      ru: "Реальные отзывы Google на сайте — мгновенное доверие.",
      de: "Echte Google-Bewertungen auf Ihrer Site — sofort Vertrauen.",
    },
    body: {
      th: "รีวิวช่วยปิดดีล โดยเฉพาะกับนักลงทุนต่างชาติที่ยังไม่เคยเจอคุณ",
      en: "Reviews close deals — especially with international buyers who have never met you.",
      nl: "Reviews sluiten deals — vooral bij internationale kopers die u nog niet kennen.",
      ru: "Отзывы закрывают сделки — особенно с иностранными покупателями.",
      de: "Bewertungen schließen Deals — besonders bei internationalen Käufern.",
    },
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  mobile: {
    title: {
      th: "มือถือก่อน",
      en: "Mobile-first",
      nl: "Mobiel eerst",
      ru: "Сначала мобильные",
      de: "Mobile-first",
    },
    lead: {
      th: "ลูกค้าส่วนใหญ่เปิดเว็บบนสมาร์ทโฟนในภูเก็ต",
      en: "Most clients in Phuket open websites on their phone.",
      nl: "De meeste klanten in Phuket openen websites op hun telefoon.",
      ru: "Большинство клиентов на Пхукете открывают сайты с телефона.",
      de: "Die meisten Kunden in Phuket öffnen Websites auf dem Handy.",
    },
    body: {
      th: "เว็บ Allesis โหลดเร็ว ใช้ง่ายบนมือถือ และผ่าน Core Web Vitals",
      en: "Allesis sites load fast, work great on mobile and pass Core Web Vitals.",
      nl: "Allesis-sites laden snel, werken top op mobiel en scoren op Core Web Vitals.",
      ru: "Сайты Allesis быстрые, удобные на телефоне и проходят Core Web Vitals.",
      de: "Allesis-Sites laden schnell, sind mobil stark und bestehen Core Web Vitals.",
    },
    img: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  multilang: {
    title: {
      th: "หลายภาษา",
      en: "Multilingual",
      nl: "Meertalig",
      ru: "Мультиязычность",
      de: "Mehrsprachig",
    },
    lead: {
      th: "ไทย อังกฤษ และดัตช์ — พร้อมขยายภาษาอื่นได้",
      en: "Thai, English and Dutch — more languages on request.",
      nl: "Thai, Engels en Nederlands — andere talen op verzoek.",
      ru: "Тайский, английский и голландский — другие языки по запросу.",
      de: "Thai, Englisch und Niederländisch — weitere Sprachen auf Wunsch.",
    },
    body: {
      th: "เว็บไซต์หนึ่งรองรับลูกค้าท้องถิ่น นักท่องเที่ยว และนักลงทุนชาวยุโรป",
      en: "One website serves locals, tourists and European investors.",
      nl: "Eén website bedient locals, toeristen en Europese investeerders.",
      ru: "Один сайт — для местных, туристов и европейских инвесторов.",
      de: "Eine Website für Locals, Touristen und europäische Investoren.",
    },
    img: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  booking: {
    title: {
      th: "จองออนไลน์",
      en: "Online booking",
      nl: "Online boeken",
      ru: "Онлайн-запись",
      de: "Online-Buchung",
    },
    lead: {
      th: "ลูกค้าจองนัดตรงจากเว็บไซต์ — 24 ชั่วโมง",
      en: "Customers book appointments directly — 24/7.",
      nl: "Klanten boeken afspraken direct — 24/7.",
      ru: "Клиенты записываются напрямую — 24/7.",
      de: "Kunden buchen Termine direkt — rund um die Uhr.",
    },
    body: {
      th: "ลดการโทรซ้ำและพลาดนัด ด้วยระบบจองที่ชัดเจนบนมือถือ",
      en: "Fewer missed calls and no-shows with clear mobile booking.",
      nl: "Minder gemiste belletjes en no-shows dankzij duidelijke mobiele boekingen.",
      ru: "Меньше пропущенных звонков и неявок благодаря удобной записи с телефона.",
      de: "Weniger verpasste Anrufe und No-Shows dank klarer mobiler Buchung.",
    },
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  menu: {
    title: {
      th: "บริการและราคา",
      en: "Services & prices",
      nl: "Diensten & prijzen",
      ru: "Услуги и цены",
      de: "Leistungen & Preise",
    },
    lead: {
      th: "แสดงบริการทั้งหมดอย่างชัดเจน ลูกค้าเข้าใจทันที",
      en: "Show all services clearly — customers understand instantly.",
      nl: "Toon alle diensten duidelijk — klanten snappen het meteen.",
      ru: "Покажите все услуги ясно — клиенты сразу понимают.",
      de: "Alle Leistungen klar zeigen — Kunden verstehen sofort.",
    },
    body: {
      th: "เมนูบริการที่สวยและอ่านง่ายช่วยปิดการขายก่อนที่ลูกค้าจะโทร",
      en: "A clean service menu helps close interest before the first call.",
      nl: "Een helder dienstenmenu helpt interesse te wekken vóór het eerste gesprek.",
      ru: "Понятное меню услуг повышает интерес ещё до звонка.",
      de: "Ein klares Leistungsmenü weckt Interesse vor dem ersten Anruf.",
    },
    img: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  packages: {
    title: {
      th: "แพ็กเกจและโปรโมชัน",
      en: "Packages & offers",
      nl: "Pakketten & acties",
      ru: "Пакеты и акции",
      de: "Pakete & Angebote",
    },
    lead: {
      th: "ขายแพ็กเกจ บัตรของขวัญ และโปรโมชันบนเว็บไซต์",
      en: "Sell packages, gift cards and promotions on your site.",
      nl: "Verkoop pakketten, cadeaubonnen en acties via uw site.",
      ru: "Продавайте пакеты, подарочные карты и акции на сайте.",
      de: "Verkaufen Sie Pakete, Gutscheine und Aktionen auf Ihrer Site.",
    },
    body: {
      th: "แพ็กเกจที่ชัดเจนเพิ่มยอดขายเฉลี่ยต่อลูกค้า",
      en: "Clear packages raise average order value.",
      nl: "Duidelijke pakketten verhogen de gemiddelde orderwaarde.",
      ru: "Понятные пакеты повышают средний чек.",
      de: "Klare Pakete steigern den durchschnittlichen Bestellwert.",
    },
    img: "https://images.pexels.com/photos/3764568/pexels-photo-3764568.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  team: {
    title: {
      th: "ทีมและโปรไฟล์",
      en: "Team & profiles",
      nl: "Team & profielen",
      ru: "Команда и профили",
      de: "Team & Profile",
    },
    lead: {
      th: "แนะนำทีมงาน สร้างความน่าเชื่อถือ",
      en: "Introduce your team — build trust.",
      nl: "Stel uw team voor — wek vertrouwen.",
      ru: "Представьте команду — создайте доверие.",
      de: "Stellen Sie Ihr Team vor — schaffen Sie Vertrauen.",
    },
    body: {
      th: "โปรไฟล์แพทย์ ครู หรือช่างช่วยให้ลูกค้าเลือกคุณได้ง่ายขึ้น",
      en: "Profiles of doctors, teachers or mechanics help customers choose you.",
      nl: "Profielen van artsen, docenten of monteurs helpen klanten voor u te kiezen.",
      ru: "Профили врачей, учителей или мастеров помогают выбрать вас.",
      de: "Profile von Ärzten, Lehrern oder Mechanikern helfen Kunden, Sie zu wählen.",
    },
    img: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  trust: {
    title: {
      th: "ความน่าเชื่อถือ",
      en: "Trust & certificates",
      nl: "Vertrouwen & certificaten",
      ru: "Доверие и сертификаты",
      de: "Vertrauen & Zertifikate",
    },
    lead: {
      th: "แสดงใบรับรอง ใบอนุญาต และมาตรฐานของคุณ",
      en: "Show certificates, licenses and your standards.",
      nl: "Toon certificaten, vergunningen en uw standaarden.",
      ru: "Покажите сертификаты, лицензии и стандарты.",
      de: "Zeigen Sie Zertifikate, Lizenzen und Standards.",
    },
    body: {
      th: "ความโปร่งใสทำให้ลูกค้าใหม่กล้าติดต่อครั้งแรก",
      en: "Transparency makes new customers comfortable contacting you.",
      nl: "Transparantie maakt het voor nieuwe klanten makkelijker om contact op te nemen.",
      ru: "Прозрачность помогает новым клиентам легко связаться с вами.",
      de: "Transparenz macht es neuen Kunden leicht, Sie zu kontaktieren.",
    },
    img: "https://images.pexels.com/photos/60504/pexels-photo-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
  forms: {
    title: {
      th: "แบบฟอร์มออนไลน์",
      en: "Online forms",
      nl: "Online formulieren",
      ru: "Онлайн-формы",
      de: "Online-Formulare",
    },
    lead: {
      th: "รับข้อมูลลูกค้าก่อนนัดหมาย ประหยัดเวลา",
      en: "Collect client details before appointments — save time.",
      nl: "Verzamel klantgegevens vóór afspraken — bespaar tijd.",
      ru: "Собирайте данные клиентов до визита — экономьте время.",
      de: "Kundendaten vor Terminen erfassen — Zeit sparen.",
    },
    body: {
      th: "แบบฟอร์มที่ใช้งานง่ายบนมือถือ เชื่อมต่ออีเมลหรือ LINE",
      en: "Mobile-friendly forms that connect to email or LINE.",
      nl: "Mobielvriendelijke formulieren gekoppeld aan e-mail of LINE.",
      ru: "Удобные мобильные формы с отправкой на email или LINE.",
      de: "Handyfreundliche Formulare mit Anschluss an E-Mail oder LINE.",
    },
    img: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
  },
};

export const FEATURE_SLUGS = Object.keys(FEATURES) as FeatureSlug[];
