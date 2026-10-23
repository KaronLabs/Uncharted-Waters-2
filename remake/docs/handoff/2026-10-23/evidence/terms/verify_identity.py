import json,re,runpy
from pathlib import Path

base=Path(__file__).resolve().parents[4]
mapping=runpy.run_path(str(Path(__file__).with_name('build_terms.py')))['terms']
results={}
for kind,fields in [('ship',['usedGuns','usedCrew','industryRequirement','durability','tacking','power','maximumCrew','minimumCrew','capacity','maximumGuns','basePrice']),('item',['price','imageSlice','rating'])]:
    original_path=base.parent/'work/db-korean'/('ships/ships.json' if kind=='ship' else 'portraits-items-discoveries/items.json')
    original=json.loads(original_path.read_text(encoding='utf-8'))
    source=(base/f'src/data/{kind}Data.ts').read_text(encoding='utf-8')
    blocks=re.findall(r"  '[^']+': \{\n(.*?)(?=\n  \},)",source,re.S)
    rows=[]
    for block in blocks:
        match=re.search(r"name: '([^']+)'",block)
        if not match:continue
        name=match.group(1)
        facts={f:int(m.group(1)) for f in fields if (m:=re.search(rf'{f}: (\d+)',block))}
        candidates=[x for x in original.values() if x['name']==mapping[name]]
        scores=[{f: x.get(f)==value for f,value in facts.items()} for x in candidates]
        rows.append({'source':name,'korean':mapping[name],'facts':facts,'originalCandidates':len(candidates),'matchingFields':scores})
    results[kind]=rows
(base/'.worktrees/joao-completion/evidence/terms/item-ship-identities.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
for kind,rows in results.items():
    weak=[r['source'] for r in rows if not r['originalCandidates'] or not any(all(s.values()) for s in r['matchingFields'])]
    print(json.dumps({'kind':kind,'count':len(rows),'nonExactFeatureMatches':weak},ensure_ascii=True))
