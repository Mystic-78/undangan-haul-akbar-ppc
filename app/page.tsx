'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  VolumeX,
  Music,
  User,
  Mic,
  Star,
} from 'lucide-react';

// --- STYLING & ANIMATIONS ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Poppins:wght@300;400;500;600;700&display=swap');

  :root {
    --navy: #0B1F3A;
    --gold: #D4AF37;
    --gold-soft: rgba(212, 175, 55, 0.2);
  }

  body {
    background-color: var(--navy);
    color: white;
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
  }

  .font-script {
    font-family: 'Great Vibes', cursive;
  }

  .font-arabic {
    font-family: 'Amiri', serif;
  }

  /* Glassmorphism Premium */
  .glass-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(212, 175, 55, 0.15);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.15);
  }
  
  .glass-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(212, 175, 55, 0.4);
    box-shadow: 0 8px 32px 0 rgba(212, 175, 55, 0.15);
  }

  /* Animations */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  }

  @keyframes pulseGlow {
    0% { box-shadow: 0 0 15px rgba(212,175,55,0.2); }
    50% { box-shadow: 0 0 40px rgba(212,175,55,0.6); }
    100% { box-shadow: 0 0 15px rgba(212,175,55,0.2); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-glow {
    animation: pulseGlow 3s infinite;
  }

  .fade-up-element {
    animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }

  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-500 { animation-delay: 500ms; }

  /* Soft Blur Background Pattern */
  .bg-soft-pattern {
    background-image: 
      radial-gradient(circle at 15% 50%, rgba(212, 175, 55, 0.05), transparent 25%),
      radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.08), transparent 25%);
  }

  /* Smooth scroll behavior */
  html {
    scroll-behavior: smooth;
  }
  
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--navy);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--gold);
    border-radius: 4px;
  }
