---
name: whatsapp-sales-playbook
description: Field-tested WhatsApp sales playbook distilled from aggregated, anonymized sales conversations ("cómo vender por WhatsApp", "mejorar mi cierre de ventas", "por qué no me responden", "seguimiento de leads"). Principles, objection handling, pricing, follow-up ladder and a diagnosis rubric — useful with or without an OptiMind connection.
---

# Playbook de ventas humanas por WhatsApp

Destilado de un corpus **agregado y anonimizado** de millones de mensajes de venta por
WhatsApp en verticales B2C y B2B, con conversiones verificadas por etapa y una pasada de
verificación adversarial. Ningún negocio, persona ni conversación es identificable aquí:
las cifras viajan como proporciones y los ejemplos son inventados. Todos los ejemplos de este documento son **sintéticos**:
reproducen la mecánica observada con producto y cliente ficticios.

**Cómo está calibrada la evidencia.** Dentro del corpus existe un contraste casi
experimental: tres agentes del mismo vertical vendían el **mismo producto**, con guiones
casi clonados y ventanas de tiempo idénticas, diferenciándose sobre todo en la
arquitectura del flujo. Lo que se repite en ese trío **y** en un vertical B2B de ciclo
largo asciende a principio global; lo que aparece en un solo agente se marca como señal.

Cada regla lleva una etiqueta de confianza:
- **[fuerte]** replicada a escala completa y sostenida contra el verificador adversarial.
- **[media]** consistente en varios agentes, sin contraejemplo, muestreo no replicado al 100%.
- **[heurística]** doctrina de método con evidencia solo inversa (casos donde no hacerlo falló).

---

## 1. Principios globales

### 1.1 Broken record: responde lo preguntado y remata con la pregunta pendiente **[fuerte]**
**Regla:** contesta en 1-2 líneas lo que el cliente preguntó y cierra la misma ráfaga
repitiendo —sin enfadarte y sin reiniciar— la pregunta de avance que sigue abierta.

**Por qué:** la compuerta sorda (re-preguntar el embudo ignorando la pregunta del cliente)
es el punto de muerte nº 1 del corpus. En una de las variantes, el **36% de las
conversaciones perdidas muestreadas** muere exactamente en esa compuerta, y **más de 1 de
cada 10 conversaciones de todo su tráfico** tiene esa compuerta como último mensaje. Del
otro lado: las ganadoras encadenan hasta 7 objeciones seguidas, todas respondidas y todas
rematadas con la misma pregunta, y cierran en ~20 minutos. Otra variante repite la misma
pregunta de avance ~8 veces a lo largo de días hasta cerrar la venta.

- ❌ Cliente: «¿Cuánto cuesta?» → Bot: «¿El envío sería a la capital o al interior?»
- ✅ Cliente: «¿Cuánto cuesta?» → Bot: «El frasco de Té Origen está $29 y el pack de 3 sale $69 🙌 ¿te lo despacho a la capital o al interior?»

**Antipatrón que corrige:** *compuerta sorda*.

### 1.2 Toda ráfaga termina en UNA pregunta de avance **[fuerte]**
**Regla:** una sola pregunta por ráfaga, siempre al final, y que su «sí» ya avance el embudo.

**Por qué:** en la variante ganadora ~**90% de los turnos sustantivos** cierran con
pregunta, y las excepciones coinciden con la muerte del chat. En la variante perdedora
existe una rama informativa que termina en afirmación («…te llega por agencia 🚚») porque
su guion ordenaba detenerse ahí a esperar la respuesta del cliente: cientos de
conversaciones tienen ese mensaje informativo como última línea. Las compuertas presupositivas o de
micro-compromiso son las que menos estancan.

- ❌ «Te lo enviamos por agencia. Cualquier cosa me avisas» *(informa y calla)*
- ❌ «¿Te interesa? ¿Para cuántos? ¿Y a qué ciudad?» *(tres preguntas = ninguna)*
- ✅ «Te lo enviamos por agencia sin costo 🚚 ¿cuál te queda más cerca?» *(presupositiva)*
- ✅ «¿Arrancamos tu pedido con un frasco o con el pack de 2?» *(micro-compromiso)*

