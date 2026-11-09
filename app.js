/* ==================================================================
   Dashboard ความคืบหน้าการจัดเก็บข้อมูล จปฐ. จังหวัดพะเยา ปี 2570
   สำนักงานพัฒนาชุมชนจังหวัดพะเยา

   ตั้งค่า (แก้เฉพาะส่วนนี้)
   CSV_URL : ลิงก์ CSV จากเมนู ไฟล์ > แชร์ > เผยแพร่ไปยังเว็บ ของ Google Sheets
             วางไว้ระหว่างเครื่องหมาย ' '
             ถ้าเว้นว่าง หน้านี้จะแสดงเป็น "หน้าตัวอย่าง" ด้วยข้อมูลที่ฝังไว้
             ถ้าวันหลังแยกข้อมูลไว้หลายแท็บ ใส่ได้หลายลิงก์ คั่นด้วยเครื่องหมายจุลภาค
   ================================================================== */
const CSV_URLS = [
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRDwRl2uXHjdsydhVYsbxXNmm6zXpqfmdgwvzNJtKFJG6_C1Uy4faWFpI1iJLtqek6_8zLZBw7ax1FK/pub?gid=1510060079&single=true&output=csv'
];

/* วันสิ้นสุดการจัดเก็บ (ต้องพิมพ์ตรงกับวันที่ที่หัวคอลัมน์รายสัปดาห์) */
const DEADLINES = [
  { date:'20 ธันวาคม 2569', label:'สิ้นสุดของจังหวัด', short:'สิ้นสุดจังหวัด' },
  { date:'31 ธันวาคม 2569', label:'สิ้นสุดของกรม', short:'สิ้นสุดกรม' }
];

/* คำที่ใช้ค้นหาตารางในชีต ห้ามเปลี่ยนตัวสะกดในชีต */
const MARK_CURRENT = 'ผลการจัดเก็บปัจจุบัน';
const MARK_WEEKLY = 'ผลการจัดเก็บรายสัปดาห์';

