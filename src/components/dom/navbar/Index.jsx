import Link from 'next/link';
import MenuButton from '@src/components/dom/navbar/components/MenuButton';
import MenuLinks from '@src/components/dom/navbar/components/MenuLinks';
import clsx from 'clsx';
import styles from '@src/components/dom/navbar/styles/index.module.scss';
import { useCallback, useState, useRef } from 'react';
import useScroll from '@src/hooks/useScroll';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';

function Navbar() {
  const router = useRouter();
  const [lenis, isDarkTheme, toggleTheme] = useStore(useShallow((state) => [state.lenis, state.isDarkTheme, state.toggleTheme]));
  const [opacity, setOpacity] = useState(1);
  const lastScrollY = useRef(0);

  useScroll(({ scroll }) => {
    const currentScrollY = scroll;
    if (currentScrollY > 10) {
      setOpacity(0);
    } else {
      setOpacity(1);
    }
    lastScrollY.current = currentScrollY;
  }, []);

  const scrollToPosition = useCallback(
    (position, duration = 1.5) => {
      if (lenis) {
        lenis.scrollTo(position, {
          duration,
          force: true,
          easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
          onComplete: () => {
            lenis.start();
          },
        });
      }
    },
    [lenis],
  );

  const goToTop = useCallback(() => {
    if (router.pathname === '/') {
      scrollToPosition(0);
    }
  }, [router.pathname, scrollToPosition]);

  return (
    <>
      <MenuLinks />

      <header className={styles.root} role="banner">
        <div className={styles.innerHeader}>
          <Link onClick={goToTop} aria-label="Go home" scroll={false} href="/">
            <h4 style={{ color: 'var(--black)', opacity, transition: 'opacity 0.3s ease, color 0.5s ease' }} className={clsx('bold', 'h4')}>
              JAYZEEE
            </h4>
          </Link>

          <div className={styles.rightContainer}>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={styles.themeToggle}
            >
              <svg
                viewBox="0 0 24 24"
                className={styles.themeIcon}
                style={{
                  transform: isDarkTheme ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M12 2 A10 10 0 0 1 12 22 Z"
                  fill="currentColor"
                />
                <circle cx="12" cy="8" r="1.5" fill={isDarkTheme ? 'currentColor' : 'var(--white)'} style={{ transition: 'fill 0.3s ease' }} />
                <circle cx="12" cy="16" r="1.5" fill={isDarkTheme ? 'var(--white)' : 'currentColor'} style={{ transition: 'fill 0.3s ease' }} />
              </svg>
            </button>
            <MenuButton />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
