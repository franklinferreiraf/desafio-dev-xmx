/**
 * Gera as imagens placeholder (SVG) usadas na landing page.
 *
 * Não temos os arquivos de imagem do Figma, então todas as imagens são
 * ilustrações vetoriais geradas aqui. Para trocar por fotos reais, basta
 * substituir os arquivos em assets/img mantendo os mesmos nomes (ou ajustar
 * os caminhos no index.html).
 *
 * Uso: node tools/generate-assets.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'assets', 'img');
mkdirSync(out, { recursive: true });

const svg = (w, h, body, defs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
  (defs ? `<defs>${defs}</defs>` : '') +
  body +
  `</svg>\n`;

const save = (name, content) => {
  writeFileSync(join(out, name), content);
  console.log('✔', name);
};

/* ---------- Pote do produto ---------- */
const bottleDefs = `
  <linearGradient id="bBody" x1="0" x2="1">
    <stop offset="0" stop-color="#1a0508"/><stop offset=".35" stop-color="#4a0d14"/>
    <stop offset=".6" stop-color="#2f070c"/><stop offset="1" stop-color="#140305"/>
  </linearGradient>
  <linearGradient id="bCap" x1="0" x2="1">
    <stop offset="0" stop-color="#6b0f18"/><stop offset=".45" stop-color="#b33a3a"/><stop offset="1" stop-color="#5a0c14"/>
  </linearGradient>
  <linearGradient id="bLabel" x1="0" x2="1">
    <stop offset="0" stop-color="#e9e4e1"/><stop offset=".4" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d2cf"/>
  </linearGradient>`;

