#!/usr/bin/env node
// check_manual.mjs — validador OFFLINE de manuales de OptiMind
// (skill publico `optimind-manual-writer`). Node puro, sin dependencias, sin red.
//
// Es un ESPEJO PARCIAL del lint que aplica el propio producto: el editor y el
// generador de OptiMind validan esto mismo (y mas) con acceso al estado vivo
// del tenant; este script cubre lo verificable offline.
//
// Lo que este script NO PUEDE validar offline (requiere la API del tenant):
//   - que la frase de un ###SEND_FILES:### sea el trigger_condition de un archivo
//     enviable VIVO del agente (list_library_files con capability "sendable")
//     → aqui solo se emite un AVISO recordando verificarlo;
//   - que las [variables] existan en el Centro de Datos del agente → solo AVISO;
//   - que las herramientas mencionadas («… Tool») existan en el catalogo del tenant
//     (incluye tools MCP por tenant, que cambian) → no se valida;
//   - el round-trip del guardado (patch por clave presente, retencion de 10
//     versiones del Historial) → es semantica de save_manual_chapters, no del JSON.
//
// Uso:     node check_manual.mjs manual.json
// Entrada: array de capitulos en el formato del EDITOR (como los devuelve
//          read_manual / como los escribe save_manual_chapters), o el objeto
//          completo de read_manual ({ chapters: [...] }).
// Salida:  errores y avisos en espanol; exit code 1 si hay errores.

import { readFileSync } from "node:fs";

// ── Entrada ─────────────────────────────────────────────────────────────────

const file = process.argv[2];
if (!file) {
  console.error("Uso: node check_manual.mjs manual.json");
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(readFileSync(file, "utf8"));
} catch (e) {
  console.error(`ERROR  no se pudo leer/parsear «${file}»: ${e.message}`);
  process.exit(1);
}

const chapters = Array.isArray(parsed)
  ? parsed
  : Array.isArray(parsed?.chapters)
    ? parsed.chapters
    : null;
if (!chapters || chapters.length === 0) {
  console.error(
    "ERROR  la entrada debe ser un array de capitulos (campos del editor) o el objeto de read_manual con `chapters`.",
  );
  process.exit(1);
}

// ── Utilidades (calcadas de manualLint.ts) ──────────────────────────────────

const stripAccents = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const norm = (s) => stripAccents(s).toLowerCase().replace(/\s+/g, " ").trim();
const str = (v) => (typeof v === "string" ? v : "");

// Gramatica tolerante, calcada de manualLint.ts / serializeMention.ts.
const RE_BLOCK = /###\s*(\/?)\s*BLOCK\s*###/gi;
const RE_FILE = /###\s*SEND_FILES\s*:\s*(.+?)###/gi;
const RE_ADVANCE =
  /(?:llama a|ejecuta|usa)\s+la\s+herramienta\s+["“]?advance_chapter["”]?\s+(?:con\s+el\s+)?cap[ií]tulo\s+(\d+)/gi;
const RE_LEGACY_CHAPTER =
  /Ejecuta(?:\s+(?:obligatoriamente|discretamente|inmediatamente))?\s+(?:la\s+herramienta\s+)?["“]?Actualizar Datos Tool["”]?\s+con\s+el\s+query\s*["”]?\s*[:=]?\s*["“]?\s*capitulo\s*=\s*(\d+)\s*["”]?/gi;
const RE_CAPITULO_LOOSE = /\bcap[ií]tulo\s*=\s*\d+/gi;
const RE_PROSE_ADVANCE =
  /(?:avanza|pasa|salta|ve|contin[uú]a|deriva|dirige)\w*\s+(?:directamente\s+)?al\s+cap[ií]tulo\s+(\d+)/gi;
const RE_VAR = /\[([A-Za-z0-9_áéíóúñü][A-Za-z0-9_ áéíóúñü-]{0,40})\]/g;
// Ordinal en el label: «Capitulo 1: …», «1. Calificacion», «2 - Oferta»…
const RE_LABEL_ORDINAL = /^\s*(?:cap[ií]tulo\s*)?\d+\s*[.:)\-–—]?\s+|^\s*\d+\s*$/i;

const ADVANCE_CANONICAL = "Llama a la herramienta advance_chapter con el capitulo N";

