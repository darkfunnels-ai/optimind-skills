---
name: optimind-manual-writer
description: Write and edit OptiMind WhatsApp sales agent manuals correctly ("escribe el manual", "mejora el capítulo", "arregla el embudo", "el agente no avanza de capítulo"), and build one from scratch for an account with no funnel yet ("no tengo embudo", "quiero crear un embudo", "recién me registré"). Covers the intake interview, the real chapter grammar, the single-batch save rule, file-send markers and the funnel skeleton that converts.
---

# Escribir el manual del agente de OptiMind

El manual es el guion del embudo: capítulos que el agente de WhatsApp ejecuta
en orden, cada uno con un objetivo. Este skill existe porque el manual tiene
una GRAMÁTICA real — escribirlo «a ojo» produce embudos que se clavan, archivos
que no se envían y versiones del historial quemadas.

## Si la cuenta no tiene embudo todavía: el alta se hace AQUÍ

`list_agents` devuelve la lista vacía y un campo `setup_required`. Eso NO es un
error ni un motivo para mandar al dueño a la web: es el arranque del alta.

1. **El proceso del dueño primero, la plantilla después.** Pídele que cuente
   con SUS palabras su proceso de venta completo, del primer mensaje del
   cliente a la venta concretada: qué pregunta y en qué orden, qué datos pide,
   qué valida antes de seguir, qué excepciones tiene («en Lima no pido
   adelanto», «esto pasa a una persona del equipo») y qué hace antes de dar la
   venta por cerrada. No le hables de capítulos ni de términos técnicos. Los
   capítulos salen de ESA narración: uno por etapa real, en su orden exacto,
   cada uno con su propósito, sus preguntas, su condición de avance, sus
   excepciones (dentro del capítulo al que pertenecen) y sus acciones. Un
   capítulo estándar (saludo, objeciones, cierre, seguimiento) solo existe si
   es parte del proceso real; una etapa que la plantilla no trae se escribe de
   cero con la misma gramática. Las reglas completas viajan en
   `interview.process_mapping` de `get_funnel_template`.
2. **La plantilla es referencia de FORMA y redacción, no molde.** Elígela por
   cómo se cierra la venta: `sale` si se cierra en el chat
   (`venta_cod_whatsapp`), `appointment` si hay que agendar (`cita_visita`),
   `lead` si solo hay que filtrar (`captacion_calificacion`), `custom` si un
   mismo número rutea casos (esqueleto). Repregunta solo los huecos que la
   narración no cubrió (`required_parameters`); el que no aplique se borra con
   su frase entera, y un capítulo que no aplique se borra re-apuntando los
   avances. `apply_funnel` rechaza huecos vivos, nombrándolos.
3. **Crea el embudo**: `create_sales_agent`. ⚠️ Consume un cupo de la
   suscripción, que es dinero del dueño — **confírmalo con él antes de
   llamarla**, y díselo con el número de embudos que ya tiene. Si devuelve
   error de cupo, NO reintentes: el mensaje dice a dónde ir.
4. **Escribe el embudo entero**: `apply_funnel` con todos los capítulos de una
   vez, más `shared_context` — el bloque compartido ÚNICO y OBLIGATORIO, con
   sus TRES secciones completas (CONTEXTO / RESPUESTAS ESPECÍFICAS —las
   respuestas y acciones ante cada situación, con el texto aprobado por el
   dueño— / PUNTOS CLAVE); se re-edita después con `set_shared_context` — y
   `persona`, también OBLIGATORIA (name + personality como mínimo; compónla con
   la `persona_recipe` de la plantilla y el tono/rubro de la entrevista). La
   persona queda ACTIVA por defecto; `enabled: false` la guarda apagada, y
   `set_persona_enabled` conmuta el interruptor sin tocar capítulos.
   `apply_funnel` RECHAZA sin escribir nada: capítulos sin PASOS o con PASOS
   fuera de orden, intermedios sin la línea literal de avance, bloque
   compartido ausente o incompleto, persona ausente o sin personality, huecos
   de plantilla vivos y referencias rotas — cada rechazo dice el arreglo
   exacto: corrige y vuelve a llamar. Los `warnings` del resultado no
   bloquean, pero se atienden antes de dar el alta por buena.
