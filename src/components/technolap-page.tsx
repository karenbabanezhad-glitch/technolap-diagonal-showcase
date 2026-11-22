import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { brandPaths, fujitsuMark } from "@/components/brand-paths";
import heroImg from "@/assets/mk-hero.webp.asset.json";
import svcFan from "@/assets/mk-svc-fan.webp.asset.json";
import svcBoard from "@/assets/mk-svc-board.webp.asset.json";
import svcBattery from "@/assets/mk-svc-battery.webp.asset.json";
import campaignImg from "@/assets/mk-campaign.webp.asset.json";
import aboutImg from "@/assets/mk-about.webp.asset.json";
import ctaLaptop from "@/assets/mk-cta-laptop.webp.asset.json";
import pBoard from "@/assets/mk-p-board.webp.asset.json";
import pCharger from "@/assets/mk-p-charger.webp.asset.json";
import pTouchpad from "@/assets/mk-p-touchpad.webp.asset.json";
import pSpeaker from "@/assets/mk-p-speaker.webp.asset.json";
import pFan from "@/assets/mk-p-fan.webp.asset.json";
import pKeyboard from "@/assets/mk-p-keyboard.webp.asset.json";
import pBody from "@/assets/mk-p-body.webp.asset.json";
import pBattery from "@/assets/mk-p-battery.webp.asset.json";
import prKeyboard from "@/assets/mk-pr-keyboard.webp.asset.json";
import prCharger from "@/assets/mk-pr-charger.webp.asset.json";
import prBattery from "@/assets/mk-pr-battery.webp.asset.json";

const CONTACT = {
  phone: "۰۲۶-۳۴۳۲۳۱۴۰",
  phoneHref: "tel:02634323140",
  phone2: "۰۲۱-۶۶۴۱۱۳۳۴",
  phone2Href: "tel:02166411334",
  mobile: "۰۹۳۵۶۲۷۲۳۲۳",
  mobileHref: "tel:09356272323",
  shortAddress: "کرج، شاهین ویلا",
  address: "کرج، شاهین ویلا، خیابان دهم شرقی، کوچه لاله، تکنولپ",
};

const navLinks = [
  { href: "#top", label: "خانه" },
  { href: "#services", label: "تعمیر لپ‌تاپ", caret: true },
  { href: "#categories", label: "قطعات لپ‌تاپ", caret: true },
  { href: "#brands", label: "برندها", caret: true },
  { href: "#products", label: "پخش عمده" },
  { href: "#about", label: "مقالات" },
  { href: "#about", label: "درباره ما" },
  { href: "#contact", label: "تماس با ما" },
];

const heroFeatures = [
  { icon: "i-cube", label: "قطعات اصلی" },
  { icon: "i-zap", label: "تعمیر سریع" },
  { icon: "i-tech", label: "تکنسین متخصص" },
  { icon: "i-shield", label: "گارانتی خدمات" },
];

const categories = [
  { img: pBoard.url, label: "بردهای جانبی" },
  { img: pCharger.url, label: "شارژر" },
  { img: pTouchpad.url, label: "تاچ پد" },
  { img: pSpeaker.url, label: "اسپیکر داخلی" },
  { img: pFan.url, label: "فن و هیت‌سینک" },
  { img: pKeyboard.url, label: "کیبورد" },
  { img: pBody.url, label: "قاب" },
  { img: pBattery.url, label: "باتری" },
];

const services = [
  { img: svcFan.url, title: ["سرویس کامل", "و خنک‌سازی"], mobile: "سرویس کامل و خنک‌سازی" },
  { img: svcBoard.url, title: ["تعمیر مادربرد", "و قطعات اصلی"], mobile: "تعمیر مادربرد و قطعات اصلی" },
  { img: svcBattery.url, title: ["تعویض و تعمیر", "باتری لپ‌تاپ"], mobile: "تعویض و تعمیر باتری لپ‌تاپ" },
];

const products = [
  { img: prKeyboard.url, name: "کیبورد لپ‌تاپ" },
  { img: prCharger.url, name: "شارژر اورجینال لپ‌تاپ" },
  { img: prBattery.url, name: "باتری اورجینال لپ‌تاپ" },
];

