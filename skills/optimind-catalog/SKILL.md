---
name: optimind-catalog
description: Manage the OptiMind product catalog safely ("carga estos productos", "sube mi catálogo", "actualiza el precio", "importa de Shopify/CSV"). Covers the full-row upsert contract, variant identity, currencies and wiring products to the sales manual.
---

# Gestionar el catálogo de OptiMind

El catálogo alimenta lo que el agente de WhatsApp puede recomendar y vender.
Este skill existe porque la escritura del catálogo usa el contrato de la
subida CSV: **cada producto viaja como FILA COMPLETA que reemplaza a la
existente** — no es un parche, y tratarlo como parche borra datos vivos.

## Regla de oro: lee → fila completa → escribe

Para actualizar CUALQUIER cosa de un producto existente:

1. `get_product` con su id.
2. Toma la fila devuelta ENTERA, cambia solo lo que pediste cambiar.
3. `upsert_products` con la fila completa.

Cada fila exige: `name`, `description` (null vale), `active`, `visibility`,
y su forma declarada:
- `has_variants: false` → `sku`, `price`, `currency`, `inventory_qty` al
  nivel raíz (una celda ausente se escribe VACÍA: un producto sin precio deja
  de ser vendible por el agente).
- `has_variants: true` → TODAS sus variantes, cada una completa (`sku`,
  `title`, `price`, `currency`, `inventory_qty`, `options`) y **cada variante
  existente con su `id`** (el uuid de `get_product`). Una variante que no
  mandas se ELIMINA; una variante sin id sustituye a la vieja y rompe las
  referencias de pedidos y stock del negocio.

Más trampas del contrato:
- Sin `id`, el destino se localiza por el `name` (handle): un nombre igual al
  de un producto existente lo SOBRESCRIBE en vez de crear uno nuevo.
- Los errores llegan POR FILA (`errors`/`results`): la llamada puede responder
  «éxito» con filas fallidas adentro. Revisa siempre `created`/`updated`/
  `errors`.
- Borrar (`delete_product`) es DEFINITIVO: no hay papelera, y las ventas
  pasadas pierden la referencia a sus variantes. Confirma con el dueño antes.

## Monedas

Un negocio puede vender en más de una moneda a la vez. La moneda vive POR
VARIANTE: jamás asumas la moneda — cópiala de la fila leída, y si el dueño da
un precio sin moneda, pregunta cuál.

## Cargar un catálogo nuevo (CSV, lista pegada, Shopify)

- Lotes de hasta 100 productos por llamada; parte listas más grandes.
- Cada fila nueva declara su forma (`has_variants`) y sus celdas completas.
- Nombres de producto claros y ÚNICOS (el handle sale del nombre).
- Tras cargar, verifica con `list_products` (busca por SKU) y revisa
  `errors` fila a fila.

## Cablear el catálogo al manual de ventas

Un producto en el catálogo no se ofrece solo: el manual debe nombrarlo.
- El capítulo de oferta debe mencionar el producto y su precio real (o
  instruir al agente a consultar el catálogo).
- Para enviar la ficha/foto del producto por WhatsApp: sube el archivo a la
  Librería, vincúlalo al agente como enviable con una frase disparadora, y usa
  esa frase exacta en el marcador `###SEND_FILES: …###` del manual (ver el
  skill optimind-manual-writer).
- Productos digitales (infoproductos): la entrega vive en la variante
  (`access_file_id`/`access_url`) — al actualizar, consérvalos en la fila
  (clave presente con su valor leído) o la entrega se apaga.