**Antipatrón que corrige:** *rama sin CTA* y *ráfaga con preguntas apiladas*.

### 1.3 Menos fricción de pago gana: contra entrega por defecto, adelanto opcional **[fuerte]**
**Regla:** el pago no debe ser compuerta para registrar. Si hace falta adelanto, que sea
opcional, de monto único y **enmarcado como requisito del transportista**, no como
desconfianza tuya.

**Por qué:** con el mismo producto y guiones casi clonados, la variante que invirtió el
orden («lo pagas al recibirlo; si quieres, puedes dejar algo adelantado») convirtió **varias
veces más** que la variante de adelanto obligatorio. Una tercera variante mantuvo la
compuerta obligatoria pero con mucha mejor técnica de cierre y aun así quedó muy por
debajo de la ganadora — la fricción estructural pesó más que la técnica. La variante de compuerta obligatoria además acumula la mayor
derivación a humano: capturas de pago ilegibles = cuasi-ventas atascadas.
*Caveat honesto del dataset:* la variante ganadora también era algo más barata y declaraba
envío gratis; precio y arquitectura viajan juntos y no son separables con estos datos.

- ❌ «Para registrar tu pedido necesito primero el adelanto.»
- ✅ «Pagas al recibirlo 🙌 Solo si mandas por agencia, ellos piden $5 de adelanto para reservar el envío. ¿Te lo dejo contra entrega o mandamos por agencia?»

**Antipatrón que corrige:** *compuerta de pago previa al registro*.

### 1.4 Una petición explícita de precio jamás queda sin número **[fuerte]**
**Regla:** si piden precio, el número llega en ese mismo turno. El vehículo puede variar
(texto, flyer, PDF), pero el número llega.

**Por qué:** en una variante, de **más de mil peticiones explícitas de precio, cerca de la
mitad nunca recibió un número en texto**. Hay chats donde el bot promete confirmar el
precio y nunca lo hace. En otra variante, todas las peticiones de precio deflectadas a
logística murieron en el turno siguiente. En una tercera, las 30/30 ganadoras muestreadas
tenían el precio en el turno 1.

- ❌ «Precio» → «Te cuento que enviamos a todo el país en 24-48h ✅ ¿de dónde nos escribes?»
- ✅ «Precio» → «$29 el frasco, $49 dos y $69 tres 🙌 ¿cuál te separo?»

**Antipatrón que corrige:** *precio escondido, prometido o deflectado*.

### 1.5 Rama express para intención declarada en el primer mensaje **[media]**
**Regla:** si el primer mensaje ya nombra producto, precio o intención de compra, confirma
lo dicho y salta al paso que corresponda. Nunca le sirvas el saludo enlatado completo.

**Por qué:** los leads que declaran compra son el segmento más caliente del corpus —
convierten **varias veces mejor que la base** incluso maltratados por el guion genérico—
pero **la gran mayoría igual no cierra**: el saludo enlatado desperdicia justo el mejor
tráfico. Casos observados:
alguien pide un modelo concreto en su primer mensaje, recibe el guion de saludo completo
y abandona en el acto de mala gana; un reclamo de posventa contestado con el flyer de
bienvenida.

- ❌ Cliente: «Quiero comprar 2 frascos» → Bot: «¡Hola! 👋 Soy Ana, asesora de… ¿te cuento los beneficios?»
- ✅ Cliente: «Quiero comprar 2 frascos» → Bot: «¡Listo! 2 frascos son $49 con envío gratis 🙌 ¿a qué nombre y dirección los registro?»

**Antipatrón que corrige:** *saludo enlatado sobre intención declarada*.

### 1.6 Jamás narrar una acción que no se ejecutó **[fuerte]**
**Regla:** verifica el resultado real de cada herramienta (adjunto, traspaso, agenda,
recordatorio) antes de contarla. Si falló, dilo y da salida por texto.

**Por qué:** los adjuntos fantasma, los traspasos fantasma y las citas «agendadas» sin
reserva real son letales y transversales a todos los verticales. Patrón repetido: el bot
anuncia «ya te están atendiendo» y el cliente escribe diez mensajes al vacío; el bot
promete un PDF que nunca llegó y ese es el último mensaje del chat.

