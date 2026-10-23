const fs = require('fs');
const path = require('path');
const ts = require(path.resolve('node_modules/typescript'));
const readCatalog = (name) => {
  const mod = { exports: {} };
  new Function('exports', 'module', ts.transpileModule(fs.readFileSync(`src/localization/${name}.ts`, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText)(mod.exports, mod);
  return mod.exports.default;
};
const names = new Set(['Domingo', 'Antonio Kahn', 'Katarina Erantzo', 'Rudolph', 'Marquis Martinez', 'Commander Ezequiel']);
for (const [source, target] of [['ui', 'koreanUi'], ['combat', 'koreanCombat']]) {
  const keys = Object.keys(readCatalog(source));
  const lines = fs.readFileSync(path.join(__dirname, `${source}-translations.txt`), 'utf8').trimEnd().split(/\r?\n/);
  if (keys.length !== lines.length) throw Error(`${source}: ${keys.length} keys, ${lines.length} translations`);
  const catalog = Object.fromEntries(keys.flatMap((key, i) => names.has(key) ? [] : [[key, lines[i].replace(/\\n/g, '\n').replaceAll('프랑코', '페레로').replaceAll('마사와', '맛사와').replaceAll('페레로 신부', '펠리페 신부').replaceAll('헤르메스 2세호', '헤르메스2세호')]]));
  fs.writeFileSync(`src/localization/${target}.ts`, `// Korean translations. English source keys and save identifiers stay unchanged.\n// Standalone character names belong to koreanTerms.\nconst ${target}: Record<string, string> = ${JSON.stringify(catalog, null, 2)};\n\nexport default ${target};\n`);
  console.log(`${target}: ${Object.keys(catalog).length} entries`);
}
