import React, { useState, useMemo } from 'react';
import * as htmlToImage from 'html-to-image';

// --- KOMPONEN IKON SVG (Custom) ---
const IconUser = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconActivity = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconScale = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>;
const IconDownload = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
const IconBoat = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17A10 10 0 0 1 2 17"/><path d="M12 17v-4"/><path d="M7 13h10"/><path d="M12 13V9"/><path d="M10 9h4"/></svg>;
const IconReset = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;

// --- FUNGSI SCORING LOGIC CANOEING ---
const getScoreCanoeing = (test, gender, value) => {
  if (value === '' || value === null || isNaN(value)) return 0;
  const v = parseFloat(value); const isM = gender === 'Putra';
  switch(test) {
    case 'shoulderFlex': return isM ? (v >= 180 ? 100 : v >= 144 ? 80 : v >= 126 ? 70 : v >= 108 ? 60 : 40) : (v >= 180 ? 100 : v >= 144 ? 80 : v >= 126 ? 70 : v >= 108 ? 60 : 40);
    case 'shoulderExt': return isM ? (v >= 60 ? 100 : v >= 48 ? 80 : v >= 42 ? 70 : v >= 36 ? 60 : 40) : (v >= 60 ? 100 : v >= 48 ? 80 : v >= 48 ? 70 : v >= 36 ? 60 : 40);
    case 'pushUp': return isM ? (v >= 75 ? 100 : v >= 60 ? 80 : v >= 53 ? 70 : v >= 45 ? 60 : 40) : (v >= 50 ? 100 : v >= 40 ? 80 : v >= 40 ? 70 : v >= 30 ? 60 : 40);
    case 'benchPress': return isM ? (v >= 2.0 ? 100 : v >= 1.8 ? 80 : v >= 1.6 ? 70 : v >= 1.4 ? 60 : 40) : (v >= 1.5 ? 100 : v >= 1.4 ? 80 : v >= 1.2 ? 70 : v >= 1.1 ? 60 : 40);
    case 'squat': return isM ? (v >= 2.5 ? 100 : v >= 2.3 ? 80 : v >= 2.0 ? 70 : v >= 1.8 ? 60 : 40) : (v >= 2.0 ? 100 : v >= 1.8 ? 80 : v >= 1.6 ? 70 : v >= 1.4 ? 60 : 40);
    case 'core': return v >= 12 ? 100 : v >= 9 ? 70 : 40; 
    case 'medBall': return isM ? (v >= 8.0 ? 100 : v >= 6.4 ? 80 : v >= 5.6 ? 70 : v >= 4.8 ? 60 : 40) : (v >= 6.0 ? 100 : v >= 4.8 ? 80 : v >= 4.2 ? 70 : v >= 3.6 ? 60 : 40);
    case 'wingate': return isM ? (v >= 900 ? 100 : v >= 720 ? 80 : v >= 630 ? 70 : v >= 540 ? 60 : 40) : (v >= 700 ? 100 : v >= 560 ? 80 : v >= 490 ? 70 : v >= 420 ? 60 : 40);
    case 'sprintWater': return isM ? (v <= 5.5 ? 100 : v <= 6.1 ? 80 : v <= 6.6 ? 70 : v <= 7.2 ? 60 : 40) : (v <= 6.0 ? 100 : v <= 6.6 ? 80 : v <= 7.2 ? 70 : v <= 7.8 ? 60 : 40);
    case 'paddle': return isM ? (v >= 1600 ? 100 : v >= 1280 ? 80 : v >= 1120 ? 70 : v >= 960 ? 60 : 40) : (v >= 1500 ? 100 : v >= 1200 ? 80 : v >= 1050 ? 70 : v >= 900 ? 60 : 40);
    case 'ergoVO2': return isM ? (v >= 65 ? 100 : v >= 59 ? 80 : v >= 52 ? 70 : v >= 46 ? 60 : 40) : (v >= 55 ? 100 : v >= 50 ? 80 : v >= 44 ? 70 : v >= 39 ? 60 : 40);
    default: return 0;
  }
};

