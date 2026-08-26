---
name: optimind-manual-writer
description: Write and edit OptiMind WhatsApp sales agent manuals correctly ("escribe el manual", "mejora el capítulo", "arregla el embudo", "el agente no avanza de capítulo"). Covers the real chapter grammar, the single-batch save rule, file-send markers and the funnel skeleton that converts.
---

# Escribir el manual del agente de OptiMind

El manual es el guion del embudo: capítulos que el agente de WhatsApp ejecuta
en orden, cada uno con un objetivo. Este skill existe porque el manual tiene
una GRAMÁTICA real — escribirlo «a ojo» produce embudos que se clavan, archivos
que no se envían y versiones del historial quemadas.

## Flujo de trabajo (siempre en este orden)

1. **Lee antes de escribir**: `read_manual`. Cada capítulo trae su
   `chapter_index` — esa es LA clave para toda escritura. Nunca uses la
   posición del array ni inventes índices.
2. **Si vas a usar envío de archivos**: `list_library_files` con
   `capability: "sendable"` PRIMERO. Los marcadores de envío solo funcionan
   con la frase exacta de un archivo enviable vivo (ver Marcadores).
3. **Edita y guarda en UN solo lote**: `save_manual_chapters` con todos los
   cambios juntos (`puts` + `posts` + `deletes` + `advance_tos`). El Historial
   retiene solo las 10 versiones más nuevas y CADA llamada consume una: cinco
   guardados sueltos queman cinco ranuras de respaldo.
4. **Verifica**: la respuesta trae el manual releído con las claves nuevas
   (`chapters_summary`). Si `verified: false`, el guardado SÍ se aplicó — NO
   reintentes; relee con `read_manual`.
5. **Deshacer** = `list_manual_versions` + `restore_manual_version` (la
   restauración también crea una versión nueva, nada se pierde).

## Reglas de la gramática (violarlas rompe el embudo en producción)

- **`context` es un campo FUSIONADO**: puede contener los rótulos
  `CONTEXTO:` y `PUNTOS CLAVE:` como texto. Son parte del contenido — si
  editas un capítulo que los usa, consérvalos exactos. No existe un campo
  aparte de puntos clave.
- **Patch por clave presente**: en un `put`, solo las claves que mandas se
  escriben; lo demás queda intacto. No «normalices» capítulos reescribiendo
  campos que no cambiaste.
- **`display_order` es 1-based** y los títulos (`chapter_label`) van SIN
  ordinales («Calificación», no «2. Calificación»): el sistema numera solo.
- **La línea de avance es LITERAL**: para que el embudo avance, el capítulo
  debe contener exactamente `Llama a la herramienta advance_chapter con el
  capitulo N` (N = display_order destino). Un avance redactado «en prosa» no
  se ejecuta y el embudo se clava. Nunca avances a un capítulo que no existe.
- **`advance_condition` = conducta OBSERVABLE del cliente** («el cliente dio
  su distrito»), jamás una intención («el cliente parece interesado»).
- **Un objetivo por capítulo.** Un capítulo que saluda, califica y cierra a
  la vez no hace ninguna de las tres.

## Marcadores de envío de archivos

`###SEND_FILES: <frase>###` hace que el agente envíe un archivo de la
Librería. La `<frase>` debe ser EXACTAMENTE el `trigger_condition` de un
archivo enviable vivo del agente (`list_library_files` con
`capability: "sendable"`). Frase desconocida = el marcador se ignora o se
elimina; lista vacía = el marcador está prohibido. Si el negocio quiere enviar
un catálogo/ficha, primero sube y vincula el archivo (`upload_library_file` /
`link_file_to_agent` con su frase) y recién entonces escribe el marcador.

## Esqueleto que convierte (punto de partida, no camisa de fuerza)

1. **Saludo ciego** (`execute_once: true`): presenta a la persona y hace UNA
   pregunta de apertura. Sin catálogo todavía.
2. **Calificación**: una pregunta por mensaje hasta tener lo mínimo para
   recomendar (necesidad, ciudad si hay envío). Avance por conducta.
3. **Oferta + Cierre**: recomendación concreta, precio, y una pregunta de
   cierre. Aquí viven los marcadores de archivos.
4. **ÉXITO (terminal)**: datos de entrega/pago. Sin línea de avance (los
   capítulos terminales no avanzan).
5. **No interesado**: salida elegante + puerta abierta. También terminal.

Seguimientos: la escalera 48 h → 72 h → 5 días se programa con recordatorios
(`create_reminder`), no escribiendo «espera 2 días» en el manual.

## Antipatrones que debes rechazar (aunque el dueño los pida tal cual)

- Ráfagas de preguntas en un mensaje → el cliente responde una e ignora el
  resto. Una pregunta por mensaje.
- Muros de texto → WhatsApp es conversación: 2-4 líneas por mensaje.
- Avanzar «cuando el cliente esté listo» → condición no observable; el
  capítulo no avanza nunca o avanza siempre.
- Editar capítulo por capítulo con guardados sueltos → quema el Historial.
- Copiar un manual de otro rubro cambiando el producto → el contexto y las
  objeciones no se transfieren; genera desde el negocio real
  (`generate_manual`) y edita encima.

## Con la IA de OptiMind (consume créditos del negocio)

`generate_manual` (borrador completo desde la descripción del negocio) y
`optimize_manual` (mejoras por capítulo) NO guardan nada: devuelven material
para revisar y aplicar con `save_manual_chapters`. El servidor protege las
menciones vivas (marcadores, avances, herramientas): si una optimización las
pierde, ese capítulo vuelve sin cambios.

## Validar ANTES de guardar (sin gastar créditos ni Historial)

El skill trae un validador offline y un manual de ejemplo:

- `scripts/check_manual.mjs` — Node puro, sin dependencias. Pásale el JSON del
  manual (el array de capítulos de `read_manual`, o tu borrador en ese mismo
  shape) y reporta errores y avisos en español:

  ```bash
  node scripts/check_manual.mjs manual.json
  ```

  Corre SIEMPRE el validador sobre tu borrador antes de `save_manual_chapters`
  (cada guardado consume una ranura del Historial de 10). Lo que el validador
  no puede ver offline te lo dice como aviso — p. ej. verificar las frases de
  `###SEND_FILES:###` con `list_library_files`.
- `references/example-manual.json` — esqueleto canónico completo (6 capítulos,
  negocio ficticio) que pasa el validador: úsalo como referencia de forma, no
  lo copies como contenido.
