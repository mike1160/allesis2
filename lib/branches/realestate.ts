import { LINE_URL } from "@/lib/translations";

export const realestateImgs = {
  hero: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
  mid: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
  cta: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
  gradient: "from-sky-950/80",
};

const pkg = (
  name: string,
  price: string,
  eur: string,
  f1: string,
  f2: string,
  f3: string,
  f4: string,
  h: boolean,
) => ({ name, price, eur, features: [f1, f2, f3, f4], highlight: h });

const IMGS = {
  listings: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  search: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  maps: "https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  gallery: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  chat: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  lang: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  reviews: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  mobile: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
};

type Svc = { icon: string; label: string; sub: string; img: string; href: string };

const services = (lang: string, items: Omit<Svc, "img" | "href">[]): Svc[] => {
  const hrefs = [
    `/th/features/listings?lang=${lang}`,
    `/th/features/search?lang=${lang}`,
    `/seo`,
    `/th/features/gallery?lang=${lang}`,
    LINE_URL,
    `/th/features/multilang?lang=${lang}`,
    `/th/features/reviews?lang=${lang}`,
    `/th/features/mobile?lang=${lang}`,
  ];
  const imgs = [
    IMGS.listings,
    IMGS.search,
    IMGS.maps,
    IMGS.gallery,
    IMGS.chat,
    IMGS.lang,
    IMGS.reviews,
    IMGS.mobile,
  ];
  return items.map((item, i) => ({ ...item, img: imgs[i], href: hrefs[i] }));
};

