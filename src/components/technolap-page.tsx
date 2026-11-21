import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import about_tech from "@/assets/about-tech.webp.asset.json";
import article_battery from "@/assets/article-battery.webp.asset.json";
import article_care from "@/assets/article-care.webp.asset.json";
import article_service from "@/assets/article-service.webp.asset.json";
import hero_laptop from "@/assets/hero-laptop.webp.asset.json";
import part_battery from "@/assets/part-battery.webp.asset.json";
import part_board from "@/assets/part-board.webp.asset.json";
import part_body from "@/assets/part-body.webp.asset.json";
import part_charger from "@/assets/part-charger.webp.asset.json";
import part_fan from "@/assets/part-fan.webp.asset.json";
import part_keyboard from "@/assets/part-keyboard.webp.asset.json";
import part_touchpad from "@/assets/part-touchpad.webp.asset.json";
import parts_campaign from "@/assets/parts-campaign.webp.asset.json";
import repair_battery from "@/assets/repair-battery.webp.asset.json";
import repair_fan from "@/assets/repair-fan.webp.asset.json";
import repair_motherboard from "@/assets/repair-motherboard.webp.asset.json";
const images = {
  about_tech: about_tech.url,
  article_battery: article_battery.url,
  article_care: article_care.url,
  article_service: article_service.url,
  hero_laptop: hero_laptop.url,
  part_battery: part_battery.url,
  part_board: part_board.url,
  part_body: part_body.url,
  part_charger: part_charger.url,
  part_fan: part_fan.url,
  part_keyboard: part_keyboard.url,
  part_touchpad: part_touchpad.url,
  parts_campaign: parts_campaign.url,
  repair_battery: repair_battery.url,
  repair_fan: repair_fan.url,
  repair_motherboard: repair_motherboard.url,
};

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
    if (target.closest(".cart-trigger")) {
      const trigger = target.closest<HTMLElement>(".cart-trigger");
      triggerRef.current = trigger;
      setCartOpen(true);
    }
    if (target.closest(".drawer-close")) setCartOpen(false);
    if (target.closest("#clear-cart")) setCart([]);
    const product = target.closest<HTMLElement>(".add-to-cart")?.dataset["product"];
    if (product) {
      setCart((items) => [...items, product]);
      setToast(`${product} به سبد آزمایشی اضافه شد`);
    }
    const link = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (link) {
      setMenuOpen(false);
      setActiveSection(link.hash);
    }
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchRef.current?.value.trim().toLocaleLowerCase("fa") ?? "";
    if (!query) return;
    const nodes = shellRef.current?.querySelectorAll(
      "main h2, main h3, .category-item strong, .brand-tile",
    );
    const target = Array.from(nodes ?? []).find((node) =>
      node.textContent?.toLocaleLowerCase("fa").includes(query),
    );
    if (target) {
      setSearchOpen(false);
      target
        .closest("section, .product-card, .category-item")
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "center",
        });
      setToast("نتیجه مرتبط در همین صفحه پیدا شد");
    } else
      setToast("موردی در این پیش‌نمایش پیدا نشد؛ جستجوی واقعی هنگام اتصال به سایت فعال می‌شود.");
  }

  return (
    <div className="site-shell" dir="rtl" ref={shellRef} onClick={handleClick}>
      <a href="#main" className="skip-link">
        رفتن به محتوای اصلی
      </a>

      <svg className="sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <symbol id="i-arrow" viewBox="0 0 24 24">
          <path d="M19 12H5m7 7-7-7 7-7" />
        </symbol>
        <symbol id="i-chevron" viewBox="0 0 24 24">
          <path d="m7 10 5 5 5-5" />
        </symbol>
        <symbol id="i-search" viewBox="0 0 24 24">
          <circle cx="10.7" cy="10.7" r="6.7" />
          <path d="m16 16 5 5" />
        </symbol>
        <symbol id="i-cart" viewBox="0 0 24 24">
          <path d="M3 4h2l2.3 11.2h11.9L22 7H6M9 20h.01M18 20h.01" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 24 24">
          <path d="M5 5 19 19M19 5 5 19" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24">
          <path d="M22 16.6v3a2 2 0 0 1-2.2 2A19.5 19.5 0 0 1 2.4 4.2 2 2 0 0 1 4.4 2h3a2 2 0 0 1 2 1.7l.6 3.3a2 2 0 0 1-.6 1.8L7.5 10a15 15 0 0 0 6.5 6.5l1.2-1.9a2 2 0 0 1 1.8-.6l3.3.6a2 2 0 0 1 1.7 2z" />
        </symbol>
        <symbol id="i-headset" viewBox="0 0 24 24">
          <path d="M4 14v-3a8 8 0 0 1 16 0v5a4 4 0 0 1-4 4h-2M4 13h2a2 2 0 0 1 2 2v3H6a3 3 0 0 1-3-3v-1a1 1 0 0 1 1-1Zm16 0h-2a2 2 0 0 0-2 2v3h2a3 3 0 0 0 3-3v-1a1 1 0 0 0-1-1Z" />
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24">
          <path d="M12 2 21 6v6c0 5.2-3.7 8.4-9 10-5.3-1.6-9-4.8-9-10V6l9-4Z" />
          <path d="m8 12 2.8 2.8L16.5 9" />
        </symbol>
        <symbol id="i-wrench" viewBox="0 0 24 24">
          <path d="M14 6a6 6 0 0 0-7.9 7.9l-4.5 4.5a2 2 0 0 0 2.8 2.8l4.5-4.5A6 6 0 0 0 17 8l-3.5 3.5-3-3L14 5Z" />
        </symbol>
        <symbol id="i-zap" viewBox="0 0 24 24">
          <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" />
        </symbol>
        <symbol id="i-box" viewBox="0 0 24 24">
          <path d="m12 2 9 5-9 5-9-5 9-5Zm-9 5v10l9 5 9-5V7M12 12v10" />
        </symbol>
        <symbol id="i-user" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="m4 12 5 5L20 6" />
        </symbol>
        <symbol id="i-map" viewBox="0 0 24 24">
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="2.7" />
        </symbol>
        <symbol id="i-laptop" viewBox="0 0 24 24">
          <rect x="4" y="3" width="16" height="13" rx="1.5" />
          <path d="m2 20 2-4h16l2 4H2Z" />
        </symbol>
        <symbol id="i-truck" viewBox="0 0 24 24">
          <path d="M2 5h12v12H2zM14 9h4l4 4v4h-8" />
          <circle cx="6" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </symbol>
        <symbol id="i-instagram" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </symbol>
        <symbol id="i-book" viewBox="0 0 24 24">
          <path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Zm0 0v14" />
        </symbol>
        <symbol id="i-clock" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6l4 2" />
        </symbol>
      </svg>

      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-right">
            <span>
              <svg className="ic">
                <use href="#i-headset" />
              </svg>{" "}
              مشاوره تخصصی قطعات و تعمیرات
            </span>
            <i></i>
            <span>
              <svg className="ic">
                <use href="#i-shield" />
              </svg>{" "}
              خدمات حرفه‌ای تکنولپ
            </span>
          </div>
          <div className="topbar-left">
            <a href="#contact">
              <svg className="ic">
                <use href="#i-phone" />
              </svg>{" "}
              تماس با ما
            </a>
            <span className="topbar-sep"></span>
            <a href="#about">
              <svg className="ic">
                <use href="#i-map" />
              </svg>{" "}
              کرج، جهانشهر
            </a>
          </div>
        </div>
      </div>
      <header className="header" id="top">
        <div className="container header-inner">
          <a className="brand" href="#top" aria-label="تکنولپ - صفحه اصلی">
            <svg
              className="brand-mark"
              width="52"
              height="54"
              viewBox="0 0 60 60"
              role="img"
              aria-label="نماد تکنولپ"
            >
              <path
                d="M7 10h22v7H16v12H7V10Zm28 0h18v7H42v10h-7V10ZM7 36h9v10h13v7H7V36Zm28-5h18v22H35v-7h11v-8H35v-7Z"
                fill="var(--logo-primary)"
              />
              <path d="M20 21h10v10H20zm15 7h9v9h-9zM20 35h9v8h-9z" fill="var(--logo-secondary)" />
            </svg>
            <span className="brand-type">
              <strong>TECHNOLAP</strong>
              <b>تکنولپ</b>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="منوی اصلی">
            <a href="#top" className="active">
              صفحه اصلی
            </a>
            <a href="#services">تعمیر لپ تاپ</a>
            <a href="#categories">قطعات لپ تاپ</a>
            <a href="#brands">برندهای لپ تاپ</a>
            <a href="#wholesale">پخش عمده</a>
            <a href="#articles">مقالات</a>
            <a href="#about">درباره ما</a>
            <a href="#contact">تماس با ما</a>
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
              <svg className="ic">
                <use href="#i-search" />
              </svg>
            </Button>
            <Button
              variant="source"
              type="button"
              className="icon-btn cart-trigger"
              aria-label="سبد خرید آزمایشی"
            >
              <svg className="ic">
                <use href="#i-cart" />
              </svg>
              <span className="cart-count" id="cart-count">
                {cart.length.toLocaleString("fa-IR")}
              </span>
            </Button>
            <Button
              variant="source"
              type="button"
              className="icon-btn mobile-menu-btn"
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="ic">
                <use href="#i-menu" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="search-panel" id="search-panel" hidden={!searchOpen}>
          <form
            className="container search-inner"
            id="search-form"
            role="search"
            onSubmit={handleSearch}
          >
            <label htmlFor="site-search" className="visually-hidden">
              جستجو در صفحه
            </label>
            <svg className="ic">
              <use href="#i-search" />
            </svg>
            <input
              id="site-search"
              name="query"
              type="search"
              ref={searchRef}
              placeholder="جستجوی خدمات، قطعات و برندها..."
              autoComplete="off"
            />
            <Button variant="source" type="submit">
              جستجو
            </Button>
          </form>
        </div>
        <nav className="mobile-menu" id="mobile-menu" aria-label="منوی موبایل" hidden={!menuOpen}>
          <a href="#top">صفحه اصلی</a>
          <a href="#services">تعمیر لپ تاپ</a>
          <a href="#categories">قطعات لپ تاپ</a>
          <a href="#brands">برندهای لپ تاپ</a>
          <a href="#wholesale">پخش عمده</a>
          <a href="#articles">مقالات</a>
          <a href="#about">درباره ما</a>
          <a href="#contact">تماس با ما</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one"></div>
          <div className="hero-glow hero-glow-two"></div>
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="eyebrow eyebrow-light">
                <span className="eyebrow-dot"></span> TECHNOLAP{" "}
                <span className="eyebrow-divider">/</span> مرکز تخصصی تعمیرات و قطعات
              </span>
              <h1 id="hero-title">
                تعمیر تخصصی لپ‌تاپ <em>با دقت و کیفیت واقعی</em>
              </h1>
              <p className="hero-lead">
                مرکز تخصصی تعمیرات لپ‌تاپ و پخش قطعات. از عیب‌یابی و سرویس تخصصی تا تهیه قطعات
                موردنیاز دستگاه شما.
              </p>
              <ul className="hero-highlights" aria-label="ویژگی‌های خدمات">
                <li>
                  <svg className="ic">
                    <use href="#i-shield" />
                  </svg>
                  <span>تعمیر حرفه‌ای</span>
                </li>
                <li>
                  <svg className="ic">
                    <use href="#i-zap" />
                  </svg>
                  <span>خدمات تخصصی</span>
                </li>
                <li>
                  <svg className="ic">
                    <use href="#i-user" />
                  </svg>
                  <span>مشاوره پیش از تعمیر</span>
                </li>
                <li>
                  <svg className="ic">
                    <use href="#i-box" />
                  </svg>
                  <span>قطعات لپ‌تاپ</span>
                </li>
              </ul>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">
                  <svg className="ic">
                    <use href="#i-headset" />
                  </svg>{" "}
                  دریافت مشاوره{" "}
                  <svg className="ic arrow">
                    <use href="#i-arrow" />
                  </svg>
                </a>
                <a className="btn btn-outline-light" href="#services">
                  <svg className="ic">
                    <use href="#i-wrench" />
                  </svg>{" "}
                  مشاهده خدمات تعمیر
                </a>
              </div>
              <span className="hero-note">
                <span className="pulse-dot"></span> تعمیرات تخصصی و فروش قطعات لپ‌تاپ در کرج
              </span>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="hero-photo-frame">
                <img src={images.hero_laptop} alt="" fetchPriority="high" decoding="async" />
              </div>
              <span className="hero-orbit"></span>
              <span className="hero-spark s1"></span>
              <span className="hero-spark s2"></span>
              <div className="hero-floating-label">
                <span className="label-icon">
                  <svg className="ic">
                    <use href="#i-wrench" />
                  </svg>
                </span>
                <span>
                  TECHNOLAP
                  <br />
                  <strong>Precision Repair</strong>
                </span>
              </div>
            </div>
          </div>
          <div className="hero-curve" aria-hidden="true"></div>
        </section>

        <section className="categories section" id="categories" aria-labelledby="cat-title">
          <div className="container">
            <div className="section-heading centered">
              <span className="mini-label">فروشگاه قطعات</span>
              <h2 id="cat-title">
                دسته‌بندی <span>قطعات لپ‌تاپ</span>
              </h2>
              <p>دسترسی سریع به قطعات پرکاربرد لپ‌تاپ و لوازم جانبی</p>
            </div>
            <div className="category-track" aria-label="دسته‌بندی قطعات">
              <a className="category-item" href="#products">
                <span className="category-image">
                  <img src={images.part_board} alt="برد لپ‌تاپ" loading="lazy" />
                </span>
                <strong>بردهای جانبی</strong>
              </a>
              <a className="category-item" href="#products">
                <span className="category-image">
                  <img src={images.part_charger} alt="شارژر لپ‌تاپ" loading="lazy" />
                </span>
                <strong>شارژر</strong>
              </a>
              <a className="category-item" href="#products">
                <span className="category-image">
                  <img src={images.part_touchpad} alt="تاچ‌پد لپ‌تاپ" loading="lazy" />
                </span>
                <strong>تاچ پد</strong>
              </a>
              <a className="category-item" href="#products">
                <span className="category-image">
                  <img src={images.part_fan} alt="فن و هیت سینک لپ‌تاپ" loading="lazy" />
                </span>
                <strong>فن و هیت‌سینک</strong>
              </a>
              <a className="category-item" href="#products">
                <span className="category-image">
                  <img src={images.part_keyboard} alt="کیبورد لپ‌تاپ" loading="lazy" />
                </span>
                <strong>کیبورد</strong>
              </a>
              <a className="category-item" href="#products">
                <span className="category-image">
                  <img src={images.part_body} alt="قاب لپ‌تاپ" loading="lazy" />
                </span>
                <strong>قاب و بدنه</strong>
              </a>
              <a className="category-item" href="#products">
                <span className="category-image">
                  <img src={images.part_battery} alt="باتری لپ‌تاپ" loading="lazy" />
                </span>
                <strong>باتری</strong>
              </a>
            </div>
          </div>
        </section>

        <section className="services section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-heading section-heading-row">
              <div>
                <span className="mini-label">خدمات تکنولپ</span>
                <h2 id="services-title">
                  تعمیرات <span>حرفه‌ای و تخصصی</span>
                </h2>
                <p>خدمات تخصصی عیب‌یابی، تعمیر و سرویس لپ‌تاپ در کرج</p>
              </div>
              <a href="#contact" className="text-link">
                درخواست مشاوره{" "}
                <svg className="ic">
                  <use href="#i-arrow" />
                </svg>
              </a>
            </div>
            <div className="service-grid">
              <a href="#contact" className="service-card">
                <img src={images.repair_fan} alt="سرویس و فن لپ‌تاپ" loading="lazy" />
                <span className="service-shade"></span>
                <span className="service-label">
                  <span className="service-symbol">
                    <svg className="ic">
                      <use href="#i-wrench" />
                    </svg>
                  </span>
                  <span>
                    <strong>سرویس کامل و فن‌کشی</strong>
                    <small>تمیزکاری، بررسی سیستم خنک‌کننده و سرویس</small>
                  </span>
                </span>
                <span className="service-arrow">
                  <svg className="ic">
                    <use href="#i-arrow" />
                  </svg>
                </span>
              </a>
              <a href="#contact" className="service-card">
                <img
                  src={images.repair_motherboard}
                  alt="تعمیر برد و مادربرد لپ‌تاپ"
                  loading="lazy"
                />
                <span className="service-shade"></span>
                <span className="service-label">
                  <span className="service-symbol">
                    <svg className="ic">
                      <use href="#i-laptop" />
                    </svg>
                  </span>
                  <span>
                    <strong>تعمیر مادربرد و قطعات</strong>
                    <small>عیب‌یابی تخصصی و تعمیر مدارهای لپ‌تاپ</small>
                  </span>
                </span>
                <span className="service-arrow">
                  <svg className="ic">
                    <use href="#i-arrow" />
                  </svg>
                </span>
              </a>
              <a href="#contact" className="service-card">
                <img src={images.repair_battery} alt="تعمیر یا تعویض باتری لپ‌تاپ" loading="lazy" />
                <span className="service-shade"></span>
                <span className="service-label">
                  <span className="service-symbol">
                    <svg className="ic">
                      <use href="#i-zap" />
                    </svg>
                  </span>
                  <span>
                    <strong>تعمیر و تعویض باتری</strong>
                    <small>بررسی سلامت و مشکلات شارژ و باتری</small>
                  </span>
                </span>
                <span className="service-arrow">
                  <svg className="ic">
                    <use href="#i-arrow" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="brands section" id="brands" aria-labelledby="brands-title">
          <div className="container">
            <div className="section-heading section-heading-row">
              <div>
                <span className="mini-label">برندهای لپ‌تاپ</span>
                <h2 id="brands-title">
                  قطعات برای <span>برندهای مختلف</span>
                </h2>
                <p>برای انتخاب قطعه مناسب دستگاه خود، برند لپ‌تاپ را بررسی کنید</p>
              </div>
              <a className="text-link" href="#contact">
                راهنمای انتخاب قطعه{" "}
                <svg className="ic">
                  <use href="#i-arrow" />
                </svg>
              </a>
            </div>
            <div className="brand-grid">
              <a href="#products" className="brand-tile">
                <span className="brand-name brand-asus">ASUS</span>
              </a>
              <a href="#products" className="brand-tile">
                <span className="brand-name brand-dell">DELL</span>
              </a>
              <a href="#products" className="brand-tile">
                <span className="brand-name brand-lenovo">Lenovo</span>
              </a>
              <a href="#products" className="brand-tile">
                <span className="brand-name brand-hp">hp</span>
              </a>
              <a href="#products" className="brand-tile">
                <span className="brand-name brand-sony">VAIO</span>
              </a>
              <a href="#products" className="brand-tile">
                <span className="brand-name brand-apple">Apple</span>
              </a>
              <a href="#products" className="brand-tile">
                <span className="brand-name brand-acer">acer</span>
              </a>
              <a href="#products" className="brand-tile">
                <span className="brand-name brand-msi">msi</span>
              </a>
              <a href="#products" className="brand-tile">
                <span className="brand-name brand-fujitsu">FUJITSU</span>
              </a>
            </div>
          </div>
        </section>

        <section className="products section" id="products" aria-labelledby="products-title">
          <div className="container">
            <div className="section-heading section-heading-row">
              <div>
                <span className="mini-label">فروش قطعات</span>
                <h2 id="products-title">
                  قطعات و لوازم <span>پرکاربرد</span>
                </h2>
                <p>نمونه‌ای از دسته‌های قطعات و لوازم جانبی لپ‌تاپ</p>
              </div>
              <a className="text-link" href="#categories">
                همه دسته‌بندی‌ها{" "}
                <svg className="ic">
                  <use href="#i-arrow" />
                </svg>
              </a>
            </div>
            <div className="products-layout">
              <div className="product-grid">
                <article className="product-card">
                  <div className="product-image">
                    <img src={images.part_battery} alt="باتری لپ‌تاپ" loading="lazy" />
                  </div>
                  <div className="product-meta">
                    <span className="product-category">لوازم و قطعات لپ‌تاپ</span>
                    <h3>باتری لپ‌تاپ</h3>
                    <Button
                      variant="source"
                      type="button"
                      className="product-action add-to-cart"
                      data-product="باتری لپ‌تاپ"
                      aria-label="افزودن باتری لپ‌تاپ به سبد آزمایشی"
                    >
                      <svg className="ic">
                        <use href="#i-cart" />
                      </svg>
                    </Button>
                  </div>
                </article>
                <article className="product-card">
                  <div className="product-image">
                    <img src={images.part_charger} alt="شارژر لپ‌تاپ" loading="lazy" />
                  </div>
                  <div className="product-meta">
                    <span className="product-category">لوازم و قطعات لپ‌تاپ</span>
                    <h3>شارژر لپ‌تاپ</h3>
                    <Button
                      variant="source"
                      type="button"
                      className="product-action add-to-cart"
                      data-product="شارژر لپ‌تاپ"
                      aria-label="افزودن شارژر لپ‌تاپ به سبد آزمایشی"
                    >
                      <svg className="ic">
                        <use href="#i-cart" />
                      </svg>
                    </Button>
                  </div>
                </article>
                <article className="product-card">
                  <div className="product-image">
                    <img src={images.part_keyboard} alt="کیبورد لپ‌تاپ" loading="lazy" />
                  </div>
                  <div className="product-meta">
                    <span className="product-category">لوازم و قطعات لپ‌تاپ</span>
                    <h3>کیبورد لپ‌تاپ</h3>
                    <Button
                      variant="source"
                      type="button"
                      className="product-action add-to-cart"
                      data-product="کیبورد لپ‌تاپ"
                      aria-label="افزودن کیبورد لپ‌تاپ به سبد آزمایشی"
                    >
                      <svg className="ic">
                        <use href="#i-cart" />
                      </svg>
                    </Button>
                  </div>
                </article>
              </div>
              <a href="#categories" className="campaign-card" id="wholesale">
                <div className="campaign-photo">
                  <img src={images.parts_campaign} alt="قطعات و تجهیزات لپ‌تاپ" loading="lazy" />
                </div>
                <div className="campaign-content">
                  <span className="mini-label">فروشگاه تکنولپ</span>
                  <strong>انواع قطعات لپ‌تاپ</strong>
                  <p>قطعات موردنیاز تعمیرات و لوازم جانبی لپ‌تاپ</p>
                  <span className="campaign-link">
                    مشاهده دسته‌بندی‌ها{" "}
                    <svg className="ic">
                      <use href="#i-arrow" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="why section" aria-labelledby="why-title">
          <div className="container why-inner">
            <div className="why-copy">
              <span className="mini-label">چرا تکنولپ؟</span>
              <h2 id="why-title">
                یک همراه متخصص برای <span>لپ‌تاپ شما</span>
              </h2>
              <p>ترکیبی از خدمات تعمیرگاهی و دسترسی به قطعات موردنیاز لپ‌تاپ</p>
            </div>
            <div className="benefits">
              <div>
                <span>
                  <svg className="ic">
                    <use href="#i-wrench" />
                  </svg>
                </span>
                <strong>تعمیر تخصصی</strong>
                <small>عیب‌یابی و بررسی حرفه‌ای</small>
              </div>
              <div>
                <span>
                  <svg className="ic">
                    <use href="#i-shield" />
                  </svg>
                </span>
                <strong>توجه به کیفیت</strong>
                <small>دقت در انتخاب قطعات</small>
              </div>
              <div>
                <span>
                  <svg className="ic">
                    <use href="#i-headset" />
                  </svg>
                </span>
                <strong>مشاوره قطعات</strong>
                <small>راهنمایی پیش از خرید</small>
              </div>
            </div>
          </div>
        </section>

        <section className="articles section" id="articles" aria-labelledby="articles-title">
          <div className="container">
            <div className="section-heading section-heading-row">
              <div>
                <span className="mini-label">مجله تکنولپ</span>
                <h2 id="articles-title">
                  مقالات و <span>راهنماهای کاربردی</span>
                </h2>
                <p>محتوا درباره سرویس، نگهداری و قطعات لپ‌تاپ</p>
              </div>
              <a className="text-link" href="#contact">
                مشاهده راهنمایی‌ها{" "}
                <svg className="ic">
                  <use href="#i-arrow" />
                </svg>
              </a>
            </div>
            <div className="article-grid">
              <article className="article-card">
                <div className="article-image">
                  <img src={images.article_service} alt="قطعات و فن داخلی لپ‌تاپ" loading="lazy" />
                  <span>تعمیر و نگهداری</span>
                </div>
                <div className="article-body">
                  <h3>چه زمانی لپ‌تاپ به سرویس و تمیزکاری نیاز دارد؟</h3>
                  <p>نشانه‌های رایج گرم‌شدن دستگاه و نکاتی برای نگهداری بهتر</p>
                  <a href="#contact">
                    مشاوره تخصصی{" "}
                    <svg className="ic">
                      <use href="#i-arrow" />
                    </svg>
                  </a>
                </div>
              </article>
              <article className="article-card">
                <div className="article-image">
                  <img src={images.article_battery} alt="باتری لپ‌تاپ" loading="lazy" />
                  <span>راهنمای قطعات</span>
                </div>
                <div className="article-body">
                  <h3>علائم خرابی باتری لپ‌تاپ و زمان بررسی آن</h3>
                  <p>نکاتی برای تشخیص مشکلات شارژ و سلامت باتری</p>
                  <a href="#contact">
                    مشاوره تخصصی{" "}
                    <svg className="ic">
                      <use href="#i-arrow" />
                    </svg>
                  </a>
                </div>
              </article>
              <article className="article-card">
                <div className="article-image">
                  <img src={images.article_care} alt="نصب رم در لپ‌تاپ" loading="lazy" />
                  <span>آموزش و راهنما</span>
                </div>
                <div className="article-body">
                  <h3>ارتقای لپ‌تاپ با انتخاب قطعات مناسب</h3>
                  <p>در انتخاب رم، حافظه و قطعات سازگار چه مواردی مهم است؟</p>
                  <a href="#contact">
                    مشاوره تخصصی{" "}
                    <svg className="ic">
                      <use href="#i-arrow" />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="about section" id="about" aria-labelledby="about-title">
          <div className="container">
            <div className="about-card">
              <div className="about-copy">
                <span className="mini-label">درباره ما</span>
                <h2 id="about-title">
                  تکنولپ؛ تخصص در <span>تعمیر و قطعات لپ‌تاپ</span>
                </h2>
                <p>
                  تکنولپ مرکز تخصصی تعمیرات و پخش قطعات لپ‌تاپ در کرج است. خدمات تعمیرگاهی، عیب‌یابی
                  و تأمین قطعات موردنیاز لپ‌تاپ را در کنار هم ارائه می‌کند.
                </p>
                <p>
                  هدف ما فراهم‌کردن دسترسی ساده‌تر به خدمات تخصصی و راهنمایی مناسب برای تعمیر یا
                  تهیه قطعات دستگاه شماست.
                </p>
                <a href="#contact" className="btn btn-subtle">
                  ارتباط با تکنولپ{" "}
                  <svg className="ic arrow">
                    <use href="#i-arrow" />
                  </svg>
                </a>
              </div>
              <div className="about-image">
                <img
                  src={images.about_tech}
                  alt="تکنسین در حال تعمیر قطعات لپ‌تاپ"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container">
            <div className="contact-banner">
              <div className="contact-orb"></div>
              <div className="contact-text">
                <span className="contact-kicker">مشاوره و خدمات</span>
                <h2 id="contact-title">برای تعمیر لپ‌تاپ یا تهیه قطعه، نیاز به راهنمایی دارید؟</h2>
                <p>
                  برای دریافت مشاوره تخصصی و اطلاع از روش‌های ثبت درخواست با مجموعه در تماس باشید.
                </p>
              </div>
              <div className="contact-actions">
                <a
                  href="https://technolap.ir/"
                  className="btn btn-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ورود به سایت اصلی{" "}
                  <svg className="ic">
                    <use href="#i-arrow" />
                  </svg>
                </a>
                <a href="#top" className="btn btn-outline-light">
                  بازگشت به بالا
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a className="brand footer-logo" href="#top">
              <svg
                className="brand-mark"
                width="48"
                height="48"
                viewBox="0 0 60 60"
                aria-hidden="true"
              >
                <path
                  d="M7 10h22v7H16v12H7V10Zm28 0h18v7H42v10h-7V10ZM7 36h9v10h13v7H7V36Zm28-5h18v22H35v-7h11v-8H35v-7Z"
                  fill="var(--logo-footer-primary)"
                />
                <path
                  d="M20 21h10v10H20zm15 7h9v9h-9zM20 35h9v8h-9z"
                  fill="var(--logo-footer-secondary)"
                />
              </svg>
              <span className="brand-type">
                <strong>TECHNOLAP</strong>
                <b>تکنولپ</b>
              </span>
            </a>
            <p>مرکز تخصصی تعمیرات و پخش قطعات لپ‌تاپ در کرج.</p>
          </div>
          <div className="footer-links">
            <h3>دسترسی سریع</h3>
            <a href="#top">صفحه اصلی</a>
            <a href="#services">تعمیر لپ‌تاپ</a>
            <a href="#categories">قطعات لپ‌تاپ</a>
            <a href="#articles">مقالات</a>
          </div>
          <div className="footer-links">
            <h3>خدمات</h3>
            <a href="#services">سرویس لپ‌تاپ</a>
            <a href="#services">تعمیر مادربرد</a>
            <a href="#services">تعمیر باتری</a>
            <a href="#contact">مشاوره تخصصی</a>
          </div>
          <div className="footer-links">
            <h3>ارتباط با ما</h3>
            <span>
              <svg className="ic">
                <use href="#i-map" />
              </svg>{" "}
              کرج، جهانشهر
            </span>
            <a href="https://technolap.ir/" target="_blank" rel="noopener noreferrer">
              <svg className="ic">
                <use href="#i-laptop" />
              </svg>{" "}
              وب‌سایت تکنولپ
            </a>
            <a href="#contact" className={activeSection === "#contact" ? "selected" : ""}>
              <svg className="ic">
                <use href="#i-headset" />
              </svg>{" "}
              راهنمای دریافت خدمات
            </a>
          </div>
        </div>
        <div className="container copyright">
          <span>© تکنولپ — پیش‌نمایش طراحی رابط کاربری</span>
          <span>طراحی واکنش‌گرا برای دسکتاپ و موبایل</span>
        </div>
      </footer>

      <nav className="bottom-nav" aria-label="دسترسی سریع موبایل">
        <a href="#top" className={activeSection === "#top" ? "selected" : ""}>
          <svg className="ic">
            <use href="#i-laptop" />
          </svg>
          خانه
        </a>
        <a href="#categories" className={activeSection === "#categories" ? "selected" : ""}>
          <svg className="ic">
            <use href="#i-box" />
          </svg>
          قطعات
        </a>
        <a href="#services" className={activeSection === "#services" ? "selected" : ""}>
          <svg className="ic">
            <use href="#i-wrench" />
          </svg>
          تعمیرات
        </a>
        <a href="#articles" className={activeSection === "#articles" ? "selected" : ""}>
          <svg className="ic">
            <use href="#i-book" />
          </svg>
          مقالات
        </a>
        <a href="#contact" className={activeSection === "#contact" ? "selected" : ""}>
          <svg className="ic">
            <use href="#i-headset" />
          </svg>
          تماس
        </a>
      </nav>
      <div className="toast" id="toast" role="status" aria-live="polite" hidden={!toast}>
        {toast}
      </div>
      <div
        className="drawer-backdrop"
        id="drawer-backdrop"
        hidden={!cartOpen}
        onClick={() => setCartOpen(false)}
      ></div>
      <aside
        className="cart-drawer"
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        aria-hidden={!cartOpen}
        inert={!cartOpen}
      >
        <div className="drawer-head">
          <h2 id="drawer-title">
            سبد آزمایشی <span className="demo-tag">پیش‌نمایش</span>
          </h2>
          <Button variant="source" className="icon-btn drawer-close" aria-label="بستن سبد خرید">
            <svg className="ic">
              <use href="#i-close" />
            </svg>
          </Button>
        </div>
        <p className="drawer-help">این سبد فقط نمایشی است و به فروشگاه آنلاین متصل نیست.</p>
        <ul id="cart-items" className="cart-items">
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
            <li className="cart-empty">سبد آزمایشی شما خالی است.</li>
          )}
        </ul>
        <div className="drawer-foot">
          <Button variant="source" type="button" id="clear-cart" className="btn btn-subtle">
            خالی‌کردن سبد
          </Button>
          <a
            href="https://technolap.ir/"
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            سایت اصلی تکنولپ
          </a>
        </div>
      </aside>
    </div>
  );
}
