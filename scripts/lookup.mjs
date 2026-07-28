#!/usr/bin/env node
/**
 * Lookup rebirth requirements from data/rebirth.json
 *
 * Usage:
 *   node scripts/lookup.mjs --cycle 3 --level 15
 *   node scripts/lookup.mjs --droid mecha-droid
 *   node scripts/lookup.mjs --droid "BB9"
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'data', 'rebirth.json'), 'utf8'));

const args = process.argv.slice(2);
function flag(name) {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return null;
  return args[i + 1] ?? true;
}

function usage(code = 0) {
  console.log(`Usage:
  node scripts/lookup.mjs --cycle <1-4> --level <1-30>
  node scripts/lookup.mjs --droid <name-or-id>
`);
  process.exit(code);
}

const cycle = flag('cycle');
const level = flag('level');
const droid = flag('droid');

if (args.includes('--help') || args.includes('-h')) usage(0);

const costs = Object.fromEntries(data.costs.levels.map((l) => [l.level, l]));
const bonuses = Object.fromEntries(data.bonuses.levels.map((l) => [l.level, l]));
const droidName = (id) => data.droids[id]?.name || id;

function fmtAction(a) {
  return a.type === 'sell' ? 'safe to sell' : `next L${a.level}`;
}

function fmtReq(req) {
  const skin = req.skin[0].toUpperCase() + req.skin.slice(1);
  const rarity = req.rarity[0].toUpperCase() + req.rarity.slice(1);
  return `${droidName(req.droid)} · ${skin} ${rarity} · ${fmtAction(req.action)}`;
}

if (cycle && level) {
  const c = Number(cycle);
  const l = Number(level);
  if (!(c >= 1 && c <= 4 && l >= 1 && l <= 30)) {
    console.error('cycle must be 1-4 and level 1-30');
    process.exit(1);
  }
  const lvl = data.cycleData[String(c)].levels.find((x) => x.level === l);
  const cost = costs[l];
  const bonus = bonuses[l];
  console.log(`Cycle ${c} · Level ${l} · ${cost.display}`);
  if (bonus) {
    console.log(`Bonuses: ${bonus.power} power · ${bonus.rebirthPct}% rebirth · ${bonus.xpPct}% XP`);
  }
  for (const req of lvl.requirements) {
    console.log(`  - ${fmtReq(req)}`);
  }
  process.exit(0);
}

if (droid) {
  const q = String(droid).toLowerCase();
  const hits = [];
  for (let c = 1; c <= 4; c++) {
    for (const lvl of data.cycleData[String(c)].levels) {
      for (const req of lvl.requirements) {
        const name = droidName(req.droid).toLowerCase();
        if (name.includes(q) || req.droid.includes(q)) {
          hits.push({ c, level: lvl.level, cost: costs[lvl.level].display, req });
        }
      }
    }
  }
  if (!hits.length) {
    console.log(`No hits for "${droid}"`);
    process.exit(1);
  }
  console.log(`${hits.length} hit(s) for "${droid}":`);
  for (const h of hits) {
    console.log(`  C${h.c} L${h.level} (${h.cost}): ${fmtReq(h.req)}`);
  }
  process.exit(0);
}

usage(1);