// Desenha um pote com origem (x, y) no canto superior esquerdo, largura 160 x altura 250
const bottle = (x = 0, y = 0, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="80" cy="248" rx="78" ry="8" fill="#000" opacity=".18"/>
    <rect x="22" y="0" width="116" height="42" rx="8" fill="url(#bCap)"/>
    <rect x="22" y="8" width="116" height="3" fill="#000" opacity=".15"/>
    <rect x="22" y="18" width="116" height="3" fill="#000" opacity=".15"/>
    <rect x="22" y="28" width="116" height="3" fill="#000" opacity=".15"/>
    <path d="M14 52 Q14 40 28 40 H132 Q146 40 146 52 V236 Q146 248 132 248 H28 Q14 248 14 236 Z" fill="url(#bBody)"/>
    <rect x="14" y="78" width="132" height="130" fill="url(#bLabel)"/>
    <path d="M80 92 C80 92 66 108 66 118 A14 14 0 0 0 94 118 C94 108 80 92 80 92 Z" fill="#b33a3a"/>
    <text x="80" y="156" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="800" font-size="20" fill="#2a0a0f" letter-spacing="1">TENURIMA</text>
    <text x="80" y="174" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="9" fill="#a91e2c">BLOOD PRESSURE SUPPORT</text>
    <text x="80" y="195" text-anchor="middle" font-family="Arial, sans-serif" font-size="7.5" fill="#555">DIETARY SUPPLEMENT · 60 CAPSULES</text>
    <rect x="30" y="52" width="10" height="186" rx="5" fill="#fff" opacity=".08"/>
  </g>`;

const capsule = (x, y, rot) => `
  <g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-22" y="-9" width="44" height="18" rx="9" fill="#f4efe9"/>
    <path d="M0 -9 H13 A9 9 0 0 1 13 9 H0 Z" fill="#b33a3a"/>
    <rect x="-16" y="-6" width="26" height="3" rx="1.5" fill="#fff" opacity=".6"/>
  </g>`;

save('bottle.svg', svg(160, 260, bottle(0, 4), bottleDefs));

save('product-hero.svg', svg(560, 440,
  `<ellipse cx="280" cy="400" rx="250" ry="26" fill="#000" opacity=".25"/>` +
  bottle(90, 80, 1.25) + bottle(270, 110, 1.15) +
  capsule(90, 400, -20) + capsule(150, 418, 15) + capsule(420, 410, 30) + capsule(480, 392, -10) + capsule(360, 425, 5),
  bottleDefs));

const bundle = (count) => {
  // Posições dos potes para 2, 3 e 6 unidades (fileira de trás menor e mais alta)
  const layouts = {
    2: [[40, 20, 1], [190, 20, 1]],
    3: [[20, 30, .9], [240, 30, .9], [120, 10, 1]],
    6: [[0, 0, .72], [120, 0, .72], [240, 0, .72], [30, 70, .8], [160, 70, .8], [95, 90, .9]],
  };
  const w = 400, h = 300;
  const items = layouts[count].map(([x, y, s]) => bottle(x + (count === 6 ? 25 : 0), y, s)).join('');
  return svg(w, h, items, bottleDefs);
};
save('bottles-2.svg', bundle(2));
save('bottles-3.svg', bundle(3));
save('bottles-6.svg', bundle(6));

/* ---------- Logo ---------- */
save('logo-drop.svg', svg(32, 40,
  `<path d="M16 2 C16 2 3 18 3 26 A13 13 0 0 0 29 26 C29 18 16 2 16 2 Z" fill="#c8323a"/>` +
  `<path d="M10 24 A6 6 0 0 0 14 31" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"/>`));

/* ---------- About ---------- */
save('about-elder.svg', svg(520, 560,
  `<rect width="520" height="560" fill="url(#g)"/>
   <circle cx="300" cy="190" r="92" fill="#8a8a8a"/>
   <path d="M210 150 Q300 70 392 150 Q380 110 300 96 Q220 110 210 150 Z" fill="#d6d6d6"/>
   <path d="M120 560 Q130 330 300 310 Q470 330 480 560 Z" fill="#6e6e6e"/>
   <path d="M250 318 L300 380 L350 318" fill="#9c9c9c"/>
   <circle cx="268" cy="190" r="6" fill="#444"/><circle cx="332" cy="190" r="6" fill="#444"/>
   <path d="M270 238 Q300 256 330 238" stroke="#444" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2e2e2"/><stop offset="1" stop-color="#b9b9b9"/></linearGradient>`));

save('about-body.svg', svg(240, 460,
  `<g fill="#f3d9d6" stroke="#e7b9b4" stroke-width="2">
     <circle cx="120" cy="48" r="34"/>
     <path d="M80 92 H160 Q196 96 200 140 L214 260 Q216 276 202 276 Q190 276 188 262 L172 160 L168 270 L176 440 Q176 454 160 454 Q146 454 144 440 L124 300 H116 L96 440 Q94 454 80 454 Q64 454 64 440 L72 270 L68 160 L52 262 Q50 276 38 276 Q24 276 26 260 L40 140 Q44 96 80 92 Z"/>
   </g>
   <g stroke="#c8323a" stroke-width="3" fill="none" stroke-linecap="round">
     <path d="M120 110 V290 M120 160 Q96 170 86 240 L82 420 M120 160 Q144 170 154 240 L158 420"/>
     <path d="M120 120 Q86 124 70 150 L48 258 M120 120 Q154 124 170 150 L192 258"/>
   </g>
   <g stroke="#3b5bdb" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7">
     <path d="M112 116 V280 M112 170 Q90 190 92 250 L90 420 M128 170 Q150 190 148 250 L150 420"/>
   </g>
   <path d="M120 150 C120 150 104 136 104 128 A8 8 0 0 1 120 124 A8 8 0 0 1 136 128 C136 136 120 150 120 150 Z" fill="#a91e2c"/>`));

const vessel = (name, hue) => save(name, svg(120, 120,
  `<circle cx="60" cy="60" r="60" fill="${hue}"/>
   <path d="M-10 70 Q30 40 60 62 T130 50" stroke="#ffb3ad" stroke-width="16" fill="none" opacity=".6"/>
   <path d="M-10 70 Q30 40 60 62 T130 50" stroke="#e03a3e" stroke-width="10" fill="none"/>
   <circle cx="40" cy="56" r="5" fill="#ff6a6a"/><circle cx="72" cy="62" r="4" fill="#ff6a6a"/><circle cx="96" cy="54" r="5" fill="#ff6a6a"/>
   <path d="M20 20 Q50 30 60 10 M80 100 Q90 80 115 90" stroke="#a31b25" stroke-width="3" fill="none"/>`));
vessel('vessel-1.svg', '#5c1015');
vessel('vessel-2.svg', '#7a1a20');
vessel('vessel-3.svg', '#3d0a0f');
vessel('vessel-4.svg', '#6a121a');

/* ---------- Ingredientes ---------- */
const ing = (name, bg, body) => save(name, svg(120, 120, `<circle cx="60" cy="60" r="60" fill="${bg}"/>${body}`));

ing('ing-hawthorn.svg', '#eaf3e1',
  `<path d="M30 90 Q60 60 92 28" stroke="#6b4b2a" stroke-width="4" fill="none"/>
   <path d="M40 50 Q20 30 42 22 Q56 36 40 50 Z M84 76 Q104 94 82 100 Q70 86 84 76 Z" fill="#5c9a3c"/>
   <circle cx="58" cy="70" r="12" fill="#c62828"/><circle cx="74" cy="56" r="11" fill="#b71c1c"/><circle cx="50" cy="52" r="9" fill="#d32f2f"/>`);
ing('ing-garlic.svg', '#f5efe6',
  `<path d="M60 26 Q58 40 60 46 Q30 56 32 80 Q36 98 60 98 Q84 98 88 80 Q90 56 60 46" fill="#fbf8f1" stroke="#d8cbb4" stroke-width="3"/>
   <path d="M60 50 Q48 70 52 96 M60 50 Q72 70 68 96" stroke="#d8cbb4" stroke-width="3" fill="none"/>
   <path d="M58 26 Q60 16 64 12" stroke="#7a9a4a" stroke-width="4" fill="none"/>`);
ing('ing-olive.svg', '#e7efe0',
  `<path d="M24 96 Q60 60 98 24" stroke="#6b5a2a" stroke-width="3" fill="none"/>
   <path d="M40 80 Q24 60 40 50 Q50 66 40 80 Z M60 60 Q46 38 64 30 Q72 48 60 60 Z M76 44 Q90 24 100 38 Q88 52 76 44 Z M50 72 Q72 70 76 86 Q58 92 50 72 Z" fill="#7d9b56"/>
   <ellipse cx="72" cy="72" rx="9" ry="12" fill="#3f4d1f"/>`);
ing('ing-hibiscus.svg', '#fde8ec',
  `<g transform="translate(60 60)">
     ${[0, 72, 144, 216, 288].map(r => `<ellipse rx="18" ry="30" cy="-24" fill="#d81b60" transform="rotate(${r})"/>`).join('')}
     <circle r="10" fill="#880e4f"/><path d="M0 0 L22 -20" stroke="#ffd54f" stroke-width="3"/>
   </g>`);
ing('ing-b6.svg', '#fff4e0',
  `<rect x="30" y="40" width="60" height="40" rx="20" fill="#ff9800"/>
   <text x="60" y="68" text-anchor="middle" font-family="Poppins, Arial" font-weight="800" font-size="22" fill="#fff">B6</text>`);
ing('ing-b12.svg', '#fde7e7',
  `<rect x="26" y="40" width="68" height="40" rx="20" fill="#c62828"/>
   <text x="60" y="68" text-anchor="middle" font-family="Poppins, Arial" font-weight="800" font-size="22" fill="#fff">B12</text>`);

/* ---------- Fundo da seção "Why" ---------- */
const person = (cx, scale, tone) => `
  <g transform="translate(${cx} 120) scale(${scale})">
    <circle cy="80" r="70" fill="${tone}"/>
    <path d="M-40 90 Q0 130 40 90" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M-150 520 Q-140 190 0 170 Q140 190 150 520 Z" fill="${tone}"/>
  </g>`;
save('why-bg.svg', svg(1440, 720,
  `<rect width="1440" height="720" fill="#6b5a55"/>` +
  person(200, 1.1, '#a38b82') + person(470, 1, '#8d7169') + person(980, 1.05, '#9a7f76') + person(1250, 1.15, '#b09890')));

/* ---------- Avatares de depoimentos ---------- */
const avatar = (name, bg, skin, hair) => save(name, svg(200, 240,
  `<rect width="200" height="240" fill="${bg}"/>
   <path d="M20 240 Q30 150 100 140 Q170 150 180 240 Z" fill="#ffffff" opacity=".85"/>
   <circle cx="100" cy="92" r="46" fill="${skin}"/>
   <path d="M54 88 Q60 36 100 38 Q140 36 146 88 Q136 60 100 58 Q64 60 54 88 Z" fill="${hair}"/>
   <circle cx="84" cy="94" r="4" fill="#3a2a22"/><circle cx="116" cy="94" r="4" fill="#3a2a22"/>
   <path d="M84 114 Q100 126 116 114" stroke="#3a2a22" stroke-width="4" fill="none" stroke-linecap="round"/>`));
avatar('customer-michael.svg', '#d9c7bd', '#e0b39a', '#bdbdbd');
avatar('customer-susan.svg', '#e6d3d6', '#f0c7ad', '#e8e0d5');
avatar('customer-robert.svg', '#c9d3db', '#c99a7c', '#8d8d8d');
avatar('customer-linda.svg', '#e4dccb', '#f2cfb6', '#a1887f');
avatar('customer-james.svg', '#cfd8cc', '#8d5f45', '#3e3e3e');
avatar('customer-patricia.svg', '#ead7e3', '#e8b99d', '#cfcfcf');

/* ---------- Bandeiras de pagamento ---------- */
const card = (name, bg, body) => save(name, svg(48, 30, `<rect width="48" height="30" rx="4" fill="${bg}" stroke="#ddd"/>${body}`));
card('pay-visa.svg', '#fff', `<text x="24" y="20" text-anchor="middle" font-family="Arial" font-style="italic" font-weight="900" font-size="13" fill="#1a1f71">VISA</text>`);
card('pay-mastercard.svg', '#fff', `<circle cx="19" cy="15" r="8" fill="#eb001b"/><circle cx="29" cy="15" r="8" fill="#f79e1b" opacity=".9"/>`);
card('pay-amex.svg', '#2e77bc', `<text x="24" y="19" text-anchor="middle" font-family="Arial" font-weight="900" font-size="10" fill="#fff">AMEX</text>`);
card('pay-discover.svg', '#fff', `<text x="21" y="18" text-anchor="middle" font-family="Arial" font-weight="700" font-size="7.5" fill="#222">DISCOVER</text><circle cx="41" cy="15" r="4" fill="#f48120"/>`);

/* ---------- Open Graph / favicon ---------- */
save('favicon.svg', svg(32, 32,
  `<rect width="32" height="32" rx="8" fill="#2a0a0f"/><path d="M16 5 C16 5 7 16 7 21 A9 9 0 0 0 25 21 C25 16 16 5 16 5 Z" fill="#e86a64"/>`));