// --- FUNGSI SCORING LOGIC ROWING ---
const getScoreRowing = (test, gender, value) => {
  if (value === '' || value === null || isNaN(value)) return 0;
  const v = parseFloat(value); const isM = gender === 'Putra';
  switch(test) {
    case 'sitReach': return isM ? (v >= 20 ? 100 : v >= 18 ? 80 : v >= 16 ? 70 : v >= 14 ? 60 : 40) : (v >= 25 ? 100 : v >= 23 ? 80 : v >= 20 ? 70 : v >= 18 ? 60 : 40);
    case 'shoulderFlexibility': return v < 0 ? 100 : v === 0 ? 80 : v <= 2 ? 70 : v <= 5 ? 60 : 40; 
    case 'core': return v >= 12 ? 100 : v >= 9 ? 70 : 40;
    case 'pushUp': return isM ? (v >= 75 ? 100 : v >= 60 ? 80 : v >= 53 ? 70 : v >= 45 ? 60 : 40) : (v >= 50 ? 100 : v >= 40 ? 80 : v >= 35 ? 70 : v >= 30 ? 60 : 40);
    case 'deadlift': return isM ? (v >= 2.5 ? 100 : v >= 2.0 ? 80 : v >= 1.8 ? 70 : v >= 1.5 ? 60 : 40) : (v >= 2.0 ? 100 : v >= 1.6 ? 80 : v >= 1.4 ? 70 : v >= 1.2 ? 60 : 40);
    case 'benchFull': return isM ? (v >= 1.5 ? 100 : v >= 1.2 ? 80 : v >= 1.1 ? 70 : v >= 0.9 ? 60 : 40) : (v >= 1.2 ? 100 : v >= 1.0 ? 80 : v >= 0.8 ? 70 : v >= 0.7 ? 60 : 40);
    case 'squat': return isM ? (v >= 2.5 ? 100 : v >= 2.1 ? 80 : v >= 1.9 ? 70 : v >= 1.6 ? 60 : 40) : (v >= 2.0 ? 100 : v >= 1.7 ? 80 : v >= 1.5 ? 70 : v >= 1.3 ? 60 : 40);
    case 'singleLeg': return v >= 60 ? 100 : v >= 54 ? 80 : v >= 51 ? 70 : v >= 48 ? 60 : 40;
    case 'rowing30s': return isM ? (v >= 1200 ? 100 : v >= 960 ? 80 : v >= 840 ? 70 : v >= 720 ? 60 : 40) : (v >= 900 ? 100 : v >= 720 ? 80 : v >= 630 ? 70 : v >= 540 ? 60 : 40);
    case 'rowing5Min': return isM ? (v >= 1600 ? 100 : v >= 1280 ? 80 : v >= 1120 ? 70 : v >= 960 ? 60 : 40) : (v >= 1500 ? 100 : v >= 1200 ? 80 : v >= 1050 ? 70 : v >= 900 ? 60 : 40);
    case 'rowingVO2': return isM ? (v >= 70.0 ? 100 : v >= 56.0 ? 80 : v >= 49.0 ? 70 : v >= 42.0 ? 60 : 40) : (v >= 65.0 ? 100 : v >= 52.0 ? 80 : v >= 45.5 ? 70 : v >= 39.0 ? 60 : 40);
    default: return 0;
  }
};

// --- FUNGSI TARGET PLACEHOLDER ---
const getTargetPlaceholder = (cabor, test, gender) => {
  const isM = gender === 'Putra';
  if (cabor === 'Canoeing') {
    switch(test) {
      case 'shoulderFlex': return isM ? '≥ 180' : '≥ 180';
      case 'shoulderExt': return isM ? '≥ 60' : '≥ 60';
      case 'pushUp': return isM ? '≥ 75' : '≥ 50';
      case 'benchPress': return isM ? '≥ 2.0' : '≥ 1.5';
      case 'squat': return isM ? '≥ 2.5' : '≥ 2.0';
      case 'core': return '≥ 12';
      case 'medBall': return isM ? '≥ 8.0' : '≥ 6.0';
      case 'wingate': return isM ? '≥ 900' : '≥ 700';
      case 'sprintWater': return isM ? '≤ 5.5' : '≤ 6.0';
      case 'paddle': return isM ? '≥ 1600' : '≥ 1500';
      case 'ergoVO2': return isM ? '≥ 65' : '≥ 55';
      default: return '';
    }
  } else {
    switch(test) {
      case 'sitReach': return isM ? '≥ 20' : '≥ 25';
      case 'shoulderFlexibility': return '< 0';
      case 'core': return '≥ 12';
      case 'pushUp': return isM ? '≥ 75' : '≥ 50';
      case 'deadlift': return isM ? '≥ 2.5' : '≥ 2.0';
      case 'benchFull': return isM ? '≥ 1.5' : '≥ 1.2';
      case 'squat': return isM ? '≥ 2.5' : '≥ 2.0';
      case 'singleLeg': return '≥ 60';
      case 'rowing30s': return isM ? '≥ 1200' : '≥ 900';
      case 'rowing5Min': return isM ? '≥ 1600' : '≥ 1500';
      case 'rowingVO2': return isM ? '≥ 70' : '≥ 65';
      default: return '';
    }
  }
};