function maskSpans(text, spans) {
  let out = text;
  for (const s of spans) out = out.slice(0, s.start) + " ".repeat(s.end - s.start) + out.slice(s.end);
  return out;
}

// ── Key-set del capitulo (no inventar claves; duales ES/EN) ─────────────────
// EN = campos del editor (read_manual / payload de save_manual_chapters).
// ES = alias en espanol tolerados al LEER un export antiguo (solo entrada).
const EDITOR_KEYS = new Set([
  "id", "chapter_index", "agent_id", "company_id", "chapter_label", "role",
  "thought_chain", "context", "key_points", "examples", "execute_once",
  "display_order", "advance_to", "advance_condition", "status", "name",
  "user_id", "created_at", "updated_at", "tools", "media", "color",
]);
const ES_ALIAS_KEYS = new Set([
  "tipo", "capitulo", "chapter", "rol", "razonamiento", "contexto", "ejemplos",
  "orden", "ejecutar_una_vez", "avanzar_a", "condicion_de_avance", "instruction",
]);

// ── Recoleccion de findings ─────────────────────────────────────────────────

const errors = [];
const warnings = [];
const err = (chapter, msg) => errors.push({ chapter, msg });
const warn = (chapter, msg) => warnings.push({ chapter, msg });

// ── Normalizacion de cada capitulo (coalesce EN → ES) ───────────────────────

const pick = (ch, en, es) => (ch[en] !== undefined ? ch[en] : ch[es]);

const rows = chapters.map((raw, i) => {
  const ch = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  if (ch !== raw) err(i + 1, "el capitulo no es un objeto JSON.");
  return {
    pos: i + 1,
    raw: ch,
    label: str(pick(ch, "chapter_label", "capitulo")),
    role: str(pick(ch, "role", "rol")),
    thought: str(pick(ch, "thought_chain", "razonamiento")),
    context: str(pick(ch, "context", "contexto")),
    advCond: str(pick(ch, "advance_condition", "condicion_de_avance")),
    order: pick(ch, "display_order", "orden"),
    execOnce: pick(ch, "execute_once", "ejecutar_una_vez") === true,
    advTo: pick(ch, "advance_to", "avanzar_a"),
  };
});

// ── Key-set: claves inventadas y claves retiradas ───────────────────────────

for (const r of rows) {
  for (const key of Object.keys(r.raw)) {
    if (key === "puntos_clave") {
      err(r.pos,
        "usa la clave «puntos_clave», que ya NO se escribe: los puntos clave viven FUSIONADOS en `context` con los rotulos CONTEXTO:/PUNTOS CLAVE:.");
    } else if (key === "key_points" && str(r.raw[key]).trim() !== "") {
      err(r.pos,
        "trae `key_points` con texto: es el shape viejo. Fusiona ese texto en `context` bajo el rotulo PUNTOS CLAVE: (no existe un campo aparte).");
    } else if (!EDITOR_KEYS.has(key) && !ES_ALIAS_KEYS.has(key)) {
      err(r.pos,
        `clave inventada «${key}»: el key-set del capitulo es fijo (campos del editor: chapter_label, role, thought_chain, context, examples, display_order, execute_once, advance_to, advance_condition…).`);
    }
  }
}

// ── display_order: 1-based, unicos (los HUECOS son legitimos) ───────────────

let ordersOk = true;
const n = rows.length;
/** Los display_order que EXISTEN de verdad: contra este conjunto se validan
 *  los destinos de avance (con huecos, «avanza al 4» puede ser correcto
 *  aunque solo haya 3 capitulos). */
const liveOrders = new Set(rows.map((r) => r.order).filter(Number.isInteger));
for (const r of rows) {
  if (typeof r.order !== "number" || !Number.isInteger(r.order)) {
    err(r.pos, "no trae `display_order` entero (es 1-based y obligatorio).");
    ordersOk = false;
  }
}
if (ordersOk) {
  const sorted = rows.map((r) => r.order).sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    if (sorted[i] === sorted[i - 1]) {
      err(0, `display_order ${sorted[i]} esta duplicado.`);
      ordersOk = false;
    }
  }
  // OJO: la consecutividad NO es invariante del producto — borrar un capitulo
  // deja un hueco (el guardado batch hace splice y NO renumera), asi que un
  // manual sano puede ser [1,2,4]. Solo se exige 1-based y sin duplicados; el
  // hueco es un AVISO cosmetico, jamas un error.
  if (ordersOk && sorted[0] !== 1) {
    err(0, `display_order debe empezar en 1 (1-based); encontrados: [${sorted.join(", ")}].`);
    ordersOk = false;
  }
  if (ordersOk && sorted[n - 1] !== n) {
    warn(0, `los display_order tienen huecos ([${sorted.join(", ")}]) — normal tras borrar capitulos; no rompe nada.`);
  }
}