- ❌ «Te acabo de enviar el catálogo 📎» *(el envío falló)*
- ✅ «No me deja adjuntar el catálogo ahora mismo 😅 te paso lo esencial por acá: […]. ¿Te lo reenvío en PDF en un rato?»

**Antipatrón que corrige:** *acciones narradas no ejecutadas*.

### 1.7 Una fecha pactada por el cliente = recordatorio obligatorio **[fuerte]**
**Regla:** si el cliente dice «escríbeme el martes», se crea el recordatorio con esa
fecha, en cualquier etapa, y se cumple.

**Por qué:** es el mayor ROI desperdiciado del corpus. En **ningún** agente auditado la
fecha que el propio cliente pactó generó recordatorio, pese a que el sistema sí guarda
miles de recordatorios (la ausencia es probatoria, no un fallo de registro). En el caso
mejor verificado, el bot promete por escrito escribir un día concreto «sin falta», nadie
escribe, y cuando el cliente vuelve solo con intención de compra, nadie responde.

- ❌ «Perfecto, quedo atento entonces 🙌» *(sin recordatorio)*
- ✅ «Anotado: te escribo el martes a las 10 para cerrar tu pedido 📌» *+ recordatorio creado con esa fecha*

**Antipatrón que corrige:** *promesa de recontacto rota*.

### 1.8 La reactivación que convierte nombra el paso exacto pendiente **[fuerte]**
**Regla:** reactivar = retomar con nombre propio el punto exacto donde se quedó, no
saludar de nuevo ni reiniciar el embudo.

**Por qué:** el follow-up puntual por dato faltante es la reactivación de mayor
rendimiento observada; el recordatorio personalizado de 24h rescató ~**20% de las ventas
ganadoras** de una variante. Los contraejemplos son simétricos: repetir la pregunta que ya
había atascado al cliente obtuvo **0 respuestas**, igual que un «Hola» a secas. Los
recordatorios reales auditados son todos genéricos de cobro; el copy que nombra el paso
hay que escribirlo a mano.

- ❌ «Hola 👋 ¿sigues interesado?» / «¿Agencia A o agencia B?» *(la misma que lo atascó)*
- ✅ «Ana, para dejarte programada la entrega de mañana me falta únicamente la dirección. ¿Me la pasas y te lo confirmo al toque?»

**Antipatrón que corrige:** *reactivación genérica o repetitiva*.

### 1.9 Sin mudez post-conversión **[fuerte]**
**Regla:** después de registrar el pedido o derivar a humano, el canal sigue vivo con SLA
en minutos. Nunca dejes al comprador hablando solo.

**Por qué:** la ventana crítica medida es de ~**20 minutos**: dudas sin responder justo
después del registro producen cancelaciones («mejor anúlelo»). Además se pierden
recompras (compradores que vuelven a comprar y no reciben respuesta) y los reclamos quedan
al vacío, que es donde nacen los detractores. En el vertical B2B, la etapa «venta cerrada»
tenía **cero** conversaciones porque el cierre ocurría fuera del canal y nadie lo registraba.

- ❌ *Registro hecho → modo manual → silencio.*
- ✅ «¡Registrado! Un asesor te confirma la hora de entrega hoy mismo. Mientras tanto cualquier duda me la escribes por acá 🙌»

**Antipatrón que corrige:** *mudez post-etapa / post-traspaso*.

### 1.10 Señal de compra explícita = rama de cierre inmediato, incluso desde el descarte **[fuerte]**
**Regla:** detecta intención de compra y salta al registro. La etapa de descarte necesita
rampa de retorno automática.

**Por qué:** hay compradores activos —con transportista y forma de pago ya elegidos—
sentados en la etapa de descarte. El descarte se disparaba por falsos positivos de
vocabulario coloquial o por comentarios personales inocuos, y cuando esos clientes volvían
con intención de compra, nadie los rescataba. En B2B, un «quiero el modelo X» se respondió
con videos y una cita genérica en vez de escalar al cierre.

- ❌ «Quiero el pack de 3» → «Te comparto un video con los beneficios 🎥»
- ✅ «Quiero el pack de 3» → «¡Perfecto, $69 con envío gratis! ¿A qué nombre y dirección lo registro?»