`;

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('Bapak/Ibu/Saudara/i');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<any>(null);

  // Parse URL Parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) setGuestName(to);
  }, []);

  // Handle Buka Undangan
  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err: any) => {
          console.warn('Audio autoplay prevented:', err);
          setIsPlaying(false);
        });
    }
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    if (!isOpened) document.body.style.overflow = 'hidden';
  }, [isOpened]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err:any) => {
            console.warn('Audio tidak dapat diputar:', err);
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Audio Lokal */}
      <audio
        ref={audioRef}
        src="https://xeric-gold-epsys0lc.edgeone.app/Alunan%20Sajadah%20Merah.mp3"
        loop
      />

      {/* Floating Music Controller */}
      {isOpened && (
        <button
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#D4AF37] text-[#0B1F3A] animate-glow shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
        >
          {isPlaying ? (
            <Music size={24} className="animate-pulse" />
          ) : (
            <VolumeX size={24} />
          )}
        </button>
      )}

      {/* HERO COVER SECTION */}
      <div
        className={`fixed inset-0 z-50 overflow-y-auto flex flex-col items-center bg-[#0B1F3A] bg-soft-pattern transition-transform duration-1000 cubic-bezier(0.7, 0, 0.3, 1) ${
          isOpened ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="w-full max-w-md px-6 py-10 md:py-12 text-center flex flex-col items-center min-h-screen justify-center">
          <div className="fade-up-element delay-100 mb-6 md:mb-8 mt-auto pt-8">
            <h1 className="text-2xl font-bold font-arabic text-[#D4AF37] mb-2">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </h1>
          </div>

          {/* FOTO COVER PREMIUM MODERN */}
          <div className="w-[240px] h-[320px] md:w-[300px] md:h-[400px] mb-6 md:mb-8 fade-up-element delay-200 animate-float relative rounded-2xl p-[2px] bg-gradient-to-b from-[#D4AF37]/50 to-transparent shrink-0 shadow-[0_20px_50px_rgba(212,175,55,0.15)]">
            <img
              src="https://i.ibb.co.com/KcgggzhZ/Desain-tanpa-judul-1.png"
              alt="Haul Akbar Cover"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="fade-up-element delay-300 shrink-0">
            <p className="tracking-[0.3em] text-[10px] md:text-xs text-gray-400 uppercase mb-2 md:mb-3">
              UNDANGAN DIGITAL
            </p>
            <h2 className="text-4xl md:text-5xl font-script text-[#D4AF37] mb-2 md:mb-3 drop-shadow-md">
              Haul Akbar Ke-3
            </h2>
            <p className="text-[10px] md:text-xs text-gray-300 uppercase tracking-widest font-light mb-6 md:mb-8 max-w-[250px] mx-auto leading-relaxed">
              Masyaikh Pondok Pesantren Cipasung
            </p>
          </div>

          <div className="glass-card w-full p-4 md:p-5 rounded-2xl fade-up-element delay-500 mb-6 shrink-0">
            <p className="text-[10px] md:text-xs text-gray-400 mb-1 md:mb-2">
              Kepada Yth.
              <br />
              Bapak/Ibu/Saudara/i
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-[#D4AF37]">
              {guestName}
            </h3>
          </div>

          <button
            onClick={handleOpen}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#0B1F3A] font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] fade-up-element delay-500 shrink-0 mb-8 mb-auto"
          >
            <Play size={18} fill="currentColor" />
            Buka Undangan
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main
        className={`min-h-screen bg-[#0B1F3A] bg-soft-pattern pb-20 ${
          !isOpened ? 'hidden' : 'block'
        }`}
      >
        {/* WELCOME SECTION */}
        <section className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-script text-[#D4AF37] mb-8">
            Assalamu'alaikum <br className="hidden md:block" /> Warahmatullahi
            Wabarakatuh
          </h2>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-3xl mx-auto mb-16">
            Dengan penuh rasa hormat dan mengharap ridha Allah SWT, kami
            mengundang Bapak/Ibu/Saudara/i untuk menghadiri dan mengikuti
            rangkaian acara{' '}
            <span className="text-[#D4AF37] font-semibold">
              Haul Akbar Ke-3 Masyaikh Pondok Pesantren Cipasung
            </span>
            . Kehadiran dan doa restu dari Bapak/Ibu/Saudara/i merupakan
            kebahagiaan dan kehormatan bagi kami.
          </p>

          {/* FOTO ISI UNDANGAN (Banner Premium Modern) */}
          <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-16 group">
            <img
              src="https://i.ibb.co.com/3mWWYnL2/Beranda-removebg-preview.png"
              alt="Masyaikh Pondok Pesantren Cipasung"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Soft dark gradient at bottom for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent opacity-50"></div>
          </div>

          {/* HADITS CARD */}
          <div className="glass-card p-8 md:p-12 rounded-3xl relative mx-auto max-w-4xl">
            <p
              className="text-xl md:text-3xl font-arabic text-[#D4AF37] mb-6 leading-loose"
              dir="rtl"
            >
              أكرموا العلما لعلمهم بأن تعاملوهم بالإجلال والإعظام وتوفوهم حقهم
              من التوقير والاحترام فإنهم حقيقيون بالإكرام إذ هم ورثة الأنبياء
            </p>
            <div className="w-24 h-[1px] bg-[#D4AF37]/50 mx-auto mb-6"></div>
            <p className="text-xs md:text-sm text-gray-400 italic">
              "Muliakanlah Ulama karena ilmunya, dengan cara memuliakan,
              mengagungkan dan memenuhi hak ulama, yakni mengagungkan dan
              memuliakan karena sesungguhnya Ulama secara hakikat dihormati
              karena ulama adalah pewaris para nabi."
            </p>
          </div>
        </section>

        {/* COUNTDOWN SECTION */}
        <CountdownSection />

        {/* EVENT INFO SECTION */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-script text-[#D4AF37] mb-4">
              Informasi Acara
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center transition-all">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                <Calendar className="text-[#D4AF37]" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Haul Akbar</h3>
              <p className="text-[#D4AF37] font-semibold mb-2">
                Sabtu, 06 Juni 2026
              </p>
              <div className="flex items-center text-gray-400 text-sm gap-2 mt-2">
                <Clock size={16} />
                <span>20.00 WIB - Selesai</span>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center transition-all">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6">
                <MapPin className="text-[#D4AF37]" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Lokasi</h3>
              <p className="text-[#D4AF37] font-semibold mb-2">
                Pondok Pesantren Cipasung
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Cipasung, Singaparna, Tasikmalaya
              </p>
            </div>
          </div>

          <div className="mt-12 glass-card rounded-3xl overflow-hidden p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0652033621535!2d108.10660637500078!3d-7.346571592661559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f54664c39178f%3A0x6b77c5905dd959bc!2sPondok%20Pesantren%20Cipasung!5e0!3m2!1sid!2sid!4v1715426173000!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pondok Pesantren Cipasung"
            ></iframe>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 px-4 pb-4">
              <a
                href="https://maps.app.goo.gl/9W1Tq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#0B1F3A] font-bold rounded-xl flex justify-center items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <MapPin size={18} /> Buka Google Maps
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    'Pondok Pesantren Cipasung, Singaparna, Tasikmalaya, Jawa Barat'
                  );
                  alert('Alamat berhasil disalin!');
                }}
                className="flex-1 py-3 border border-[#D4AF37] text-[#D4AF37] font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-[#D4AF37]/10 transition-colors"
              >
                Salin Alamat
              </button>
            </div>
          </div>
        </section>

        {/* TIMELINE RUNDOWN ACARA (PREMIUM LUXURY) */}
        <section className="py-20 px-6 max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-script text-[#D4AF37] mb-4">
              Rundown Acara
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto rounded-full"></div>
          </div>

          <div className="relative border-l-2 border-[#D4AF37]/20 ml-4 md:ml-8 pl-8 md:pl-12 space-y-16">
            {/* 1. DO'A BERSAMA */}
            <div className="relative">
              {/* Dot Timeline */}
              <div className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full bg-[#0B1F3A] border-4 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10"></div>

              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                <span className="text-[#D4AF37]">DO'A BERSAMA</span>
              </h3>

              <div className="space-y-6">
                <SpeakerCard
                  role="Tahlil"
                  name="KH. Oban Hidayat"
                  icon={<Mic size={20} />}
                />
                <SpeakerCard
                  role="Pembacaan Ayat Suci Al-Quran 30 Juz"
                  name="Dr. Ust. Asep Nursamsi, M.SI"
                  icon={<Mic size={20} />}
                />
                <SpeakerCard
                  role="Sholat Isya Berjamaah & Dzikir"
                  name="Ust. Furqon Taufiq, M.Pd"
                  icon={<User size={20} />}
                />
              </div>
            </div>

            {/* 2. ACARA HAUL */}
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full bg-[#0B1F3A] border-4 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10"></div>

              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                <span className="text-[#D4AF37]">ACARA HAUL</span>
              </h3>

              <div className="space-y-6">
                <TimelineCard title="Pembukaan" />
                <SpeakerCard
                  role="Pembacaan Ayat Suci Al-Quran dan Sholawat"
                  name="Ust. Fikri Haikal"
                  icon={<Mic size={20} />}
                />
                <TimelineCard title="Pemutaran Riwayat Singkat Masyaikh Pondok Pesantren Cipasung" />

                {/* SAMBUTAN-SAMBUTAN GRID */}
                <div className="mt-8 mb-4">
                  <h4 className="text-lg font-semibold text-gray-300 mb-6 uppercase tracking-wider border-b border-[#D4AF37]/20 pb-2 inline-block">
                    Sambutan-Sambutan
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SpeakerCard
                      role="Laporan Ketua Pelaksana"
                      name="H. Ahmad Zamakhsyari Sidiq, M.T"
                    />
                    <SpeakerCard
                      role="Ketua Yayasan Pesantren Cipasung"
                      name="Drs. KH. Acep Adang Ruhiat, M.Si"
                    />
                    <SpeakerCard
                      role="Pimpinan Pondok Pesantren Cipasung"
                      name="KH. Ubaidillah Ruhiat, B.A"
                    />
                    <SpeakerCard
                      role="Ketua Umum MPP KAC"
                      name="Dr. KH. Cucun Ahmad Syamsurijal, M.A.P."
                    />
                    <SpeakerCard
                      role="Bupati Kabupaten Tasikmalaya"
                      name="Dr. H. Cecep Nurul Yakin, M.A.P"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. HIGHLIGHT HIKMAH HAUL */}
            <div className="relative mt-12 mb-12">
              <div className="absolute -left-[41px] md:-left-[57px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#0B1F3A] border-4 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10"></div>

              {/* Highlight Speaker Section (Glow Besar) */}
              <div className="glass-card p-8 md:p-14 rounded-3xl border border-[#D4AF37] relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                {/* Glow layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-0 right-0 p-6 opacity-30">
                  <Star
                    size={80}
                    className="text-[#D4AF37]"
                    fill="currentColor"
                  />
                </div>

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 text-[#D4AF37] text-sm font-bold uppercase tracking-[0.2em] mb-6">
                    <Star size={14} fill="currentColor" /> Hikmah Haul
                  </div>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-4 leading-tight drop-shadow-lg">
                    Prof. Dr. KH. Said Aqil Siradj, M.A
                  </h3>
                </div>
              </div>
            </div>

            {/* 4. PENUTUP */}
            <div className="relative">
              <div className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full bg-[#0B1F3A] border-4 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10"></div>

              <div className="space-y-6">
                <SpeakerCard
                  role="Do'a"
                  name="Drs. KH. Abdul Chobir, M.T"
                  icon={<User size={20} />}
                />
                <TimelineCard title="Penutup" />
              </div>
            </div>
          </div>
        </section>

        {/* RSVP & AI WISH FORMATTER */}
        <RSVPSection />

        {/* FOOTER */}
        <footer className="py-12 text-center border-t border-[#D4AF37]/20 mt-20 relative overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#D4AF37]/5 to-transparent"></div>
          <p className="text-gray-400 text-sm mb-4 relative z-10">
            Merupakan suatu kehormatan bagi kami atas kehadiran
            Bapak/Ibu/Saudara/i.
          </p>
          <div className="text-[#D4AF37] font-script text-4xl relative z-10">
            Keluarga Besar PP Cipasung
          </div>
        </footer>
      </main>
    </>
  );
}

// ==========================================
// SUB-COMPONENTS
// ==========================================

// Premium Speaker Card for Rundown
function SpeakerCard({ role, name, icon }) {
  return (
    <div className="glass-card p-5 md:p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-[#D4AF37]/70 hover:-translate-y-1">
      {/* Soft hover glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4">
        {icon && (
          <div className="hidden md:flex w-12 h-12 rounded-full bg-[#0B1F3A] border border-[#D4AF37]/50 text-[#D4AF37] items-center justify-center shrink-0 shadow-lg">
            {icon}
          </div>
        )}
        <div>
          <span className="text-xs md:text-sm text-gray-400 uppercase tracking-widest block mb-1 font-medium">
            {role}
          </span>
          <h4 className="text-xl md:text-2xl font-bold text-[#D4AF37]">
            {name}
          </h4>
        </div>
      </div>
    </div>
  );
}

// General Timeline Card for non-speaker events
function TimelineCard({ title }) {
  return (
    <div className="glass-card px-5 py-4 rounded-2xl border-l-4 border-l-[#D4AF37] hover:bg-white/5 transition-colors">
      <h4 className="text-lg font-semibold text-white">{title}</h4>
    </div>
  );
}

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('June 06, 2026 20:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 flex justify-center">
      <div className="glass-card p-8 md:p-12 rounded-3xl max-w-4xl w-full flex flex-col items-center">
        <h3 className="text-gray-300 uppercase tracking-widest text-sm mb-10 text-center border-b border-[#D4AF37]/30 pb-4">
          Menuju Hari Puncak
        </h3>

        <div className="flex gap-4 md:gap-8 justify-center w-full">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center w-16 md:w-24 group"
            >
              <div className="w-full aspect-square rounded-2xl bg-[#0B1F3A] border border-[#D4AF37]/40 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(212,175,55,0.1)] group-hover:border-[#D4AF37] transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-3xl md:text-5xl font-bold text-[#D4AF37] relative z-10">
                  {item.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'Hadir',
    count: '1',
    wish: '',
  });
  const [isFormatting, setIsFormatting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Form Input Handler
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Gemini API call logic for AI Wish Formatter
  const handleAIFormat = async () => {
    if (!formData.wish.trim())
      return alert(
        'Tuliskan ucapan singkat terlebih dahulu sebelum dirapikan AI.'
      );

    setIsFormatting(true);
    const apiKey = ''; // API Key otomatis disediakan runtime

    try {
      const prompt = `Perindah ucapan doa ini menjadi sangat elegan, puitis, hangat, sopan, dan bernuansa Islami untuk acara "Haul Akbar Ke-3 Masyaikh Pondok Pesantren Cipasung". Jangan menambahkan salam pembuka/penutup yang berlebihan, fokus pada inti doa. Ucapan asli: "${formData.wish}"`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: {
              parts: [
                {
                  text: 'Kamu adalah asisten penulis ahli yang merangkai doa Islami dan elegan untuk acara Haul.',
                },
              ],
            },
          }),
        }
      );

      const data = await response.json();
      const formattedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (formattedText) {
        setFormData((prev) => ({ ...prev, wish: formattedText }));
      }
    } catch (error) {
      console.error('AI Formatting error:', error);
      alert('Gagal menghubungi AI. Silakan coba lagi.');
    } finally {
      setIsFormatting(false);
    }
  };

  // Simulasi validasi native React Hook Form + Zod
  const validateForm = () => {
    let newErrors = {};
    if (formData.name.trim().length < 3)
      newErrors.name = 'Nama minimal 3 karakter';
    if (formData.wish.trim().length < 5)
      newErrors.wish = 'Mohon isi ucapan & doa';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API/Database saving
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', attendance: 'Hadir', count: '1', wish: '' });
    }, 1500);
  };

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px] opacity-10"></div>

        <div className="text-center mb-10 relative z-10">
          <h2 className="text-3xl md:text-4xl font-script text-[#D4AF37] mb-2">
            RSVP & Ucapan
          </h2>
          <p className="text-gray-400 text-sm">
            Konfirmasi kehadiran dan kirimkan doa terbaik Anda.
          </p>
        </div>

        {success ? (
          <div className="text-center py-12 relative z-10">
            <CheckCircle2 className="text-[#D4AF37] w-20 h-20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Terima Kasih!
            </h3>
            <p className="text-gray-400">
              Konfirmasi dan doa Anda telah kami terima.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-8 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37]/10 transition font-medium"
            >
              Kirim Pesan Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-[#0B1F3A]/80 border ${
                  errors.name ? 'border-red-500' : 'border-[#D4AF37]/30'
                } rounded-xl focus:outline-none focus:border-[#D4AF37] text-white transition-colors`}
                placeholder="Contoh: Ahmad Fauzi"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kehadiran
                </label>
                <select
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0B1F3A]/80 border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:border-[#D4AF37] text-white transition-colors appearance-none"
                >
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                  <option value="Ragu-ragu">Ragu-ragu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Jumlah Tamu
                </label>
                <select
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0B1F3A]/80 border border-[#D4AF37]/30 rounded-xl focus:outline-none focus:border-[#D4AF37] text-white transition-colors appearance-none"
                  disabled={formData.attendance === 'Tidak Hadir'}
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                  <option value="5">5 Orang</option>
                  <option value="6">6 Orang</option>
                  <option value="7">7 Orang</option>
                  <option value="8">8 Orang</option>
                  <option value="9">9 Orang</option>
                  <option value="10">10 Orang</option>
                  <option value="11">11 Orang</option>
                  <option value="12">12 Orang</option>
                  <option value="13">13 Orang</option>
                  <option value="14">14 Orang</option>
                  <option value="15">15 Orang</option>
                  <option value="16">16 Orang</option>
                  <option value="17">17 Orang</option>
                  <option value="18">18 Orang</option>
                  <option value="19">19 Orang</option>
                  <option value="20">20 Orang</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Ucapan & Doa
                </label>
                <button
                  type="button"
                  onClick={handleAIFormat}
                  disabled={isFormatting}
                  className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/50 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#D4AF37]/20 transition disabled:opacity-50 shadow-[0_0_10px_rgba(212,175,55,0.1)]"
                >
                  <Sparkles size={12} />
                  {isFormatting ? 'Merapikan...' : 'Rapikan dengan AI'}
                </button>
              </div>
              <textarea
                name="wish"
                rows="4"
                required
                value={formData.wish}
                onChange={handleChange}
                placeholder="Tuliskan doa terbaik Anda di sini..."
                className={`w-full px-4 py-3 bg-[#0B1F3A]/80 border ${
                  errors.wish ? 'border-red-500' : 'border-[#D4AF37]/30'
                } rounded-xl focus:outline-none focus:border-[#D4AF37] text-white transition-colors resize-none`}
              ></textarea>
              {errors.wish && (
                <p className="text-red-400 text-xs mt-1">{errors.wish}</p>
              )}
              <p className="text-[10px] text-gray-500 mt-2 italic">
                *Ketik ucapan biasa, lalu klik tombol <b>"Rapikan dengan AI"</b>{' '}
                agar kalimat menjadi lebih puitis dan Islami.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#0B1F3A] font-bold rounded-xl flex justify-center items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 mt-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              {isSubmitting ? (
                'Mengirim Konfirmasi...'
              ) : (
                <>
                  <Send size={18} /> Kirim Konfirmasi
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
