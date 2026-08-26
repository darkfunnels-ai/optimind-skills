# OptiMind — skills y conector

*Sell on WhatsApp with an AI sales agent — operated from your own assistant.*

OptiMind corre un agente de ventas IA en el WhatsApp de tu negocio. Este repo
trae los **skills** (playbook de ventas, escritor de manuales, catálogo,
diagnóstico de conversaciones) y el empaquetado del **conector MCP** para que
tu asistente (Claude, ChatGPT o cualquier cliente MCP) opere tu workspace:
manual del vendedor con versiones, catálogo, conversaciones, pedidos y
métricas. Nunca mueve dinero.

## Instalar como plugin de Claude Code

```bash
claude plugin marketplace add darkfunnels-ai/optimind-skills
claude plugin install optimind@darkfunnels
```

## Conectar tu asistente (cualquier superficie)

Una sola URL — los pasos por superficie están en [SETUP.md](SETUP.md):

```
https://mcp.darkfunnels.ai/mcp?features=all
```

> El conector está en **beta cerrada**: necesita que tu cuenta de OptiMind esté
> habilitada. Si al autorizar ves «beta cerrada», pídele acceso al equipo.

## ¿Todavía no usas OptiMind?

- **Qué es y cómo empezar:** [darkfunnels.ai](https://darkfunnels.ai)
- **Documentación del conector:** [docs.darkfunnels.ai](https://docs.darkfunnels.ai)

El [playbook de ventas](skills/whatsapp-sales-playbook/SKILL.md) funciona por sí
solo, sin cuenta ni conexión: instálalo y pídele a tu asistente que audite tus
conversaciones o reescriba tus mensajes de seguimiento.

## Los skills

| Skill | Qué hace |
|---|---|
| [`whatsapp-sales-playbook`](skills/whatsapp-sales-playbook/SKILL.md) | Playbook de venta por WhatsApp destilado de millones de mensajes reales (anonimizado). Útil aunque no conectes nada. |
| [`optimind-setup`](skills/optimind-setup/SKILL.md) | Conexión por superficie, grupos de funciones y troubleshooting del OAuth. |
| [`optimind-manual-writer`](skills/optimind-manual-writer/SKILL.md) | Escribir y editar el manual del agente con la gramática REAL del producto (batch único, versiones, `SEND_FILES`). |
| [`optimind-catalog`](skills/optimind-catalog/SKILL.md) | Cargar y mantener el catálogo (CSV/Shopify → `upsert_products`). |
| [`optimind-conversation-review`](skills/optimind-conversation-review/SKILL.md) | Diagnóstico de conversaciones con los antipatrones del playbook como rúbrica. |

Los skills siguen la spec abierta de [agentskills.io](https://agentskills.io) y
funcionan en los clientes que la soportan (Claude, Codex, Cursor y más).

## Seguridad

El conector se autentica por OAuth con TU cuenta; el aislamiento entre negocios
lo aplica la base de datos en cada consulta. Los mensajes de tus clientes
llegan al asistente delimitados como DATOS, no instrucciones; las acciones
destructivas piden confirmación; `?read_only=true` fuerza solo-lectura. Todo
el detalle en el panel de OptiMind (**Personalizar → Asistentes IA**).
