# Стек скиллов Claude Code для контент-маркетинга

Этот репозиторий настроен на работу в контент-маркетинге. Ниже — что установлено,
как это активируется и как пользоваться.

## Что «установлено» в репозиторий

Плагины подключены на уровне проекта в [`.claude/settings.json`](.claude/settings.json)
через `extraKnownMarketplaces` (реестр источников) + `enabledPlugins` (что включить).
Это официальный способ «командной установки»: любой, кто откроет репозиторий и
подтвердит доверие к папке, получит предложение установить их автоматически.

| # | Задача | Плагин | Маркетплейс (GitHub) | ID для включения |
|---|--------|--------|----------------------|------------------|
| 1 | Гуманайзер (убрать ИИ-слоп, тире) | `humanizer` | `blader/humanizer` | `humanizer@humanizer` |
| 2 | SEO/GEO: оптимизатор + аналитик + копирайтер | `aaron-seo-geo` | `aaron-he-zhu/seo-geo-claude-skills` | `aaron-seo-geo@aaron` |
| 3 | Оценка/гейт качества (числовой) | `proofloop` | `sattyamjjain/verdict` | `proofloop@proofloop` |
| 4 | Дизайн интерфейсов (официальный Anthropic) | `frontend-design` | `anthropics/claude-code` | `frontend-design@claude-code-plugins` |
| 5 | Дизайн-системы | `design-systems` | `Owl-Listener/designer-skills` | `design-systems@designer-skills` |
| 5 | UI-дизайн (палитры, типографика, лейаут) | `ui-design` | `Owl-Listener/designer-skills` | `ui-design@designer-skills` |
| 5 | Визуальная критика (иерархия, бренд) | `visual-critique` | `Owl-Listener/designer-skills` | `visual-critique@designer-skills` |

> Пункты 2 и 3 из первоначального запроса (GEO/SEO-оптимизатор+аналитик и
> GEO/SEO-копирайтер) закрывает один пакет `aaron-seo-geo` — там есть и
> `seo-content-writer`/`geo-content-optimizer` (копирайтинг), и
> `rank-tracker`/`performance-reporter` (аналитика).

### Кастомный скилл «Жёсткий критик»

Пункт №4 (жёсткий критик с атомным разбором → оценкой → ТЗ на переделку →
контролем → итоговой оценкой) реализован как **проектный скилл** в
[`.claude/skills/hard-critic/`](.claude/skills/hard-critic/SKILL.md). Он не требует
установки — загружается автоматически. Бренд-ограничения Glass Memory лежат рядом в
[`brand-rules.md`](.claude/skills/hard-critic/brand-rules.md).

## Как активировать (один раз на машине)

Проектные плагины из внешних источников подтягиваются после доверия к папке.
Открыв репозиторий в Claude Code:

1. Подтвердите доверие к папке — появится предложение установить маркетплейсы и плагины.
2. Либо доустановите вручную (если не появилось приглашение):

```shell
/plugin marketplace add blader/humanizer
/plugin marketplace add aaron-he-zhu/seo-geo-claude-skills
/plugin marketplace add sattyamjjain/verdict
/plugin marketplace add anthropics/claude-code
/plugin marketplace add Owl-Listener/designer-skills

/plugin install humanizer@humanizer
/plugin install aaron-seo-geo@aaron
/plugin install proofloop@proofloop
/plugin install frontend-design@claude-code-plugins
/plugin install design-systems@designer-skills
/plugin install ui-design@designer-skills
/plugin install visual-critique@designer-skills

/reload-plugins
```

Кастомный «Жёсткий критик» установки не требует.

## Как пользоваться

```text
/humanizer                     # очистить текст от ИИ-следов и тире
/aaron-seo-geo:...             # SEO/GEO: research → create → audit → track
/judge                         # числовая оценка прогона (proofloop)
/hard-critic                   # атомный разбор + оценка + ТЗ + контроль + итог
```

Типовой пайплайн для рассылки/статьи:
**черновик → `/humanizer` → SEO/GEO-оптимизация (`aaron-seo-geo`) → `/hard-critic`
(оценка + ТЗ) → правки → повторный `/hard-critic` (итоговая оценка) → публикация.**

## Безопасность

Плагины выполняют код с вашими правами. Все, кроме официального `frontend-design`
(Anthropic), — сторонние. Перед установкой стоит просмотреть их `SKILL.md`/манифест;
SEO-пакет может обращаться к внешним API и требовать ключи. Реестр источников
зафиксирован в репозитории, чтобы ставить только проверенные маркетплейсы.