// --- KOMPONEN RADAR CHART ---
const RadarChart = ({ data, labels, isBlanko }) => {
  const size = 320; const center = size / 2; const radius = 100;
  const angleStep = (Math.PI * 2) / labels.length;

  const getCoordinates = (val, i) => {
    const r = (val / 100) * radius;
    const a = i * angleStep - Math.PI / 2;
    return { x: center + r * Math.cos(a), y: center + r * Math.sin(a) };
  };

  const dataPoints = data.map((val, i) => getCoordinates(val, i));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {[20, 40, 60, 80, 100].map(level => {
        const pts = labels.map((_, i) => getCoordinates(level, i));
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return <path key={level} d={path} fill="none" stroke={level === 100 ? '#0ea5e9' : '#e5e7eb'} strokeWidth={level === 100 ? 2 : 1} strokeDasharray={level < 100 ? "4 4" : "none"} />
      })}
      
      {labels.map((label, i) => {
        const pOuter = getCoordinates(125, i);
        const pEdge = getCoordinates(100, i);
        return (
          <g key={i}>
            <line x1={center} y1={center} x2={pEdge.x} y2={pEdge.y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={pOuter.x} y={pOuter.y} textAnchor="middle" dominantBaseline="middle" className="text-[9px] font-bold fill-slate-500 uppercase">{label}</text>
          </g>
        );
      })}

      {!isBlanko && (
        <>
          <path d={dataPath} fill="rgba(14, 165, 233, 0.4)" stroke="#0284c7" strokeWidth="2.5" strokeLinejoin="round" />
          {dataPoints.map((p, i) => ( <circle key={i} cx={p.x} cy={p.y} r="3" fill="#0284c7" /> ))}
        </>
      )}
    </svg>
  );
};

