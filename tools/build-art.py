"""Generate the six temporary, self-contained category illustrations."""
from pathlib import Path

root = Path(__file__).resolve().parent.parent / 'assets'
root.mkdir(exist_ok=True)
scenes = {
    'utforskaren': ('#e4e8ca', '''
      <circle cx="734" cy="108" r="61" fill="#f2eed3"/>
      <path d="M0 317Q160 180 340 300T690 260T1000 330V520H0Z" fill="#bccb9c"/>
      <path d="M0 440Q210 260 420 365T960 320V520H0Z" fill="#8fa880"/>
      <path d="M0 494Q310 382 561 450T1000 404V520H0Z" fill="#6e8a6d"/>
      <path d="M382 520Q360 420 480 365Q575 320 560 244" stroke="#dbe0b8" stroke-width="39" fill="none"/>
      <g transform="rotate(-26 480 250)"><rect x="461" y="294" width="44" height="182" rx="18" fill="#596f50"/><rect x="464" y="306" width="12" height="139" rx="6" fill="#83966b"/>
      <circle cx="483" cy="213" r="116" fill="#c7cf9f" stroke="#546c51" stroke-width="15"/>
      <circle cx="483" cy="213" r="96" fill="#e1e8c2"/><path d="M390 242Q454 174 578 226L560 285Q483 325 409 276Z" fill="#aec69b"/>
      <path d="M399 259Q473 216 566 256" stroke="#7f9d75" stroke-width="4" fill="none"/>
      <path d="M423 173Q447 132 494 131" stroke="#f8f8dc" stroke-width="9" stroke-linecap="round" fill="none"/></g>
      <g fill="#4f755c"><path d="M150 365l13-111 16 111Z"/><ellipse cx="166" cy="270" rx="24" ry="45"/><path d="M813 354l10-91 13 91Z"/><ellipse cx="825" cy="267" rx="19" ry="38"/></g>
      <g stroke="#81996b" stroke-width="2"><path d="M270 145v18m-9-9h18M645 155v18m-9-9h18"/></g>'''),
    'spegeln': ('#eaddcc', '''
      <circle cx="210" cy="120" r="53" fill="#f5ebd7"/>
      <path d="M0 330Q180 230 370 336T960 260V520H0Z" fill="#cebfa7"/>
      <path d="M0 463Q290 300 590 410T960 360V520H0Z" fill="#adae8f"/>
      <ellipse cx="497" cy="454" rx="162" ry="20" fill="#84917b" opacity=".35"/>
      <path d="M369 411V200A118 118 0 0 1 605 200V411Z" fill="#ae805f" stroke="#946f54" stroke-width="5"/>
      <path d="M386 395V200A101 101 0 0 1 588 200V395Z" fill="#d5e0d5"/>
      <path d="M386 295Q455 255 511 290T588 276V395H386Z" fill="#a4bcaa"/>
      <path d="M386 346Q453 302 518 348T588 323V395H386Z" fill="#759c8e"/>
      <circle cx="536" cy="187" r="28" fill="#f3e7bd"/><path d="M401 214Q400 132 476 115" fill="none" stroke="#f6efdf" stroke-width="6" stroke-linecap="round"/>
      <path d="M430 416L415 459M545 416l16 43" stroke="#946f54" stroke-width="12" stroke-linecap="round"/>
      <g fill="#7e8d73"><path d="M242 410l8-70 10 70Z"/><ellipse cx="252" cy="326" rx="28" ry="42"/><ellipse cx="735" cy="332" rx="20" ry="36"/><path d="M730 401l5-75 9 75Z"/></g>
      <path d="M694 150v20m-10-10h20" stroke="#b48f6e" stroke-width="2"/>'''),
    'pausknappen': ('#ede5b9', '''
      <circle cx="740" cy="122" r="64" fill="#f7efd0"/>
      <path d="M0 316Q150 233 342 294T960 286V520H0Z" fill="#d6ca92"/>
      <path d="M0 431Q205 307 490 403T960 369V520H0Z" fill="#b7b582"/>
      <path d="M0 511Q325 392 620 472T960 435V520H0Z" fill="#999f71"/>
      <ellipse cx="485" cy="425" rx="149" ry="21" fill="#7e8d64" opacity=".35"/>
      <circle cx="491" cy="266" r="143" fill="#ab9b5d"/>
      <circle cx="479" cy="248" r="139" fill="#ddce8b" stroke="#baa66a" stroke-width="3"/>
      <circle cx="479" cy="248" r="119" fill="#eadb9c" stroke="#eee3b1" stroke-width="2"/>
      <rect x="426" y="188" width="35" height="118" rx="8" fill="#7c8356"/><rect x="494" y="188" width="35" height="118" rx="8" fill="#7c8356"/>
      <path d="M378 205Q391 160 432 141" fill="none" stroke="#f8edbc" stroke-width="7" stroke-linecap="round"/>
      <g stroke="#83916a" fill="none" stroke-width="3"><path d="M213 390q-15-52 5-74m-5 57q-32-20-28-40m31 20q26-19 23-38M770 411q-6-43 6-68m-6 49q-24-11-24-32"/></g>
      <path d="M277 160v18m-9-9h18M662 210v18m-9-9h18" stroke="#b4a36c" stroke-width="2"/>'''),
    'muren': ('#edd5c6', '''
      <circle cx="747" cy="111" r="57" fill="#f5e5c9"/>
      <path d="M0 340Q250 227 488 335T960 293V520H0Z" fill="#c6bd9e"/>
      <path d="M0 453Q180 337 430 422T960 391V520H0Z" fill="#a4ad87"/>
      <path d="M215 400V177H728V400H549V284A64 64 0 0 0 421 284V400Z" fill="#be866f"/>
      <path d="M215 177l22-22h512l-21 22ZM728 177l21-22v229l-21 16Z" fill="#a56e5c"/>
      <g stroke="#e3b9a0" stroke-width="3" opacity=".75"><path d="M215 230h218m102 0h193M215 285h205m132 0h176M215 340h205m132 0h176M290 177v53m123-53v53m150-53v53m111-53v53M247 230v55m117-55v55m232-55v55m78-55v55M290 285v55m-43 0v60m117-60v60m232-60v60m78-60v60M621 285v55"/></g>
      <path d="M410 401V284A75 75 0 0 1 560 284V401" stroke="#d9a58a" fill="none" stroke-width="18"/>
      <path d="M437 520Q540 437 485 400" stroke="#e9dcc0" stroke-width="54" fill="none"/>
      <path d="M418 401l2-109q2-54 61-66v175Z" fill="#8f7057"/>
      <path d="M420 292l-1 109 43-13V257q-37 9-42 35Z" fill="#a88b67"/>
      <g fill="#788d6d"><ellipse cx="167" cy="368" rx="23" ry="33"/><ellipse cx="786" cy="388" rx="27" ry="27"/></g>'''),
    'fyren': ('#dbe5df', '''
      <circle cx="740" cy="107" r="54" fill="#f2eacb"/>
      <path d="M0 297Q170 266 365 300T960 281V520H0Z" fill="#a7c2ba"/>
      <path d="M0 369Q220 320 423 363T960 347V520H0Z" fill="#7fa79e"/>
      <path d="M0 446Q200 399 448 439T960 411V520H0Z" fill="#5e8d84"/>
      <path d="M300 473l91-104 138-13 140 117Z" fill="#9b9e80"/>
      <path d="M433 361l24-192h63l25 192Z" fill="#f1ebd4"/>
      <path d="M451 216h75l7 51h-89Z" fill="#b2755c"/>
      <path d="M437 320h102l6 41H433Z" fill="#b2755c"/>
      <path d="M479 361v-31a12 12 0 0 1 24 0v31Z" fill="#526d63"/>
      <path d="M450 169v-52h77v52Z" fill="#738d7c"/><path d="M457 158v-32h62v32Z" fill="#f2dca3"/>
      <path d="M442 116l47-37 47 37Z" fill="#536e62"/><path d="M441 174h96" stroke="#536e62" stroke-width="8"/>
      <path d="M460 135L230 82v102Z" fill="#f9efbc" opacity=".6"/><path d="M517 135l196-51v94Z" fill="#f9efbc" opacity=".6"/>
      <g stroke="#d4dfcf" stroke-width="3" fill="none" opacity=".7"><path d="M100 352q40-15 84 0m521 35q40-15 84 0M138 451q51-15 100 0m470 29q50-15 100 0"/></g>
      <path d="M300 168q10-10 20 0 10-10 20 0" fill="none" stroke="#7b9587" stroke-width="3"/>'''),
    'utgangen': ('#e9e1c4', '''
      <circle cx="735" cy="113" r="55" fill="#f7efd7"/>
      <path d="M0 343Q235 220 446 339T960 286V520H0Z" fill="#c8c7a2"/>
      <path d="M0 456Q246 334 488 423T960 365V520H0Z" fill="#a3ad85"/>
      <path d="M362 413V147H583V413Z" fill="#a79975"/><path d="M379 413V164H566V413Z" fill="#f8edc8"/>
      <path d="M379 327q95-63 187-27v113H379Z" fill="#d9d7a6"/>
      <path d="M379 361q93-47 187-32v84H379Z" fill="#b6c096"/>
      <path d="M379 164l117 35v248l-117-34Z" fill="#8e9b78" stroke="#758767" stroke-width="3"/>
      <path d="M396 190l81 24v192l-81-23Z" fill="#9faa84" stroke="#b4bd94" stroke-width="2"/>
      <ellipse cx="476" cy="318" rx="5" ry="7" fill="#e8d8a8"/>
      <path d="M495 447l71-34 235 107H379Z" fill="#eddfb6" opacity=".8"/>
      <path d="M211 403v-69m0 47q-40-4-34-36 30-6 34 36m0-18q31-3 28-32-27-2-28 32" stroke="#768b67" fill="#889b73" stroke-width="3"/>
      <path d="M703 356v-47m0 27q-27-4-24-25 22-3 24 25m0-6q23-3 21-24-19-2-21 24" stroke="#7c906c" fill="#91a17d" stroke-width="3"/>
      <path d="M270 168v18m-9-9h18" stroke="#b6aa7b" stroke-width="2"/>''')
}
for name, (background, scene) in scenes.items():
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="960" height="520" viewBox="0 0 960 520">
    <defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".13"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter></defs>
    <g filter="url(#grain)"><path fill="{background}" d="M0 0h960v520H0z"/>{scene}</g></svg>'''
    (root / f'{name}.svg').write_text(svg, encoding='utf-8')
(root / 'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="#344e40"/><text x="19" y="47" fill="#f6f4ed" font-family="Georgia,serif" font-style="italic" font-size="51">f.</text></svg>', encoding='utf-8')
print('Created six category illustrations and favicon.')
