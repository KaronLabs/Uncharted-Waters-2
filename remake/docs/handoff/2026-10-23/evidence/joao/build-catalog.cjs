const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../../../../');
const parts = [
  ['joaoLisbon', 'lisbon-ko.txt'],
  ['joaoFirstVoyage', 'first-voyage-ko.txt'],
  ['joaoConflictAndGrowth', 'conflict-ko.txt'],
  ['joaoMassawa', 'massawa-ko.txt'],
  ['joaoFinale', 'finale-ko.txt'],
];
const names = new Set([
  'Antonio Kahn', 'Katarina Erantzo', 'Ali Vezas', 'Sasha', 'Pietro',
  'Taphiel', 'Rudolph', 'Ezequiel', 'Martinez',
]);
const result = {};
for (const [name, translationFile] of parts) {
  const source = fs.readFileSync(path.join(root, 'src/localization/dialogue', `${name}.ts`), 'utf8')
    .replace(': Record<string, string>', '')
    .replace(`export default ${name};`, `return ${name};`);
  const keys = Object.keys(Function(source)());
  const translations = fs.readFileSync(path.join(__dirname, translationFile), 'utf8').trimEnd().split(/\r?\n/);
  if (keys.length !== translations.length) throw new Error(`${name}: ${keys.length} keys != ${translations.length} translations`);
  keys.forEach((key, index) => {
    if (!names.has(key)) result[key] = translations[index];
  });
  console.log(`${name}: ${keys.length}`);
}
fs.writeFileSync(path.join(root, 'src/localization/koreanJoao.ts'),
  '// João dialogue, journal entries, and endings. Proper names are in koreanTerms.\n' +
  '// English keys and substitution tokens are part of the story contract.\n' +
  'const koreanJoao: Record<string, string> = ' + JSON.stringify(result, null, 2) + ';\n\nexport default koreanJoao;\n');
console.log(`Written ${Object.keys(result).length} Korean story translations.`);
