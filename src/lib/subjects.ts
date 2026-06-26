import type { Subject } from "@/lib/types/learning";

export interface SubjectDefinition {
  id: Subject;
  icon:
    | "mathematics"
    | "science"
    | "english"
    | "filipino"
    | "araling-panlipunan"
    | "esp"
    | "mapeh"
    | "ict"
    | "mother-tongue";
  labelEn: string;
  labelFil: string;
  descriptionEn: string;
  descriptionFil: string;
}

export const SUBJECT_DEFINITIONS: SubjectDefinition[] = [
  {
    id: "mathematics",
    icon: "mathematics",
    labelEn: "Mathematics",
    labelFil: "Matematika",
    descriptionEn: "Numbers, shapes, patterns, and problem solving.",
    descriptionFil: "Mga numero, hugis, at paglutas ng problema.",
  },
  {
    id: "science",
    icon: "science",
    labelEn: "Science",
    labelFil: "Agham",
    descriptionEn: "Learn about plants, animals, the human body, Earth, and more.",
    descriptionFil: "Halaman, hayop, katawan, at iba pa.",
  },
  {
    id: "english",
    icon: "english",
    labelEn: "English",
    labelFil: "English",
    descriptionEn: "Reading, writing, grammar, and vocabulary.",
    descriptionFil: "Pagbasa, pagsulat, at salitang English.",
  },
  {
    id: "filipino",
    icon: "filipino",
    labelEn: "Filipino",
    labelFil: "Filipino",
    descriptionEn: "Pagbasa, pagsulat, at gramatika sa wikang Filipino.",
    descriptionFil: "Pagbasa, pagsulat, at gramatika sa Filipino.",
  },
  {
    id: "araling-panlipunan",
    icon: "araling-panlipunan",
    labelEn: "Araling Panlipunan",
    labelFil: "Araling Panlipunan",
    descriptionEn: "History, geography, and Filipino communities.",
    descriptionFil: "Kasaysayan, lugar, at mga komunidad sa Pilipinas.",
  },
  {
    id: "esp",
    icon: "esp",
    labelEn: "ESP",
    labelFil: "ESP",
    descriptionEn: "Edukasyon sa Pagpapakatao — values and good character.",
    descriptionFil: "Mga mabuting asal at pagpapakatao.",
  },
  {
    id: "mapeh",
    icon: "mapeh",
    labelEn: "MAPEH",
    labelFil: "MAPEH",
    descriptionEn: "Music, arts, physical education, and health.",
    descriptionFil: "Musika, sining, PE, at kalusugan.",
  },
  {
    id: "ict",
    icon: "ict",
    labelEn: "ICT / Computer",
    labelFil: "ICT / Computer",
    descriptionEn: "Basic computer skills and digital literacy.",
    descriptionFil: "Mga batayang gamit sa computer.",
  },
  {
    id: "mother-tongue",
    icon: "mother-tongue",
    labelEn: "Mother Tongue",
    labelFil: "Mother Tongue",
    descriptionEn: "Learn in your local language and culture.",
    descriptionFil: "Matuto gamit ang sariling wika at kultura mo.",
  },
];

export function getSubjectDefinition(subject: Subject): SubjectDefinition {
  return (
    SUBJECT_DEFINITIONS.find((entry) => entry.id === subject) ??
    SUBJECT_DEFINITIONS[1]
  );
}

export function getSubjectLabel(subject: Subject): string {
  return getSubjectDefinition(subject).labelEn;
}
