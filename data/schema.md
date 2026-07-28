# Rebirth data schema

Source: four “updated rebirth charts” PNGs in `original-source/` (Cycles 1–4, levels 1–30).

## Files

| File | Role |
|------|------|
| `costs.json` | Shared cash milestones for levels 1–30 |
| `bonuses.json` | Shared power / rebirth% / XP% for levels 13–30 |
| `droids.json` | Droid id → display name catalog |
| `cycles/{1-4}.json` | Per-cycle level requirements |
| `rebirth.json` | Single-file bundle of the above for simple clients |

Cash costs and L13+ bonuses are identical across cycles; only the three required droids change.

## Cost entry

```json
{ "level": 13, "cash": 3400000000, "display": "3.4B" }
```

## Bonus entry (levels 13–30)

```json
{ "level": 13, "power": 16, "rebirthPct": 32, "xpPct": 160 }
```

`power` is the left numeric bonus on the charts; `rebirthPct` and `xpPct` are the two percentage bonuses.

## Requirement slot

```json
{
  "droid": "mecha-droid",
  "skin": "beskar",
  "rarity": "legendary",
  "action": { "type": "nextLevel", "level": 29 }
}
```

or

```json
{ "action": { "type": "sell" } }
```

| Field | Values |
|-------|--------|
| `droid` | Key in `droids.json` |
| `skin` | `default` \| `gold` \| `diamond` \| `rainbow` \| `beskar` \| `galactic` |
| `rarity` | `common` \| `uncommon` \| `rare` \| `epic` \| `legendary` \| `mythic` |
| `action.type` | `sell` (safe to sell — not needed again this cycle) or `nextLevel` (needed again at `level`) |

On the source charts, a number badge is the next rebirth level that requires this droid; SELL means it will not be required again in the cycle. Higher skins satisfy lower skin requirements for the same droid.

## Cycle file

```json
{
  "cycle": 1,
  "name": "Rebirth Cycle 1",
  "levels": [
    {
      "level": 1,
      "requirements": [ /* exactly 3 slots */ ]
    }
  ]
}
```

Each cycle has exactly 30 levels; each level has exactly 3 requirements.
