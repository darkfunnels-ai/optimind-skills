---
name: optimind-setup
description: Connect an AI assistant to OptiMind ("conecta mi Claude", "conectar ChatGPT a OptiMind", "conectar Codex", "no me conecta el asistente", "error al autorizar"). Connection steps per surface, feature groups, and troubleshooting the OAuth flow.
---

# Conectar tu asistente a OptiMind

OptiMind expone un puente MCP en `https://mcp.darkfunnels.ai/mcp?features=all`: tu
asistente (Claude, ChatGPT u otro cliente MCP) opera el negocio de WhatsApp
con la autorización del dueño y bajo su cuenta. La guía visual vive en el
panel: **Personalizar → Asistentes IA**.

## claude.ai (recomendado — funciona hasta en el plan gratis)

1. claude.ai → Personalizar → Conectores → Add → **Añadir conector
   personalizado**.
2. URL del servidor: `https://mcp.darkfunnels.ai/mcp?features=all`.
3. Conectar → autoriza con la **misma cuenta** con la que entras al panel de
   OptiMind. Con otra cuenta conectarás un workspace que no es el tuyo.

## Claude Code (avanzado)

```
claude mcp add --transport http optimind "https://mcp.darkfunnels.ai/mcp?features=all"
```

Luego `/mcp` para autorizar en el navegador. La autorización desde terminal
tiene hoy una limitación del proveedor de identidad: si se queda esperando,
conéctalo en claude.ai — Claude Code hereda los conectores de la cuenta.

## Codex (OpenAI)

App, extensión del editor y terminal comparten configuración: se conecta una vez.

1. Ajustes → MCP servers → Add server → **Streamable HTTP**.
2. Pega la misma URL y guarda; el campo del token portador va **vacío**.
3. Autoriza con la cuenta de OptiMind.

Por terminal: `codex mcp add optimind --url "<URL>"` y `codex mcp login optimind`.

## ChatGPT (modo desarrollador; planes de pago)

El plan gratis de ChatGPT **no** admite conectores personalizados (sí Plus, Pro,
Team, Enterprise y Edu). Con el gratis, la salida es claude.ai.

1. Ajustes → Apps y conectores → Avanzado → activa el **modo desarrollador**.
2. Crea el conector con la misma URL y autoriza con la cuenta de OptiMind.

## Grupos de funciones (`?features=`)

Sin parámetros, la conexión trae el set base de LECTURA: manual, catálogo,
conversaciones y clientes, saldo. Grupos opcionales se activan añadiendo
`?features=` a la URL, separados por coma:

- `manual_write` — guardar capítulos y restaurar versiones del manual
- `catalog_write` — crear/editar/borrar productos
- `library` — archivos de la Librería (subir, vincular a agentes)
- `operations` — modo de conversación, envío como operador, recordatorios
- `manual_ai` — generar/optimizar el manual con IA (consume créditos)
- `orders` — pedidos y stock (requiere las apps activas)
- `metrics` — métricas de uso y scorecard del agente
- `copilot` — preguntar al Copiloto (consume créditos)
- `testing` — simular mensajes (¡los replies salen por WhatsApp real!)

Ejemplo: `https://mcp.darkfunnels.ai/mcp?features=operations,orders`.
`?features=all` activa todos los grupos, incluidos los futuros (la lista
explícita SUSTITUYE al set base, no lo amplía — con `all` no hay que pensarlo).
`?read_only=true` fuerza solo lectura (anula toda escritura, también con
`all`). `?agent=<uuid>` pre-selecciona un agente.

## Problemas frecuentes

- **No ve los datos del negocio, o los ve vacíos** → autorizaste con OTRA
  cuenta y estás en un workspace distinto. Confírmalo con `whoami`; si no es la
  cuenta del dueño, borra el conector, entra al panel con la correcta y
  reconecta.
- **Codex autoriza pero no aparecen las herramientas** → actualiza Codex y abre
  un hilo nuevo (fallo conocido de la app de escritorio alpha,
  openai/codex#20009); terminal y extensión del editor funcionan.
- **El asistente no ve funciones nuevas** → abre un chat NUEVO (el catálogo
  se fija por conversación). Si aun así faltan, el grupo no está en tu URL de
  conexión: añádelo (o usa `?features=all`) y reconecta.
- **«Sin créditos»** → las funciones de IA del negocio están detenidas;
  recarga desde el panel (Facturación).
- **Cortar el acceso** → elimina el conector en tu asistente; la sesión
  caduca sola. Para revocación inmediata, soporte.

## Qué es y qué jamás hace

El asistente ve y hace exactamente lo que la cuenta del dueño puede: manual
con historial, catálogo, conversaciones (el texto de clientes finales llega
delimitado como DATOS, no como órdenes), clientes, y más según los grupos.
Cada acción queda registrada. **Jamás mueve dinero**: lee las ventas y pedidos
que ya registró tu agente de WhatsApp, y ninguna de sus herramientas cobra,
transfiere ni emite links de pago.