// A partir de aqui se razona en la SECUENCIA del embudo: capitulo c = display_order
// cuando los ordenes son validos; si no, la posicion del array (mejor esfuerzo).
const seq = ordersOk ? [...rows].sort((a, b) => a.order - b.order) : rows;
seq.forEach((r, i) => { r.c = ordersOk ? r.order : r.pos; });

// ── Checks por capitulo ─────────────────────────────────────────────────────

const chapterText = (r) => [r.role, r.thought, r.context, r.advCond].join("\n");
const chapterInstructions = (r) => r.thought.replace(RE_ADVANCE, " ").replace(/\s+/g, " ").trim();
const MIN_CHAPTER_CHARS = 25;

// ¿Activa el modo manual como CIERRE (terminal de exito), no como escape
// condicional? Port de hasUnconditionalManualMode (manualLint.ts).
function hasUnconditionalManualMode(text) {
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (!/Activar Modo Manual Tool/i.test(lines[i])) continue;
    let conditional = false;
    for (let j = i; j >= 0; j--) {
      const l = norm(lines[j].replace(/^[\s-]+/, ""));
      if (/^si\b|^cuando\b|^en caso/.test(l)) { conditional = true; break; }
      if (/^paso\s*\d/.test(l) || l === "") break;
    }
    if (!conditional) return true;
  }
  return false;
}

const isBracketPlaceholder = (arg) => /^\[[^[\]]*\]$/.test(arg.trim());

const reachable = new Set();
const filePhrases = new Set();
const varKeys = new Set();
const labelSeen = new Map();

