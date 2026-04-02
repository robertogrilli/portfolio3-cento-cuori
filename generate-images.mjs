/**
 * CENTO CUORI — Image Generator
 * Model: fal-ai/flux-2-pro
 * Generates all site images via fal.ai API
 */

import { writeFile } from 'fs/promises'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const API_KEY = '00401ded-ea85-44bf-b71b-2ef285e56e80:9e4cb8192ed34a137d072697788b71f4'
const MODEL   = 'fal-ai/flux-2-pro'
const OUT_DIR = join(__dirname, 'public/images')

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

/* ═══════════════════════════════════════════════════════════════════
   IMAGE DEFINITIONS — file · size · prompt
═══════════════════════════════════════════════════════════════════ */
const IMAGES = [

  /* ── HERO ────────────────────────────────────────────────────── */
  {
    file: 'hero.jpg',
    size: 'landscape_16_9',
    prompt: `Interior of an intimate authentic Neapolitan pizzeria in Florence Italy, warm golden amber light from hanging pendant Edison bulbs and small arched windows, exposed terracotta brick walls with decades of patina, dark aged wooden tables worn smooth by time, mismatched chairs, ceramic wine jugs and Chianti flasks on wooden shelves, a freshly baked Neapolitan pizza on a round wooden board steaming on the foreground table, soft bokeh background showing other diners in warm amber light, Rembrandt lighting, deep ochre and terracotta colour palette, shot on Canon EOS R5 with 35mm f/1.4 lens at ISO 1600, professional editorial restaurant photography, cinematic atmosphere, ultra-realistic photorealistic, award-winning food photography`,
  },

  /* ── FORNO ───────────────────────────────────────────────────── */
  {
    file: 'forno.jpg',
    size: 'portrait_4_3',
    prompt: `Close-up photograph of a traditional Neapolitan pizza oven in an authentic Italian pizzeria, roaring orange and yellow flames deep inside the dark brick dome, glowing ember light casting dramatic warm shadows on hand-painted ceramic tiles surrounding the oven mouth, a Neapolitan pizza visible on the oven floor with characteristic charred black spots, pizza peel partially visible at the edge, chiaroscuro lighting with deep blacks and intense warm orange, charred soot on the brickwork, cinematic dramatic atmosphere, professional restaurant photography, shot on 50mm f/1.8 lens, ultra-realistic photorealistic, hyperdetailed`,
  },

  /* ── PIZZE CLASSICHE ─────────────────────────────────────────── */
  {
    file: 'pizza-margherita.jpg',
    size: 'landscape_4_3',
    prompt: `Authentic Neapolitan Margherita pizza photographed from directly overhead (top-down bird's-eye view) on a dark aged round wooden board, perfectly charred and blistered crust with characteristic black leopard spots, vibrant red San Marzano tomato sauce, fresh fior di latte mozzarella melted and slightly golden with small air bubbles, two fresh whole basil leaves glistening with extra virgin olive oil droplets, irregular artisanal shape, soft natural side window light creating gentle depth and shadow, ultra-sharp detail, professional food photography, 100mm macro lens f/2.8, realistic steam wisps, Italian Michelin-starred restaurant quality, ultra-realistic photorealistic`,
  },

  {
    file: 'pizza-napoli.jpg',
    size: 'landscape_4_3',
    prompt: `Authentic Italian pizza Napoli photographed from 40-degree elevated angle on dark slate serving board, vibrant deep red San Marzano tomato base, melted fior di latte mozzarella with golden blistered bubbles, whole oil-cured anchovy fillets (acciughe sotto sale) glistening and draped across the surface, salted capers scattered throughout, dried Sicilian oregano visible, generous drizzle of extra virgin olive oil, characteristic Neapolitan puffy charred leopard-spotted crust, dark rustic wooden table, dramatic single window light from left casting long shadows, professional editorial food photography, 85mm f/2 lens, ultra-realistic sharp textures, salty umami aesthetic, photorealistic`,
  },

  {
    file: 'pizza-bufala.jpg',
    size: 'landscape_4_3',
    prompt: `Beautiful Neapolitan pizza with mozzarella di bufala photographed from 35-degree elevated angle on dark Carrara marble surface, vibrant bright red tomato base visible between pools of melting white buffalo mozzarella DOP in large irregular chunks, fresh cherry tomatoes halved and slightly roasted, two fresh basil leaves, characteristic Neapolitan charred crust with puffy air pockets, steam rising visibly from the hot white cheese, soft diffused natural north window light creating beautiful specular highlights on the creamy mozzarella, professional food photography, Canon RF 85mm f/1.2L, extreme hyperrealistic detail, Italian fine dining quality, photorealistic`,
  },

  {
    file: 'pizza-prosciutto.jpg',
    size: 'landscape_4_3',
    prompt: `Overhead flat-lay photograph of authentic Neapolitan pizza with prosciutto cotto on dark slate surface, deep red San Marzano tomato base, perfectly melted fior di latte mozzarella with golden blistered spots and browned edges, thin folded slices of Italian prosciutto cotto (cooked ham) draped across the hot pizza, artisanal charred crust with flour dusting, dark aged walnut wood table visible at edges, natural directional daylight from the right side, professional editorial food photography, 85mm tilt-shift lens, sharp textures, warm honeyed tones, Italian trattoria menu quality, photorealistic`,
  },

  {
    file: 'pizza-salame.jpg',
    size: 'landscape_4_3',
    prompt: `Close-up photograph of Neapolitan spicy salami pizza from 45-degree elevated angle on a dark cast iron pan placed on rustic wood, vibrant San Marzano tomato base, perfectly melted fior di latte mozzarella, multiple thin circular slices of deep red spicy Calabrian salame piccante curled upward from the heat showing the white fat marbling, characteristic Neapolitan charred and puffy blistered crust with leopard spots, drops of chili oil glistening bright red, dramatic hard side window lighting creating intense highlights on the salami fat, ultra-realistic food photography, 85mm telephoto, rich deep reds and whites, photorealistic hyperdetailed`,
  },

  {
    file: 'pizza-cotto-funghi.jpg',
    size: 'landscape_4_3',
    prompt: `Professional food photograph of Italian pizza prosciutto e funghi from directly above (top-down) on aged round wood serving board, bright red San Marzano tomato base, melted mozzarella with golden spots and browned edges, sliced cremini mushrooms browned and caramelized on top with visible grill marks, thin slices of prosciutto cotto cooked into the cheese, single fresh basil leaf, characteristic Neapolitan artisanal charred crust, dark espresso-toned restaurant table, soft warm natural window lighting with subtle shadows, ultra-realistic food photography, 100mm macro lens, sharp ingredient textures, warm Italian trattoria ambiance, photorealistic`,
  },

  /* ── PIZZE SPECIALI ──────────────────────────────────────────── */
  {
    file: 'pizza-pesto.jpg',
    size: 'landscape_4_3',
    prompt: `Stunning Neapolitan white pizza with pesto photographed from 35-degree elevated angle on dark black slate board, vibrant deep emerald green Genovese basil pesto sauce base (no tomato), fresh white fior di latte mozzarella in melted chunks starkly contrasting the bright green pesto, small halved fresh cherry tomatoes red and orange scattered creating vivid colour contrast, characteristic Neapolitan puffy charred crust dusted with flour, generous glossy extra virgin olive oil sheen, bright vibrant food colours, natural diffused north light from the left, professional editorial food photography, 85mm f/2 lens, ultra-realistic sharp, Italian restaurant quality, photorealistic`,
  },

  {
    file: 'pizza-rucola.jpg',
    size: 'landscape_4_3',
    prompt: `Top-down overhead flat-lay of Neapolitan rucola pizza on dark aged slate slab, abundant fresh baby arugula rocket leaves (rucola) piled generously across the entire pizza surface still steaming, small halved cherry tomatoes visible underneath, very thin translucent curls of aged Grana Padano parmesan shaved on top catching the light, melted white fior di latte mozzarella visible between the rucola, artisanal charred Neapolitan crust, generous drizzle of cold-pressed extra virgin olive oil creating glossy highlights on the leaves, crisp diffused natural studio light, professional food photography, sharp and vibrant, Italian fine dining menu quality, photorealistic`,
  },

  {
    file: 'pizza-1955.jpg',
    size: 'landscape_4_3',
    prompt: `Hero shot of signature gourmet Neapolitan pizza from 45-degree dramatic angle on dark rustic aged wood board, vibrant deep green Genovese basil pesto covering the base (no tomato), premium fior di latte mozzarella melted with golden blistered spots, bright yellow cherry tomatoes (pomodorini gialli Vesuvio) halved and scattered creating stunning colour contrast against the green, chunky rustic pieces of Neapolitan sausage (salsiccia di Napoli) with visible fennel seeds and spice flecks, characteristic blistered and charred Neapolitan crust with puffy air pockets, generous glistening olive oil, dramatic Rembrandt single window side lighting with deep shadows, professional editorial food photography, 85mm f/1.4 lens, hyperdetailed realistic, Italian food magazine cover quality, photorealistic`,
  },

  /* ── CALZONE ─────────────────────────────────────────────────── */
  {
    file: 'calzone.jpg',
    size: 'landscape_4_3',
    prompt: `Freshly baked Italian calzone on dark worn wooden board from 35-degree elevated angle, perfectly golden-brown folded half-moon pizza dough with characteristic charred black spots and bubble blisters from the oven, one end gently torn open revealing steaming melted fior di latte mozzarella strings and pink prosciutto cotto inside, visible white ricotta pockets, steam rising dramatically from the hot interior, light dusting of tipo 00 flour on the dark wood, small white ceramic bowl of bright San Marzano tomato sauce alongside, dramatic single window light creating strong specular highlights on the curved golden dome, ultra-realistic professional food photography, Italian pizzeria authentic, 85mm f/2, sharp textures, photorealistic`,
  },

]

