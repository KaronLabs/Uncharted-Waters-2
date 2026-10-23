# Shared Korean UI implementation evidence

Baseline awaited: coordinator reported 109 suites / 963 tests green before mutation.

## Changes

- `koreanUi.ts`: all 391 Chinese UI source keys covered, except standalone `Domingo` delegated to `koreanTerms`; adds the live accessibility source `next`, yielding 391 entries.
- `koreanCombat.ts`: 139 entries cover combat's 144 source keys; five standalone proper names are delegated to `koreanTerms`.
- All 24 existing `data-en` homepage elements now have `data-ko`; Korean introductory and author-link paragraphs added.
- Korean date and clock, local Korean font fallback, Korean calendar wrapping, dialog text scrolling, viewport scale capped at 1, and system-panel scrolling.
- Ship naming guards composition Enter/Escape; submit and cancel resume after composition ends. Slot error codes have Korean player guidance and slot-name inputs expose a Korean accessible name.
- Stable systemSave/systemLoad, journalTrigger, data-menu-option values and confirmation drag handle. Zoomed confirmation drag uses rendered size to convert pointer movement to game coordinates.

## Verification

RED: `koreanSharedUi.test.tsx` observed Korean date returned `May 17 1522`; composition form submit called the callback during composition. After minimal fixes, these cases passed.

Final focused command:

```
npm test -- --runInBand src/localization/koreanSharedCatalog.test.ts src/interface/koreanSharedUi.test.tsx src/interface/gameViewport.test.ts src/interface/interfaceUtils.test.ts src/interface/common/Confirm.test.tsx
```

Result: 5 suites, 27 tests passed. Coverage includes every UI/combat source key except delegated names, Korean Hangul presence, substitution-token parity, no replacement characters, live literal t-call coverage against the integrated catalog, all homepage attributes, Korean/English/Chinese date-time boundary cases, IME enter/cancel isolation, error guidance, viewport bounds and zoomed drag conversion.

`npm run typecheck`, edited-file ESLint, and `git diff --check`: exit 0.

No build was run: coordinator is the single builder. Actual Windows Korean IME, rendered 1366x768/1760 viewport screenshots, and pointer target acceptance remain with coordinator.

The Git binary diffs for TSX/CSS/HTML are caused by baseline `.gitattributes` (`* -text -diff`, only selected suffixes re-enable diff). Sampled edited files are UTF-8 without BOM or NUL bytes. No attributes changed.

## Independent-review follow-up

Review identified that the full-area Acknowledge layer covered the new scroll areas. A new DOM regression first failed on the rendered covering sibling. Acknowledge now provides an explicit localized Continue button and listens for clicks only inside its enclosing building/sea-story area. Clicks on overflowing dialogue text do not advance; normal short-text/background clicks still advance. Character and vendor text both expose scroll regions. Keyboard Enter/E/Escape retains the existing behavior. Button/control clicks and suspended sidebar interaction are excluded from the area handler.

Final expanded regression: 9 suites / 37 tests passed, including new `dialogueScrolling.test.tsx`, existing `Popover.test.tsx`, `CharacterMessageBox.test.tsx`, and `SeaStory.test.tsx`. Typecheck, changed-file ESLint, and diff whitespace checks passed.

Final terminology ruling: Food uses 식량 in both shared UI and the coordinator's terms catalog. Numeric placeholders use invariant 닢/점 units where followed by object particles; destination placeholders use 항구로. Original source keys and substitution tokens are preserved.

Second independent review found reused scroll regions kept their previous scrollTop. Two new regression cases first reproduced scrollTop 120 remaining after the body changed, separately for character and vendor components. Both now use refs and body-keyed effects to reset scrollTop to 0. The same DOM node is retained in the test. Focused dialogue/Popover/character/sea-story run: 4 suites / 12 tests passed; changed-file ESLint passed. Coordinator owns the final full verification after this last fix.
