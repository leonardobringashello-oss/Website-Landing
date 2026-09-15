"""Favicon + iconos PWA reales para LeoBringasAtLife.

Marca: monograma "LB" blanco sobre negro (estética del sitio), legible a 16px.
NO reutiliza imágenes de marketing/OG como icono.

Genera (fuente de verdad: favicon.svg dibujado a mano + PNGs con PIL):
  public/favicon.svg            (vector, nítido en tabs modernas)
  public/favicon.ico            (16/32/48, tabs clásicas)
  public/apple-touch-icon.png   (180, fondo pleno negro, lo exige Apple)
  public/icon-192.png / icon-512.png (padding safe-zone para maskable)

Uso:  python scripts/generate-favicon.py
Requiere: Pillow. Fuente: Arial Bold (C:/Windows/Fonts/arialbd.ttf).
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"

BG = (0, 0, 0, 255)
FG = (255, 255, 255, 255)
FONT_PATH = Path("C:/Windows/Fonts/arialbd.ttf")
TEXT = "LB"


def fit_font(draw: ImageDraw.ImageDraw, box: int, fill: float) -> ImageFont.FreeTypeFont:
    """Fuente más grande cuyo ancho no supera `fill` del canvas."""
    size = box
    while size > 10:
        f = ImageFont.truetype(str(FONT_PATH), size)
        w = draw.textbbox((0, 0), TEXT, font=f)[2]
        if w <= box * fill:
            return f
        size -= 4
    return ImageFont.truetype(str(FONT_PATH), 10)


def master(box: int, radius_ratio: float = 0.22, fill: float = 0.62) -> Image.Image:
    im = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, box - 1, box - 1], radius=int(box * radius_ratio), fill=BG)
    font = fit_font(d, box, fill)
    bbox = d.textbbox((0, 0), TEXT, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((box - w) / 2 - bbox[0], (box - h) / 2 - bbox[1]), TEXT, font=font, fill=FG)
    return im


def gen_svg() -> None:
    (PUB / "favicon.svg").write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">"""
        """<rect width="512" height="512" rx="112" fill="#000"/>"""
        """<text x="256" y="352" font-family="Arial, Helvetica, sans-serif" """
        """font-size="248" font-weight="900" fill="#fff" text-anchor="middle">LB</text></svg>""",
        encoding="utf-8",
    )
    print("favicon.svg OK")


def main() -> None:
    gen_svg()
    m512 = master(512)
    m512.convert("RGB").resize((192, 192), Image.LANCZOS).save(PUB / "icon-192.png", optimize=True)
    m512.convert("RGB").save(PUB / "icon-512.png", optimize=True)
    m512.convert("RGB").resize((180, 180), Image.LANCZOS).save(
        PUB / "apple-touch-icon.png", optimize=True
    )
    m512.resize((48, 48), Image.LANCZOS).save(
        PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
    )
    print("favicon.ico + apple-touch-icon + icon-192/512 OK")


if __name__ == "__main__":
    main()
