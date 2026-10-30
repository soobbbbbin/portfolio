/* 1. 스크롤 진행바 */
const progress = document.querySelector('.progress');
const root = document.documentElement;

function updateProgress() {
  const max = root.scrollHeight - root.clientHeight;
  const ratio = max > 0 ? root.scrollTop / max : 0;
  if (progress) progress.style.transform = `scaleX(${ratio})`;
}

updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

/* 2. 등장 애니메이션 */
const targets = document.querySelectorAll('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => observer.observe(el));
}

/* 3. 이메일 복사 */
const copyButton = document.querySelector('[data-copy]');

if (copyButton) {
  const defaultLabel = copyButton.textContent ?? '이메일 복사';

  copyButton.addEventListener('click', async () => {
    const value = copyButton.dataset.copy ?? '';

    try {
      await navigator.clipboard.writeText(value);
      copyButton.textContent = '복사됨 ✓';
    } catch {
      copyButton.textContent = value;
    }

    window.setTimeout(() => {
      copyButton.textContent = defaultLabel;
    }, 1800);
  });
}