export const realestateContent = {
  th: {
    eyebrow: "อสังหาริมทรัพย์ · ขาย & เช่า · ภูเก็ต",
    h1_main: "เว็บไซต์อสังหา",
    h1_sub: "ที่ขายและเช่าได้จริง",
    hero_desc:
      "เว็บไซต์คุณภาพยุโรปสำหรับนายหน้าและเจ้าของอสังหาในภูเก็ต โชว์บ้าน คอนโด และวิลล่า พร้อมติดต่อ LINE",
    mid_h2: "ลูกค้าค้นหาบ้านและคอนโดออนไลน์",
    mid_p:
      "นักท่องเที่ยวและนักลงทุนค้นหาอสังหาภูเก็ตผ่าน Google และมือถือ เว็บไซต์ที่เร็วและสวยช่วยปิดดีลได้เร็วขึ้น",
    services: services("th", [
      { icon: "🏡", label: "รายการขาย & เช่า", sub: "แสดงทรัพย์สินทั้งหมดพร้อมรูป" },
      { icon: "🔍", label: "ค้นหาและกรอง", sub: "กรองตามราคา พื้นที่ ประเภท" },
      { icon: "📍", label: "แผนที่ & SEO", sub: "พบได้ใน Google และ Maps" },
      { icon: "📸", label: "แกลเลอรีรูป", sub: "ภาพสวยคุณภาพสูง" },
      { icon: "💬", label: "LINE & WhatsApp", sub: "ติดต่อตรงกับนายหน้า" },
      { icon: "🌐", label: "หลายภาษา", sub: "ไทย อังกฤษ ดัตช์" },
      { icon: "⭐", label: "รีวิวลูกค้า", sub: "สร้างความน่าเชื่อถือ" },
      { icon: "📱", label: "มือถือก่อน", sub: "โหลดเร็วบนสมาร์ทโฟน" },
    ]),
    packages: [
      pkg("หน้าเดียว", "฿22,000", "~€560", "ไทย & อังกฤษ", "รายการตัวอย่าง", "LINE ติดต่อ", "Google Maps", false),
      pkg("ธุรกิจ", "฿39,000", "~€1,000", "หลายหน้า", "ค้นหา/กรอง", "SEO อสังหา", "แกลเลอรี", true),
      pkg("พรีเมียม", "฿59,000", "~€1,510", "พอร์ทัลเต็ม", "หลายภาษา", "แคมเปญ SEO", "ออกแบบพิเศษ", false),
    ],
  },
  en: {
    eyebrow: "Real Estate · Sales & Rentals · Phuket",
    h1_main: "Website for real estate",
    h1_sub: "That sells and rents",
    hero_desc:
      "European quality websites for agents and property owners in Phuket. List villas, condos and homes — with LINE contact.",
    mid_h2: "Buyers search online first",
    mid_p:
      "Investors and expats search Phuket property on Google and mobile. A fast, beautiful site helps you close deals faster.",
    services: services("en", [
      { icon: "🏡", label: "Sales & rentals", sub: "All listings with photos" },
      { icon: "🔍", label: "Search & filters", sub: "By price, area and type" },
      { icon: "📍", label: "Maps & SEO", sub: "Found on Google and Maps" },
      { icon: "📸", label: "Photo gallery", sub: "High-quality imagery" },
      { icon: "💬", label: "LINE & WhatsApp", sub: "Direct agent contact" },
      { icon: "🌐", label: "Multilingual", sub: "Thai, English, Dutch" },
      { icon: "⭐", label: "Client reviews", sub: "Build trust instantly" },
      { icon: "📱", label: "Mobile-first", sub: "Fast on every smartphone" },
    ]),
    packages: [
      pkg("One-Page", "฿22,000", "~€560", "Thai & English", "Sample listings", "LINE contact", "Google Maps", false),
      pkg("Business", "฿39,000", "~€1,000", "Multi-page", "Search/filters", "Property SEO", "Gallery", true),
      pkg("Premium", "฿59,000", "~€1,510", "Full portal", "Multilingual", "SEO campaign", "Custom design", false),
    ],
  },
  nl: {
    eyebrow: "Vastgoed · Verkoop & Verhuur · Phuket",
    h1_main: "Website voor vastgoed",
    h1_sub: "Die verkoopt en verhuurt",
    hero_desc:
      "Europese kwaliteitswebsites voor makelaars en eigenaren in Phuket. Toon villa’s, condo’s en huizen — met LINE-contact.",
    mid_h2: "Kopers zoeken eerst online",
    mid_p:
      "Investeerders en expats zoeken Phuket-vastgoed via Google en mobiel. Een snelle, mooie site helpt sneller deals te sluiten.",
    services: services("nl", [
      { icon: "🏡", label: "Verkoop & verhuur", sub: "Alle objecten met foto’s" },
      { icon: "🔍", label: "Zoeken & filters", sub: "Op prijs, gebied en type" },
      { icon: "📍", label: "Maps & SEO", sub: "Vindbaar in Google en Maps" },
      { icon: "📸", label: "Fotogalerij", sub: "Hoge kwaliteit beelden" },
      { icon: "💬", label: "LINE & WhatsApp", sub: "Direct contact met makelaar" },
      { icon: "🌐", label: "Meertalig", sub: "Thai, Engels, Nederlands" },
      { icon: "⭐", label: "Klantreviews", sub: "Direct vertrouwen wekken" },
      { icon: "📱", label: "Mobiel eerst", sub: "Snel op elke smartphone" },
    ]),
    packages: [
      pkg("One-Page", "฿22,000", "~€560", "Thai & Engels", "Voorbeeldobjecten", "LINE contact", "Google Maps", false),
      pkg("Business", "฿39,000", "~€1,000", "Meerdere pagina’s", "Zoeken/filters", "Vastgoed SEO", "Galerij", true),
      pkg("Premium", "฿59,000", "~€1,510", "Volledig portaal", "Meertalig", "SEO campagne", "Maatwerk design", false),
    ],
  },
  ru: {
    eyebrow: "Недвижимость · Продажа & Аренда · Пхукет",
    h1_main: "Сайт для недвижимости",
    h1_sub: "Который продаёт и сдаёт",
    hero_desc:
      "Европейские сайты для агентов и владельцев на Пхукете. Виллы, кондо и дома — с контактом LINE.",
    mid_h2: "Покупатели ищут онлайн",
    mid_p:
      "Инвесторы и экспаты ищут недвижимость Пхукета в Google. Быстрый красивый сайт помогает закрывать сделки быстрее.",
    services: services("ru", [
      { icon: "🏡", label: "Продажа & аренда", sub: "Все объекты с фото" },
      { icon: "🔍", label: "Поиск и фильтры", sub: "По цене, району и типу" },
      { icon: "📍", label: "Карты & SEO", sub: "В Google и Maps" },
      { icon: "📸", label: "Галерея", sub: "Качественные фото" },
      { icon: "💬", label: "LINE & WhatsApp", sub: "Прямой контакт с агентом" },
      { icon: "🌐", label: "Мультиязычность", sub: "Тайский, английский, голландский" },
      { icon: "⭐", label: "Отзывы", sub: "Доверие с первого взгляда" },
      { icon: "📱", label: "Mobile-first", sub: "Быстро на смартфоне" },
    ]),
    packages: [
      pkg("Одна страница", "฿22,000", "~€560", "Тайский & Английский", "Примеры объектов", "LINE", "Google Maps", false),
      pkg("Бизнес", "฿39,000", "~€1,000", "Несколько страниц", "Поиск/фильтры", "SEO", "Галерея", true),
      pkg("Премиум", "฿59,000", "~€1,510", "Полный портал", "Мультиязычный", "SEO-кампания", "Дизайн", false),
    ],
  },
  de: {
    eyebrow: "Immobilien · Verkauf & Vermietung · Phuket",
    h1_main: "Website für Immobilien",
    h1_sub: "Die verkauft und vermietet",
    hero_desc:
      "Europäische Qualitätswebsites für Makler und Eigentümer in Phuket. Villen, Condos und Häuser — mit LINE-Kontakt.",
    mid_h2: "Käufer suchen zuerst online",
    mid_p:
      "Investoren und Expats suchen Phuket-Immobilien über Google und Mobil. Eine schnelle, schöne Site hilft, Deals schneller zu schließen.",
    services: services("de", [
      { icon: "🏡", label: "Verkauf & Vermietung", sub: "Alle Objekte mit Fotos" },
      { icon: "🔍", label: "Suche & Filter", sub: "Nach Preis, Gebiet und Typ" },
      { icon: "📍", label: "Maps & SEO", sub: "Auffindbar in Google und Maps" },
      { icon: "📸", label: "Fotogalerie", sub: "Hochwertige Bilder" },
      { icon: "💬", label: "LINE & WhatsApp", sub: "Direkter Maklerkontakt" },
      { icon: "🌐", label: "Mehrsprachig", sub: "Thai, Englisch, Niederländisch" },
      { icon: "⭐", label: "Kundenbewertungen", sub: "Sofort Vertrauen aufbauen" },
      { icon: "📱", label: "Mobile-first", sub: "Schnell auf jedem Smartphone" },
    ]),
    packages: [
      pkg("One-Pager", "฿22,000", "~€560", "Thai & Englisch", "Beispielobjekte", "LINE Kontakt", "Google Maps", false),
      pkg("Business", "฿39,000", "~€1,000", "Mehrseitig", "Suche/Filter", "Immobilien-SEO", "Galerie", true),
      pkg("Premium", "฿59,000", "~€1,510", "Volles Portal", "Mehrsprachig", "SEO-Kampagne", "Custom Design", false),
    ],
  },
};
