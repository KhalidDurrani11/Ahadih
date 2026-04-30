const fs = require('fs');
const files = [
  'src/app/team/[id]/page.tsx',
  'src/app/team/page.tsx',
  'src/app/news/[id]/page.tsx',
  'src/app/news/page.tsx',
  'src/app/ceo/page.tsx',
  'src/app/careers/page.tsx',
  'src/app/affiliation/page.tsx',
  'src/app/accreditations/page.tsx'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/import\s+\{\s*Footer\s*\}\s+from\s+['\"].*?Footer['\"];?\r?\n?/g, '');
    content = content.replace(/\s*<Footer\s*\/>\r?\n?/g, '\n');
    fs.writeFileSync(f, content);
    console.log('Fixed', f);
  }
});