/* ข้อมูลสำรองสำหรับหน้าตัวอย่าง (ใช้เฉพาะเมื่อยังไม่ได้ใส่ CSV_URLS) */
const SNAPSHOT = {"current": {"timestamp": "ข้อมูล ณ วันที่ 9 พฤศจิกายน 2569 เวลา 22.00 น.", "periodLabel": "9 พฤศจิกายน 2569", "rows": [{"name": "เมืองพะเยา", "target": 28472, "collected": 9708, "pct": 34.1}, {"name": "จุน", "target": 12575, "collected": 10246, "pct": 81.48}, {"name": "เชียงคำ", "target": 18981, "collected": 11780, "pct": 62.06}, {"name": "เชียงม่วน", "target": 5406, "collected": 3572, "pct": 66.07}, {"name": "ดอกคำใต้", "target": 17983, "collected": 5782, "pct": 32.15}, {"name": "ปง", "target": 12134, "collected": 5102, "pct": 42.05}, {"name": "แม่ใจ", "target": 8510, "collected": 1716, "pct": 20.16}, {"name": "ภูซาง", "target": 8186, "collected": 2697, "pct": 32.95}, {"name": "ภูกามยาว", "target": 5555, "collected": 1350, "pct": 24.3}], "total": {"target": 117802, "collected": 51953, "pct": 44.1}}, "weekly": {"timestamp": "ข้อมูล ณ วันที่ 6 พฤศจิกายน 2569 เวลา 16.11 น.", "periods": ["6 พฤศจิกายน 2569 เวลา 16.11 น.", "13 พฤศจิกายน 2569 เวลา 16.00 น.", "20 พฤศจิกายน 2569 เวลา 16.00 น.", "27 พฤศจิกายน 2569 เวลา 16.00 น.", "4 ธันวาคม 2569 เวลา 16.00 น.", "11 ธันวาคม 2569 เวลา 16.00 น.", "20 ธันวาคม 2569 เวลา 16.00 น.", "31 ธันวาคม 2569 เวลา 16.00 น."], "rows": [{"name": "เมืองพะเยา", "target": 28472, "values": [{"collected": 7723, "pct": 27.12}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}, {"name": "จุน", "target": 12575, "values": [{"collected": 8626, "pct": 68.6}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}, {"name": "เชียงคำ", "target": 18981, "values": [{"collected": 10310, "pct": 54.32}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}, {"name": "เชียงม่วน", "target": 5406, "values": [{"collected": 3132, "pct": 57.94}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}, {"name": "ดอกคำใต้", "target": 17983, "values": [{"collected": 3501, "pct": 19.47}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}, {"name": "ปง", "target": 12134, "values": [{"collected": 3791, "pct": 31.24}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}, {"name": "แม่ใจ", "target": 8510, "values": [{"collected": 1311, "pct": 15.41}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}, {"name": "ภูซาง", "target": 8186, "values": [{"collected": 2280, "pct": 27.85}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}, {"name": "ภูกามยาว", "target": 5555, "values": [{"collected": 1058, "pct": 19.05}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}], "total": {"target": 117802, "values": [{"collected": 41732, "pct": 35.43}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}, {"collected": null, "pct": null}]}}};

const SOURCES = CSV_URLS.map(s => String(s).trim()).filter(Boolean);
const LIVE = SOURCES.length > 0;
const POLL_MS = 60000;
const state = { data:null, sort:'sheet', filter:null, sel:null };
let ringChart = null, weekChart = null;

const $ = id => document.getElementById(id);
const fmt = n => n == null ? '–' : Number(n).toLocaleString('th-TH');
const fmtPct = n => n == null ? '–' : Number(n).toFixed(2);
const status = p => p == null ? 'na' : (p <= 50 ? 'red' : (p <= 70 ? 'yellow' : 'green'));
const ST_TEXT = { red:'สีแดง ไม่เกินร้อยละ 50', yellow:'สีเหลือง มากกว่าร้อยละ 50 ถึง 70', green:'สีเขียว มากกว่าร้อยละ 70' };
const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();

const TH_MONTH = {'มกราคม':'ม.ค.','กุมภาพันธ์':'ก.พ.','มีนาคม':'มี.ค.','เมษายน':'เม.ย.','พฤษภาคม':'พ.ค.','มิถุนายน':'มิ.ย.','กรกฎาคม':'ก.ค.','สิงหาคม':'ส.ค.','กันยายน':'ก.ย.','ตุลาคม':'ต.ค.','พฤศจิกายน':'พ.ย.','ธันวาคม':'ธ.ค.'};
function shortDate(s){
  const m = String(s||'').match(/(\d{1,2})\s*([ก-๙]+)\s*(\d{4})/);
  if (!m) return s || '';
  return m[1] + ' ' + (TH_MONTH[m[2]] || m[2]);
}

const deadlineOf = s => DEADLINES.find(d => String(s||'').indexOf(d.date) === 0);
const TH_MONTH_IDX = Object.keys(TH_MONTH);
function toDate(s){
  const m = String(s||'').match(/(\d{1,2})\s*([ก-๙]+)\s*(\d{4})(?:.*?(\d{1,2})[.:](\d{2}))?/);
  if (!m) return null; const mi = TH_MONTH_IDX.indexOf(m[2]); if (mi < 0) return null;
  return new Date(+m[3] - 543, mi, +m[1], m[4] ? +m[4] : 23, m[5] ? +m[5] : 59);
}
function nextDeadline(periods){
  const now = new Date();
  for (const d of DEADLINES){
    const full = (periods||[]).find(p => String(p).indexOf(d.date) === 0) || d.date;
    const dt = toDate(full);
    if (dt && dt > now) return { ...d, dt, days: Math.ceil((dt - now) / 86400000) };
  }
  return null;
}

/* ================= อ่านไฟล์ CSV ================= */
function parseCSV(text){
  const rows = []; let row = [], cell = '', q = false;
  text = String(text).replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i++){
    const ch = text[i];
    if (q){
      if (ch === '"'){ if (text[i+1] === '"'){ cell += '"'; i++; } else q = false; }
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ','){ row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r'){
      if (ch === '\r' && text[i+1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell !== '' || row.length){ row.push(cell); rows.push(row); }
  return rows;
}

/* ================= ค้นหาตารางจากคำหัวตาราง ================= */
const T = c => String(c == null ? '' : c).trim();
function num(s){
  const t = T(s).replace(/[,\s%]/g, '');
  if (t === '') return null;
  const n = Number(t); return isNaN(n) ? null : n;
}
const round2 = n => Math.round(n * 100) / 100;

function locateSections(grids){
  const out = { current:null, weekly:null };
  for (const g of grids){
    const marks = [];
    g.forEach((row, r) => row.forEach(c => {
      if (T(c) === MARK_CURRENT) marks.push({ key:'current', row:r });
      if (T(c) === MARK_WEEKLY) marks.push({ key:'weekly', row:r });
    }));
    marks.sort((a, b) => a.row - b.row);
    marks.forEach((m, i) => {
      if (out[m.key]) return;
      out[m.key] = { g, start:m.row, stop: i + 1 < marks.length ? marks[i+1].row : g.length };
    });
  }
  return out;
}

function parseSection(g, start, stop, multi){
  let timestamp = '', hr = -1, targetCol = -1;
  for (let r = start; r < stop; r++){
    const row = g[r] || [];
    if (!timestamp){ const ts = row.find(c => T(c).indexOf('ข้อมูล ณ') === 0); if (ts) timestamp = T(ts); }
    if (row.some(c => T(c) === 'อำเภอ')){ hr = r; targetCol = row.findIndex(c => T(c) === 'เป้าหมาย'); break; }
  }
  if (hr < 0 || targetCol < 0) throw new Error('ไม่พบหัวตาราง "อำเภอ" หรือ "เป้าหมาย"');
  let sr = -1;
  for (let r = hr; r <= Math.min(hr + 2, stop - 1); r++){ if ((g[r]||[]).some(c => T(c) === 'ผลการจัดเก็บ')){ sr = r; break; } }
  if (sr < 0) throw new Error('ไม่พบหัวตาราง "ผลการจัดเก็บ"');

  const periods = [];
  g[sr].forEach((c, col) => {
    if (col <= targetCol || T(c) !== 'ผลการจัดเก็บ') return;
    let label = '';
    for (let k = col; k > targetCol; k--){ const t = T(g[hr][k]); if (t){ label = t; break; } }
    periods.push({ label, colC: col, colP: T(g[sr][col+1]).indexOf('ร้อยละ') >= 0 ? col + 1 : -1 });
  });
  if (!multi) periods.splice(1);

  const cellOf = (row, p, target) => {
    const collected = num(row[p.colC]);
    if (collected == null) return { collected:null, pct:null };
    let pct = p.colP >= 0 ? num(row[p.colP]) : null;
    if (pct == null && target) pct = round2(collected / target * 100);
    return { collected, pct };
  };

  const rows = []; let total = null, blanks = 0;
  for (let r = sr + 1; r < stop; r++){
    const row = g[r] || [];
    const left = row.slice(0, targetCol).map(T);
    if (left.every(t => t === '') && num(row[targetCol]) == null){ if (++blanks > 3) break; continue; }
    blanks = 0;
    const target = num(row[targetCol]);
    const vals = periods.map(p => cellOf(row, p, target));
    if (left.indexOf('รวม') >= 0){ total = { target, values: vals }; break; }
    const name = left.filter(t => t && num(t) == null).pop();
    if (name) rows.push({ name, target, values: vals });
  }
  if (multi) return { timestamp, periods: periods.map(p => p.label), rows, total };
  const flat = o => ({ name:o.name, target:o.target, collected:o.values[0].collected, pct:o.values[0].pct });
  return { timestamp, periodLabel: periods[0] ? periods[0].label : '', rows: rows.map(flat),
    total: total ? { target: total.target, collected: total.values[0].collected, pct: total.values[0].pct } : null };
}

function buildData(grids){
  const s = locateSections(grids);
  if (!s.current) throw new Error('ไม่พบหัวข้อ "' + MARK_CURRENT + '" ในข้อมูลที่เผยแพร่ ตรวจว่าเผยแพร่ถูกแท็บ');
  return {
    current: parseSection(s.current.g, s.current.start, s.current.stop, false),
    weekly: s.weekly ? parseSection(s.weekly.g, s.weekly.start, s.weekly.stop, true) : null
  };
}

/* ================= โหลดข้อมูล ================= */
let loading = false;
async function load(){
  if (!LIVE){
    setLive('', 'หน้าตัวอย่าง ใช้ข้อมูลจากชีต ณ เวลาที่สร้าง');
    render(SNAPSHOT); return;
  }
  if (loading) return; loading = true;
  try{
    const grids = await Promise.all(SOURCES.map(async u => {
      const res = await fetch(u + (u.includes('?') ? '&' : '?') + 't=' + Date.now(), { cache:'no-store' });
      if (!res.ok) throw new Error('Google Sheets ตอบกลับรหัส ' + res.status);
      const text = await res.text();
      if (/^\s*</.test(text)) throw new Error('ลิงก์ที่ใส่ไม่ใช่ไฟล์ CSV ตรวจว่าเลือกรูปแบบ CSV ตอนเผยแพร่');
      return parseCSV(text);
    }));
    render(buildData(grids));
    setLive('on', 'เชื่อมต่อ Google Sheets ตรวจข้อมูลใหม่ทุก 1 นาที');
  } catch(e){
    setLive('err', state.data ? 'เชื่อมต่อไม่สำเร็จ แสดงข้อมูลล่าสุดที่โหลดได้' : 'เชื่อมต่อแหล่งข้อมูลไม่สำเร็จ');
    showNotice('อ่านข้อมูลไม่สำเร็จ: ' + (e && e.message ? e.message : e) + ' ระบบจะลองใหม่อัตโนมัติ');
    if (!state.data) $('ts').textContent = 'ยังโหลดข้อมูลไม่ได้';
  } finally { loading = false; }
}
function setLive(cls, text){ const el=$('live'); el.classList.remove('on','err'); if (cls) el.classList.add(cls); $('liveText').textContent=text; }
function showNotice(t){ const n=$('notice'); n.textContent=t; n.classList.toggle('show', !!t); }

/* ---------- Render ---------- */
function render(d){
  if (!d || !d.current) return;
  state.data = d; showNotice('');
  const c = d.current, t = c.total || {};
  $('ts').textContent = c.timestamp || 'ไม่พบข้อความ “ข้อมูล ณ วันที่” ในชีต';
  $('curLabel').textContent = c.periodLabel ? '(' + c.periodLabel + ')' : '';

  const st = status(t.pct);
  $('kPct').innerHTML = fmtPct(t.pct) + '<small>%</small>';
  $('kPct').style.color = st==='na' ? '' : css('--st-'+st);
  $('kPill').className = 'pill ' + st; $('kPill').textContent = st==='na' ? '' : ST_TEXT[st].split(' ')[0];
  $('kPctSub').textContent = 'ร้อยละของผลการจัดเก็บเทียบกับเป้าหมาย';
  $('kTarget').textContent = fmt(t.target);
  $('kDone').textContent = fmt(t.collected);
  const left = (t.target!=null && t.collected!=null) ? Math.max(t.target - t.collected, 0) : null;
  $('kLeft').textContent = fmt(left);
  let leftSub = left!=null && t.target ? 'คิดเป็นร้อยละ ' + fmtPct(left / t.target * 100) + ' ของเป้าหมาย' : '';
  const nd = nextDeadline(d.weekly && d.weekly.periods);
  if (nd && left > 0){
    leftSub += '<br>อีก <b class="due">' + nd.days + ' วัน</b> ถึงวัน' + nd.label + ' (' + shortDate(nd.date) + ') ต้องจัดเก็บเพิ่มเฉลี่ยวันละ <b class="due">' + fmt(Math.ceil(left / nd.days)) + '</b>';
  }
  $('kLeftSub').innerHTML = leftSub;

  // เทียบกับผลรายสัปดาห์ล่าสุดที่มีข้อมูล
  const w = d.weekly; let deltaText = '';
  if (w && w.total){
    let li = -1; w.total.values.forEach((v,i)=>{ if (v.collected!=null) li=i; });
    if (li>=0 && t.collected!=null){
      const diff = t.collected - w.total.values[li].collected;
      const dp = (t.pct!=null && w.total.values[li].pct!=null) ? (t.pct - w.total.values[li].pct) : null;
      if (diff !== 0) deltaText = '<b>' + (diff>0?'+':'') + fmt(diff) + (dp!=null ? ' (' + (dp>0?'+':'') + dp.toFixed(2) + ' จุด)' : '') + '</b> จากรอบรายสัปดาห์ ' + shortDate(w.periods[li]);
      else deltaText = 'เท่ากับรอบรายสัปดาห์ ' + shortDate(w.periods[li]);
    }
  }
  $('kDelta').innerHTML = deltaText;

  const counts = {red:0,yellow:0,green:0};
  c.rows.forEach(r => { const s=status(r.pct); if (counts[s]!=null) counts[s]++; });
  $('cRed').textContent=counts.red; $('cYellow').textContent=counts.yellow; $('cGreen').textContent=counts.green;

  drawRing(t.pct, st);
  renderList();
  renderWeekly();
}

function drawRing(p, st){
  const v = Math.max(0, Math.min(100, p||0));
  const color = st==='na' ? css('--gray') : css('--st-'+st);
  const data = { datasets:[{ data:[v, 100-v], backgroundColor:[color, css('--track')], borderWidth:0 }] };
  if (ringChart){ ringChart.data = data; ringChart.update(); return; }
  ringChart = new Chart($('ring'), { type:'doughnut', data, options:{ cutout:'78%', responsive:false, animation:{duration:900},
    plugins:{legend:{display:false},tooltip:{enabled:false}}, events:[] } });
}

function renderList(){
  const c = state.data.current;
  let rows = c.rows.map((r,i)=>({...r, i}));
  if (state.filter) rows = rows.filter(r => status(r.pct)===state.filter);
  if (state.sort==='pct') rows.sort((a,b)=>(b.pct??-1)-(a.pct??-1));
  const box = $('dlist');
  if (!rows.length){ box.innerHTML = '<div class="empty">ไม่มีอำเภอในสถานะนี้</div>'; return; }
  box.innerHTML = rows.map(r => {
    const s = status(r.pct), w = Math.max(0, Math.min(100, r.pct||0));
    return '<button type="button" class="drow'+(state.sel===r.name?' sel':'')+'" data-name="'+r.name+'" aria-label="อำเภอ'+r.name+' ร้อยละ '+fmtPct(r.pct)+'">'
      + '<span class="dname">'+r.name+'<small>'+fmt(r.collected)+' / '+fmt(r.target)+'</small></span>'
      + '<span class="track"><span class="fill '+s+'" data-w="'+w+'"></span><span class="tick" style="left:50%"></span><span class="tick" style="left:70%"></span></span>'
      + '<span class="dpct '+s+'">'+fmtPct(r.pct)+'%</span></button>';
  }).join('');
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    box.querySelectorAll('.fill').forEach(f => f.style.width = f.dataset.w + '%');
  }));
}

/* เส้นแบ่งเกณฑ์ 50 / 70 บนกราฟรายสัปดาห์ */
const thresholdPlugin = {
  id:'thresholds',
  beforeDatasetsDraw(chart){
    const {ctx, chartArea:a, scales:{y}} = chart;
    [[50, css('--st-red')],[70, css('--st-green')]].forEach(([v,col])=>{
      const yy = y.getPixelForValue(v);
      ctx.save(); ctx.strokeStyle = col; ctx.globalAlpha=.55; ctx.setLineDash([5,5]); ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(a.left, yy); ctx.lineTo(a.right, yy); ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha=.9; ctx.fillStyle=col; ctx.font='600 11px Sarabun, sans-serif';
      ctx.textAlign='right'; ctx.fillText('ร้อยละ '+v, a.right-4, yy-4); ctx.restore();
    });
  }
};

function renderWeekly(){
  const w = state.data.weekly;
  $('wkStamp').textContent = w && w.timestamp ? w.timestamp : '';
  if (!w || !w.total){ $('wtable').innerHTML='<tr><td class="empty">ยังไม่พบตารางผลการจัดเก็บรายสัปดาห์ในชีต</td></tr>'; return; }
  const labels = w.periods.map(p => { const dl = deadlineOf(p); return dl ? [shortDate(p), dl.short] : shortDate(p); });
  const ptColor = vals => vals.map(p => p==null ? 'transparent' : css('--st-'+status(p)));
  const prov = w.total.values.map(v=>v.pct);
  const ds = [{ label:'ภาพรวมจังหวัด', data:prov, borderColor:getLineColor(), backgroundColor:'transparent',
    borderWidth:3, pointRadius:6, pointHoverRadius:8, pointBackgroundColor:ptColor(prov), pointBorderColor:getLineColor(), pointBorderWidth:2, tension:.25, spanGaps:false }];
  const selRow = state.sel ? w.rows.find(r=>r.name===state.sel) : null;
  if (selRow){
    const sv = selRow.values.map(v=>v.pct);
    ds.push({ label:'อำเภอ'+selRow.name, data:sv, borderColor:css('--red'), backgroundColor:'transparent', borderWidth:2.5, borderDash:[], pointRadius:5,
      pointBackgroundColor:ptColor(sv), pointBorderColor:css('--red'), pointBorderWidth:2, tension:.25 });
  }
  const ink = css('--muted'), grid = css('--line');
  const cfg = { type:'line', data:{ labels, datasets:ds }, plugins:[thresholdPlugin],
    options:{ responsive:true, maintainAspectRatio:false, animation:{duration:700},
      interaction:{mode:'index', intersect:false},
      scales:{ y:{ min:0, max:100, ticks:{stepSize:25, color:ink, font:{family:'Sarabun', size:12}}, grid:{color:grid}, title:{display:true,text:'ร้อยละ',color:ink,font:{family:'Sarabun'}} },
               x:{ ticks:{maxRotation:0, minRotation:0, autoSkip:false, color:(c)=> deadlineOf(w.periods[c.index]) ? css('--red') : ink, font:{family:'Sarabun', size:11.5}}, grid:{display:false} } },
      plugins:{ legend:{ display:true, position:'top', align:'start', labels:{ color:css('--ink'), usePointStyle:true, pointStyle:'circle', boxWidth:8, boxHeight:8, pointStyleWidth:10, font:{family:'Prompt', size:12.5} } },
        tooltip:{ titleFont:{family:'Prompt'}, bodyFont:{family:'Sarabun'},
          callbacks:{ title:(it)=> w.periods[it[0].dataIndex], label:(it)=> it.raw==null ? it.dataset.label+': ยังไม่มีข้อมูล' : it.dataset.label+': ร้อยละ '+fmtPct(it.raw) } } } } };
  if (weekChart){ weekChart.destroy(); }
  weekChart = new Chart($('wchart'), cfg);

  // ตารางสีรายสัปดาห์
  let h = '<thead><tr><th>อำเภอ</th>' + w.periods.map(p=>{ const dl = deadlineOf(p); return '<th title="'+p+'"'+(dl?' class="dl"':'')+'>'+shortDate(p)+(dl?'<small>'+dl.label+'</small>':'')+'</th>'; }).join('') + '</tr></thead><tbody>';
  const cell = v => { const s=status(v.pct); return '<td class="'+s+'" title="'+(v.collected!=null? fmt(v.collected)+' ราย':'ยังไม่มีข้อมูล')+'">'+(v.pct==null?'–':fmtPct(v.pct))+'</td>'; };
  w.rows.forEach(r => { h += '<tr'+(state.sel===r.name?' class="sel"':'')+'><td>'+r.name+'</td>'+r.values.map(cell).join('')+'</tr>'; });
  h += '<tr class="total"><td>รวมจังหวัด</td>'+w.total.values.map(cell).join('')+'</tr></tbody>';
  $('wtable').innerHTML = h;
}
function getLineColor(){
  const dark = getComputedStyle(document.documentElement).colorScheme === 'dark';
  return dark ? '#C9CCF2' : '#24255C';
}

/* ---------- Interactions ---------- */
$('dlist').addEventListener('click', e => {
  const b = e.target.closest('.drow'); if (!b) return;
  state.sel = state.sel===b.dataset.name ? null : b.dataset.name;
  renderList(); renderWeekly();
});
document.querySelectorAll('.chip').forEach(ch => ch.addEventListener('click', () => {
  state.filter = state.filter===ch.dataset.st ? null : ch.dataset.st;
  document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.st===state.filter)));
  renderList();
}));
document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => {
  state.sort = b.dataset.sort;
  document.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-pressed', String(x===b)));
  renderList();
}));
$('btnRefresh').addEventListener('click', load);
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { if (state.data){ ringChart && ringChart.destroy(); ringChart=null; render(state.data); } });

/* ---------- Export PNG ---------- */
function fileName(){
  const ts = (state.data && state.data.current.timestamp || '').replace(/^ข้อมูล ณ วันที่\s*/,'').replace(/[^\dก-๙A-Za-z]+/g,'_').replace(/_+$/,'');
  return 'Dashboard_จปฐ2570_พะเยา_' + (ts || 'ล่าสุด') + '.png';
}
$('btnExport').addEventListener('click', async () => {
  const root = document.documentElement, dash = $('dash');
  const prevTheme = root.getAttribute('data-theme');
  $('busy').classList.add('show');
  try{
    root.setAttribute('data-theme','light');
    dash.classList.add('exporting');
    if (ringChart){ ringChart.destroy(); ringChart=null; }
    render(state.data);
    dash.querySelectorAll('.fill').forEach(f => f.style.width = f.dataset.w + '%');
    await new Promise(r => setTimeout(r, 120));
    weekChart && weekChart.resize();
    await new Promise(r => setTimeout(r, 800));
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const canvas = await html2canvas(dash, { scale:1.5, backgroundColor:'#EEF1F7', useCORS:true, windowWidth:1600, logging:false });
    const url = canvas.toDataURL('image/png');
    $('mImg').src = url; $('mDl').href = url; $('mDl').download = fileName();
    const blob = await (await fetch(url)).blob();
    const file = new File([blob], fileName(), { type:'image/png' });
    const sb = $('mShare');
    if (navigator.canShare && navigator.canShare({ files:[file] })){
      sb.hidden = false;
      sb.onclick = () => navigator.share({ files:[file], title:'Dashboard จปฐ. พะเยา 2570' }).catch(()=>{});
    } else sb.hidden = true;
    $('modal').classList.add('show');
  } catch(err){
    showNotice('สร้างภาพไม่สำเร็จ: ' + (err && err.message ? err.message : err));
  } finally {
    dash.classList.remove('exporting');
    if (prevTheme) root.setAttribute('data-theme', prevTheme); else root.removeAttribute('data-theme');
    if (ringChart){ ringChart.destroy(); ringChart=null; }
    render(state.data);
    $('busy').classList.remove('show');
  }
});
$('mClose').addEventListener('click', () => $('modal').classList.remove('show'));
$('modal').addEventListener('click', e => { if (e.target.id==='modal') $('modal').classList.remove('show'); });
document.addEventListener('keydown', e => { if (e.key==='Escape') $('modal').classList.remove('show'); });

/* ---------- Start ---------- */
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => {
  load();
  if (LIVE){
    setInterval(() => { if (!document.hidden) load(); }, POLL_MS);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) load(); });
  }
});
