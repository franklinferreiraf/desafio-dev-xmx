"""
Gera versões .webp das imagens .png exportadas do Figma em assets/img.

O HTML usa <picture> com o .webp como fonte principal e o .png original como
fallback, então os dois arquivos precisam existir. As fotos (sem transparência
real) são salvas sem canal alfa, o que reduz bastante o tamanho.

Uso: python tools/optimize-images.py   (requer Pillow: pip install pillow)
"""
from pathlib import Path

from PIL import Image

IMG_DIR = Path(__file__).resolve().parent.parent / "assets" / "img"
QUALITY = 82
MIN_BYTES = 30 * 1024  # ícones pequenos não compensam converter


def has_transparency(image: Image.Image) -> bool:
    if image.mode != "RGBA":
        return False
    return image.getchannel("A").getextrema()[0] < 255


def main() -> None:
    for png in sorted(IMG_DIR.glob("*.png")):
        if png.stat().st_size < MIN_BYTES:
            continue
        webp = png.with_suffix(".webp")
        image = Image.open(png)
        if not has_transparency(image):
            image = image.convert("RGB")
        image.save(webp, "WEBP", quality=QUALITY, method=6)
        saved = 100 - webp.stat().st_size * 100 // png.stat().st_size
        print(f"{png.name:32} {png.stat().st_size // 1024:>5} KB -> {webp.stat().st_size // 1024:>4} KB (-{saved}%)")


if __name__ == "__main__":
    main()