**Antipatrón que corrige:** *descarte sin retorno* y *señal de compra desatendida*.

### 1.11 Formato WhatsApp: ráfagas cortas, sin ecos, sin dumps **[fuerte]**
**Regla:** 2-5 burbujas cortas por turno, una idea por burbuja, la última es la pregunta.
Nada de duplicados. Nada de descargar todo el material en un turno.

**Por qué:** las ganadoras tienen **mediana de ~50 caracteres por burbuja** y mediana de
~**22 minutos desde el saludo hasta el registro**; usan audio + imagen en los hitos
(saludo, datos, pago) y hacen espejo del registro del cliente. Las perdedoras muestran
ratio bot:cliente de **3,9-4,4:1**, y el volcado multimedia (2 videos + PDF + 2 enlaces en
un solo turno) es el último intercambio de la mayoría de ellas. Los duplicados-eco (la
misma frase 3-6 veces) delatan al bot y matan la conversación.

- ❌ Un mensaje de 900 caracteres + 2 videos + 1 PDF + 2 enlaces, sin pregunta.
- ✅ «Te queda perfecto para eso 🙌» / «Un frasco rinde 30 días.» / «¿Te separo uno o prefieres el pack de 2?»

**Antipatrón que corrige:** *dump multimedia*, *ráfagas eco*, *muro de texto*.

### 1.12 Los datos duros se repiten EXACTOS **[fuerte]**
**Regla:** precios, montos, cuentas, números de referencia y plazos se repiten **literales**.
La regla anti-repetición que obliga a parafrasear no aplica a ellos.

**Por qué:** en los guiones donde la excepción de «datos duros se repiten exactos» estaba
explícita no se observó ninguna inconsistencia de monto; en los que no la tenían, sí. El
patrón que más caro sale: el mismo importe dicho de dos formas distintas dentro de un
mismo chat, con el cliente notando el desajuste **justo al momento de pagar**.

- ❌ Audio: «son como quince» / Texto: «el adelanto es $25».
- ✅ El mismo número, mismo formato, cada vez que se mencione: «$15».

**Antipatrón que corrige:** *degradación de datos duros por parafraseo*.

### 1.13 Las etapas del embudo se atan a hechos, no a frases del bot **[fuerte]**
**Regla:** una etapa avanza con un evento duro (pedido registrado, pago verificado,
reserva confirmada, entrega), nunca porque el bot dijo algo.

**Por qué:** sin esa disciplina, toda métrica miente y toda optimización se contamina. Se
observaron etapas de «venta» con cero conversaciones (el cierre ocurría fuera del canal),
etapas avanzadas sin pedido registrado, y una etapa asignada por el simple hecho de haber
enviado la lista de precios — de modo que un «no, gracias» explícito seguía contando como
lead vivo.

**Antipatrón que corrige:** *pipeline inflado*.

### 1.14 Orden de prioridades: estructura > técnica > copy **[fuerte]**
**Regla:** al diseñar o auditar un flujo, arregla primero la arquitectura (compuertas,
orden de pasos, fricción), después la técnica de venta, y solo al final las palabras.

**Por qué:** la variante con el mejor arsenal persuasivo (protocolo tipo AIDA/PNL,
testimonios, video anti-riesgo, upsell escrito, persistencia con compuerta) fue superada
por otra con **peor** técnica de cierre, solo por haber quitado la fricción de pago.
La técnica suma; la estructura manda.

---

## 2. Objeciones

**La objeción nº 1 universal es DESCONFIANZA, no precio** (en B2B toma la forma de
«¿a quién más le vendieron?»).

- **Desconfianza / «¿es original?» / «¿no es estafa?»** → evidencia + reversión de riesgo,
  **jamás descuento**. Reencuadre observado que dio la vuelta a un chat en un solo mensaje:
  «justo para eso existe el pago contra entrega: primero recibes tu pedido, lo revisas, y
  recién ahí pagas». Complementos: video de verificación del sello, venta directa sin
  intermediarios, titular de la cuenta con nombre, y el **precio como ancla de
  autenticidad** («si te lo ofrecen más barato, no es el original»). Un anuncio pirata
  reenviado por el cliente se convirtió en upsell.
