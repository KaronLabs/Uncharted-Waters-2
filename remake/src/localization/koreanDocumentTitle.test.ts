import fs from 'fs';
import path from 'path';
import { localizeDocument, setLocale } from './index';

test('the shipped document title follows Korean, English, and Chinese selection', () => {
  const head = document.head.innerHTML;
  const html = fs.readFileSync(
    path.join(__dirname, '../homepage/index.html'),
    'utf8',
  );
  const [title] = html.match(/<title\b[^>]*>[\s\S]*?<\/title>/)!;
  document.head.innerHTML = title;
  try {
    setLocale('en');
    localizeDocument();
    expect(document.title).toBe('Uncharted Waters: New Horizons');
    setLocale('zh-CN');
    localizeDocument();
    expect(document.title).toBe('大航海时代II — 约翰篇');
    setLocale('ko-KR');
    localizeDocument();
    expect(document.title).toBe('대항해시대 II — 조안편');
  } finally {
    document.head.innerHTML = head;
  }
});
