/**
 * Verifica todos os href/src locais de todos os .html da raiz:
 *  - arquivos referenciados existem (pega erro de digitação tipo "contatc.html")
 *  - âncoras (#id) existem na página de destino
 *  - nenhum link/botão tem href vazio ou "#" solto
 *  - toda <img> tem atributo alt
 *
 * Uso: node tools/check-links.mjs   (sai com código 1 se houver problema)
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlFiles = readdirSync(root).filter((f) => f.endsWith('.html'));
const idsOf = (file) => new Set([...readFileSync(join(root, file), 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

const problems = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(join(root, file), 'utf8').replace(/<!--[\s\S]*?-->/g, '');

  for (const [, attr, value] of html.matchAll(/\s(href|src)="([^"]*)"/g)) {
    checked += 1;
    if (value === '' || value === '#') {
      problems.push(`${file}: ${attr} vazio ou "#" solto`);
      continue;
    }
    if (/^(https?:|mailto:|tel:)/.test(value)) continue;

    const [pathAndQuery, hash] = value.split('#');
    const path = pathAndQuery.split('?')[0];
    const target = path || file;

    if (path && !existsSync(join(root, path))) {
      problems.push(`${file}: arquivo inexistente → ${value}`);
      continue;
    }
    if (hash && target.endsWith('.html') && !idsOf(target).has(hash)) {
      problems.push(`${file}: âncora inexistente → ${value}`);
    }
  }

  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(tag)) problems.push(`${file}: <img> sem alt → ${tag.slice(0, 80)}`);
  }
}

if (problems.length) {
  console.error(`✖ ${problems.length} problema(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`✔ ${htmlFiles.length} páginas, ${checked} links/src verificados, nenhum problema.`);