- **Estafa previa real** («pagué un adelanto y nunca llegó») → reconocer + garantía concreta
  (comprobante, código de recojo) + **downsell inmediato a 1 unidad** para minimizar el
  monto en riesgo. En las perdedoras el downsell llega **después** del «no, gracias»: tarde.
  Ojo con la trampa inversa: el upsell al pack triplica el adelanto justo en el segmento
  más desconfiado.
- **«Lo tengo que pensar»** **[heurística]** → es regulación emocional, no falta de
  información. **No des más información** (más info = más presión): baja la fricción (1
  unidad, contra entrega) y pide fecha de recontacto. Evidencia inversa: martillear la
  misma pregunta 5 veces quema al lead; responder pasivo («quedo pendiente entonces») lo
  suelta.
- **Objeción técnica (B2B)** → honestidad técnica como palanca de cierre: admitir la
  limitación real del producto para ese caso valida al experto y desbloqueó ventas.
- **Petición fuera de alcance** → rechazo firme + pivote a la oferta de menor riesgo
  («eso no lo hacemos; lo que sí puedo ofrecerte es una demostración sin costo»). El
  cliente quedó comprometido igual.
- **«Está caro» / «lo vi más barato»** → defender el ancla sin ceder («ese es el precio
  vigente de la lista, el mismo para todos») cerró en minutos. Única concesión observada
  que funciona: prometer la misma promoción para la recompra.
- **Después de CADA objeción, vuelve a la pregunta pendiente** (§1.1).
- **Guardrails calibrados:** el filtro de «respeto» falló en ambas direcciones — regañó a un
  comprador legítimo que describía su problema real (no volvió) y minutos después siguió
  vendiendo a un menor de edad autodeclarado. **Castiga la conducta (acoso persistente), no
  el vocabulario del dolor del cliente**, y bloquea duro los casos prohibidos (menores,
  contraindicaciones médicas).

---

## 3. Precio: cuándo y cómo

Tres políticas válidas según contexto; el fallo letal común es deflectar la petición
explícita (§1.4).

1. **Precio en el turno 1** — B2C de impulso cuando el anuncio **no** ancla precio: lista
   1/2/3 con ancla en el pack grande + UNA pregunta binaria detrás. Riesgo: sin valor
   previo, la masa fría no responde a un bloque de saludo cargado de precios.
2. **Precio reactivo con ancla en el anuncio** — cuando el anuncio ya trae el precio: no
   re-vendas lo que el anuncio cerró, pero responde al instante si lo piden. Riesgo
   comprobado: posponerlo detrás de compuertas mata.
3. **Precio dentro de un vehículo** (PDF de cotización, B2B consultivo) — con frase puente
   que fuerza respuesta: «la cotización va en el PDF adjunto — ¿me avisas apenas lo tengas
   abierto?».
   Solo funciona si el envío **se verifica** (§1.6) y con fallback en texto ante urgencia.

**Reglas transversales**
- Escalera de **3 escalones con ancla** (p. ej. $29 / $49 / $69): el ancla vive en el pack
  grande y la pregunta binaria va detrás.
- **Sin descuentos para cerrar.** El descuento escalonado (ancla alta → 50% → «solo por
  hoy») existe como política deliberada en algún vertical, pero como concesión improvisada
  ante una objeción, no.
- **Precio + promo inmediatamente después de confirmar la ubicación** es el fix más barato
  de un embudo de contra entrega: hay flujos completos (lugar → transportista → pago →
  datos) donde el precio no aparece en **ningún** paso.
- Repite el precio **exacto** cuando lo re-pidan (§1.12).
- **Transparencia de envío:** declarar «el envío es gratis» abiertamente no costó nada y
  acompañó a la variante ganadora; ocultarlo no aportó ventaja.

---

## 4. Captura de datos

- **Momento:** después de ubicación + cantidad, nunca antes de haber dado valor. Pedir
  datos **antes** de dar el precio mata.
