"""Build deployable artwork from local PNG masters, never modifying the masters."""
from pathlib import Path
from PIL import Image, ImageOps
import argparse
import hashlib
import json

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--source-root', type=Path, default=Path(__file__).resolve().parents[1])
parser.add_argument('--quality', type=int, default=82)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
library_path = root / 'data/cards.json'
library = json.loads(library_path.read_text(encoding='utf-8'))
categories = {c['id']: c['name'] for c in library['categories']}
revised = {'F041', 'F052', 'F060'}
destination = root / 'assets/art/cards'
destination.mkdir(parents=True, exist_ok=True)
records = []
for card in library['cards']:
    id = card['id']
    source_relative = f'reviews/art/revisions-2026-10-18/{id}-v2.png' if id in revised else f'assets/art/cards/{id}.png'
    source = args.source_root / source_relative
    target = destination / f'{id}.webp'
    with Image.open(source) as master:
        image = ImageOps.exif_transpose(master).convert('RGB')
        image.thumbnail((1024, 1536), Image.Resampling.LANCZOS)
        image.save(target, 'WEBP', quality=args.quality, method=6)
    with Image.open(target) as check:
        check.load()
        assert check.format == 'WEBP'
        width, height = check.size
    card['image'] = f'assets/art/cards/{id}.webp'
    card['imageAlt'] = f'Konstverk till {categories[card["primaryCategory"]]}: {card["text"]}'
    records.append({'id': id, 'file': card['image'], 'source': source_relative, 'quality': args.quality,
                    'width': width, 'height': height, 'bytes': target.stat().st_size,
                    'sha256': hashlib.sha256(target.read_bytes()).hexdigest()})
    if len(records) % 30 == 0:
        print(f'Converted {len(records)}', flush=True)
library_path.write_text(json.dumps(library, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
total = sum(r['bytes'] for r in records)
manifest = {'version': 1, 'date': '2026-10-18', 'format': 'WebP', 'total': len(records),
            'totalBytes': total, 'masters': 'Local PNG originals are retained outside deployment.', 'cards': records}
(root / 'assets/art/manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'{len(records)} WebP images, {total / 1024 / 1024:.2f} MiB total; maximum {max(r["bytes"] for r in records) / 1024:.0f} KiB', flush=True)
