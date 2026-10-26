const fs = require('fs');
const path = require('path');
const d = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, Table, TableRow, TableCell,
  WidthType, BorderStyle, ShadingType, LevelFormat, AlignmentType } = d;

function runs(text, base = {}) {
  const out = [];
  const re = /\[(УТОЧНИТЬ|ГИПОТЕЗА|ФОТО|ВИДЕО)([^\]]*)\]|\[([^\]]+)\]\((https?:[^)]+)\)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    if (m[1]) {
      const isMark = m[1] === 'УТОЧНИТЬ' || m[1] === 'ГИПОТЕЗА';
      out.push(new TextRun({ text: `[${m[1]}${m[2]}]`, ...base, bold: true,
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: isMark ? 'FFF2A8' : 'D6EEF8' } }));
    } else {
      out.push(new ExternalHyperlink({ link: m[4], children: [new TextRun({ text: m[3], style: 'Hyperlink', ...base })] }));
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}

function table(rows) {
  const total = 9026, n = rows[0].length, w = Math.floor(total / n);
  const widths = Array(n).fill(w); widths[n - 1] = total - w * (n - 1);
  const border = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
  const borders = { top: border, bottom: border, left: border, right: border };
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: rows.map((r, i) => new TableRow({ tableHeader: i === 0, children: r.map((c, j) => new TableCell({
      width: { size: widths[j], type: WidthType.DXA }, borders,
      shading: i === 0 ? { type: ShadingType.CLEAR, fill: 'EDEDED', color: 'auto' } : undefined,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: runs(c, i === 0 ? { bold: true } : {}) })] })) }))
  });
}

function convert(src, dst) {
  const lines = fs.readFileSync(src, 'utf8').split('\n');
  const children = []; let title = '';
  let numRef = 0;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l.trim()) continue;
    if (l.startsWith('# ')) { title = l.slice(2); children.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun(title)] })); continue; }
    if (l.startsWith('## ')) { children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(l.slice(3))] })); continue; }
    if (/^\*[^*].*\*$/.test(l.trim())) { children.push(new Paragraph({ spacing: { after: 240 }, children: runs(l.trim().slice(1, -1), { italics: true, color: '666666' }) })); continue; }
    if (l.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        const cells = lines[i].split('|').slice(1, -1).map(s => s.trim());
        if (!cells.every(c => /^-+$/.test(c))) rows.push(cells);
        i++;
      }
      i--; children.push(table(rows)); children.push(new Paragraph({ children: [] })); continue;
    }
    if (/^\d+\. /.test(l)) {
      const ref = 'num' + (numRef++ % 1); // single numbering definition, restart via instance
      const inst = numRef;
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        children.push(new Paragraph({ numbering: { reference: 'numbers', level: 0, instance: inst }, children: runs(lines[i].replace(/^\d+\. /, '')) }));
        i++;
      }
      i--; continue;
    }
    if (l.startsWith('- ')) {
      while (i < lines.length && lines[i].startsWith('- ')) {
        children.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: runs(lines[i].slice(2)) }));
        i++;
      }
      i--; continue;
    }
    children.push(new Paragraph({ children: runs(l) }));
  }
  const doc = new Document({
    creator: 'GENGLASS', title,
    styles: {
      default: { document: { run: { font: 'Arial', size: 24 }, paragraph: { spacing: { after: 160, line: 300 } } } },
      paragraphStyles: [
        { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal', run: { size: 40, bold: true, font: 'Arial' }, paragraph: { spacing: { after: 120, line: 360, lineRule: 'auto' } } },
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 30, bold: true, font: 'Arial' }, paragraph: { spacing: { before: 360, after: 160 }, outlineLevel: 0 } },
      ],
    },
    numbering: { config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'numbers', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ] },
    sections: [{ properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } }, children }],
  });
  return Packer.toBuffer(doc).then(b => fs.writeFileSync(dst, b));
}

const dir = process.argv[2];
Promise.all(fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f =>
  convert(path.join(dir, f), path.join(dir, f.replace(/\.md$/, '.docx'))))).then(() => console.log('ok'));