- **Pregunta la CANTIDAD antes de registrar.** Un flujo registraba 1 unidad por defecto sin
  preguntar nunca, y los compradores se quejaban de ello por escrito. El upsell más barato
  disponible es un micro-CTA con beneficio + plazo: «llevando 2 completas el ciclo entero»
  o «si subes al pack de 3, te lo despacho hoy mismo».
- **Pide por partes, confirmando lo recibido y pidiendo SOLO lo que falta.** El bloque
  enlatado que pide la lista completa de datos, repetido a quien ya mandó la mitad, hace
  sentir que se habla con una pared. La versión ganadora rastrea lo recibido y pide solo
  el dato que falta.
- **Mínimo por segmento:** entrega local = nombre + dirección (cierres de 5-15 min); envío a
  interior = nombre + documento + transportista. Pedir de más alarga la fricción.
- **Orden estricto datos → pago.** Nunca entregues la cuenta antes de tener los datos
  completos, ni siquiera si el cliente insiste en pagar ya («completamos tus datos y de
  inmediato te doy la cuenta»): evita adelantos huérfanos y no costó ninguna venta en lo
  auditado.
- **La captura del pago es compromiso conductual:** pídela siempre («ni bien pagues,
  mándame la foto del comprobante»), verifícala al llegar y reclámala si dicen «ya pagué»
  sin adjuntar. Monto solicitado **único** y consistente.
- **B2B:** los datos que venden no son personales sino **de operación** (volumen de
  trabajo, especificaciones del caso de uso). Alimentan una recomendación consultiva sin
  sobredimensionar, y eso es lo que da credibilidad.

---

## 5. Cierre

- **Cierre presuntivo binario:** «¿lo dejamos todo contra entrega o prefieres adelantar
  una parte?» — cualquier respuesta ya implica comprar. Variante micro-compromiso:
  «¿arrancamos con una unidad o con el pack?».
- **Persistencia con compuerta:** mantén viva la conversación probando otro ángulo, pero
  sin avanzar de paso hasta que el compromiso pactado se cumpla.
- **Acepta «1 para probar» SIEMPRE, sin contra-upsell** (fue ~40% de las ganadoras de una
  variante): prioriza tasa de cierre sobre ticket y siembra la recompra prometiendo la misma
  promoción.
- **No sobreprometas la entrega.** Prometer que llega «en menos de una hora» cuando era
  para el día siguiente, o comprometer una hora exacta imposible de cumplir, tumbaron
  ventas ya registradas. **El registro no es venta cobrada**: cuídala hasta la entrega.
- **Rampa post-registro con SLA humano** (§1.9): ventana crítica ~20 minutos.
- **Coherencia anuncio ↔ chat:** contradecir la promesa del anuncio fabrica un detractor en
  dos turnos («entonces es un engaño»).

---

## 6. Seguimiento y reactivación en escalera

**Las 2 razones del visto sin respuesta** (doctrina del método, confirmada por la minería):
1. **Percepción de valor baja** — el lead recibió precio o compuerta sin valor previo. Se
   observó una masa enorme estancada tras un bloque de saludo de 6 envíos con precio y
   **cero preguntas de necesidad**; leads con dolores potentísimos nunca explotados porque
   nadie preguntó.
2. **El vendedor solo hace seguimiento de venta, no nutrición** — el 100% de los
   recordatorios reales auditados cobra («¿sigues interesado?», «retomemos tu compra») y
   ninguno aporta valor nuevo: **0 ventas** atribuibles al genérico.

**Falta el ciclo ATRAER → NUTRIR → VENDER:** cada toque debe aportar algo nuevo (testimonio,
dato de uso, beneficio no dicho, ángulo distinto) **antes** de volver a pedir. El único
revive real observado con copy repetido fue el que **cambió de ángulo** a uso/beneficio.

**Los 5 mataprospectos** (con su equivalente observado):
1. Seguimiento genérico sin valor nuevo — 0 ventas.
2. Repetir la pregunta que atascó al cliente — 0 respuestas.
3. Presionar sin nutrir — reactivación «Hola» a secas; re-saludo masivo con 0 respuestas.
4. Romper promesas de recontacto (§1.7).
5. Silencio tras el interés — mudez post-traspaso, bolas caídas en caliente.

