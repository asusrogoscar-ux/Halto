"use client";

import { useEffect, useRef, useState } from "react";
import { AudioLines, ChartNoAxesColumn, CircleUserRound, Clock3, Dumbbell, History, House, Play, Settings, Timer } from "lucide-react";

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function Home() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const startedAt = useRef<number | null>(null);
  const accumulated = useRef(0);

  useEffect(() => {
    if (!running) return;
    startedAt.current = performance.now();
    const id = window.setInterval(() => {
      if (startedAt.current !== null) {
        setElapsed(accumulated.current + performance.now() - startedAt.current);
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [running]);

  function toggleTimer() {
    if (running) {
      if (startedAt.current !== null) {
        accumulated.current += performance.now() - startedAt.current;
      }
      startedAt.current = null;
      setRunning(false);
    } else {
      setRunning(true);
    }
  }

  function resetTimer() {
    setRunning(false);
    startedAt.current = null;
    accumulated.current = 0;
    setElapsed(0);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">HAL<span>TO</span></div>
        <div className="avatar" aria-label="Profil"><CircleUserRound size={21} /></div>
      </header>

      <p className="eyebrow">TON ESPACE D’ENTRAÎNEMENT</p>
      <h1>Prêt à bouger ?</h1>

      <section className="card hero">
        <div className="hero-top">
          <span className="eyebrow">CHRONOMÈTRE LIBRE</span>
          <span className="pill">BÊTA</span>
        </div>
        <h2 style={{ fontSize: 48, fontVariantNumeric: "tabular-nums", marginTop: 24 }}>{formatTime(elapsed)}</h2>
        <p className="muted">Chronomètre de base — première version</p>
        <button className="primary" onClick={toggleTimer}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
            <Play size={17} fill="currentColor" /> {running ? "METTRE EN PAUSE" : "DÉMARRER"}
          </span>
        </button>
        <button onClick={resetTimer} style={{ width: "100%", marginTop: 12, padding: 10, border: 0, background: "transparent", color: "var(--muted)", cursor: "pointer" }}>
          Réinitialiser
        </button>
      </section>

      <div className="section-title"><h3>Accès rapide</h3><span>HALTO</span></div>
      <section className="quick-grid">
        <div className="quick"><Dumbbell className="quick-icon" /><strong>Mes séances</strong><small>Programmes sportifs</small></div>
        <div className="quick"><Timer className="quick-icon" /><strong>Intervalles</strong><small>Travail et repos</small></div>
        <div className="quick"><AudioLines className="quick-icon" /><strong>Réglages audio</strong><small>Tic-tac et alertes</small></div>
        <div className="quick"><History className="quick-icon" /><strong>Historique</strong><small>Mes entraînements</small></div>
      </section>

      <div className="section-title"><h3>À venir</h3></div>
      <p className="muted">Les programmes personnalisés, les comptes et la synchronisation arriveront dans les prochaines versions.</p>

      <nav className="nav" aria-label="Navigation principale">
        <div className="nav-item active"><House size={19} /><span>Accueil</span></div>
        <div className="nav-item"><Dumbbell size={19} /><span>Séances</span></div>
        <div className="nav-item"><Clock3 size={19} /><span>Chrono</span></div>
        <div className="nav-item"><ChartNoAxesColumn size={19} /><span>Historique</span></div>
        <div className="nav-item"><Settings size={19} /><span>Profil</span></div>
      </nav>
    </main>
  );
}
