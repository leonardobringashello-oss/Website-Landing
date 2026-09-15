"""Genera derivados OG/PWA optimizados desde las fuentes en public/.

Fuentes:
  public/og-image.png  (1672x941, ~1.2MB) -> recorte cover a 1200x630 + .webp
  public/icon-192.png / icon-512.png (copias 1024 sin optimizar) -> resize real + optimize
  public/favicon.ico   (copia 473KB) -> ICO multi-size real

Uso:  python scripts/generate-images.py
Requiere: Pillow
"""

from PIL import Image
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"

OG_W, OG_H = 1200, 630


def cover_crop(im: Image.Image, w: int, h: int) -> Image.Image:
    scale = max(w / im.width, h / im.height)
    nw, nh = round(im.width * scale), round(im.height * scale)
    im = im.resize((nw, nh), Image.LANCZOS)
    left, top = (nw - w) // 2, (nh - h) // 2
    return im.crop((left, top, left + w, top + h))


def gen_og() -> None:
    src = PUB / "og-image.png"
    im = Image.open(src).convert("RGB")
    og = cover_crop(im, OG_W, OG_H)
    og.save(PUB / "og-image.png", optimize=True)
    og.save(PUB / "og-image.webp", quality=82, method=6)
    print(f"og-image: {og.size} png+webp OK")


def gen_icons() -> None:
    # Fuente cuadrada de mayor calidad disponible
    src = PUB / "icon-512.png"
    im = Image.open(src).convert("RGB")
    if im.width != im.height:
        side = min(im.size)
        l = (im.width - side) // 2
        t = (im.height - side) // 2
        im = im.crop((l, t, l + side, t + side))
    im.resize((192, 192), Image.LANCZOS).save(PUB / "icon-192.png", optimize=True)
    im.resize((512, 512), Image.LANCZOS).save(PUB / "icon-512.png", optimize=True)
    im.resize((256, 256), Image.LANCZOS).save(PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("icon-192/512 + favicon OK")


if __name__ == "__main__":
    gen_og()
    gen_icons()