export default function App() {
  const [identity, setIdentity] = useState({ name: '', origin: '', dob: '', gender: 'Putra', subCabor: 'Canoeing' });
  const [anthro, setAnthro] = useState({ weight: '', height: '', armSpan: '', sitHeight: '' });
  const [tests, setTests] = useState({
    // Canoeing
    shoulderFlex: '', shoulderExt: '', pushUpCanoe: '', benchPress: '', squatCanoe: '', coreCanoe: '', medBall: '', wingate: '', sprintWater: '', paddle: '', ergoVO2: '',
    // Rowing
    sitReach: '', shoulderFlexibility: '', coreRowing: '', pushUpRowing: '', deadlift: '', benchFull: '', squatRowing: '', singleLeg: '', rowing30s: '', rowing5Min: '', rowingVO2: ''
  });
  
  const [isExporting, setIsExporting] = useState(false);

  const age = useMemo(() => {
    if (!identity.dob) return '-';
    const birthDate = new Date(identity.dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) calculatedAge--;
    return calculatedAge;
  }, [identity.dob]);

  const bmiData = useMemo(() => {
    if (!anthro.weight || !anthro.height || anthro.height <= 0) return { bmi: '-', status: '-', color: 'text-slate-400' };
    const hM = anthro.height / 100;
    const bmiValue = (anthro.weight / (hM * hM));
    const bmi = bmiValue.toFixed(1);
    let status = 'Kurus'; let color = 'text-blue-500';
    if (bmi >= 18.5 && bmi <= 24.9) { status = 'Ideal'; color = 'text-emerald-500'; }
    else if (bmi >= 25 && bmi <= 29.9) { status = 'Gemuk'; color = 'text-amber-500'; }
    else if (bmi >= 30) { status = 'Obesitas'; color = 'text-rose-500'; }
    return { bmi, status, color };
  }, [anthro.weight, anthro.height]);

  const proportionData = useMemo(() => {
    const h = parseFloat(anthro.height);
    const arm = parseFloat(anthro.armSpan);
    const sit = parseFloat(anthro.sitHeight);

    let apeIndex = { value: 0, text: '-', color: 'text-slate-400', desc: 'Isi Tinggi & Lengan' };
    let legRatio = { value: 0, text: '-', color: 'text-slate-400', desc: 'Isi Tinggi Duduk' };

    if (h > 0 && arm > 0) {
      const ratio = arm / h;
      if (ratio > 1.02) apeIndex = { value: ratio.toFixed(2), text: 'Superior', color: 'text-emerald-500', desc: 'Jangkauan (Stroke/Draw) Ekstra' };
      else if (ratio >= 1.0) apeIndex = { value: ratio.toFixed(2), text: 'Ideal', color: 'text-blue-500', desc: 'Proporsi Normal' };
      else apeIndex = { value: ratio.toFixed(2), text: 'Standar', color: 'text-rose-500', desc: 'Jangkauan Pendek' };
    }

    if (h > 0 && sit > 0 && sit < h) {
      const legLength = h - sit;
      const legPercentage = (legLength / h) * 100;
      if (legPercentage >= 50) legRatio = { value: legPercentage.toFixed(1) + '%', text: 'Tungkai Panjang', color: 'text-emerald-500', desc: 'Tuas Kaki Maksimal' };
      else if (legPercentage >= 47) legRatio = { value: legPercentage.toFixed(1) + '%', text: 'Tungkai Ideal', color: 'text-blue-500', desc: 'Proporsi Seimbang' };
      else legRatio = { value: legPercentage.toFixed(1) + '%', text: 'Tungkai Pendek', color: 'text-rose-500', desc: 'Titik Gravitasi Rendah' };
    }

    return { apeIndex, legRatio };
  }, [anthro.height, anthro.armSpan, anthro.sitHeight]);

  const scoresCanoeing = useMemo(() => ({
    shoulderFlex: getScoreCanoeing('shoulderFlex', identity.gender, tests.shoulderFlex),
    shoulderExt: getScoreCanoeing('shoulderExt', identity.gender, tests.shoulderExt),
    pushUp: getScoreCanoeing('pushUp', identity.gender, tests.pushUpCanoe),
    benchPress: getScoreCanoeing('benchPress', identity.gender, tests.benchPress),
    squat: getScoreCanoeing('squat', identity.gender, tests.squatCanoe),
    core: getScoreCanoeing('core', identity.gender, tests.coreCanoe),
    medBall: getScoreCanoeing('medBall', identity.gender, tests.medBall),
    wingate: getScoreCanoeing('wingate', identity.gender, tests.wingate),
    sprintWater: getScoreCanoeing('sprintWater', identity.gender, tests.sprintWater),
    paddle: getScoreCanoeing('paddle', identity.gender, tests.paddle),
    ergoVO2: getScoreCanoeing('ergoVO2', identity.gender, tests.ergoVO2),
  }), [tests, identity.gender]);

  const scoresRowing = useMemo(() => ({
    sitReach: getScoreRowing('sitReach', identity.gender, tests.sitReach),
    shoulderFlexibility: getScoreRowing('shoulderFlexibility', identity.gender, tests.shoulderFlexibility),
    core: getScoreRowing('core', identity.gender, tests.coreRowing),
    pushUp: getScoreRowing('pushUp', identity.gender, tests.pushUpRowing),
    deadlift: getScoreRowing('deadlift', identity.gender, tests.deadlift),
    benchFull: getScoreRowing('benchFull', identity.gender, tests.benchFull),
    squat: getScoreRowing('squat', identity.gender, tests.squatRowing),
    singleLeg: getScoreRowing('singleLeg', identity.gender, tests.singleLeg),
    rowing30s: getScoreRowing('rowing30s', identity.gender, tests.rowing30s),
    rowing5Min: getScoreRowing('rowing5Min', identity.gender, tests.rowing5Min),
    rowingVO2: getScoreRowing('rowingVO2', identity.gender, tests.rowingVO2),
  }), [tests, identity.gender]);

  const activeScores = identity.subCabor === 'Canoeing' ? scoresCanoeing : scoresRowing;
  const activeLabels = identity.subCabor === 'Canoeing' 
    ? ['Flex Bahu', 'Ext Bahu', 'Push Up', 'Bench PR', 'Squat', 'Core', 'Med Ball', 'Wingate', 'Sprint Air', 'Paddle 6M', 'VO2Max']
    : ['SitReach', 'Flex Bahu', 'Core', 'Push Up', 'Deadlift', 'Bench PR', 'Squat', 'Leg Bal', 'Row 30s', 'Row 5M', 'VO2Max'];

  const averageScore = useMemo(() => {
    const vals = Object.values(activeScores);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [activeScores]);

  const isBlanko = !identity.name && averageScore === 0;

  const handleReset = () => {
    if (window.confirm("Hapus semua data isian?")) window.location.reload();
  };

  const handleDownloadImage = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const element = document.getElementById('report-container');
      const dataUrl = await htmlToImage.toPng(element, { quality: 1.0, backgroundColor: "#f8fafc", pixelRatio: 2 });
      const safeName = identity?.name ? identity.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'atlet';
      const link = document.createElement("a");
      link.download = `Rapor_Fisik_Dayung_${identity.subCabor}_${safeName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error); alert("Gagal membuat gambar rapor.");
    } finally {
      setIsExporting(false);
    }
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 font-bold text-slate-900 focus:outline-none focus:border-cyan-500 transition-all";
  const testInputClass = "w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 font-black text-slate-900 focus:outline-none focus:border-cyan-500 transition-all pr-24 placeholder:text-[11px] placeholder:font-bold placeholder:text-slate-400/70 text-right";

  return (
    <div id="report-container" className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 font-sans print:bg-white print:py-0 print:px-0">
      
      {isExporting && (
        <style dangerouslySetInnerHTML={{__html: `
          #report-container input, #report-container select { appearance: none !important; -webkit-appearance: none; padding-bottom: 8px !important; }
          #report-container input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none !important; margin: 0 !important; }
          #report-container input:focus, #report-container select:focus { box-shadow: none !important; border-color: #e2e8f0 !important; }
        `}} />
      )}

      {/* HEADER OCEAN THEME */}
      <header className="bg-slate-900 text-white p-6 md:p-8 shadow-2xl relative overflow-hidden w-full max-w-7xl rounded-t-[2.5rem]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute top-[-50%] right-[-10%] w-[60%] h-[150%] bg-cyan-500/20 blur-[100px] rounded-full transform rotate-45"></div>
           <div className="absolute bottom-[-50%] left-[-10%] w-[60%] h-[150%] bg-blue-600/20 blur-[100px] rounded-full transform -rotate-45"></div>
        </div>
        
        <div className="mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-block bg-cyan-400 text-slate-900 font-black text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-lg border border-cyan-300">
              PERMENPORA 15 TAHUN 2024
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              KALKULATOR FISIK<br/><span className="text-cyan-400">DAYUNG (PODSI)</span>
            </h1>
          </div>
          <div className="text-left md:text-right w-full md:w-auto">
            {!isExporting && (
              <div className="no-print flex flex-wrap items-center justify-start md:justify-end gap-3 mb-5">
                <button onClick={handleReset} className="bg-white/10 hover:bg-rose-500/90 text-white px-5 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold tracking-wider backdrop-blur-sm border border-white/10 hover:border-rose-500/50 shadow-lg">
                  <IconReset /> <span className="hidden md:inline">Reset</span>
                </button>
                <button onClick={handleDownloadImage} disabled={isExporting} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-black tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-70 disabled:cursor-not-allowed">
                  <IconDownload /> {isExporting ? 'Memproses...' : 'Unduh Rapor (PNG)'}
                </button>
              </div>
            )}
            
            {/* CABOR SWITCHER (VERY IMPORTANT) */}
            <div className="inline-flex bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-1.5 shadow-inner">
               <button onClick={() => setIdentity({...identity, subCabor: 'Canoeing'})} className={`px-6 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${identity.subCabor === 'Canoeing' ? 'bg-cyan-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'}`}>
                 KANO (CANOEING)
               </button>
               <button onClick={() => setIdentity({...identity, subCabor: 'Rowing'})} className={`px-6 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${identity.subCabor === 'Rowing' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>
                 DAYUNG (ROWING)
               </button>
            </div>
            <p className="font-bold text-slate-500 text-[9px] tracking-[0.3em] uppercase mt-4 opacity-60">
              Developed by <span className="text-cyan-400">fiqhipondaa9</span>
            </p>
          </div>
        </div>
      </header>

      <main className={`${isExporting ? 'w-[1100px]' : 'max-w-7xl w-full'} mx-auto mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6`}>
        
        {/* ================= KOLOM KIRI (Input Data) ================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="bg-slate-900 text-cyan-400 p-2.5 rounded-2xl"><IconUser /></div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide">Profil Atlet & Antropometri</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Nama Atlet</label><input type="text" value={identity.name} onChange={e => setIdentity({...identity, name: e.target.value})} className={inputClass} placeholder={isExporting ? "" : "Nama lengkap..."} /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Klub / Provinsi</label><input type="text" value={identity.origin} onChange={e => setIdentity({...identity, origin: e.target.value})} className={inputClass} placeholder={isExporting ? "" : "Asal daerah..."} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Tgl Lahir</label><input type="date" value={identity.dob} onChange={e => setIdentity({...identity, dob: e.target.value})} className={`${inputClass} text-sm`} /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Umur</label><div className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 font-black text-slate-900 text-center">{age !== '-' ? `${age} Thn` : '\u00A0'}</div></div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Jenis Kelamin</label>
                <select value={identity.gender} onChange={e => setIdentity({...identity, gender: e.target.value})} className={`${inputClass} cursor-pointer`}>
                  <option value="Putra">Putra (Laki-laki)</option><option value="Putri">Putri (Perempuan)</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{label: 'Tinggi (cm)', id: 'height'}, {label: 'Berat (kg)', id: 'weight'}, {label: 'Rentang Lengan', id: 'armSpan'}, {label: 'Tinggi Duduk', id: 'sitHeight'}].map(item => (
                 <div key={item.id} className="space-y-1">
                   <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</label>
                   <input type="number" value={anthro[item.id]} onChange={e => setAnthro({...anthro, [item.id]: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-center focus:border-cyan-500 outline-none" placeholder={isExporting ? "" : "0"} />
                 </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800">
               <div className="flex items-center gap-3"><IconScale /> <span className="font-bold text-xs tracking-widest uppercase text-slate-300">Indeks Massa Tubuh (IMT)</span></div>
               <div className="flex items-center gap-4">
                 <span className="text-3xl font-black">{bmiData.bmi}</span>
                 {bmiData.status !== '-' && <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-800 border border-slate-700 shadow-inner ${bmiData.color}`}>{bmiData.status}</span>}
               </div>
            </div>

            {/* KOTAK RASIO TUNGKAI & LENGAN (DAYUNG) */}
            {(anthro.height > 0 && (anthro.armSpan > 0 || anthro.sitHeight > 0)) && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 animate-in fade-in">
                <div className="bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm flex flex-col justify-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-cyan-500"></div>
                   <div className="flex justify-between items-start mb-2 pl-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ape Index</span>
                      <span className={`text-[9px] bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg font-black uppercase tracking-widest ${proportionData.apeIndex.color}`}>{proportionData.apeIndex.text}</span>
                   </div>
                   <div className="flex items-end gap-2 pl-2 mt-1">
                      <span className="text-3xl font-black text-slate-900 leading-none">{proportionData.apeIndex.value}</span>
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 mt-2 pl-2 uppercase tracking-widest">{proportionData.apeIndex.desc}</p>
                </div>
                
                <div className="bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm flex flex-col justify-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                   <div className="flex justify-between items-start mb-2 pl-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rasio Tungkai</span>
                      <span className={`text-[9px] bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg font-black uppercase tracking-widest ${proportionData.legRatio.color}`}>{proportionData.legRatio.text}</span>
                   </div>
                   <div className="flex items-end gap-2 pl-2 mt-1">
                      <span className="text-3xl font-black text-slate-900 leading-none">{proportionData.legRatio.value}</span>
                   </div>
                   <p className="text-[10px] font-bold text-slate-400 mt-2 pl-2 uppercase tracking-widest">{proportionData.legRatio.desc}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <div className="bg-cyan-100 text-cyan-600 p-2.5 rounded-2xl"><IconBoat /></div>
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-wide">Rekam Tes: {identity.subCabor}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
               {/* ================= RENDER TES KHUSUS CANOEING ================= */}
               {identity.subCabor === 'Canoeing' && [
                 { id: 'shoulderFlex', label: 'Shoulder Flexion', unit: 'derajat' },
                 { id: 'shoulderExt', label: 'Shoulder Extension', unit: 'derajat' },
                 { id: 'pushUpCanoe', label: 'Push Up (1 Min)', unit: 'reps' },
                 { id: 'coreCanoe', label: 'Core Stability', unit: 'level' },
                 { id: 'benchPress', label: '1RM Bench Press', unit: 'BW Ratio' },
                 { id: 'squatCanoe', label: '1RM Squat', unit: 'BW Ratio' },
                 { id: 'medBall', label: 'Med. Ball Throw', unit: 'meter' },
                 { id: 'wingate', label: '30s Wingate Anaerobic', unit: 'watt' },
                 { id: 'sprintWater', label: 'Sprint 20m (Water)', unit: 'detik' },
                 { id: 'paddle', label: '6 Min Paddle Test', unit: 'meter' },
               ].map(item => (
                 <div key={item.id} className="flex flex-col relative group">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{item.label}</label>
                   <div className="relative">
                     <input type="number" step="0.1" value={tests[item.id]} onChange={e => setTests({...tests, [item.id]: e.target.value})} className={testInputClass} placeholder={getTargetPlaceholder('Canoeing', item.id.replace('Canoe',''), identity.gender)} />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.unit}</span>
                   </div>
                 </div>
               ))}

               {/* ================= RENDER TES KHUSUS ROWING ================= */}
               {identity.subCabor === 'Rowing' && [
                 { id: 'sitReach', label: 'Sit & Reach', unit: 'cm' },
                 { id: 'shoulderFlexibility', label: 'Shoulder Flexibility', unit: 'cm' },
                 { id: 'coreRowing', label: 'Core Stability', unit: 'level' },
                 { id: 'pushUpRowing', label: 'Push Up (1 Min)', unit: 'reps' },
                 { id: 'deadlift', label: '1RM Deadlift', unit: 'BW Ratio' },
                 { id: 'squatRowing', label: '1RM Squat', unit: 'BW Ratio' },
                 { id: 'benchFull', label: '1RM Benchfull', unit: 'BW Ratio' },
                 { id: 'singleLeg', label: 'Single Leg Balance', unit: 'detik' },
                 { id: 'rowing30s', label: '30s All Out Rowing', unit: 'watt' },
                 { id: 'rowing5Min', label: '5 Min Ergo Test', unit: 'meter' },
               ].map(item => (
                 <div key={item.id} className="flex flex-col relative group">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{item.label}</label>
                   <div className="relative">
                     <input type="number" step="0.1" value={tests[item.id]} onChange={e => setTests({...tests, [item.id]: e.target.value})} className={testInputClass} placeholder={getTargetPlaceholder('Rowing', item.id.replace('Rowing',''), identity.gender)} />
                     <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.unit}</span>
                   </div>
                 </div>
               ))}

               {/* VO2 MAX ERGOMETER (Dipakai keduanya, tapi id state beda agar mandiri) */}
               <div className="sm:col-span-2 bg-cyan-50/50 p-6 rounded-[2rem] border border-cyan-100 mt-2 shadow-inner">
                 <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                   <label className="text-sm font-black text-slate-800 uppercase tracking-wide">
                     {identity.subCabor === 'Canoeing' ? 'Canoe Ergometer (VO2Max)' : 'Rowing Ergo VO2Max'}
                   </label>
                   <span className="bg-cyan-500 text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">
                     Target Emas: {getTargetPlaceholder(identity.subCabor, identity.subCabor === 'Canoeing' ? 'ergoVO2' : 'rowingVO2', identity.gender)}
                   </span>
                 </div>
                 <div className="relative">
                   <input type="number" step="0.1" value={identity.subCabor === 'Canoeing' ? tests.ergoVO2 : tests.rowingVO2} onChange={e => setTests({...tests, [identity.subCabor === 'Canoeing' ? 'ergoVO2' : 'rowingVO2']: e.target.value})} className={`${testInputClass} bg-white border-cyan-200 py-4 text-xl`} placeholder="Hasil Uji Lab / Ergo..." />
                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-cyan-600 uppercase tracking-widest">mL/Kg/Min</span>
                 </div>
               </div>

            </div>
          </div>
        </div>

        {/* ================= KOLOM KANAN (Visualisasi & Skor) ================= */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className={`rounded-[2.5rem] p-8 shadow-xl text-center relative overflow-hidden transition-all duration-700 border-2 ${averageScore > 80 ? 'bg-slate-900 text-white border-slate-800' : averageScore < 60 && averageScore > 0 ? 'bg-rose-600 text-white border-rose-500' : 'bg-white border-slate-200'}`}>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50"></div>
            <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${averageScore > 80 || (averageScore < 60 && averageScore > 0) ? 'text-slate-400' : 'text-slate-500'}`}>Akumulasi Performa</h3>
            <div className="text-7xl font-black tracking-tighter mb-5 drop-shadow-md">{isBlanko ? '-' : averageScore || 0}</div>
            
            <div className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-inner border ${averageScore > 80 ? 'bg-slate-800 text-cyan-400 border-slate-700' : averageScore < 60 && averageScore > 0 ? 'bg-rose-800/50 text-rose-100 border-rose-500' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
               {averageScore > 80 ? 'DIREKOMENDASIKAN (ELIT)' : averageScore < 60 && averageScore > 0 ? 'DEGRADASI / EVALUASI' : averageScore > 0 ? 'STANDAR MINIMAL' : isBlanko ? 'BLANKO TEMPLATE TES' : 'BELUM ADA DATA UJI'}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-200 flex-1 flex flex-col">
             <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest text-center mb-6">Poligon Kapasitas Bio-Motorik</h3>
             <div className="flex-1 flex items-center justify-center min-h-[280px] bg-slate-50/50 rounded-[2rem] p-4 border border-slate-100 relative">
               {/* Label Cabor di dalam Radar */}
               <div className="absolute top-4 left-4 bg-white border border-slate-200 px-3 py-1 rounded-lg text-[8px] font-black text-cyan-600 tracking-widest uppercase shadow-sm opacity-80">{identity.subCabor} MODE</div>
               <RadarChart data={Object.values(activeScores)} labels={activeLabels} isBlanko={isBlanko} />
             </div>
             <p className="text-[9px] font-bold text-slate-400 text-center mt-5 uppercase tracking-widest bg-slate-100 py-2 rounded-xl">Garis Biru = Standar Sempurna (100 Poin)</p>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-5 flex justify-between items-center">
              <span>Distribusi Poin</span>
              <span className="text-[9px] bg-slate-100 px-2 py-1 rounded text-slate-400">MAKS 100</span>
            </h3>
            <div className="space-y-3">
              {activeLabels.map((label, idx) => {
                const val = Object.values(activeScores)[idx];
                return (
                  <div key={idx} className="flex items-center group">
                    <span className="text-[10px] font-bold text-slate-600 uppercase w-24 tracking-wider">{label}</span>
                    {isBlanko ? (
                      <div className="flex-1 border-b-2 border-dashed border-slate-200 mx-3"></div>
                    ) : (
                      <div className="flex-1 flex justify-end items-center gap-3 ml-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className={`h-full transition-all duration-1000 ${val >= 80 ? 'bg-cyan-500' : val >= 60 ? 'bg-blue-400' : 'bg-rose-500'}`} style={{ width: `${val}%` }}></div>
                        </div>
                        <span className={`text-xs font-black w-7 text-right ${val >= 80 ? 'text-cyan-600' : val >= 60 ? 'text-blue-500' : 'text-rose-500'}`}>{val}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}