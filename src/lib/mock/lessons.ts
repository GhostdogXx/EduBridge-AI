import type { LessonContent, UserProfile } from "@/lib/types/learning";

function shorten(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text;
  const slice = text.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > maxLen * 0.6 ? lastSpace : maxLen;
  return `${slice.slice(0, cut).trim()}…`;
}

export function getMockLessonContent(
  topicId: string,
  lowDataMode = false,
): LessonContent {
  const lesson = getMockLesson(null, topicId);
  const content: LessonContent = {
    title: lesson.title,
    simpleExplanation: lesson.simpleExplanation,
    taglishExplanation: lesson.taglishExplanation,
    filipinoExample: lesson.filipinoExample,
    whyItMatters: lesson.whyItMatters,
    estimatedReadingMinutes: lesson.estimatedReadingMinutes,
    encouragePractice: lesson.encouragePractice,
  };

  if (!lowDataMode) return content;

  return {
    ...content,
    simpleExplanation: shorten(content.simpleExplanation, 140),
    taglishExplanation: shorten(content.taglishExplanation, 140),
    filipinoExample: shorten(content.filipinoExample, 100),
    whyItMatters: shorten(content.whyItMatters, 100),
    estimatedReadingMinutes: 1,
    encouragePractice: "Subukan ang Quick Check pagkatapos!",
  };
}

export interface MockLesson extends LessonContent {
  id: string;
  order: number;
  topic: string;
}

/**
 * Temporary lesson source for Phase 4. In Phase 5 this is replaced by
 * Gemini-generated content via buildLessonPrompt(). The shape matches
 * LessonContent so swapping the data source requires no UI changes.
 */
export const MOCK_LESSONS: MockLesson[] = [
  {
    id: "photosynthesis",
    order: 1,
    topic: "Photosynthesis",
    title: "How Plants Make Their Own Food",
    simpleExplanation:
      "Plants make their own food using sunlight, water, and air. This process is called photosynthesis. The green parts of a plant, especially the leaves, capture sunlight. The plant mixes this sunlight with water from the soil and carbon dioxide from the air to create sugar, which is its food. As a bonus, it releases oxygen — the air we breathe.",
    taglishExplanation:
      "Imagine mo na ang halaman ay parang maliit na kitchen. Ang dahon ang nagsisilbing kusina. Kumukuha ito ng sunlight, tubig galing sa lupa, at hangin (carbon dioxide). Pinagsama-sama lahat para gumawa ng sariling pagkain na sugar. At ang sobrang produkto? Oxygen — yung hinihinga natin! Kaya napaka-importante ng mga halaman sa atin.",
    filipinoExample:
      "Tingnan mo ang halaman ng kamatis sa bakuran o ang talahib sa tabi ng palayan. Kahit walang nagpapakain sa kanila, patuloy silang lumalaki. Iyon ay dahil gumagawa sila ng sariling pagkain mula sa sikat ng araw — parang sila ang sariling tindera at customer sa kanilang sarili.",
    whyItMatters:
      "Kung walang photosynthesis, walang pagkain at walang oxygen sa Earth. Ang kanin na kinakain mo, ang gulay sa ulam, at maging ang hangin na hinihinga mo — lahat ng iyon ay galing sa kakayahan ng halaman na gumawa ng pagkain mula sa araw.",
    estimatedReadingMinutes: 3,
    encouragePractice:
      "Ready ka na ba? Subukan natin ang isang Quick Check para makita kung gaano mo na ito naintindihan!",
  },
  {
    id: "water-cycle",
    order: 2,
    topic: "The Water Cycle",
    title: "Where Rain Comes From",
    simpleExplanation:
      "The water cycle is how water moves around our planet again and again. The sun heats water in oceans, rivers, and lakes, turning it into vapor that rises into the sky (evaporation). Up high, the vapor cools and forms clouds (condensation). When the clouds get heavy, water falls back down as rain (precipitation). The rainwater flows back to rivers and seas, and the cycle repeats.",
    taglishExplanation:
      "Yung tubig sa dagat, sapa, at ilog ay 'iniinit' ng araw kaya nagiging singaw — umaakyat sa langit. Pagtaas, lumalamig ito at nagiging ulap. Kapag sobrang bigat na ng ulap, bumabagsak ang tubig bilang ulan. Tapos babalik ulit sa ilog at dagat. Paikot-ikot lang — kaya tinatawag itong cycle!",
    filipinoExample:
      "Naranasan mo na bang mainitan tapos biglang umulan? Yung pawis na natutuyo sa init ng araw ay parang evaporation. At yung ulan na bumubuhos sa palayan para may maani ang mga magsasaka — iyon ang precipitation na bahagi ng water cycle.",
    whyItMatters:
      "Ang water cycle ang dahilan kung bakit may sariwang tubig tayong maiinom at pang-irigasyon sa palayan. Kung naiintindihan mo ito, mas mauunawaan mo rin kung bakit may tag-ulan at tag-init sa Pilipinas.",
    estimatedReadingMinutes: 3,
    encouragePractice:
      "Galing! Tikman natin ang Quick Check para tingnan kung clear na sa'yo ang daloy ng tubig.",
  },
  {
    id: "states-of-matter",
    order: 3,
    topic: "States of Matter",
    title: "Solid, Liquid, and Gas",
    simpleExplanation:
      "Everything around us is made of matter, and matter usually comes in three states: solid, liquid, and gas. Solids keep their shape, like a rock or ice. Liquids flow and take the shape of their container, like water or juice. Gases spread out to fill any space, like the air or steam. Matter can change from one state to another when it is heated or cooled.",
    taglishExplanation:
      "May tatlong porma ang matter. Solid — matigas at may sariling hugis, parang yelo o bato. Liquid — umaagos at sumusunod sa hugis ng lalagyan, parang tubig sa baso. Gas — kumakalat sa buong espasyo, parang singaw o hangin. Kapag iniinit o nilalamig, pwedeng magpalit ng porma — halimbawa, yelo (solid) na natutunaw tubig (liquid).",
    filipinoExample:
      "Isipin mo ang yelo sa sari-sari store. Sa freezer, solid ito. Pag inilabas at iniwan sa init, natutunaw ito at nagiging tubig (liquid). Pag pinakuluan naman ang tubig para sa kape, nagiging singaw (gas). Iisang bagay lang, tatlong porma!",
    whyItMatters:
      "Araw-araw mong nakikita ang pagbabago ng matter — sa pagluluto, sa pag-inom ng malamig na tubig, sa pag-ulan. Kapag naiintindihan mo ito, mas madali mong maipapaliwanag kung bakit nangyayari ang mga pagbabagong ito sa paligid mo.",
    estimatedReadingMinutes: 3,
    encouragePractice:
      "Ang husay! Subukan ang Quick Check para i-test ang pagkakaintindi mo sa tatlong porma ng matter.",
  },
];

export function getMockLesson(
  _profile: UserProfile | null,
  lessonId?: string,
): MockLesson {
  if (lessonId) {
    const found = MOCK_LESSONS.find((lesson) => lesson.id === lessonId);
    if (found) return found;
  }
  return MOCK_LESSONS[0];
}

export function getNextMockLesson(currentId: string): MockLesson | null {
  const current = MOCK_LESSONS.find((lesson) => lesson.id === currentId);
  if (!current) return null;
  return (
    MOCK_LESSONS.find((lesson) => lesson.order === current.order + 1) ?? null
  );
}
