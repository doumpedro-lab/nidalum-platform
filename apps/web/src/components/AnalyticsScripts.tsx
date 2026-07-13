"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import { track } from '@nidalum/analytics';

export default function AnalyticsScripts() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const isAnalyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

  useEffect(() => {
    if (!isAnalyticsEnabled) return;

    // Gestion très simple de la session pour la rétention
    const visitsStr = localStorage.getItem('nidalum_visits');
    const lastVisitDate = localStorage.getItem('nidalum_last_visit');
    const now = new Date();

    let visits = visitsStr ? parseInt(visitsStr) : 0;
    
    // Si c'est la première visite
    if (visits === 0) {
      localStorage.setItem('nidalum_visits', '1');
      localStorage.setItem('nidalum_last_visit', now.toISOString());
      track('PAGE_VIEW', { is_first_visit: true });
    } else if (lastVisitDate) {
      const lastVisit = new Date(lastVisitDate);
      const hoursSinceLastVisit = Math.abs(now.getTime() - lastVisit.getTime()) / 36e5;

      // Si le retour a lieu plus de 24h après
      if (hoursSinceLastVisit >= 24) {
        visits += 1;
        localStorage.setItem('nidalum_visits', visits.toString());
        localStorage.setItem('nidalum_last_visit', now.toISOString());
        
        if (visits === 2) {
          track('RETURN_AFTER_24H', { visit_number: 2 });
        } else if (visits === 3) {
          track('RETURN_AFTER_24H', { visit_number: 3 });
        }
      }
    }
  }, [isAnalyticsEnabled]);

  if (!isAnalyticsEnabled) return null;

  return (
    <>
      {/* GA4 */}
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}
    </>
  );
}
