"use client";

import React, { useEffect, useState } from 'react';
import Head from 'next/head';

// Dashboard très simple - pur texte et data
export default function AdminDashboard() {
  const [data, setData] = useState({
    visitorsToday: 0,
    founderAccessRequests: 0,
    guardiansCreated: 0,
    emailsSent: 0,
    activationRate: '0%',
    apiErrors: 0,
    avgLatency: '0ms'
  });

  useEffect(() => {
    // Plus tard : Fetcher les vraies stats depuis Firestore / Analytics API
    setData({
      visitorsToday: 12,
      founderAccessRequests: 4,
      guardiansCreated: 4,
      emailsSent: 4,
      activationRate: '33%',
      apiErrors: 0,
      avgLatency: '142ms'
    });
  }, []);

  return (
    <div className="bg-black min-h-screen text-[#a3a3a3] font-mono p-8 selection:bg-gold selection:text-black">
      <Head>
        <title>War Room | NIDALUM</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <header className="mb-12 border-b border-[#333333] pb-4">
        <h1 className="text-white text-xl uppercase tracking-widest">War Room</h1>
        <p className="text-xs mt-2 opacity-50">Accès Restreint — Données en temps réel</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="border border-[#222222] p-6 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest opacity-50">Visiteurs (24h)</span>
          <span className="text-3xl text-white">{data.visitorsToday}</span>
        </div>
        
        <div className="border border-[#222222] p-6 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest opacity-50">Founder Access</span>
          <span className="text-3xl text-white">{data.founderAccessRequests}</span>
        </div>

        <div className="border border-[#222222] p-6 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest opacity-50">Guardians Créés</span>
          <span className="text-3xl text-white">{data.guardiansCreated}</span>
        </div>

        <div className="border border-[#222222] p-6 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest opacity-50">Taux d'activation</span>
          <span className="text-3xl text-gold">{data.activationRate}</span>
        </div>

        <div className="border border-[#222222] p-6 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest opacity-50">Emails Envoyés</span>
          <span className="text-3xl text-white">{data.emailsSent}</span>
        </div>

        <div className="border border-[#222222] p-6 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest opacity-50">Erreurs API</span>
          <span className={`text-3xl ${data.apiErrors > 0 ? 'text-red-500' : 'text-white'}`}>{data.apiErrors}</span>
        </div>

        <div className="border border-[#222222] p-6 flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest opacity-50">Latence Moyenne</span>
          <span className="text-3xl text-white">{data.avgLatency}</span>
        </div>
      </div>
    </div>
  );
}