const chips = ["قاب و بدنه", "باتری", "کیبورد", "شارژر"];

const aboutFeatures = [
  { icon: "i-trophy", label: "بیش از ۱۰ سال تجربه تخصصی" },
  { icon: "i-users", label: "تیم فنی حرفه‌ای" },
  { icon: "i-chip", label: "قطعات اورجینال" },
  { icon: "i-headset", label: "پشتیبانی و مشاوره رایگان" },
];

function Icon({ id, className = "ic" }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}

function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <span className={footer ? "logo logo-footer" : "logo"}>
      <svg className="logo-mark" viewBox="0 0 64 48" aria-hidden="true">
        <path d="M10 4h30l-3 8H27l-9 32H8l9-32h-10z" fill="var(--logo-a)" />
        <path d="M34 16h20c7 0 10 4 8 10s-8 10-15 10h-6l-3 8h-10zm11 7-2 6h4c2 0 3.5-1 4-3s-.5-3-2.5-3z" fill="var(--logo-b)" />
        <path d="M44 4h18l-2 8H42z" fill="var(--logo-b)" />
      </svg>
      <span className="logo-type">
        <strong>TECHNOLAP</strong>
        <b>تکنولپ</b>
      </span>
    </span>
  );
}

function BrandMark({ name }: { name: keyof typeof brandPaths | "vaio" | "fujitsu" }) {
  if (name === "vaio")
    return (
      <svg className="bm bm-vaio" viewBox="0 0 40 14" role="img" aria-label="VAIO">
        <path d="M1 2.5 6.5 11.5 12 2.5 17.5 11.5M22 2.5v9" />
        <circle cx="32" cy="7" r="4.6" />
      </svg>
    );
  if (name === "fujitsu")
    return (
      <span className="bm-fujitsu" role="img" aria-label="FUJITSU">
        <svg viewBox={fujitsuMark.viewBox} aria-hidden="true">
          <path d={fujitsuMark.d} />
        </svg>
        FUJITSU
      </span>
    );
  const mark = brandPaths[name];
  const svg = (
    <svg className={`bm bm-${name}`} viewBox={mark.viewBox} role="img" aria-label={name}>
      <path d={mark.d} />
    </svg>
  );
  if (name === "msi")
    return (
      <span className="bm-msi">
        {svg}
        <i>msi</i>
      </span>
    );
  return svg;
}

