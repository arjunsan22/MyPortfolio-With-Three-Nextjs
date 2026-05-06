const fs = require('fs');

const file = 'f:/arjun2025-Portfolio/arjunportfolio/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the fixed 2000ms timeout with a proper load event listener
const oldUseEffect = /useEffect\(\(\) => \{\s*const timer = setTimeout\(\(\) => \{\s*setIsLoading\(false\);\s*\}, 2000\);\s*return \(\) => clearTimeout\(timer\);\s*\}, \[\]\);/;

const newUseEffect = `useEffect(() => {
    // If the page has already fully loaded before this effect runs
    if (document.readyState === 'complete') {
      setIsLoading(false);
      return;
    }

    // Wait for all assets (images, fonts, stylesheets) to finish loading
    const handleLoad = () => {
      // Add a tiny delay just to ensure smooth transition
      setTimeout(() => setIsLoading(false), 500); 
    };

    window.addEventListener('load', handleLoad);

    // Fallback just in case the load event fails or takes ridiculously long
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(fallbackTimer);
    };
  }, []);`;

content = content.replace(oldUseEffect, newUseEffect);

fs.writeFileSync(file, content, 'utf8');
console.log('done');