/* ═══════════════════════════════════════════════════════════════════
   API CALL
═══════════════════════════════════════════════════════════════════ */
async function generate(prompt, imageSize) {
  const res = await fetch(`https://fal.run/${MODEL}`, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${API_KEY}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      prompt,
      image_size:            imageSize,
      num_inference_steps:   28,
      num_images:            1,
      enable_safety_checker: false,
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`fal.ai ${res.status}: ${text.slice(0, 200)}`)
  }

  const data = await res.json()
  const img  = data.images?.[0]
  if (!img?.url) throw new Error(`No image URL in response: ${JSON.stringify(data).slice(0, 200)}`)
  return img
}

async function download(url, filename) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed: ${res.status}`)
  const buf  = await res.arrayBuffer()
  const path = join(OUT_DIR, filename)
  await writeFile(path, Buffer.from(buf))
  return path
}

/* ═══════════════════════════════════════════════════════════════════
   RUN
═══════════════════════════════════════════════════════════════════ */
const total = IMAGES.length
let ok = 0, fail = 0

console.log(`\n🍕 CENTO CUORI — Image Generator`)
console.log(`   Model  : ${MODEL}`)
console.log(`   Output : ${OUT_DIR}`)
console.log(`   Images : ${total}\n`)
console.log('─'.repeat(55))

for (let i = 0; i < IMAGES.length; i++) {
  const img = IMAGES[i]
  const n   = `[${String(i + 1).padStart(2, '0')}/${total}]`

  process.stdout.write(`${n} ${img.file.padEnd(28)} `)

  // Skip if already generated
  const alreadyExists = existsSync(join(OUT_DIR, img.file)) ||
                        existsSync(join(OUT_DIR, img.file.replace('.jpg', '.png')))
  if (alreadyExists) {
    console.log(`–  skipped (already exists)`)
    ok++
    continue
  }

  try {
    const result   = await generate(img.prompt, img.size)
    const ext      = result.content_type?.includes('png') ? 'png' : 'jpg'
    const filename = img.file.replace(/\.[^.]+$/, `.${ext}`)
    await download(result.url, filename)
    console.log(`✓  ${result.width}×${result.height}`)
    ok++
    // Pause between requests to avoid rate limiting
    if (i < IMAGES.length - 1) await new Promise(r => setTimeout(r, 1500))
  } catch (err) {
    console.log(`✗  ${err.message}`)
    fail++
    // Wait longer after a failure before retrying next
    await new Promise(r => setTimeout(r, 3000))
  }
}

console.log('─'.repeat(55))
console.log(`\n✓ Generated : ${ok}`)
if (fail > 0) console.log(`✗ Failed    : ${fail}`)
console.log('\nDone. Reload the dev server to see the images.\n')
