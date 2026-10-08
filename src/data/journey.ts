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
    id: "nursery",
    image: images.journey.nursery,
    title: "NURSERY",
    desc: "Selected seed begins its first stage of growth in the nursery.",
  },
  {
    id: "field-preparation",
    image: images.journey.fieldPrep,
    title: "FIELD PREPARATION",
    desc: "The field is being prepared for planting.",
  },
  {
    id: "lavni-transplanting",
    image: images.journey.lavni,
    title: "LAVNI",
    desc: "Young rice seedlings are transplanted into the prepared field.",
  },
  {
    id: "crop-growth",
    image: images.journey.growing,
    title: "CROP GROWTH",
    desc: "The crop develops through the growing season.",
  },
  {
    id: "harvesting",
    image: images.journey.harvesting,
    title: "HARVESTING",
    desc: "The mature crop is harvested when ready for processing.",
  },
  {
    id: "threshing-drying",
    image: images.journey.drying,
    title: "THRESHING & DRYING",
    desc: "After harvest, the grain is separated and dried before further processing.",
  },
  {
    id: "milling",
    image: images.journey.milling,
    title: "MILLING",
    desc: "The outer husk is removed to reveal the rice grain.",
  },
  {
    id: "cleaning-grading",
    image: images.journey.cleaning,
    title: "CLEANING & GRADING",
    desc: "The grains are cleaned and sorted to ensure quality.",
  },
  {
    id: "final-rice",
    image: images.journey.finalRice,
    title: "INDRAYANI RICE",
    desc: "The finished Indrayani rice, ready for cooking.",
  },
];