for (const r of seq) {
  const c = r.c;
  const text = chapterText(r);
  const spans = [];

  // Label sin ordinales (el sistema numera solo).
  if (RE_LABEL_ORDINAL.test(r.label) || /cap[ií]tulo\s*\d+/i.test(r.label)) {
    err(c, `el titulo «${r.label}» lleva ordinal; los labels van SIN numero («Calificacion», no «2. Calificacion»): el sistema numera solo.`);
  }
  const labelKey = norm(r.label);
  if (labelKey) {
    const first = labelSeen.get(labelKey);
    if (first !== undefined) warn(c, `los capitulos ${first} y ${c} se llaman igual («${r.label}»).`);
    else labelSeen.set(labelKey, c);
  }

  // Capitulo HUECO (se mide por thought_chain, lo unico que el cerebro ejecuta).
  if (chapterInstructions(r).length < MIN_CHAPTER_CHARS) {
    err(c, "viene vacio (sin instrucciones en thought_chain): el agente que llegue ahi se queda sin nada que hacer.");
  }

  // ── Anatomia de PASOS (correccion 31-ago, espejo de funnelStructure.ts) ──
  // Encabezado = inicio de linea «PASO N:» (o «PASO N -»); el preambulo antes
  // del PASO 1 es legal (ahi vive la REGLA DE EJECUCION). apply_funnel RECHAZA
  // lo que aqui sale como error.
  {
    const headers = [];
    for (const m of r.thought.matchAll(/^PASO\s*(\d+)\s*[:\-]/gim)) headers.push(Number(m[1]));
    if (headers.length === 0 || headers[0] !== 1) {
      err(c, "el razonamiento no abre con «PASO 1:»: todo capitulo se escribe como PASOS numerados, cada uno con su condicional; la REGLA DE EJECUCION (si el capitulo rutea) va ANTES del PASO 1.");
    } else {
      for (let k = 1; k < headers.length; k++) {
        if (headers[k] !== headers[k - 1] + 1) {
          err(c, `los PASOS no son secuenciales (tras el PASO ${headers[k - 1]} viene el PASO ${headers[k]}): numera 1..N sin saltos ni repetidos.`);
          break;
        }
      }
      // El MAYOR encabezado, no el último: con PASOS desordenados el hallazgo
      // de secuencia ya salio, y acusar de «inexistente» a un paso escrito
      // seria un segundo hallazgo falso (espejo de funnelStructure.ts).
      const maxHeader = Math.max(...headers);
      for (const m of r.thought.matchAll(/\bPASO\s*(\d+)\b/gi)) {
        const ref = Number(m[1]);
        // «PASO 7 del capitulo En venta» referencia OTRO capitulo: fuera de alcance.
        const tail = r.thought.slice(m.index + m[0].length, m.index + m[0].length + 24);
        if (/^\s+del?\s+(?:ese\s+|dicho\s+)?cap[ií]tulo\b/i.test(tail)) continue;
        if (ref < 1 || ref > maxHeader) {
          err(c, `nombra el PASO ${ref}, que no existe en este capitulo (tiene ${maxHeader}).`);
          break;
        }
      }
    }
  }

  // ###BLOCK### balanceado (sin anidar).
  let open = 0;
  let broken = false;
  for (const m of text.matchAll(RE_BLOCK)) {
    spans.push({ start: m.index, end: m.index + m[0].length });
    if (m[1] === "/") { if (open === 0) broken = true; else open -= 1; }
    else { if (open > 0) broken = true; open += 1; }
  }
  if (broken || open > 0) {
    err(c, "los marcadores ###BLOCK###/###/BLOCK### no cierran en pares.");
  }

  // ###SEND_FILES: frase### — bien formado; la vida de la frase no es verificable offline.
  for (const m of text.matchAll(RE_FILE)) {
    spans.push({ start: m.index, end: m.index + m[0].length });
    const phrase = m[1].trim();
    if (phrase === "") {
      err(c, "###SEND_FILES:### sin frase: el marcador necesita la condicion literal del archivo.");
    } else if (isBracketPlaceholder(phrase)) {
      err(c, `###SEND_FILES: ${phrase}### usa un hueco entre corchetes como frase; eso nunca resuelve a un archivo — escribe la frase literal del trigger.`);
    } else {
      filePhrases.add(phrase);
    }
  }

  // Marcador VIEJO de cambio de capitulo (n8n).
  for (const m of text.matchAll(RE_LEGACY_CHAPTER)) {
    spans.push({ start: m.index, end: m.index + m[0].length });
    err(c, `usa el marcador muerto «Actualizar Datos Tool … capitulo = ${m[1]}»; la unica forma viva es «${ADVANCE_CANONICAL}».`);
    reachable.add(Number(m[1]));
  }

  // Linea de avance LITERAL — en rango y no a si mismo.
  let hasAdvance = false;
  for (const m of text.matchAll(RE_ADVANCE)) {
    spans.push({ start: m.index, end: m.index + m[0].length });
    hasAdvance = true;
    const target = Number(m[1]);
    reachable.add(target);
    if (!liveOrders.has(target)) {
      err(c, `avanza al capitulo ${target}, que no existe (los capitulos son: ${[...liveOrders].join(", ")}).`);
    } else if (target === c) {
      err(c, "avanza a si mismo.");
    }
  }

  // advance_to (campo numerico del editor): tambien debe apuntar a un capitulo real.
  if (r.advTo !== undefined && r.advTo !== null) {
    if (!Number.isInteger(r.advTo) || !liveOrders.has(r.advTo)) {
      err(c, `advance_to = ${r.advTo} no apunta a ningun capitulo existente (hay ${n}).`);
    } else {
      reachable.add(r.advTo);
      if (r.advTo === c) err(c, "advance_to apunta a si mismo.");
    }
  }

  // Residuos FUERA de menciones: formas muertas o en prosa que el cerebro no ejecuta.
  const residue = maskSpans(text, spans);
  // advance_condition queda FUERA de los checks de prosa: es la DESCRIPCION
  // del criterio («el cliente esta listo para pasar al capitulo 2») y no una
  // instruccion que el cerebro deba ejecutar — escanearla daba falso ERROR.
  // Es el ultimo segmento del join, asi que basta recortar su sufijo (el
  // masking conserva longitudes).
  const residueProse = r.advCond ? residue.slice(0, residue.length - r.advCond.length) : residue;
  for (const m of residueProse.matchAll(RE_CAPITULO_LOOSE)) {
    err(c, `«${m[0]}» suelto — forma muerta de avanzar; usa «${ADVANCE_CANONICAL}».`);
  }
  for (const m of residueProse.matchAll(RE_PROSE_ADVANCE)) {
    const target = Number(m[1]);
    err(c, `«${m[0].trim()}» esta escrito en prosa y el cerebro NO lo ejecuta; la forma viva es «Llama a la herramienta advance_chapter con el capitulo ${target}».`);
    if (liveOrders.has(target)) reachable.add(target);
  }
  if (/SEND_FILES/i.test(residue)) {
    err(c, "hay un ###SEND_FILES### mal formado (la forma es exactamente `###SEND_FILES: frase###`).");
  }
  // [variables] con forma de clave (sin espacios); las que llevan espacios son
  // huecos de relleno que el agente completa al escribir (lint.ts los tolera).
  for (const m of residue.matchAll(RE_VAR)) {
    if (!/\s/.test(m[1].trim())) varKeys.add(m[1].trim());
  }

  // Terminal de exito: pasa a modo manual SIN condicion (el escape condicional
  // «Si el cliente pide un humano…» es legitimo en cualquier capitulo).
  r.terminal = hasUnconditionalManualMode(text);
  r.hasAdvance = hasAdvance;
  if (r.terminal && hasAdvance) {
    warn(c, "pasa a modo manual (terminal de exito) y ademas avanza de capitulo: el cliente que ya convirtio termina en otro capitulo.");
  }

  // Capitulo intermedio sin salida (el 1 auto-avanza si es execute_once; el ultimo puede ser terminal).
  if (!hasAdvance && !r.terminal && c < n) {
    warn(c, c === 1 && !r.execOnce
      ? "es el capitulo 1, no es execute_once y no avanza a ningun capitulo: el embudo se queda quieto en el saludo."
      : "es intermedio y no avanza a ningun capitulo: el embudo se queda quieto ahi.");
  }
}

