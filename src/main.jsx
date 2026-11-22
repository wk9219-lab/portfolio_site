import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

/* ---------- 滚动进场动画 Hook（轻量版 ScrollTrigger 替代） ---------- */
function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')]
    if (!els.length) return

    const reveal = (el) => el.classList.add('is-visible')

    // 兜底：检查元素是否已经进入视口
    const checkInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight
      els.forEach((el) => {
        if (el.classList.contains('is-visible')) return
        const r = el.getBoundingClientRect()
        if (r.top < vh * 0.92 && r.bottom > 0) reveal(el)
      })
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    )
    els.forEach((el) => io.observe(el))

    // 初始 + 滚动/尺寸变化时兜底
    requestAnimationFrame(checkInView)
    window.addEventListener('scroll', checkInView, { passive: true })
    window.addEventListener('resize', checkInView)

    return () => {
      io.disconnect()
      window.removeEventListener('scroll', checkInView)
      window.removeEventListener('resize', checkInView)
    }
  }, [])
}


/* ---------- 卡片鼠标跟随光晕 ---------- */
function useGlowTracking() {
  useEffect(() => {
    const cards = document.querySelectorAll('.glow-card')
    const handlers = []
    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - r.left}px`)
        card.style.setProperty('--my', `${e.clientY - r.top}px`)
      }
      card.addEventListener('mousemove', onMove)
      handlers.push([card, onMove])
    })
    return () => handlers.forEach(([c, h]) => c.removeEventListener('mousemove', h))
  }, [])
}

/* ---------- 简约线条图标（inline SVG, stroke 风格） ---------- */
const IconPhone = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M15.5 3.5a5.5 5.5 0 0 1 5 5" />
    <path d="M15.5 7a2.5 2.5 0 0 1 1.5 1.5" />
    <path d="M8.4 3.9 6.2 3.1a1.6 1.6 0 0 0-2 .8L3.4 5.7a2 2 0 0 0-.1 1.6c1.6 4.3 4.9 7.6 9.2 9.2a2 2 0 0 0 1.6-.1l1.8-.8a1.6 1.6 0 0 0 .8-2l-.8-2.2a1.6 1.6 0 0 0-1.8-1l-1.6.4a12 12 0 0 1-4.4-4.4l.4-1.6a1.6 1.6 0 0 0-1-1.8Z" />
  </svg>
)

const IconMail = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 7.4 5.3a2 2 0 0 0 2.2 0L20.5 7" />
  </svg>
)

const IconWeChat = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M9.2 4C5.6 4 2.7 6.5 2.7 9.6c0 1.8 1 3.4 2.6 4.4l-.7 2.2 2.5-1.3c.6.2 1.3.3 2 .3h.5" />
    <path d="M14.9 9.4c-3 0-5.4 2.1-5.4 4.7s2.4 4.7 5.4 4.7c.6 0 1.2-.1 1.7-.3l2.2 1.1-.6-1.9c1.4-.9 2.3-2.2 2.3-3.6 0-2.6-2.4-4.7-5.6-4.7Z" />
    <circle cx="7.1" cy="8.6" r=".9" fill="currentColor" stroke="none" />
    <circle cx="11.2" cy="8.6" r=".9" fill="currentColor" stroke="none" />
    <circle cx="13.3" cy="13.3" r=".8" fill="currentColor" stroke="none" />
    <circle cx="16.6" cy="13.3" r=".8" fill="currentColor" stroke="none" />
  </svg>
)
/* ---------- 磨砂悬浮导航 ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items = [
    ['#profile', '经历'],
    ['#projects', '项目'],
    ['#capabilities', '优势'],
    ['#contact', '联系'],
  ]

  return (
    <nav className={`nav ${scrolled ? 'nav--glass' : ''}`}>
      <a href="#hero" className="nav__logo">
        HUANGWENJIAN
      </a>
      <div className="nav__links">
        {items.map(([href, label]) => (
          <a key={href} href={href} className="nav__link">
            <span className="nav__bracket">[</span>
            {label}
            <span className="nav__bracket">]</span>
          </a>
        ))}
      </div>
      <a href="#contact" className="nav__cta">
        联系我
      </a>
    </nav>
  )
}

/* ---------- 首屏 Hero ---------- */
function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" className={`hero ${mounted ? 'hero--in' : ''}`}>
      {/* 动态渐变背景层 */}
      <div className="hero__bg" aria-hidden="true">
        <div className="blob blob--red" />
        <div className="blob blob--cyan" />
        <div className="grain" />
      </div>

      <div className="hero__inner">
        <div className="hero__top">
          <span className="tag">PORTFOLIO / 2026</span>
          <span className="tag tag--muted">VISUAL DESIGNER</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__line">
            <span className="hero__word">HUANG</span>
            <span className="hero__word hero__word--accent">WEN</span>
            <span className="hero__word">JIAN</span>
          </span>
        </h1>

        <p className="hero__sub">
          以品牌秩序与商业审美，构建可落地的视觉系统。
        </p>

        <div className="hero__stats">
          <div className="stat">
            <span className="stat__num">3+</span>
            <span className="stat__label">年全职经验</span>
          </div>
          <div className="stat">
            <span className="stat__num">500+</span>
            <span className="stat__label">年均落地作品</span>
          </div>
          <div className="stat">
            <span className="stat__num">95%+</span>
            <span className="stat__label">客户满意度</span>
          </div>
          <div className="stat">
            <span className="stat__num">20%+</span>
            <span className="stat__label">活动点击提升</span>
          </div>
        </div>

        <div className="hero__foot">
          <span className="hero__attitude">DESIGN IS NOT DECORATION</span>
          <a href="#projects" className="btn btn--primary">
            开始查看
            <span className="btn__arrow">→</span>
          </a>
        </div>
      </div>

      <div className="hero__scroll">
        <span>SCROLL</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}

/* ---------- 模块标题系统 ---------- */
function SectionTitle({ en, cn }) {
  return (
    <div className="section-title" data-reveal>
      <h2 className="section-title__en">{en}</h2>
      <span className="section-title__cn">{cn}</span>
    </div>
  )
}

/* ---------- 个人经历 ---------- */
function Profile() {
  const jobs = [
    {
      date: '2023.04 - 至今',
      company: '未来影像科技有限公司',
      role: '视觉设计师 / 设计负责人',
      desc: '负责品牌视觉体系搭建与视觉项目主导，统筹跨部门设计协作。',
    },
    {
      date: '2020.09 - 2023.03',
      company: '星火智能科技有限公司',
      role: 'AIGC 设计师',
      desc: '将 AI 工具应用于创意发散、概念图与营销素材生成，提升内容产出效率。',
    },
    {
      date: '2019.06 - 2020.08',
      company: '云象互动科技有限公司',
      role: '平面设计师',
      desc: '负责电商视觉、活动页面与新媒体素材的设计执行。',
    },
  ]

  return (
    <section id="profile" className="section">
      <SectionTitle en="PROFILE" cn="个人经历" />

      <div className="profile">
        <div className="profile__intro" data-reveal>
          <div className="profile__avatar">
            <span>黄</span>
          </div>
          <h3 className="profile__name">黄文健</h3>
          <p className="profile__role">Visual Designer · Brand / 3D / AIGC</p>
          <p className="profile__text">
            拥有 3 年专业视觉设计经验，覆盖品牌 VI、平面宣传、电商视觉、新媒体视觉与包装设计。
            擅长将品牌调性、用户审美与市场需求转译为稳定、高质感、可执行的视觉方案。
          </p>
          <div className="profile__contact">
            <a className="contact-item" href="tel:138xxxx6789">
              <IconPhone className="contact-item__icon" />
              <span>138xxxx6789</span>
            </a>
            <a className="contact-item" href="mailto:530644062@qq.com">
              <IconMail className="contact-item__icon" />
              <span>530644062@qq.com</span>
            </a>
            <span className="contact-item">
              <IconWeChat className="contact-item__icon" />
              <span>WeChat：wk9219</span>
            </span>
          </div>
        </div>

        <div className="profile__timeline">
          {jobs.map((j, i) => (
            <div className="job glow-card" key={i} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="job__date">{j.date}</span>
              <h4 className="job__company">{j.company}</h4>
              <span className="job__role">{j.role}</span>
              <p className="job__desc">{j.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- 精选项目 ---------- */
function Projects() {
  const list = [
    {
      no: '01',
      title: '品牌 VI 视觉升级',
      meta: '2023.04 - 2023.06 / 视觉主设计师',
      desc: '完成品牌色彩体系、字体规范、LOGO 延展、图标系统与全渠道视觉规范，推动品牌形象年轻化与标准化。',
      tone: 'red',
    },
    {
      no: '02',
      title: '全年节日营销视觉全案',
      meta: '2022.08 - 至今 / 视觉设计师',
      desc: '围绕电商大促、节日节点与品牌专场，输出活动首页、海报、详情页、引流配图与短视频封面。',
      tone: 'cyan',
    },
    {
      no: '03',
      title: '电商店铺视觉优化',
      meta: '首页改版 / 详情页 / 主图精修',
      desc: '优化页面视觉层级与浏览路径，提升商品呈现质感，并为运营活动提供稳定视觉支撑。',
      tone: 'amber',
    },
  ]

  return (
    <section id="projects" className="section">
      <SectionTitle en="SELECTED WORK" cn="精选项目" />
      <p className="section__note" data-reveal>
        先以高级占位图建立展示节奏，后续可替换为品牌 VI、商业海报、电商详情页、包装设计等真实作品。
      </p>

      <div className="projects">
        {list.map((p, i) => (
          <article
            className={`project project--${p.tone}`}
            key={i}
            data-reveal
            style={{ transitionDelay: `${i * 110}ms` }}
          >
            <div className="project__visual">
              <span className="project__no">{p.no}</span>
              <div className="project__orb" />
            </div>
            <div className="project__body">
              <h3 className="project__title">{p.title}</h3>
              <span className="project__meta">{p.meta}</span>
              <p className="project__desc">{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ---------- 个人优势 ---------- */
function Capabilities() {
  const items = [
    {
      title: '商业设计思维',
      desc: '不止于审美表达，更关注营销目标、平台规范与最终落地效果。',
    },
    {
      title: '品牌视觉系统',
      desc: '熟悉 VI 规范、品牌延展、视觉资产沉淀与多渠道一致性管理。',
    },
    {
      title: '高效协作交付',
      desc: '可独立完成需求拆解、方案构思、修改优化与跨部门沟通。',
    },
    {
      title: '趋势与风格迭代',
      desc: '持续跟进设计趋势，能适配互联网、电商、文创与品牌营销场景。',
    },
  ]

  return (
    <section id="capabilities" className="section">
      <SectionTitle en="CAPABILITIES" cn="个人优势" />
      <div className="caps">
        {items.map((c, i) => (
          <div className="cap glow-card" key={i} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
            <span className="cap__no">0{i + 1}</span>
            <h3 className="cap__title">{c.title}</h3>
            <p className="cap__desc">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- 联系方式 ---------- */
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__bg" aria-hidden="true">
        <div className="blob blob--red contact__blob" />
        <div className="grain" />
      </div>

      <div className="contact__inner" data-reveal>
        <SectionTitle en="CONTACT" cn="联系方式" />
        <h2 className="contact__big">
          LET'S BUILD
          <br />
          <span className="contact__accent">BETTER VISUAL</span>
          <br />
          SYSTEMS
        </h2>
        <p className="contact__text">
          期待与品牌、产品和市场团队一起，把视觉做得更有辨识度。
        </p>
        <div className="contact__row">
          <a href="mailto:530644062@qq.com" className="btn btn--primary">
            <IconMail className="btn__icon" />
            发送邮件
            <span className="btn__arrow">→</span>
          </a>
          <span className="contact-item contact-item--light">
            <IconWeChat className="contact-item__icon" />
            <span>WeChat：wk9219</span>
          </span>
        </div>
        <div className="contact__meta">
          <span className="contact-item contact-item--light">
            <IconPhone className="contact-item__icon" />
            <span>138xxxx6789</span>
          </span>
          <span className="contact-item contact-item--light">
            <IconMail className="contact-item__icon" />
            <span>530644062@qq.com</span>
          </span>
        </div>
      </div>

      <footer className="footer">
        <span>© 2026 HUANGWENJIAN · Visual Designer</span>
        <span>Built with React + Vite</span>
      </footer>
    </section>
  )
}

/* ---------- App ---------- */
function App() {
  useReveal()
  useGlowTracking()
  return (
    <>
      <Navbar />
      <Hero />
      <main className="main">
        <Profile />
        <Projects />
        <Capabilities />
      </main>
      <Contact />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)

