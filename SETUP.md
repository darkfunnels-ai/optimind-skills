# Conectar tu asistente IA a OptiMind

OptiMind expone tu negocio de WhatsApp (manual del vendedor, catálogo,
conversaciones, pedidos, métricas) a cualquier asistente compatible con MCP.
Una sola URL para todo:

```
https://mcp.darkfunnels.ai/mcp?features=all
```

El asistente opera **solo tu workspace**: se autentica con tu cuenta de
OptiMind y ve exactamente lo que tú ves. Nunca mueve dinero.

> La guía viva, con capturas y solución de problemas, está dentro de tu panel:
> **Personalizar → Asistentes IA**.

## claude.ai / Claude Desktop / móvil

1. Ve a **Personalizar → Conectores → Add → Añadir conector personalizado**.
2. Pega la URL `https://mcp.darkfunnels.ai/mcp?features=all`.
3. Pulsa **Conectar** y autoriza con la **misma cuenta** con la que entras al
   panel de OptiMind (con otra cuenta conectarás un negocio que no es el tuyo).

En cuentas de equipo, el conector lo añade el dueño de la organización desde
los ajustes de la organización.

La conexión vive en tu cuenta de Claude: funciona igual en el navegador, la
app de escritorio y el móvil.

## Claude Code

```bash
claude mcp add --transport http optimind "https://mcp.darkfunnels.ai/mcp?features=all"
```

Luego, dentro de Claude Code, escribe `/mcp` y autoriza en el navegador con la
misma cuenta del panel.

> ⚠️ Hoy el login OAuth desde la terminal puede quedarse esperando por una
> limitación del proveedor de identidad (supabase/auth#2703, puerto de callback
> dinámico). Si te pasa, conéctalo en claude.ai: Claude Code hereda los
> conectores de tu cuenta.

## Codex (OpenAI)

La app, la extensión del editor y la terminal comparten configuración
(`~/.codex/config.toml`): se conecta una sola vez.

1. **Ajustes → MCP servers → Add server**, tipo **Streamable HTTP**.
2. Pega la URL `https://mcp.darkfunnels.ai/mcp?features=all` y guarda. El campo
   del token portador va **vacío**: la autorización es por tu cuenta.
3. Autoriza con la **misma cuenta** con la que entras al panel de OptiMind.

Desde la terminal:

```bash
codex mcp add optimind --url "https://mcp.darkfunnels.ai/mcp?features=all"
codex mcp login optimind
```

## ChatGPT (modo desarrollador)

El plan **gratis de ChatGPT no admite conectores personalizados**: necesitas
Plus, Pro, Team, Enterprise o Edu. Con el gratis, usa claude.ai (su plan gratis
admite 1 conector y es el mismo link).

1. **Ajustes → Apps y conectores → Avanzado → Modo desarrollador**.
2. Crea un conector personalizado, pega la URL
   `https://mcp.darkfunnels.ai/mcp?features=all` y guarda.
3. Autoriza con la **misma cuenta** con la que entras al panel de OptiMind.

## Otros clientes MCP (Cursor, Windsurf, Gemini CLI, VS Code…)

Cualquier cliente con soporte de MCP sobre HTTP + OAuth funciona con la misma
URL. Si tu cliente limita el número de herramientas, conecta con grupos
opcionales desactivados (la URL base expone el set esencial).

## Como plugin de Claude Code (opcional)

El plugin trae los skills (playbook de ventas, escritor de manuales, catálogo,
diagnóstico) además del conector:

```bash
claude plugin marketplace add darkfunnels-ai/optimind-skills
claude plugin install optimind@darkfunnels
```

## Grupos opcionales de herramientas

La URL base expone el set esencial de LECTURA (más etiquetas de clientes).
Los grupos extra se activan por query string al conectar — ojo: la lista
explícita SUSTITUYE al set base (un grupo `_write` trae consigo su lectura):
`https://mcp.darkfunnels.ai/mcp?features=orders,metrics` (disponibles:
`manual_write`, `catalog_write`, `library`, `operations`, `manual_ai`,
`testing`, `orders`, `metrics`, `copilot` — editar el manual o el catálogo
requiere su grupo `_write`). Como la lista SUSTITUYE al set base, si quieres
sumar sin perder nada hay que nombrarlo entero: `?features=manual,catalog,
conversations,orders`. `?features=all` activa TODO el catálogo, incluidos los
grupos que se publiquen en el futuro — es la URL recomendada si no quieres
volver a tocarla. `?read_only=true` desactiva toda escritura (también con
`all`). `?pii=full` destapa los teléfonos de los clientes finales, que por
defecto llegan enmascarados (`51•••••4321`); ninguna herramienta necesita el
número para operar sobre un chat, así que el enmascarado no cierra ninguna
puerta.

## Solución de problemas

- **No ve tus datos, o los ve vacíos** → autorizaste con una cuenta distinta a
  la del panel, así que estás conectado a otro workspace. Pregúntale «¿con qué
  cuenta de OptiMind estás conectado?»; si no es la tuya, borra el conector,
  entra a darkfunnels.ai con la cuenta correcta y reconecta.
- **Codex autoriza pero no aparecen las herramientas** → actualiza Codex y abre
  un hilo nuevo (fallo conocido de una versión alpha de la app de escritorio,
  openai/codex#20009); la terminal y la extensión del editor sí funcionan.
- **No aparecen herramientas nuevas** → abre un chat NUEVO: claude.ai relee el
  catálogo al empezar cada conversación (los chats ya abiertos conservan el
  suyo). Si aun así faltan, el grupo no está en tu URL de conexión — añádelo
  (o usa `?features=all`) y reconecta.
- **«Sin créditos»** → las funciones de IA del agente están detenidas;
  recarga desde el panel (Facturación).

## Seguridad

- El acceso usa OAuth con tu cuenta; **revócalo cuando quieras** eliminando el
  conector en tu asistente. El aislamiento por cuenta se aplica en la base de
  datos, no en el cliente.
- Las llamadas del asistente se registran (herramienta, resultado, latencia —
  nunca el contenido).
- Los mensajes de tus clientes finales llegan al asistente marcados como
  **datos no confiables**: se analizan, jamás se obedecen.
- Ninguna herramienta ejecuta pagos ni transferencias.