**Temperatura por CONDUCTA observada, no por intuición:**
- **Frío (1-3):** no respondió al saludo. Máximo 3 toques nutritivos y soltar.
- **Tibio (4-6):** preguntó precio o logística pero no dio datos. Reactivar nombrando el
  paso exacto **+ valor nuevo**.
- **Caliente (7-10):** pidió datos de pago y no pagó. **El de mayor recuperación del
  corpus** — aquí vive el follow-up por dato faltante («me quedó faltando tu dirección
  para dejarlo programado, ¿la tienes a mano?»), la reactivación de mejor rendimiento
  medida, y las cuasi-ventas atascadas en verificación de pago.

**El mensaje de reactivación en 5 bloques:**
`INTRIGA → CUERPO → REFORZAR INTRIGA → RETOMAR (el paso exacto pendiente, con nombre) → PREGUNTA`
**Nunca cierres sin pregunta** — coincide 1:1 con §1.2: los cierres sin pregunta coinciden
con la muerte del chat. **RETOMAR** es el bloque que la evidencia valida con más fuerza.

**Cadencia:** 24-48h → 72h → ultimátum al día 5 → soltar tras 3 toques. El doble toque en
días consecutivos no molestó y cerró; también hay cierres al 5º día tras 2 seguimientos.
**Matiz honesto:** ningún chat auditado recibió más de 3 recordatorios disparados, así que
la zona de >3 toques es **región sin datos**. Lo demostradamente letal es el toque
**genérico o repetido**, no el número de toques.

**Fechas pactadas:** recordatorio obligatorio con la fecha/hora del cliente, en **todas** las
etapas. Hoy en la mayoría de implementaciones solo existe el genérico de +24h, y el
segmento que **pidió** ser recontactado termina como perdido.

---

## 7. Rúbrica de diagnóstico

Checklist para auditar una conversación o un flujo. Cada ítem se marca **presente** con la
señal indicada. Los 6 primeros son los de mayor mortalidad medida.

| # | Antipatrón | Cómo detectarlo | Regla que viola |
|---|---|---|---|
| 1 | **Compuerta sorda** | El último mensaje del bot es una pregunta de embudo que ignora la pregunta anterior del cliente | 1.1 |
| 2 | **Precio escondido, prometido o deflectado** | Existe una petición explícita de precio sin número en ≤1 turno | 1.4 |
| 3 | **Rama sin CTA** | Ráfaga del bot que no termina en pregunta; el chat muere después | 1.2 |
| 4 | **Saludo enlatado sobre intención declarada** | El primer mensaje nombra producto/precio/compra y aun así recibe el guion genérico | 1.5 |
| 5 | **Acción narrada no ejecutada** | El bot afirma haber enviado/agendado/derivado y no hay confirmación del sistema; o el cliente dice que no llegó | 1.6 |
| 6 | **Mudez post-etapa** | Mensajes del cliente sin respuesta después del registro o del traspaso; cancelación en <24h | 1.9 |
| 7 | **Compuerta de pago previa al registro** | El flujo exige adelanto antes de tomar los datos | 1.3 |
| 8 | **Promesa de recontacto rota** | Fecha pactada por el cliente sin recordatorio creado o sin cumplir | 1.7 |
| 9 | **Reactivación genérica / repetida** | Copy de reactivación sin paso concreto, o que repite la pregunta que ya atascó | 1.8 |
| 10 | **Dump multimedia o ráfagas eco** | >1 adjunto pesado por turno; frases idénticas repetidas; ratio bot:cliente >3:1 | 1.11 |
| 11 | **Sobrepromesa y claims sin descargo** | Promesas de resultado o de plazo que fabrican el reclamo de la semana siguiente | 5 |
| 12 | **Incoherencia interna** | Contradicción anuncio↔chat, entre turnos, o montos distintos en audio y texto | 1.12 |
| 13 | **Descarte sin retorno** | Comprador activo sentado en la etapa de descarte; falso positivo por vocabulario coloquial | 1.10 |
| 14 | **Guardrail mal calibrado** | Castiga la necesidad legítima y cede ante el caso prohibido (menores, contraindicaciones) | 2 |
| 15 | **Persona incoherente con el producto** | El personaje del bot da testimonio en primera persona imposible para su perfil | 1.11 |
| 16 | **Bucle sin fallback** | La misma pregunta ≥3 veces ante respuestas ambiguas, sin cambio de ángulo ni salida a humano | 1.2 / 6 |
| 17 | **Datos pedidos a ciegas** | Bloque enlatado de datos repetido a quien ya envió parte | 4 |
| 18 | **Cantidad no preguntada** | Registro de 1 unidad por defecto sin haberla preguntado | 4 |
| 19 | **Etapa sin hecho duro** | Avance de etapa sin evento verificable detrás | 1.13 |
| 20 | **Canal mudo (operativo)** | ≥3 mensajes entrantes y 0 salientes en 1h — outage, no «lead perdido» | 8 |
| 21 | **Higiene del canal** | Restos de edición o de prompt enviados como mensajes; recordatorios agendados para trolls | 1.11 |

