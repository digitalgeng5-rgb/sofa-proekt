# CLAUDE.md — контекст проекта sofa-proekt

Этот файл читается автоматически в начале каждой сессии Claude Code. Он —
«внешняя память» проекта: переживает смену сессий и аккаунтов.

## О проекте
Рабочее пространство для **контент-маркетинга**. Настроен стек скиллов и агентов
для создания и контроля качества материалов (рассылки, лендинги, посты, статьи,
SEO/GEO-тексты). Полное описание стека — в [`SKILLS.md`](SKILLS.md).

## Имя ассистента
В этом проекте ассистента-оркестратора зовут **Ричард**. Когда пользователь
пишет «Ричард» или ставит задачу на планирование/оркестрацию — работай по
роли из [`.claude/agents/richard.md`](.claude/agents/richard.md).

> Важно: у модели нет памяти между сессиями. Весь контекст живёт здесь и в
> репозитории, а не «в модели». Всё, что нужно сохранить, — фиксируй в файлах.

## Что где лежит
- [`.claude/agents/richard.md`](.claude/agents/richard.md) — агент-оркестратор «Ричард».
- [`.claude/skills/hard-critic/`](.claude/skills/hard-critic/SKILL.md) — скилл «Жёсткий критик»
  + [`brand-rules.md`](.claude/skills/hard-critic/brand-rules.md) (бренд Glass Memory).
- [`.claude/settings.json`](.claude/settings.json) — подключённые плагины (humanizer,
  aaron-seo-geo, proofloop, frontend-design, designer-skills).
- [`knowledge-base/`](knowledge-base/README.md) — база знаний (факты, стиль, бренд).
- [`knowledge-base/solutions/`](knowledge-base/solutions/README.md) — журнал решений.

## Рабочие принципы
- Язык общения — русский (по умолчанию).
- Не выдумывать факты: если данных нет в базе знаний — уточнять.
- Ни один материал не «готов» без прогона через `hard-critic` (и/или `/judge`).
- После завершённой задачи — запись в `knowledge-base/solutions/`.

## Типовой пайплайн
черновик → `/humanizer` → SEO/GEO (`aaron-seo-geo`) → `/hard-critic` (оценка + ТЗ)
→ правки → повторный `/hard-critic` (итог) → публикация.
