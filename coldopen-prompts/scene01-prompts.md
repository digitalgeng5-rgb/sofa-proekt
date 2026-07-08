# Сцена 01 · COLD OPEN · GEN-GROUP (0:00–0:06) — промты для кадров

Три кадра-раскадровки. Ниже под каждую пустую рамку: промт (EN, лучше читается моделями),
негатив, параметры и русская расшифровка. В конце — общий «стиль-ДНК», чтобы все три кадра
смотрелись одной сценой. Генерировать при 16:9, фотореализм, кинематографичное макро.

Рекомендованные модели: Flux 1.1 Pro / Midjourney v6–v7 / SDXL. Для видео-стилла из промта
можно прогонять через Runway/Kling (image-to-video, slow-mo).

---

## ОБЩИЙ СТИЛЬ-ДНК (добавлять в каждый промт)
Extreme macro, cinematic still, photoreal, shot on 100mm macro lens, shallow depth of field,
graphite near-black background #14171A, deep true blacks with no lifted shadows, high contrast,
minimal grain, clean industrial-luxury engineering aesthetic, no text, no logo, no watermark.

Единый грейдинг: тени — графит #14171A; тёплое пятно только у искры (оранжевый 3200K);
камень и сталь — нейтраль с холодным rim-светом; глубокий чёрный без подъёма теней.

---

## КАДР 1А · 0:00–0:03 · «Искра лазерной резки»
Полный кадр, без титров. Единственное тёплое пятно — искра (оранж 3200K) на графите.

**Prompt (EN):**
Extreme macro slow-motion shot of a fiber laser cutting a 3 mm steel sheet, the focused beam
entering matte graphite-grey steel, a burst of bright orange sparks (3200K warm) arcing away
into pure darkness, molten glow at the cut point, tiny particles trailing light, the sparks are
the only warm light source in the frame, everything else deep graphite near-black #14171A,
high frame rate look (300–400 fps), razor-sharp focus on the cut line, shallow depth of field,
cinematic, photoreal, 100mm macro, high contrast, minimal grain, clean engineering aesthetic,
no text, no logo. --ar 16:9

**Negative:** graphics, illustration, cartoon, 3d render look, text, watermark, lens flare
overkill, blue sparks, colorful background, lifted grey shadows, low contrast, blur everywhere,
people, hands, cluttered background.

**Параметры:** 16:9 · Midjourney: `--ar 16:9 --style raw --s 150` · Flux/SDXL: CFG 3.5–5, 30+ шагов.
**Смысл кадра:** первые 3 сек, луч входит в лист стали 3 мм, брызги дугой в темноту; масштаб и
серьёзность производства без единого титра.

---

## КАДР 1Б · 0:03–0:05 · «Полировка кромки Nero Marquina»
Жёсткий cut в бит. Холодный rim-свет, титров нет.

**Prompt (EN):**
Extreme macro shot of a polishing pad buffing the bevelled edge of black Nero Marquina marble,
a mirror-like reflective surface and a single crisp white vein emerging out of the matte black
stone, cold blue-white rim light grazing the polished edge, neutral color grade, water/polish
sheen catching the light, the transition from matte to mirror clearly visible, deep graphite
near-black background #14171A, shallow depth of field, cinematic, photoreal, 100mm macro,
high contrast, minimal grain, clean luxury engineering aesthetic, no text, no logo. --ar 16:9

**Negative:** warm orange light, sparks, colorful veins, busy pattern, plastic look, cartoon,
3d render, text, watermark, lifted shadows, low contrast, people, cluttered background.

**Параметры:** 16:9 · Midjourney: `--ar 16:9 --style raw --s 150` · Flux/SDXL: CFG 3.5–5.
**Смысл кадра:** из матовой поверхности проступает зеркало и белая прожилка; контраст холодного
камня после тёплой искры, жёсткая склейка в такт первому удару музыки.

---

## КАДР 1В · 0:05–0:06 · Лого-плашка GEN-GROUP
Лого проявляется бликом слева направо (0.6 сек) по стали, без fade. Подпись мельче, по центру.

Это title-кадр: сам логотип и подпись ставятся в монтаже. Промт — под ФОН-подложку (тёмная
сталь с бегущим бликом), поверх которой накладывается лого «вытравленным» светом.

**Prompt (EN) — фон под лого:**
Extreme macro of a dark brushed stainless steel plate, near-black graphite tone #14171A,
a single sharp specular light streak sliding across the surface from left to right, subtle
fine brush texture catching the highlight, the rest of the plate in deep shadow, minimalist,
centered negative space for a logo, cinematic, photoreal, high contrast, minimal grain,
premium industrial look, no text, no logo, no watermark. --ar 16:9

**Negative:** warm light, sparks, colorful, busy reflections, scratches, fingerprints, text,
logo, watermark, cartoon, 3d render, low contrast, lifted shadows.

**Overlay в монтаже:**
- Лого GEN-GROUP по центру, появляется «вытравленным» бликом L→R за 0.6 сек, без затухания.
- Подпись мельче под лого, по центру: «Металл. Стекло. Камень. Свет.»
- Цвет лого: светлое серебро/сталь по тёмному графиту; блик скользит по буквам.

**Смысл кадра:** лого проявляется не на пустом фоне, а «вытравленным» светом на самой стали.

---

## Заметки по консистентности
- Один объектив-настроение (100mm macro), одна глубина резкости, один грейд во всех трёх кадрах.
- Единственное тёплое пятно во всей сцене — искра в 1А. Кадры 1Б и 1В холодные/нейтральные.
- Фон везде графит #14171A, чёрный без подъёма теней, зерно минимальное.
- Никакой графики и 3D-вида: только реалистичное макро (по брифу «только реальная макросъёмка»).
- Если нужно видео: эти стиллы прогнать image-to-video (Runway Gen-3 / Kling), slow-mo,
  1А — искра-дуга, 1Б — движение полировального круга, 1В — проезд блика L→R.
