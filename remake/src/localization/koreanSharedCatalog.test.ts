import fs from 'fs';
import path from 'path';
import ts from 'typescript';
import { ui } from './ui';
import combat from './combat';
import koreanUi from './koreanUi';
import koreanCombat from './koreanCombat';
import { koreanCatalog } from './catalogs';

const namesOwnedByTerms = new Set([
  'Domingo',
  'Antonio Kahn',
  'Katarina Erantzo',
  'Rudolph',
  'Marquis Martinez',
  'Commander Ezequiel',
]);
const tokens = (text: string) => text.match(/\{[^}]+\}/g)?.sort() ?? [];

test('every literal translation call in live source has a Korean entry', () => {
  const calls: string[] = [];
  const inspectDirectory = (directory: string) => {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        inspectDirectory(file);
      } else if (/\.tsx?$/.test(file) && !/\.test\.tsx?$/.test(file)) {
        const source = ts.createSourceFile(
          file,
          fs.readFileSync(file, 'utf8'),
          ts.ScriptTarget.Latest,
          true,
        );
        const visit = (node: ts.Node) => {
          if (
            ts.isCallExpression(node) &&
            node.expression.getText(source) === 't' &&
            node.arguments[0] &&
            ts.isStringLiteralLike(node.arguments[0])
          ) {
            calls.push(node.arguments[0].text);
          }
          ts.forEachChild(node, visit);
        };
        visit(source);
      }
    });
  };
  inspectDirectory(path.join(__dirname, '..'));
  expect(calls.length).toBeGreaterThan(100);
  const missing = Array.from(new Set(calls)).filter(
    (source) => !koreanCatalog[source],
  );
  expect(missing).toEqual([]);
});

test.each([
  ['UI', ui, koreanUi],
  ['combat', combat, koreanCombat],
])(
  '%s catalog covers every source with Korean and preserves substitution tokens',
  (_name, sources, translated) => {
    Object.keys(sources).forEach((source) => {
      if (namesOwnedByTerms.has(source)) return;
      expect(translated[source]).toMatch(/[가-힣]/);
      expect(tokens(translated[source])).toEqual(tokens(source));
      expect(translated[source]).not.toContain('\uFFFD');
    });
  },
);

test('shared catalogs keep canonical keys distinct and agree wherever keys overlap', () => {
  Object.entries(koreanCombat).forEach(([source, translated]) => {
    if (source in koreanUi) expect(koreanUi[source]).toBe(translated);
  });
});

test('homepage has Korean for every translatable English text node', () => {
  document.body.innerHTML = fs.readFileSync(
    path.join(__dirname, '../homepage/index.html'),
    'utf8',
  );
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-en]'));
  expect(nodes.length).toBe(25);
  nodes.forEach((node) => expect(node.dataset.ko).toMatch(/[가-힣]/));
});
