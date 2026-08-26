---
name: optimind-setup
description: Connect an AI assistant to OptiMind ("conecta mi Claude", "conectar ChatGPT a OptiMind", "no me conecta el asistente", "error al autorizar"). Connection steps per surface, feature groups, and troubleshooting the OAuth flow.
---

# Conectar tu asistente a OptiMind

OptiMind expone un puente MCP en `https://mcp.darkfunnels.ai/mcp?features=all`: tu
asistente (Claude, ChatGPT u otro cliente MCP) opera el negocio de WhatsApp
con la autorización del dueño y bajo su cuenta. La guía visual vive en el
panel: **Personalizar → Asistentes IA**.

## claude.ai (recomendado — funciona hasta en el plan gratis)

1. claude.ai → Ajustes → Conectores → **Añadir conector personalizado**.
2. URL del servidor: `https://mcp.darkfunnels.ai/mcp?features=all`.
3. Conectar → autoriza con la **misma cuenta** con la que entras al panel de
   OptiMind. Con otra cuenta, la conexión se rechaza.

## Claude Code (avanzado)

```
claude mcp add --transport http optimind "https://mcp.darkfunnels.ai/mcp?features=all"
```

Luego `/mcp` para autorizar en el navegador. La autorización desde terminal
tiene hoy una limitación del proveedor de identidad: si no completa, contacta
a soporte de OptiMind — hay una vía alternativa lista.

## ChatGPT (modo desarrollador, plan Plus/Pro)

1. Ajustes → Apps y conectores → activa el **modo desarrollador**.
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

- **«beta cerrada» / 403 tras autorizar** → autorizaste con OTRA cuenta.
  Cierra sesión en el panel de OptiMind, entra con la cuenta correcta y
  reconecta el conector.
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
