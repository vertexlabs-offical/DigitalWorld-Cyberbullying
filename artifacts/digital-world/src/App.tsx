import { useState } from 'react';
import { ArrowUpRight, Award, Crown, X, Menu, Shield, AlertTriangle, BookOpen, Users, ChevronRight, ExternalLink } from 'lucide-react';
import bgVideo from '@assets/13dbcc57-d1fc-4339-a634-8a651e4288c7_1783616659657.mp4';

type Page = 'home' | 'about' | 'awareness';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Awareness', page: 'awareness' },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black font-inter">
      {/* ── Background Video (always present) ─────────────────── */}
      <div className="fixed inset-0 z-0">
        <video
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Anime-style overlay: deep dark gradient + scanline effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 scanlines pointer-events-none" />
        {/* Neon corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-400/40" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-purple-500/40" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-purple-500/40" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-cyan-400/40" />
      </div>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 lg:py-7 backdrop-blur-sm border-b border-white/5">
        {/* Brand */}
        <button
          onClick={() => { setPage('home'); setMenuOpen(false); }}
          className="font-podium text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white hover:text-cyan-300 transition-colors glitch-hover"
        >
          DIGITAL WORLD
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((n) => (
            <button
              key={n.page}
              onClick={() => setPage(n.page)}
              className={`font-inter text-sm tracking-widest uppercase transition-colors relative group ${
                page === n.page ? 'text-cyan-300' : 'text-white/70 hover:text-white'
              }`}
            >
              {n.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all duration-300 ${
                page === n.page ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => setPage('awareness')}
          className="hidden md:flex items-center gap-2 border border-white/30 hover:border-cyan-400/60 px-6 py-3 text-xs text-white/80 hover:text-cyan-300 tracking-widest uppercase hover:bg-cyan-400/10 transition-all duration-300"
        >
          TAKE ACTION <ArrowUpRight className="w-3 h-3" />
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col space-y-1.5 p-2"
          aria-label="Open menu"
        >
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-6 h-0.5 bg-white" />
          <div className="w-4 h-0.5 bg-white" />
        </button>
      </nav>

      {/* ── Mobile Menu Overlay ─────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(8px)' }}
      >
        {/* Scanlines on menu too */}
        <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />

        {/* Header row */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-5">
          <span className="font-podium text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            DIGITAL WORLD
          </span>
          <button onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-cyan-300 transition-colors">
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Centered links */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-8">
          {navLinks.map((n, i) => (
            <button
              key={n.page}
              onClick={() => { setPage(n.page); setMenuOpen(false); }}
              className="font-podium text-4xl sm:text-5xl text-white uppercase hover:text-cyan-300 transition-all duration-300"
              style={{
                transitionDelay: `${i * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {n.label}
            </button>
          ))}
          <button
            onClick={() => { setPage('awareness'); setMenuOpen(false); }}
            className="mt-4 border border-white/30 hover:border-cyan-400/60 px-8 py-4 text-sm text-white/80 hover:text-cyan-300 tracking-widest uppercase hover:bg-cyan-400/10 transition-all duration-300 flex items-center gap-2"
            style={{
              transitionDelay: `${navLinks.length * 80 + 100}ms`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            TAKE ACTION <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Page Content ──────────────────────────────────────────── */}
      <main className="relative z-10">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'about' && <AboutPage setPage={setPage} />}
        {page === 'awareness' && <AwarenessPage />}
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════ */
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-24 pb-12">
      {/* Tagline */}
      <div className="flex items-center gap-2 mb-6 lg:mb-8 animate-fade-up">
        <Crown className="w-4 h-4 text-cyan-400" />
        <span className="font-inter text-xs sm:text-sm text-white/70 tracking-[0.3em] uppercase">
          IGCSE Research Project · EPS Bhopal
        </span>
      </div>

      {/* Main heading — anime drama */}
      <h1 className="font-podium text-white uppercase leading-[0.92] tracking-tight animate-fade-up-delay-1 mb-2">
        <span className="block text-[clamp(2.8rem,8vw,7rem)] neon-text-cyan">Digital.</span>
        <span className="block text-[clamp(2.8rem,8vw,7rem)] neon-text-purple">World.</span>
        <span className="block text-[clamp(2.8rem,8vw,7rem)] text-white">Aware.</span>
      </h1>

      {/* Speed-line accent */}
      <div className="speed-lines my-4 animate-fade-up-delay-1" />

      {/* Subtext */}
      <p className="text-white/70 text-sm sm:text-base font-inter leading-relaxed max-w-md animate-fade-up-delay-2 mt-4 lg:mt-6">
        The internet can be a dangerous place.{' '}
        <br />
        Cyberbullying affects millions of young people —{' '}
        <strong className="text-white font-semibold">you don't have to face it alone.</strong>
      </p>

      {/* CTA Row */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 lg:mt-10 animate-fade-up-delay-3">
        <button
          onClick={() => setPage('awareness')}
          className="group flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase font-semibold transition-all duration-300 neon-shadow-cyan"
        >
          LEARN MORE
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
        <button
          onClick={() => setPage('about')}
          className="group flex items-center gap-2 border border-white/30 hover:border-purple-400/60 text-white/80 hover:text-purple-300 px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase transition-all duration-300"
        >
          ABOUT US
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <Award className="w-8 h-8 text-white/50" />
          <div>
            <p className="text-white/60 text-xs tracking-wider uppercase">Research</p>
            <p className="text-white/60 text-xs tracking-wider uppercase">Project 2024</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 sm:gap-12 lg:gap-16 mt-8 sm:mt-10 lg:mt-14 animate-fade-up-delay-4">
        {[
          { value: '1 in 5', label: 'Teens Cyberbullied' },
          { value: '59%', label: 'Never Tell Adults' },
          { value: '4500+', label: 'Youth Suicides / yr' },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="font-inter text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight neon-text-cyan">
              {stat.value}
            </p>
            <p className="text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT US PAGE
═══════════════════════════════════════════════════════════════ */
function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  const members = [
    { name: 'Research Lead', role: 'IGCSE Student · EPS Bhopal', desc: 'Led the research and data compilation on cyberbullying statistics and case studies.' },
    { name: 'Content Writer', role: 'IGCSE Student · EPS Bhopal', desc: 'Authored awareness content, in-text citations, and course-of-action guides.' },
    { name: 'Web Designer', role: 'IGCSE Student · EPS Bhopal', desc: 'Designed and developed this awareness platform.' },
    { name: 'Presenter', role: 'IGCSE Student · EPS Bhopal', desc: 'Handled visual storytelling and project presentation.' },
  ];

  return (
    <section className="min-h-screen pt-28 pb-16 px-6 sm:px-10 lg:px-16">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-purple-400" />
          <span className="font-inter text-xs text-white/50 tracking-[0.3em] uppercase">Meet The Team</span>
        </div>
        <h2 className="font-podium text-white uppercase leading-[0.92] tracking-tight">
          <span className="block text-[clamp(2.4rem,6vw,5.5rem)] neon-text-purple">About</span>
          <span className="block text-[clamp(2.4rem,6vw,5.5rem)]">Us.</span>
        </h2>
        <div className="speed-lines my-4" />
      </div>

      {/* School banner */}
      <div className="animate-fade-up-delay-1 mt-8 border border-purple-500/30 bg-purple-500/10 p-6 max-w-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 border-2 border-purple-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="font-podium text-xl text-white uppercase tracking-wider">EPS Bhopal</p>
            <p className="font-inter text-white/60 text-sm mt-1 leading-relaxed">
              We are students of the{' '}
              <span className="text-purple-300 font-semibold">International General Certificate of Secondary Education (IGCSE)</span>{' '}
              programme at EPS Bhopal. This website is our research project focused on spreading awareness about cyberbullying in the digital world.
            </p>
          </div>
        </div>
      </div>

      {/* Mission statement */}
      <div className="animate-fade-up-delay-2 mt-8 max-w-2xl">
        <h3 className="font-podium text-cyan-300 uppercase tracking-wider text-lg mb-3">Our Mission</h3>
        <p className="font-inter text-white/70 text-sm sm:text-base leading-relaxed">
          As young people growing up in a hyper-connected digital world, we have witnessed and experienced the real impact of cyberbullying firsthand. Through this research project, we aim to educate our peers, families, and communities about the risks, signs, and solutions to online harassment — because awareness is the first step toward change.
        </p>
      </div>

      {/* Team grid */}
      <div className="animate-fade-up-delay-3 mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {members.map((m, i) => (
          <div
            key={i}
            className="border border-white/10 hover:border-cyan-400/40 bg-white/5 hover:bg-cyan-400/5 p-5 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center mb-3 text-white font-bold text-sm">
              {i + 1}
            </div>
            <p className="font-podium text-white uppercase tracking-wide text-base group-hover:text-cyan-300 transition-colors">
              {m.name}
            </p>
            <p className="font-inter text-white/40 text-xs tracking-widest uppercase mt-1">{m.role}</p>
            <p className="font-inter text-white/60 text-xs leading-relaxed mt-2">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="animate-fade-up-delay-4 mt-12">
        <button
          onClick={() => setPage('awareness')}
          className="group flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-7 py-4 text-xs tracking-widest uppercase font-semibold transition-all duration-300 neon-shadow-cyan"
        >
          READ OUR RESEARCH
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AWARENESS PAGE
═══════════════════════════════════════════════════════════════ */
function AwarenessPage() {
  const [tab, setTab] = useState<'what' | 'types' | 'effects' | 'action'>('what');

  const tabs = [
    { id: 'what', label: 'What is it?' },
    { id: 'types', label: 'Types' },
    { id: 'effects', label: 'Effects' },
    { id: 'action', label: 'Take Action' },
  ] as const;

  return (
    <section className="min-h-screen pt-28 pb-16 px-6 sm:px-10 lg:px-16">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span className="font-inter text-xs text-white/50 tracking-[0.3em] uppercase">Awareness · Research</span>
        </div>
        <h2 className="font-podium text-white uppercase leading-[0.92] tracking-tight">
          <span className="block text-[clamp(2.2rem,5vw,5rem)] neon-text-cyan">Cyber</span>
          <span className="block text-[clamp(2.2rem,5vw,5rem)]">Bullying.</span>
        </h2>
        <div className="speed-lines my-4" />
      </div>

      {/* Alert banner */}
      <div className="animate-fade-up-delay-1 mt-6 flex items-start gap-3 border border-red-500/40 bg-red-500/10 p-4 max-w-3xl">
        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <p className="font-inter text-white/80 text-sm leading-relaxed">
          <strong className="text-red-300">Important:</strong> If you or someone you know is in immediate danger due to cyberbullying,
          contact your local emergency services or a trusted adult immediately.
        </p>
      </div>

      {/* Tab bar */}
      <div className="animate-fade-up-delay-1 mt-8 flex flex-wrap gap-2 border-b border-white/10 max-w-3xl">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`font-inter text-xs tracking-widest uppercase px-4 py-2 transition-all duration-200 border-b-2 -mb-px ${
              tab === t.id
                ? 'text-cyan-300 border-cyan-400'
                : 'text-white/50 border-transparent hover:text-white/80'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-8 max-w-3xl animate-fade-up-delay-2">
        {tab === 'what' && <WhatTab />}
        {tab === 'types' && <TypesTab />}
        {tab === 'effects' && <EffectsTab />}
        {tab === 'action' && <ActionTab />}
      </div>
    </section>
  );
}

function WhatTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-podium text-xl text-cyan-300 uppercase tracking-wider mb-3">Definition</h3>
        <p className="font-inter text-white/80 text-sm sm:text-base leading-relaxed">
          Cyberbullying is defined as the use of digital technologies — including mobile phones, computers, tablets, and social media platforms — to deliberately and repeatedly harm or harass another person (Hinduja &amp; Patchin, 2019). Unlike traditional bullying, cyberbullying can occur 24 hours a day, 7 days a week, and can reach a victim even when they are at home.
        </p>
      </div>

      <div>
        <h3 className="font-podium text-xl text-purple-300 uppercase tracking-wider mb-3">Key Characteristics</h3>
        <ul className="space-y-3">
          {[
            { title: 'Repetition', desc: 'Cyberbullying involves repeated harmful behaviour directed at a target over time (Smith et al., 2008).' },
            { title: 'Power Imbalance', desc: 'The bully exercises power over the victim — through social status, anonymity, or technical skill (Olweus, 1993).' },
            { title: 'Intentionality', desc: 'The harmful acts are deliberate rather than accidental.' },
            { title: 'Public Reach', desc: 'Content can be shared widely and quickly, amplifying humiliation (Kowalski et al., 2014).' },
          ].map((item) => (
            <li key={item.title} className="flex gap-3">
              <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="font-inter text-white/70 text-sm leading-relaxed">
                <strong className="text-white">{item.title}:</strong> {item.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-white/10 bg-white/5 p-5">
        <p className="font-inter text-white/60 text-xs tracking-widest uppercase mb-2">By The Numbers</p>
        <p className="font-inter text-white/80 text-sm leading-relaxed">
          According to the Cyberbullying Research Center, approximately{' '}
          <strong className="text-cyan-300">27.7% of students</strong> have been cyberbullied at some point in their lifetime (Hinduja &amp; Patchin, 2021). The Pew Research Center (2022) found that{' '}
          <strong className="text-cyan-300">46% of teens</strong> aged 13–17 have experienced some form of online harassment.
        </p>
      </div>
    </div>
  );
}

function TypesTab() {
  const types = [
    {
      name: 'Harassment',
      color: 'text-red-400',
      border: 'border-red-500/30',
      bg: 'bg-red-500/5',
      desc: 'Sending offensive, rude, or insulting messages repeatedly to an individual or group. This is the most common form of cyberbullying (Kowalski et al., 2014).',
    },
    {
      name: 'Cyberstalking',
      color: 'text-orange-400',
      border: 'border-orange-500/30',
      bg: 'bg-orange-500/5',
      desc: 'Repeated, intense harassment that includes threats and causes significant fear in the target. Often escalates to physical harm (Bauman, 2011).',
    },
    {
      name: 'Exclusion',
      color: 'text-yellow-400',
      border: 'border-yellow-500/30',
      bg: 'bg-yellow-500/5',
      desc: 'Intentionally leaving someone out of an online group, game, or social circle. Particularly harmful for adolescents whose social lives are intertwined with digital spaces (Boyd, 2014).',
    },
    {
      name: 'Outing & Trickery',
      color: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/5',
      desc: 'Sharing someone\'s private or embarrassing information online without consent, sometimes after gaining trust and extracting secrets (Willard, 2007).',
    },
    {
      name: 'Impersonation',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/5',
      desc: 'Creating fake accounts or hacking into someone\'s accounts to send harmful messages and damage their reputation (Hinduja &amp; Patchin, 2019).',
    },
    {
      name: 'Flaming',
      color: 'text-pink-400',
      border: 'border-pink-500/30',
      bg: 'bg-pink-500/5',
      desc: 'Online fights using electronic messages with angry, vulgar language. Often occurs in public forums and comment sections (Willard, 2007).',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {types.map((t) => (
        <div key={t.name} className={`border ${t.border} ${t.bg} p-5 transition-all duration-300 hover:scale-[1.02]`}>
          <p className={`font-podium uppercase tracking-wider text-base ${t.color} mb-2`}>{t.name}</p>
          <p className="font-inter text-white/60 text-xs leading-relaxed">{t.desc}</p>
        </div>
      ))}
    </div>
  );
}

function EffectsTab() {
  return (
    <div className="space-y-6">
      <p className="font-inter text-white/70 text-sm sm:text-base leading-relaxed">
        The effects of cyberbullying are wide-ranging and can be severe. Research consistently shows that victims suffer significant psychological, academic, and social harm (Kowalski et al., 2014; Hinduja &amp; Patchin, 2019).
      </p>

      {[
        {
          category: 'Mental Health Effects',
          color: 'text-red-300',
          effects: [
            'Increased rates of depression and anxiety (Kowalski et al., 2014)',
            'Post-traumatic stress symptoms (Ybarra &amp; Mitchell, 2004)',
            'Low self-esteem and body image issues (Fardouly &amp; Vartanian, 2015)',
            'Suicidal ideation — victims are 2x more likely to attempt suicide (Hinduja &amp; Patchin, 2010)',
          ],
        },
        {
          category: 'Academic Effects',
          color: 'text-yellow-300',
          effects: [
            'Declining grades and motivation (Beran &amp; Li, 2007)',
            'Increased school absenteeism',
            'Difficulty concentrating in class',
            'School avoidance and dropout risk (Kowalski &amp; Limber, 2013)',
          ],
        },
        {
          category: 'Social Effects',
          color: 'text-cyan-300',
          effects: [
            'Social withdrawal and isolation (Boyd, 2014)',
            'Damaged friendships and peer relationships',
            'Fear of using the internet or technology',
            'Loss of trust in digital communication (Hinduja &amp; Patchin, 2019)',
          ],
        },
        {
          category: 'Physical Effects',
          color: 'text-purple-300',
          effects: [
            'Sleep disturbances and insomnia',
            'Headaches and stomach aches',
            'Loss of appetite',
            'Increased substance use as a coping mechanism (Ybarra &amp; Mitchell, 2004)',
          ],
        },
      ].map((section) => (
        <div key={section.category}>
          <h3 className={`font-podium uppercase tracking-wider text-lg ${section.color} mb-3`}>
            {section.category}
          </h3>
          <ul className="space-y-2">
            {section.effects.map((e) => (
              <li key={e} className="flex gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0 mt-2" />
                <p className="font-inter text-white/70 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: e }} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ActionTab() {
  const steps = [
    {
      num: '01',
      title: 'Don\'t Respond or Retaliate',
      desc: 'Responding often escalates the situation. Retaliation can make you look like the bully. Step away from the screen and take a breath (Hinduja &amp; Patchin, 2019).',
      color: 'text-cyan-300',
      border: 'border-cyan-400/30',
    },
    {
      num: '02',
      title: 'Document Everything',
      desc: 'Take screenshots of all bullying messages, posts, and comments with timestamps. This evidence is crucial if you need to report to authorities or school officials (Willard, 2007).',
      color: 'text-purple-300',
      border: 'border-purple-400/30',
    },
    {
      num: '03',
      title: 'Block and Report',
      desc: 'Use platform tools to block the bully and report the behaviour. All major social media platforms have reporting mechanisms (UNICEF, 2020).',
      color: 'text-yellow-300',
      border: 'border-yellow-400/30',
    },
    {
      num: '04',
      title: 'Tell a Trusted Adult',
      desc: 'Talk to a parent, guardian, teacher, or school counsellor. Adults can help mediate and take formal action. Research shows most victims do NOT tell adults — this must change (Pew Research Center, 2022).',
      color: 'text-green-300',
      border: 'border-green-400/30',
    },
    {
      num: '05',
      title: 'Seek Professional Support',
      desc: 'Cyberbullying causes real psychological harm. Speaking to a mental health professional or counsellor is a sign of strength, not weakness (Kowalski et al., 2014).',
      color: 'text-pink-300',
      border: 'border-pink-400/30',
    },
    {
      num: '06',
      title: 'Know Your Rights',
      desc: 'Many countries and states have laws against cyberbullying. In India, cyberbullying can be reported under the IT Act 2000 (Sections 66A, 67) and the Indian Penal Code (Sections 499, 507).',
      color: 'text-red-300',
      border: 'border-red-400/30',
    },
  ];

  return (
    <div className="space-y-6">
      <p className="font-inter text-white/70 text-sm sm:text-base leading-relaxed">
        If you or someone you know is being cyberbullied, here is a clear course of action recommended by leading researchers and organizations:
      </p>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.num} className={`border ${step.border} bg-white/5 p-5 flex gap-5 hover:bg-white/10 transition-all duration-300`}>
            <span className={`font-podium text-3xl font-bold ${step.color} shrink-0 leading-none`}>{step.num}</span>
            <div>
              <p className={`font-podium uppercase tracking-wider text-base ${step.color} mb-1`}>{step.title}</p>
              <p className="font-inter text-white/60 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
            </div>
          </div>
        ))}
      </div>

      {/* References */}
      <div className="border border-white/10 bg-white/5 p-6 mt-8">
        <h3 className="font-podium text-white uppercase tracking-wider text-base mb-4 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-cyan-400" />
          References
        </h3>
        <ul className="space-y-2 font-inter text-white/50 text-xs leading-relaxed">
          <li>Bauman, S. (2011). <em>Cyberbullying: What counselors need to know.</em> American Counseling Association.</li>
          <li>Beran, T., &amp; Li, Q. (2007). The relationship between cyberbullying and school bullying. <em>Journal of Student Wellbeing, 1</em>(2), 15–33.</li>
          <li>Boyd, D. (2014). <em>It's complicated: The social lives of networked teens.</em> Yale University Press.</li>
          <li>Fardouly, J., &amp; Vartanian, L. R. (2015). Negative comparisons about one's appearance mediate the relationship between Facebook usage and body image concerns. <em>Body Image, 12</em>, 82–88.</li>
          <li>Hinduja, S., &amp; Patchin, J. W. (2010). Bullying, cyberbullying, and suicide. <em>Archives of Suicide Research, 14</em>(3), 206–221.</li>
          <li>Hinduja, S., &amp; Patchin, J. W. (2019). <em>Cyberbullying: Identification, prevention, and response.</em> Cyberbullying Research Center.</li>
          <li>Hinduja, S., &amp; Patchin, J. W. (2021). <em>2021 cyberbullying data.</em> Cyberbullying Research Center. https://cyberbullying.org</li>
          <li>Kowalski, R. M., &amp; Limber, S. P. (2013). Psychological, physical, and academic correlates of cyberbullying and traditional bullying. <em>Journal of Adolescent Health, 53</em>(1), S13–S20.</li>
          <li>Kowalski, R. M., Giumetti, G. W., Schroeder, A. N., &amp; Lattanner, M. R. (2014). Bullying in the digital age. <em>Psychological Bulletin, 140</em>(4), 1073–1137.</li>
          <li>Olweus, D. (1993). <em>Bullying at school: What we know and what we can do.</em> Blackwell.</li>
          <li>Pew Research Center. (2022). <em>Teens and cyberbullying 2022.</em> https://www.pewresearch.org</li>
          <li>Smith, P. K., Mahdavi, J., Carvalho, M., Fisher, S., Russell, S., &amp; Tippett, N. (2008). Cyberbullying: Its nature and impact in secondary school pupils. <em>Journal of Child Psychology and Psychiatry, 49</em>(4), 376–385.</li>
          <li>UNICEF. (2020). <em>Cyberbullying: What is it and how to stop it.</em> https://www.unicef.org/end-violence/how-to-stop-cyberbullying</li>
          <li>Willard, N. E. (2007). <em>Cyberbullying and cyberthreats: Responding to the challenge of online social aggression, threats, and distress.</em> Research Press.</li>
          <li>Ybarra, M. L., &amp; Mitchell, K. J. (2004). Online aggressor/targets, aggressors, and targets: A comparison of associated youth characteristics. <em>Journal of Child Psychology and Psychiatry, 45</em>(7), 1308–1316.</li>
        </ul>
      </div>
    </div>
  );
}
