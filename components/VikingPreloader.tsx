'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const PRELOADER_DURATION_MS = 15000;
const PRELOADER_BG_SRC = '/preloader/bg.webp';

function isReloadNavigation() {
  const navEntry = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;

  return navEntry?.type === 'reload';
}

function GlobeIcon() {
  return (
    <svg className="viking-preloader-orb-icon" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4" />
      <path d="M12 3.5c2.4 2.2 3.7 5.2 3.7 8.5S14.4 18.3 12 20.5" />
      <path d="M12 3.5c-2.4 2.2-3.7 5.2-3.7 8.5S9.6 18.3 12 20.5" />
      <path d="M6.1 7.2c1.8 1 3.8 1.5 5.9 1.5s4.1-.5 5.9-1.5" />
      <path d="M6.1 16.8c1.8-1 3.8-1.5 5.9-1.5s4.1.5 5.9 1.5" />
    </svg>
  );
}

export function VikingPreloader() {
  const { theme, isReady } = useTheme();
  const [isVisible, setVisible] = useState(false);
  const [canBegin, setCanBegin] = useState(false);
  const [isBgReady, setBgReady] = useState(false);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const shouldShow = theme === 'viking' && isReloadNavigation();

    if (!shouldShow) {
      setVisible(false);
      setCanBegin(false);
      setBgReady(false);
      document.body.classList.remove('is-viking-loading');
      return;
    }

    setVisible(true);
    setCanBegin(false);
    setBgReady(false);
    document.body.classList.add('is-viking-loading');

    const image = new window.Image();
    const handleImageLoad = () => setBgReady(true);
    image.addEventListener('load', handleImageLoad);
    image.src = PRELOADER_BG_SRC;

    const timeout = window.setTimeout(() => {
      setCanBegin(true);
    }, PRELOADER_DURATION_MS);

    return () => {
      window.clearTimeout(timeout);
      image.removeEventListener('load', handleImageLoad);
      document.body.classList.remove('is-viking-loading');
    };
  }, [theme, isReady]);

  const handleBegin = () => {
    setVisible(false);
    setCanBegin(false);
    document.body.classList.remove('is-viking-loading');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section
      className={`viking-preloader ${isBgReady ? 'is-bg-ready' : 'is-bg-fallback'}`.trim()}
      role="status"
      aria-live="polite"
      aria-label="Loading Viking mode"
    >
      <div className="viking-preloader-scene">
        <aside className="viking-preloader-panel">
          <div className="viking-preloader-panel-head">
            <p className="viking-preloader-kicker">VEUH STUDIO</p>
            <h2>Entering Viking Mode</h2>
          </div>

          <p className="viking-preloader-description">
            Calling the northbound skin, loading collection visuals, and preparing your storefront.
          </p>

          <h3>Loading Sequence</h3>
          <ul className="viking-preloader-list">
            <li>Runic interface layers</li>
            <li>Cart and checkout systems</li>
            <li>Collection and story scenes</li>
          </ul>

          <div className="viking-preloader-foot">
            {canBegin ? (
              <div className="viking-preloader-cta">
                <span className="viking-preloader-orb" aria-hidden>
                  <GlobeIcon />
                </span>
                <button type="button" className="button viking-preloader-explore" onClick={handleBegin}>
                  Begin Experience
                </button>
              </div>
            ) : (
              <div className="viking-preloader-loading">
                <div className="viking-preloader-bar" aria-hidden>
                  <span />
                </div>
                <p>
                  Loading, please wait<span className="viking-loader-dots" aria-hidden />
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
