const fs = require('fs');

const file = 'f:/arjun2025-Portfolio/arjunportfolio/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Loader import
if (!content.includes("import { Loader }")) {
  content = content.replace(
    "import { AnglerFish } from './components/AnglerFish';",
    "import { AnglerFish } from './components/AnglerFish';\nimport { Loader } from './components/Loader';"
  );
}

// 2. Add isLoading state and useEffect
if (!content.includes("const [isLoading, setIsLoading] = useState(true);")) {
  content = content.replace(
    "const [mobileMenuOpen, setMobileMenuOpen] = useState(false);",
    "const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [isLoading, setIsLoading] = useState(true);"
  );

  content = content.replace(
    "useEffect(() => {",
    "useEffect(() => {\n    const timer = setTimeout(() => {\n      setIsLoading(false);\n    }, 2000);\n    return () => clearTimeout(timer);\n  }, []);\n\n  useEffect(() => {"
  );
}

// 3. Render Loader
if (!content.includes("<Loader />")) {
  content = content.replace(
    /(return \(\n\s*<div ref=\{containerRef\}\s*className="relative w-full overflow-hidden bg-\[#010103\]"\s*>)/,
    `$1\n      {isLoading && <Loader />}`
  );
}

// 4. Update GSAP so it only plays AFTER loading is done
const gsapRegex = /useGSAP\(\(\) => \{([\s\S]*?)\}, \{ scope: containerRef \}\);/;
const match = content.match(gsapRegex);
if (match && !match[1].includes("if (isLoading) return;")) {
  const newGsapContent = match[1].replace(
    "const tl = gsap.timeline();",
    "if (isLoading) return;\n    const tl = gsap.timeline();"
  );
  content = content.replace(
    gsapRegex,
    `useGSAP(() => {${newGsapContent}}, { scope: containerRef, dependencies: [isLoading] });`
  );
}


fs.writeFileSync(file, content, 'utf8');
console.log('done');