// ── Alcanzabilidad (cap 1 arranca; execute_once auto-avanza al 2) ───────────

if (n > 1 && ordersOk) {
  reachable.add(1);
  // El auto-avance 1→2 solo existe si el capitulo 1 es execute_once.
  if (seq[0]?.execOnce) reachable.add(seq[1]?.c ?? 2);
  // Desde el SEGUNDO capitulo (el auto-avance 1→2 solo existe con execute_once:
  // sin el, tambien el 2 puede quedar inalcanzable).
  for (const r of seq.slice(1)) {
    if (!reachable.has(r.c)) warn(r.c, `nadie avanza al capitulo ${r.c}: es inalcanzable.`);
  }
}

// ── Esqueleto recomendado (avisos, jamas errores) ───────────────────────────

if (ordersOk) {
  const first = seq[0];
  if (first && !first.execOnce) {
    warn(1, "el primer capitulo no es `execute_once`: el esqueleto que convierte abre con un saludo ciego que se ejecuta UNA vez.");
  }
  if (n > 1 && !seq.some((r) => r.terminal || !r.hasAdvance)) {
    warn(0, "ningun capitulo es terminal (todos avanzan): el embudo necesita un cierre de EXITO y una salida de «no interesado».");
  }
}

// ── Avisos agregados de lo NO verificable offline ───────────────────────────

if (filePhrases.size > 0) {
  warn(0,
    `hay ${filePhrases.size} marcador(es) ###SEND_FILES### — este validador NO puede comprobar que la frase corresponda a un archivo enviable VIVO. Verifica con list_library_files (capability: "sendable") que cada frase sea el NOMBRE de un archivo sin extension (el estandar) o su trigger_condition vivo: ${[...filePhrases].map((p) => `«${p}»`).join(", ")}.`);
}
if (varKeys.size > 0) {
  warn(0,
    `se usan [variables] que este validador no puede comprobar contra el Centro de Datos del agente: ${[...varKeys].map((v) => `[${v}]`).join(", ")}. Verifica que existan antes de guardar.`);
}

// ── Reporte ─────────────────────────────────────────────────────────────────

const tag = (f) => (f.chapter > 0 ? `[cap ${f.chapter}]` : "[manual]");
for (const f of errors) console.error(`ERROR  ${tag(f)} ${f.msg}`);
for (const f of warnings) console.log(`AVISO  ${tag(f)} ${f.msg}`);

console.log(`\n${n} capitulo(s): ${errors.length} error(es), ${warnings.length} aviso(s).`);
process.exit(errors.length > 0 ? 1 : 0);
