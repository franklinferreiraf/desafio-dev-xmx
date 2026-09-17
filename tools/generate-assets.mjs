/**
 * Gera o SVG que NÃO veio no pacote de assets do Figma:
 * favicon (o único que não veio do Figma).
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

/* ---------- Open Graph / favicon ---------- */
save('favicon.svg', svg(32, 32,
  `<rect width="32" height="32" rx="8" fill="#2a0a0f"/><path d="M16 5 C16 5 7 16 7 21 A9 9 0 0 0 25 21 C25 16 16 5 16 5 Z" fill="#e86a64"/>`));
