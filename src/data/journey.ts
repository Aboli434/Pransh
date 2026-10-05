import { images } from './images';

export interface RiceJourneyStage {
  id: string;
  image: string;
  title: string;
  desc: string;
}

export const journeyStagesData: RiceJourneyStage[] = [
  {
    id: "seed-selection",
    image: images.journey.seed,
    title: "SEED SELECTION",
    desc: "Careful selection of Indrayani seeds before the planting season begins.",
  },
  {
    id: "sowing",
    image: images.journey.sowing,
    title: "SOWING",
    desc: "Planting the seeds in the prepared soil of the farm.",
  },
  {
    id: "growing",
    image: images.journey.growing,
    title: "GROWING",
    desc: "The green paddy fields mature under the sun and rain.",
  },
  {
    id: "harvesting",
    image: images.journey.harvesting,
    title: "HARVESTING",
    desc: "The mature crop is harvested when ready for processing.",
  },
  {
    id: "drying",
    image: images.journey.drying,
    title: "DRYING",
    desc: "The harvested paddy is dried under the natural sunlight.",
  },
  {
    id: "processing",
    image: images.journey.processing,
    title: "PROCESSING",
    desc: "The dried paddy undergoes milling to separate the husk from the grain.",
  },
  {
    id: "cleaning",
    image: images.journey.cleaning,
    title: "CLEANING & GRADING",
    desc: "The grains are cleaned and sorted to ensure quality.",
  },
  {
    id: "final-rice",
    image: images.journey.finalRice,
    title: "FINAL RICE",
    desc: "The finished Indrayani rice, ready for cooking.",
  },
];