5. **Carga lo demás**: los productos con `upsert_products` y el material que te
   pase el dueño con `upload_library_file` + `link_file_to_agent`. Solo
   entonces tienen sentido los marcadores `###SEND_FILES:`, porque solo
   entonces existe la condición de envío que nombran.
6. **Verifica y cierra**: relee con `read_manual`, comprueba los roles y el
   bloque compartido, y `get_agent_settings` → `settings.persona.enabled`
   confirma la personalidad activa. **Lo único que queda en el panel** es
   escanear el QR de WhatsApp: por ahí no se puede automatizar y no hay que
   fingir que sí. Dilo claro al terminar.

Para EDITAR un embudo que ya vende, el flujo es el de abajo y la herramienta es
`save_manual_chapters`: `apply_funnel` reemplaza todos los capítulos.

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
5. **Deshacer** = `list_manual_versions` + `restore_manual_version`. La
   restauración también crea una versión nueva — y como el Historial retiene
   solo 10, con el Historial lleno cada versión que entra expulsa a la más
   vieja: lo restaurado se conserva, la versión nº 1 puede no sobrevivir.

## Reglas de la gramática (violarlas rompe el embudo en producción)

- **`context` es un campo FUSIONADO**: puede contener los rótulos
  `CONTEXTO:`, `RESPUESTAS ESPECÍFICAS:` y `PUNTOS CLAVE:` como texto. Son
  parte del contenido — si editas un capítulo que los usa, consérvalos
  exactos. No existe un campo aparte de puntos clave.
- **Todo rol abre con la identidad completa**: `Eres <nombre>, <papel del
  capítulo> de <negocio>.` seguido del objetivo exclusivo de la etapa. Jamás
  «Sigues siendo…»: cada capítulo debe sostenerse solo, sin depender de que el
  modelo recuerde el anterior.
- **El `thought_chain` son PASOS numerados con condicionales**: encabezados
  `PASO 1:`, `PASO 2:`… secuenciales (a inicio de línea), cada paso con su
  acción y su condicional de salida («Si …», «Cuando tengas X, salta al
  PASO N», o la línea literal de avance en el paso que cierra). Si el capítulo
  rutea según la situación del cliente (típico del primero), su
  `REGLA DE EJECUCIÓN:` va ANTES del PASO 1 y dice qué paso ejecutar en cada
  caso. Los guiones que el dueño aprobó literales van con «dile esto:»
  (parafraseable si ya se dijo) o «dile esto exactamente:» (siempre íntegro).
  `apply_funnel` rechaza capítulos sin PASOS o con PASOS fuera de orden.
- **El bloque compartido va en `shared_context`, no repartido**: la
  información común del negocio (producto, precios, pagos, envío, objeciones
  con su respuesta aprobada, reglas persistentes) vive UNA vez y `apply_funnel`
  la copia idéntica a todos los capítulos; los `context` por capítulo llevan
  solo lo específico de su etapa. Dentro del bloque no se nombran herramientas
  ni marcadores, y lo que el dueño no confirmó NO se afirma: se escala al
  equipo (regla de no inventar).
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

`###SEND_FILES: <nombre>###` hace que el agente envíe un archivo de la
Librería. **El estándar es condición de envío = NOMBRE del archivo sin
extensión** — es el default al subir o vincular, y hace que el marcador, el
matcheo del cerebro (que resuelve por nombre PRIMERO) y el menú @ del panel
coincidan siempre. La frase del marcador debe corresponder a un archivo
enviable vivo del agente (`list_library_files` con `capability: "sendable"`):
frase desconocida = el marcador se ignora o se elimina; lista vacía = el
marcador está prohibido. Si el negocio quiere enviar un catálogo/ficha,
primero sube y vincula el archivo (`upload_library_file` /
`link_file_to_agent`) y recién entonces escribe el marcador con su nombre. Un
archivo legado cuya condición sea una frase distinta del nombre se corrige con
`set_file_trigger` (arrastra el cambio a los marcadores del manual).

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
