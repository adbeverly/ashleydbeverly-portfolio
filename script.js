'use strict';

const output    = document.getElementById('output');
const inputLine = document.getElementById('input-line');
const dispText  = document.getElementById('display-text');
const cmdInput  = document.getElementById('cmd-input');

inputLine.style.visibility = 'hidden';

const isMobile = window.matchMedia('(pointer: coarse)').matches;
if (isMobile) inputLine.style.display = 'none';

// ── Utilities ──

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

const terminalBody = document.getElementById('terminal-body');

function scrollDown() {
  if (isMobile) {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  } else {
    window.scrollTo(0, document.body.scrollHeight);
  }
}

function ln(html = '', color = '') {
  const el = document.createElement('span');
  el.className = 'ln';
  if (color) el.style.color = color;
  el.innerHTML = html;
  output.appendChild(el);
  scrollDown();
}

function blank() {
  ln();
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Boot sequence ──

async function typewriterLn(text, color = '', charDelay = 32) {
  const el = document.createElement('span');
  el.className = 'ln';
  if (color) el.style.color = color;
  output.appendChild(el);
  scrollDown();
  for (const char of text) {
    el.textContent += char;
    scrollDown();
    await sleep(charDelay);
  }
}

const SC_DEFS = [
  { label: 'whoami',             cmd: 'whoami' },
  { label: 'cat career.log',     cmd: 'cat career.log' },
  { label: './impact --numbers', cmd: './impact --numbers' },
  { label: 'ls skills/',         cmd: 'ls skills/' },
  { label: 'cat about.txt',      cmd: 'cat about.txt' },
  { label: 'code .',             cmd: 'code .' },
  { label: 'ask me anything',    cmd: 'ask me anything' },
];

function renderShortcutButtons() {
  const row = document.createElement('div');
  row.className = 'sc-row';
  SC_DEFS.forEach(({ label, cmd }) => {
    const btn = document.createElement('button');
    btn.className = 'sc';
    if (cmd === 'ask me anything') btn.classList.add('sc-ask');
    btn.dataset.cmd = cmd;
    btn.textContent = label;
    btn.addEventListener('click', () => shortcutClick(cmd));
    row.appendChild(btn);
  });
  output.appendChild(row);
  scrollDown();
}

async function bootSequence() {
  await sleep(200);
  await typewriterLn('initializing ashleydbeverly.dev...', '#8b949e');
  await sleep(200);
  await typewriterLn('loading system...', '#8b949e');
  await sleep(400);
  blank();
  await typewriterLn('system ready.', '#56d364');
  await sleep(300);
  blank();
  await typewriterLn('> type a command or choose below:', '#8b949e');
  blank();
  renderShortcutButtons();
  blank();
}

async function boot() {
  await bootSequence();
  inputLine.style.visibility = 'visible';
  setActiveBtn('whoami');
  await typeAndRun('whoami');
}

// ── Commands ──

async function whoami() {
  blank();
  ln('<span style="color:#f778ba;font-weight:700">ashley beverly</span>');
  ln('<span style="color:#c9d1d9">senior developer &amp; systems thinker</span>');
  ln('<span style="color:#8b949e">royal oak, mi &nbsp;&nbsp;|&nbsp;&nbsp; remote</span>');
  blank();
  ln(
    '<span style="color:#58a6ff">313-595-1077</span>' +
    '<span style="color:#8b949e"> &nbsp;|&nbsp; </span>' +
    '<a href="mailto:AshleyDBeverly@gmail.com">AshleyDBeverly@gmail.com</a>' +
    '<span style="color:#8b949e"> &nbsp;|&nbsp; </span>' +
    '<a href="https://linkedin.com/in/ashleydbeverly" target="_blank" rel="noopener">linkedin.com/in/ashleydbeverly</a>'
  );
  blank();
}

async function careerLog() {
  const entries = [
    { year: '2015 - 2016', role: 'Mortgage Banker',                    desc: 'client-facing, sales, consumer finance' },
    { year: '2016 - 2017', role: 'Underwriter',                         desc: 'compliance, loan analysis, regulatory requirements' },
    { year: '2017 - 2020', role: 'Information Developer',               desc: 'first on the team, self-taught, shipped production tools' },
    { year: '2020 - 2023', role: 'Team Leader, Information Developer',  desc: 'coding standards, mentorship, delivery workflows' },
    { year: '2023 - present', role: 'Senior Information Developer',        desc: 'AI automation, GCP, enterprise scale' },
  ];

  blank();
  for (const e of entries) {
    ln(
      `<span style="color:#e3b341">${e.year}</span>` +
      `<span style="color:#8b949e"> — </span>` +
      `<span style="color:#c9d1d9;font-weight:700">${e.role}</span>`
    );
    ln(`<span style="color:#8b949e">        ${e.desc}</span>`);
    blank();
    await sleep(100);
  }
}

async function impact() {
  blank();
  ln('<span style="color:#8b949e">&gt; calculating impact...</span>');
  blank();
  await sleep(500);

  const rows = [
    { num: '6,800 hrs/month', desc: 'saved via AI-driven automation' },
    { num: '90%',             desc: 'system success rate in production' },
    { num: '69%',             desc: 'of app migrations led (18 of 26)' },
    { num: '50K+',            desc: 'monthly interactions on shipped tools' },
  ];

  for (const r of rows) {
    ln(
      `  <span style="color:#56d364;font-weight:700;display:inline-block;min-width:20ch">${r.num}</span>` +
      `<span style="color:#8b949e">${r.desc}</span>`
    );
    await sleep(130);
  }
  blank();
}

async function lsSkills() {
  const groups = [
    ['JavaScript (ES6+)', 'Angular', 'HTML/CSS', 'jQuery/JSON'],
    ['Google Cloud Platform', 'Cloud Functions/Run', 'Firestore'],
    ['Dialogflow CX', 'Vertex AI', 'Gemini', 'Contact Center AI'],
    ['Salesforce', 'REST APIs', 'Git', 'ServiceNow'],
  ];

  blank();
  for (const group of groups) {
    ln(group.map(s => `<span class="tag">${s}</span>`).join(''));
    await sleep(100);
  }
  blank();
}

async function catAbout() {
  blank();
  const lines = [
    'Self-taught. No bootcamp. No CS degree. Just curiosity and a decade of',
    'building things that actually ship. Started in sales. Learned the business',
    'from the ground up. Figured out code because I needed to solve problems.',
    'Built production tools at scale. Led a team. Never stopped learning.',
  ];
  for (const l of lines) {
    ln(l);
    await sleep(50);
  }
  blank();
}

async function helpCmd() {
  blank();
  ln('<span style="color:#8b949e">available commands:</span>');
  blank();

  const cmds = [
    { cmd: 'whoami',              desc: 'name, title, location, contact' },
    { cmd: 'code .',              desc: 'open github' },
    { cmd: 'cat career.log',      desc: 'career timeline' },
    { cmd: './impact --numbers',  desc: 'impact metrics' },
    { cmd: 'ls skills/',          desc: 'full tech stack' },
    { cmd: 'cat about.txt',       desc: 'personal story' },
    { cmd: 'clear',               desc: 'clear the terminal' },
    { cmd: 'privacy',             desc: 'privacy notice' },
    { cmd: 'help',                desc: 'show this menu' },
  ];

  for (const c of cmds) {
    ln(
      `  <span style="color:#58a6ff;display:inline-block;min-width:24ch">${c.cmd}</span>` +
      `<span style="color:#8b949e">— ${c.desc}</span>`
    );
  }
  blank();
}

async function clearCmd() {
  output.innerHTML = '';
  await bootSequence();
  setActiveBtn('whoami');
  await typeAndRun('whoami');
}

async function privacyCmd() {
  blank();
  ln('<span style="color:#58a6ff">&gt; privacy.txt</span>');
  await sleep(80);
  ln('<span style="color:#8b949e">// this site logs approximate visit location and weather</span>');
  ln('<span style="color:#8b949e">// no personal data is collected or stored</span>');
  blank();
}

async function codeCmd() {
  blank();
  ln('<span style="color:#8b949e">opening repository...</span>');
  await sleep(400);
  ln('<a href="https://github.com/adbeverly" target="_blank" rel="noopener">github.com/adbeverly</a>');
  blank();
  window.open('https://github.com/adbeverly', '_blank', 'noopener');
}

async function askPlaceholder() {
  blank();
  ln('<span style="color:#f778ba">ask my resume</span> <span style="color:#8b949e">— coming soon</span>');
  await sleep(80);
  ln('<span style="color:#8b949e">// drop back in once the next feature ships</span>');
  blank();
}

// ── Command map ──

const CMD_MAP = {
  'whoami':             whoami,
  'cat career.log':     careerLog,
  './impact --numbers': impact,
  'ls skills/':         lsSkills,
  'cat about.txt':      catAbout,
  'code .':             codeCmd,
  'help':               helpCmd,
  'clear':              clearCmd,
  'privacy':            privacyCmd,
  'ask me anything':    askPlaceholder,
};

// ── Input handling ──

let cmdHistory = [];
let histIdx    = -1;

async function runCommand(raw) {
  const trimmed = raw.trim();

  ln(
    '<span style="color:#58a6ff">&gt;</span> ' +
    '<span style="color:#c9d1d9">' + esc(trimmed) + '</span>'
  );

  if (!trimmed) return;

  cmdHistory.unshift(trimmed);
  histIdx = -1;

  const key = trimmed.toLowerCase();

  if (key === 'clear') {
    clearCmd();
    return;
  }

  const handler = CMD_MAP[key];
  if (handler) {
    await handler();
  } else {
    blank();
    ln(
      `<span style="color:#8b949e">command not found: ` +
      `<span style="color:#c9d1d9">${esc(trimmed)}</span>. ` +
      `type <span style="color:#e3b341">help</span> for available commands.</span>`
    );
    blank();
  }
}

cmdInput.addEventListener('input', () => {
  dispText.textContent = cmdInput.value;
});

cmdInput.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const val = cmdInput.value;
    cmdInput.value = '';
    dispText.textContent = '';
    await runCommand(val);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx < cmdHistory.length - 1) {
      histIdx++;
      cmdInput.value = cmdHistory[histIdx];
      dispText.textContent = cmdHistory[histIdx];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx > 0) {
      histIdx--;
      cmdInput.value = cmdHistory[histIdx];
      dispText.textContent = cmdHistory[histIdx];
    } else {
      histIdx = -1;
      cmdInput.value = '';
      dispText.textContent = '';
    }
  }
});

document.getElementById('terminal-body').addEventListener('click', () => {
  if (!isMobile) cmdInput.focus();
});

// ── Shortcut buttons ──

function setShortcutsEnabled(enabled) {
  document.querySelectorAll('.sc').forEach(b => b.disabled = !enabled);
}

function setActiveBtn(cmd) {
  document.querySelectorAll('.sc').forEach(b => {
    b.classList.toggle('sc-active', b.dataset.cmd === cmd);
  });
}

async function typeAndRun(command) {
  setShortcutsEnabled(false);
  if (!isMobile) cmdInput.focus();

  for (const char of command) {
    cmdInput.value += char;
    dispText.textContent = cmdInput.value;
    await sleep(48);
  }

  await sleep(180);

  cmdInput.value = '';
  dispText.textContent = '';
  await runCommand(command);

  setShortcutsEnabled(true);
}

async function shortcutClick(cmd) {
  setShortcutsEnabled(false);
  output.innerHTML = '';
  renderShortcutButtons();
  setActiveBtn(cmd);
  blank();
  await typeAndRun(cmd);
}

boot();