export function TechnolapPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [activeSection, setActiveSection] = useState("#top");
  const searchRef = useRef<HTMLInputElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3600);
    return () => window.clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);
  useEffect(() => {
    document.body.classList.toggle("drawer-open", cartOpen);
    if (cartOpen) shellRef.current?.querySelector<HTMLElement>(".drawer-close")?.focus();
    else triggerRef.current?.focus();
    return () => document.body.classList.remove("drawer-open");
  }, [cartOpen]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setCartOpen(false);
      }
      if (event.key !== "Tab" || !cartOpen) return;
      const elements = shellRef.current?.querySelectorAll<HTMLElement>(
        ".cart-drawer button, .cart-drawer a[href]",
      );
      const first = elements?.[0],
        last = elements?.[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 960) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [cartOpen]);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(".search-toggle")) {
      setSearchOpen((value) => !value);
      setMenuOpen(false);
    }
    if (target.closest(".mobile-menu-btn")) {
      setMenuOpen((value) => !value);
      setSearchOpen(false);
    }
    const trigger = target.closest<HTMLElement>(".cart-trigger");
    if (trigger) {
      triggerRef.current = trigger;
      setCartOpen(true);
    }
    if (target.closest(".drawer-close")) setCartOpen(false);
    if (target.closest("#clear-cart")) setCart([]);
    const product = target.closest<HTMLElement>(".add-to-cart")?.dataset["product"];
    if (product) {
      setCart((items) => [...items, product]);
      setToast(`${product} به سبد اضافه شد`);
    }
    const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (link) {
      setMenuOpen(false);
      setActiveSection(link.hash);
    }
  }

  function scrollTrack(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: "smooth" });
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchRef.current?.value.trim().toLocaleLowerCase("fa") ?? "";
    if (!query) return;
    const nodes = shellRef.current?.querySelectorAll(
      "main h2, main h3, .cat-tile strong, .brand-tile, .product-card h3",
    );
    const found = Array.from(nodes ?? []).find((node) =>
      (node.textContent ?? node.getAttribute("aria-label") ?? "")
        .toLocaleLowerCase("fa")
        .includes(query),
    );
    if (found) {
      setSearchOpen(false);
      found.closest("section, .product-card, .cat-tile")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "center",
      });
      setToast("نتیجه مرتبط در همین صفحه پیدا شد");
    } else setToast("موردی پیدا نشد؛ عبارت دیگری را امتحان کنید.");
  }

  const cartCount = cart.length.toLocaleString("fa-IR");

  return (
    <div className="site-shell" dir="rtl" ref={shellRef} onClick={handleClick}>
      <a href="#main" className="skip-link">
        رفتن به محتوای اصلی
      </a>

      <svg className="sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M19 12H5m6 6-6-6 6-6" /></symbol>
        <symbol id="i-caret" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5" /></symbol>
        <symbol id="i-left" viewBox="0 0 24 24"><path d="m14 6-6 6 6 6" /></symbol>
        <symbol id="i-right" viewBox="0 0 24 24"><path d="m10 6 6 6-6 6" /></symbol>
        <symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.7" cy="10.7" r="6.7" /><path d="m16 16 5 5" /></symbol>
        <symbol id="i-cart" viewBox="0 0 24 24"><path d="M3 4h2l2.3 11.2h11.9L22 7H6" /><circle cx="9" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" /></symbol>
        <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></symbol>
        <symbol id="i-close" viewBox="0 0 24 24"><path d="M5 5 19 19M19 5 5 19" /></symbol>
        <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.6v3a2 2 0 0 1-2.2 2A19.5 19.5 0 0 1 2.4 4.2 2 2 0 0 1 4.4 2h3a2 2 0 0 1 2 1.7l.6 3.3a2 2 0 0 1-.6 1.8L7.5 10a15 15 0 0 0 6.5 6.5l1.2-1.9a2 2 0 0 1 1.8-.6l3.3.6a2 2 0 0 1 1.7 2z" /></symbol>
        <symbol id="i-mobile" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" /></symbol>
        <symbol id="i-headset" viewBox="0 0 24 24"><path d="M4 15v-3a8 8 0 0 1 16 0v3M4 14h2.5a1.5 1.5 0 0 1 1.5 1.5v3A1.5 1.5 0 0 1 6.5 20H5a1 1 0 0 1-1-1v-5Zm16 0h-2.5a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5H19a1 1 0 0 0 1-1v-5Z" /></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 2.5 20 6v6c0 4.8-3.4 8-8 9.5C7.4 20 4 16.8 4 12V6l8-3.5Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></symbol>
        <symbol id="i-zap" viewBox="0 0 24 24"><path d="m13 2-8.5 12h7L10.5 22 19 10h-7l1-8Z" /></symbol>
        <symbol id="i-cube" viewBox="0 0 24 24"><path d="m12 2.5 8.5 4.5L12 11.5 3.5 7 12 2.5Zm-8.5 4.5v9.5L12 21l8.5-4.5V7M12 11.5V21M3.5 11.7 12 16l8.5-4.3" /></symbol>
        <symbol id="i-tech" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M7.5 6.5h9M4.5 21v-1.5A5.5 5.5 0 0 1 10 14h4a5.5 5.5 0 0 1 5.5 5.5V21M12 14v3" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7v1" /></symbol>
        <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20v-1a5.5 5.5 0 0 1 5.5-5.5h2a5.5 5.5 0 0 1 5.5 5.5v1M15.5 4.6a3.5 3.5 0 0 1 0 6.8M18 13.7a5.5 5.5 0 0 1 3.5 5.3v1" /></symbol>
        <symbol id="i-trophy" viewBox="0 0 24 24"><path d="M7 3h10v6a5 5 0 0 1-10 0V3ZM7 5H3.5v1.5A3.5 3.5 0 0 0 7 10M17 5h3.5v1.5A3.5 3.5 0 0 1 17 10M12 14v4M8 21h8M9.5 18h5" /></symbol>
        <symbol id="i-chip" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1.5" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></symbol>
        <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5h.01" /></symbol>
        <symbol id="i-map" viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.7" /></symbol>
        <symbol id="i-wrench" viewBox="0 0 24 24"><path d="M14.5 6a5 5 0 0 0-6.6 6.6l-5 5a1.8 1.8 0 0 0 2.5 2.5l5-5A5 5 0 0 0 17 8.5l-3 3-2.5-2.5 3-3Z" /></symbol>
        <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11 12 3l9 8v9.5a.5.5 0 0 1-.5.5H15v-6H9v6H3.5a.5.5 0 0 1-.5-.5V11Z" /></symbol>
        <symbol id="i-gift" viewBox="0 0 24 24"><rect x="4" y="9" width="16" height="12" rx="1.5" /><path d="M12 9v12M4 13h16M12 9c-1.5-4-6-4-6-1.5S10 9 12 9Zm0 0c1.5-4 6-4 6-1.5S14 9 12 9Z" /></symbol>
        <symbol id="i-track" viewBox="0 0 24 24"><path d="M12 2.5 20 6v6c0 4.8-3.4 8-8 9.5C7.4 20 4 16.8 4 12V6l8-3.5Z" /><path d="M9 11.5h6M12 8.5v6" /></symbol>
      </svg>

      <div className="hero-wrap" id="top">
        <div className="topbar">
          <div className="container topbar-inner">
            <div className="topbar-links">
              <a href={CONTACT.phoneHref}>
                <Icon id="i-user" /> تماس فوری
              </a>
              <i />
              <a href="#contact">پیگیری تعمیرات</a>
              <i />
              <a href="#contact">ورود / ثبت‌نام</a>
            </div>
            <div className="topbar-contact">
              <a href={CONTACT.phoneHref} dir="ltr">
                <Icon id="i-phone" /> <span>{CONTACT.phone}</span>
              </a>
              <i />
              <span>
                <Icon id="i-map" /> {CONTACT.shortAddress}
              </span>
            </div>
          </div>
        </div>

        <header className="header container">
          <div className="header-pill">
            <Button
              variant="source"
              type="button"
              className="mobile-menu-btn"
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Icon id={menuOpen ? "i-close" : "i-menu"} />
            </Button>
            <a className="brand" href="#top" aria-label="تکنولپ - صفحه اصلی">
              <Logo />
            </a>
            <nav className="desktop-nav" aria-label="منوی اصلی">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={link.label === "خانه" && activeSection === "#top" ? "active" : undefined}
                >
                  {link.label}
                  {link.caret ? <Icon id="i-caret" className="ic caret" /> : null}
                </a>
              ))}
            </nav>
            <div className="header-actions">
              <Button
                variant="source"
                type="button"
                className="icon-btn search-toggle"
                aria-label="جستجو"
                aria-expanded={searchOpen}
                aria-controls="search-panel"
              >
                <Icon id="i-search" />
              </Button>
              <Button variant="source" type="button" className="icon-btn cart-trigger" aria-label="سبد خرید">
                <Icon id="i-cart" />
                <span className="cart-count" id="cart-count">
                  {cartCount}
                </span>
              </Button>
            </div>
          </div>
          <div className="search-panel" id="search-panel" hidden={!searchOpen}>
            <form className="search-inner" role="search" onSubmit={handleSearch}>
              <label htmlFor="site-search" className="visually-hidden">
                جستجو در صفحه
              </label>
              <Icon id="i-search" />
              <input
                id="site-search"
                type="search"
                ref={searchRef}
                placeholder="جستجوی خدمات، قطعات و برندها..."
                autoComplete="off"
              />
              <Button variant="source" type="submit" className="search-submit">
                جستجو
              </Button>
            </form>
          </div>
          <nav className="mobile-menu" id="mobile-menu" aria-label="منوی موبایل" hidden={!menuOpen}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </header>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <img src={heroImg.url} alt="" fetchPriority="high" />
            <span className="hero-arc" />
          </div>
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="hero-eyebrow">
                <b>تکنولپ</b>
                <span className="bar" />
                مرکز تخصصی تعمیرات و تامین قطعات لپ‌تاپ
              </p>
              <h1 id="hero-title">
                <span>تعمیر تخصصی لپ‌تاپ</span>
                <em>با ضمانت و گارانتی واقعی</em>
              </h1>
              <ul className="hero-features">
                {heroFeatures.map((f) => (
                  <li key={f.label}>
                    <Icon id={f.icon} />
                    <span>{f.label}</span>
                  </li>
                ))}
              </ul>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  <Icon id="i-headset" /> دریافت مشاوره رایگان
                </a>
                <a href="#contact" className="btn btn-ghost">
                  <Icon id="i-cube" />
                  <span className="d-only">پیگیری وضعیت تعمیر</span>
                  <span className="m-only">پیگیری تعمیرات</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <main id="main">
        <section className="cats" id="categories" aria-label="دسته‌بندی قطعات">
          <svg className="cats-shape" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 100V78C40 76 70 60 95 34 122 8 150 0 190 0H948C975 0 1000 22 1000 50V100Z" />
          </svg>
          <div className="container cats-inner">
            <Button variant="source" type="button" className="cat-arrow cat-prev" aria-label="قبلی" onClick={() => scrollTrack(1)}>
              <Icon id="i-right" />
            </Button>
            <div className="cat-track" ref={trackRef}>
              {categories.map((c) => (
                <a key={c.label} href="#products" className="cat-tile">
                  <img src={c.img} alt="" loading="lazy" />
                  <strong>{c.label}</strong>
                </a>
              ))}
            </div>
            <Button variant="source" type="button" className="cat-arrow cat-next" aria-label="بعدی" onClick={() => scrollTrack(-1)}>
              <Icon id="i-left" />
            </Button>
          </div>
        </section>

        <section className="services container" id="services" aria-labelledby="services-title">
          <div className="sec-intro">
            <span className="eyebrow">
              <i className="dash" /> خدمات تخصصی ما
            </span>
            <h2 id="services-title">تعمیرات حرفه‌ای و تخصصی</h2>
            <p>
              از عیب‌یابی و تعمیر مادربرد تا تعویض باتری و رفع مشکلات نرم‌افزاری، با تجهیزات پیشرفته
              و تیم متخصص تکنولپ.
            </p>
            <a href="#services" className="more-link">
              مشاهده همه خدمات <Icon id="i-arrow" />
            </a>
          </div>
          <div className="svc-grid">
            {services.map((s) => (
              <a key={s.mobile} href="#contact" className="svc-card">
                <img src={s.img} alt="" loading="lazy" />
                <h3>
                  <span className="d-only">
                    {s.title[0]}
                    <br />
                    {s.title[1]}
                  </span>
                  <span className="m-only">{s.mobile}</span>
                </h3>
                <span className="svc-go" aria-hidden="true">
                  <Icon id="i-arrow" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="brands container" id="brands" aria-labelledby="brands-title">
          <div className="sec-intro">
            <span className="eyebrow d-only">
              <i className="dash" /> خدمات تخصصی
            </span>
            <h2 id="brands-title">
              <span className="d-only">برندهای لپ‌تاپ</span>
              <span className="m-only">
                <i className="dash" /> برندهای تحت پوشش
              </span>
            </h2>
            <p>
              تعمیر و تامین قطعات لپ‌تاپ
              <br />
              تمام برندهای معتبر دنیا
            </p>
            <a href="#brands" className="more-link">
              مشاهده همه برندها <Icon id="i-arrow" />
            </a>
          </div>
          <div className="brand-rows">
            <div className="brand-row">
              {(["hp", "lenovo", "dell", "asus"] as const).map((b) => (
                <span key={b} className="brand-tile" aria-label={b}>
                  <BrandMark name={b} />
                </span>
              ))}
            </div>
            <div className="brand-row">
              {(["fujitsu", "msi", "acer", "apple", "vaio"] as const).map((b) => (
                <span key={b} className={`brand-tile bt-${b}`} aria-label={b}>
                  <BrandMark name={b} />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="shop container" id="products" aria-labelledby="products-title">
          <div className="products">
            <div className="products-head">
              <h2 id="products-title">
                <span>
                  محبوب‌ترین <i className="dash" />
                </span>
                محصولات
              </h2>
              <div className="chips">
                {chips.map((chip) => (
                  <a key={chip} href="#categories" className="chip">
                    {chip}
                  </a>
                ))}
              </div>
            </div>
            <div className="product-grid">
              {products.map((p) => (
                <article key={p.name} className="product-card">
                  <img src={p.img} alt={p.name} loading="lazy" />
                  <div className="product-foot">
                    <h3>{p.name}</h3>
                    <Button
                      variant="source"
                      type="button"
                      className="add-to-cart"
                      data-product={p.name}
                      aria-label={`افزودن ${p.name} به سبد`}
                    >
                      <Icon id="i-cart" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="campaign">
            <img src={campaignImg.url} alt="قطعات لپ‌تاپ: رم، SSD و فن" loading="lazy" />
            <div className="campaign-panel">
              <h2>
                <span>فروش انواع </span>
                <span>قطعات لپ‌تاپ</span>
              </h2>
              <p>
                قطعات اصلی، با کیفیت و<br className="d-only" /> تضمین اصالت کالا
              </p>
              <a href="#products" className="btn btn-light">
                <Icon id="i-cart" /> مشاهده محصولات
              </a>
            </div>
            <Button variant="source" type="button" className="campaign-arrow" aria-label="بنر بعدی">
              <Icon id="i-right" />
            </Button>
          </div>
        </section>

        <section className="about container" id="about" aria-labelledby="about-title">
          <ul className="about-features">
            {aboutFeatures.map((f) => (
              <li key={f.label}>
                <Icon id={f.icon} />
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
          <div className="about-copy">
            <h2 id="about-title">
              <i className="dash m-only" /> درباره تکنولپ
            </h2>
            <p className="d-only">
              تکنولپ بیش از ۱۰ سال سابقه تخصصی در زمینه تعمیرات لپ‌تاپ، تامین قطعات و خدمات مرتبط را
              در کرج دارد. هدف ما ارائه خدمات حرفه‌ای، سریع و مطمئن با استفاده از تجهیزات روز و قطعات
              باکیفیت است.
            </p>
            <p className="m-only">بیش از ۱۰ سال تجربه تخصصی در تعمیرات لپ‌تاپ و تامین قطعات با تیم متخصص.</p>
            <a href="#contact" className="btn btn-soft">
              <Icon id="i-info" />
              <span className="d-only">اطلاعات بیشتر درباره ما</span>
              <span className="m-only">اطلاعات بیشتر</span>
            </a>
          </div>
          <div className="about-media">
            <img src={aboutImg.url} alt="لحیم‌کاری روی مادربرد لپ‌تاپ" loading="lazy" />
          </div>
        </section>

        <section className="cta container" id="contact" aria-labelledby="cta-title">
          <div className="cta-band">
            <img className="cta-laptop" src={ctaLaptop.url} alt="" loading="lazy" />
            <div className="cta-copy">
              <h2 id="cta-title">نیاز به مشاوره یا ثبت درخواست تعمیر دارید؟</h2>
              <p>همین حالا با ما تماس بگیرید یا فرم آنلاین را تکمیل کنید.</p>
            </div>
            <div className="cta-actions">
              <a href="#contact" className="btn btn-outline-light">
                <Icon id="i-wrench" /> ثبت درخواست تعمیر
              </a>
              <a href={CONTACT.phoneHref} className="btn btn-white">
                <Icon id="i-phone" /> تماس با ما
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="enamad" aria-label="نماد اعتماد الکترونیکی">
            <svg viewBox="0 0 80 56" aria-hidden="true">
              <path d="M14 34c10 2 26-2 30-12 3-8-6-12-13-6-9 8-12 24-2 30 8 5 20-1 28-9" />
              <path d="M54 30l12-12 4 4-12 12-6 2z" />
            </svg>
            <small>نماد اعتماد الکترونیکی</small>
            <b dir="ltr">eNAMAD.ir</b>
            <span className="stars" aria-hidden="true">
              ★★★<em>★★</em>
            </span>
          </div>
          <div className="fcol">
            <h3>اطلاعات سریع</h3>
            <ul className="contact-list">
              <li>
                <Icon id="i-phone" />
                <a href={CONTACT.phoneHref} dir="ltr">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <Icon id="i-phone" />
                <a href={CONTACT.phone2Href} dir="ltr">
                  {CONTACT.phone2}
                </a>
              </li>
              <li>
                <Icon id="i-mobile" />
                <a href={CONTACT.mobileHref} dir="ltr">
                  {CONTACT.mobile}
                </a>
              </li>
              <li>
                <Icon id="i-map" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
          <div className="fcol">
            <h3>خدمات ما</h3>
            <ul>
              <li><a href="#services">تعمیر لپ‌تاپ در کرج</a></li>
              <li><a href="#services">تعمیر مادربرد لپ‌تاپ</a></li>
              <li><a href="#services">تعویض باتری لپ‌تاپ</a></li>
              <li><a href="#services">سرویس کامل لپ‌تاپ</a></li>
            </ul>
          </div>
          <div className="fcol">
            <h3>دسترسی سریع</h3>
            <ul>
              <li><a href="#top">خانه</a></li>
              <li><a href="#services">خدمات تعمیرات</a></li>
              <li><a href="#categories">قطعات لپ‌تاپ</a></li>
              <li><a href="#contact">پیگیری تعمیرات</a></li>
            </ul>
          </div>
          <div className="fbrand">
            <Logo footer />
            <p>
              مرکز تخصصی تعمیرات و فروش
              <br />
              قطعات لپ‌تاپ در کرج
            </p>
          </div>
        </div>
      </footer>

      <nav className="tabbar" aria-label="منوی پایین">
        <a href="#top" className="active">
          <Icon id="i-home" /> خانه
        </a>
        <a href="#products">
          <Icon id="i-gift" /> محصولات
        </a>
        <a href="#services">
          <Icon id="i-wrench" /> تعمیرات
        </a>
        <a href="#contact">
          <Icon id="i-track" /> پیگیری
        </a>
        <a href="#contact">
          <Icon id="i-user" /> حساب من
        </a>
      </nav>

      <div className="toast" role="status" aria-live="polite" hidden={!toast}>
        {toast}
      </div>
      <div className="drawer-backdrop" hidden={!cartOpen} onClick={() => setCartOpen(false)}></div>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-hidden={!cartOpen}
        inert={!cartOpen}
      >
        <div className="drawer-head">
          <h2 id="drawer-title">سبد خرید</h2>
          <Button variant="source" className="icon-btn drawer-close" aria-label="بستن سبد خرید">
            <Icon id="i-close" />
          </Button>
        </div>
        <p className="drawer-help">این سبد نمایشی است و هنوز به پرداخت آنلاین متصل نیست.</p>
        <ul className="cart-items">
          {cart.length ? (
            cart.map((name, index) => (
              <li key={index}>
                <span>{name}</span>
                <Button
                  variant="source"
                  className="cart-remove"
                  aria-label={`حذف ${name}`}
                  onClick={() => setCart((items) => items.filter((_, i) => i !== index))}
                >
                  حذف
                </Button>
              </li>
            ))
          ) : (
            <li className="cart-empty">سبد شما خالی است.</li>
          )}
        </ul>
        <div className="drawer-foot">
          <Button variant="source" type="button" id="clear-cart" className="btn btn-soft">
            خالی‌کردن سبد
          </Button>
          <a href={CONTACT.phoneHref} className="btn btn-primary">
            <Icon id="i-phone" /> سفارش تلفنی
          </a>
        </div>
      </aside>
    </div>
  );
}
