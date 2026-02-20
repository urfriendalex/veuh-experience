'use client';

import { useEffect, useRef, useState } from 'react';
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
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!isReady || hasInitializedRef.current) {
      return;
    }

    hasInitializedRef.current = true;
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
            <p className="viking-preloader-kicker">ARMAVIR</p>
            <h2>VIKTOR VEUH выходит на мировую сцену</h2>
          </div>

          <p className="viking-preloader-description">
            От кассетных киосков девяностых до северных набегов на драккаре: VIKTOR VEUH ведет ARMAVIR
            только по одной доктрине: HYPE, HYPE и еще раз HYPE. Дипломатия возможна, но только если
            оппонент сначала подпишется на движ.
          </p>

          <h3>Особенности и баффы</h3>
          <ul className="viking-preloader-list">
            <li>
              <strong>Берсерк на Кадиллаке:</strong> +50% к морали войск, если бой начинается под
              проверенный трек Моргенштерна.
            </li>
            <li>
              <strong>Балон из караоке:</strong> +2 к харизме, +1 к броне и бесконечный запас
              уверенности в бандне.
            </li>
            <li>
              <strong>Захват шумом:</strong> соседние цивилизации теряют концентрацию, когда VIKTOR
              кричит «HYPE!».
            </li>
            <li>
              <strong>Чета Работа:</strong> рынок в столице дает +1 к золоту за каждый мем,
              который пережил неделю.
            </li>
            <li>
              <strong>Слава ARMAVIR:</strong> при объявлении войны враг получает дебафф
              «Кто вообще это остановит?» на три хода.
            </li>
            <li>
              <strong>Налог на HYPE:</strong> все гроки платят +3 золото налога на хайп а протяжение 10 ходов и 20$ в реальной жизни .
            </li>
          </ul>

          <div className="viking-preloader-foot">
            {canBegin ? (
              <div className="viking-preloader-cta">
                <button
                  type="button"
                  className="viking-preloader-orb"
                  aria-label="Begin game"
                  onClick={handleBegin}
                >
                  <GlobeIcon />
                </button>
                <button type="button" className="button viking-preloader-explore" onClick={handleBegin}>
                  Begin Game
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
