/**
 * Gera os pequenos SVGs que NÃO vieram no pacote de assets do Figma:
 * ícone do logo e favicon (placeholders simples).
 * Fotos, mockups, ícones de ingredientes, rótulo e selo são os arquivos
 * reais exportados do Figma (ver README).
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

/* ---------- Logo ---------- */
save('logo-drop.svg', svg(32, 40,
  `<path d="M16 2 C16 2 3 18 3 26 A13 13 0 0 0 29 26 C29 18 16 2 16 2 Z" fill="#c8323a"/>` +
  `<path d="M10 24 A6 6 0 0 0 14 31" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"/>`));

/* ---------- Open Graph / favicon ---------- */
save('favicon.svg', svg(32, 32,
  `<rect width="32" height="32" rx="8" fill="#2a0a0f"/><path d="M16 5 C16 5 7 16 7 21 A9 9 0 0 0 25 21 C25 16 16 5 16 5 Z" fill="#e86a64"/>`));