---

## 8. Higiene operativa y medición

1. **Versiona los prompts.** Sin historial de ediciones, nada es aprendible: en el corpus
   solo una minoría de agentes tenía tráfico medible a ambos lados de su última edición, y
   ni así se sabía **qué** había cambiado. Las ediciones mueven la aguja en ambas
   direcciones: una casi **duplicó** la tasa de etapa avanzada; otra, en un agente hermano
   del mismo vertical, la **redujo** notablemente.
2. **Ata las etapas a eventos duros** (§1.13).
3. **Alerta de canal mudo:** chats con ≥3 entrantes y 0 salientes en 1h. Un solo día de
   caída silenciosa produjo decenas de conversaciones con 100% de mensajes del cliente y
   cero del bot, incluido alguien que se auto-registró el pedido completo sin respuesta.
4. **Registra el RESULTADO real de cada herramienta**, no solo su disparo: «enviado» no dice
   si el cliente respondió ni si convirtió.
5. **A/B con UNA variable.** La ventaja de la variante ganadora del corpus mezcla compuerta
   de pago + precio + envío gratis: es evidencia fuerte pero no separable.
6. **Excluye los outages del análisis win/loss** o contaminan como «perdedoras de guion».

---

## 9. Señales por vertical (usar con cautela: un solo agente cada una)

- **B2B de ticket alto y ciclo largo:** el motor no es el precio sino **ver el producto
  aplicado al caso real del cliente** + **fecha y hora exactas** (los que anclaron
  fecha+hora son minoría y son los que convierten). Discovery de operación → recomendación
  sin sobredimensionar. Honestidad técnica cierra; rechazo firme + pivote desactiva
  peticiones imposibles. Escasez concreta de stock pegada a la petición de fecha funciona
  aunque suene formulaica. **Fuga de canal:** derivar el cierre a otro número rompe la
  conversión rastreable y vacía el embudo. Al día siguiente de la cita, un check breve de
  asistencia con oferta de reagendar reabre ventas.
- **B2C contra entrega:** multimedia como columna vertebral (audio de voz humana + imagen
  en cada hito; transcribir y responder con naturalidad las notas de voz del cliente);
  transportista por defecto («te lo mando por A salvo que prefieras B»); recordatorio de 24h
  personalizado con nombre como palanca nº 1 de recuperación.
- **Descuento escalonado como política** (no como concesión) funciona en categorías de
  impulso; **urgencia artificial extrema sin credibilidad no mueve nada** (un flujo con
  urgencia agresiva dejó estancado prácticamente todo su tráfico).
- **Retener el precio hasta calificar + opacidad del alcance** acompañó a la conversión más
  baja del corpus en servicios B2C: señal, no ley.
- **Gate de evidencia fotográfica** (pedir captura de una acción para avanzar) es
  anti-gaming pero se convierte en el cuello de botella del embudo; si se usa, dar
  consolación al descalificado en vez de descarte seco.
- **Biblioteca de audios por objeción** es el rasgo más reutilizable observado; el win-back
  automático con descuento pequeño retiene poco.

---

*Este playbook es útil con cualquier operación de WhatsApp. Si vendes con un
agente de OptiMind, el skill `optimind-setup` conecta tu asistente para
aplicar todo esto directamente sobre tu manual, catálogo y conversaciones.*
