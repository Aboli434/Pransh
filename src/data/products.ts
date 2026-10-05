import { images } from './images';

export interface RiceProduct {
  id: string;
  name: string;
  variety?: string;
  description: string;
  image: string;
  grainImage?: string;
  packImage?: string;
  availability?: string;
}

export const productsData: RiceProduct[] = [
  {
    id: "indrayani-rice",
    name: "Indrayani Rice",
    variety: "इंद्रायणी तांदूळ",
    description: "Indrayani Rice is a well-known rice variety associated with Maharashtra, valued for its soft texture and distinct character when cooked. Its compact grain and familiar regional identity make it a popular choice for everyday Maharashtrian meals.",
    image: images.rice.v01_macro,
    grainImage: images.rice.v03_cleanCloseUp,
    availability: "Available upon enquiry",
  }
];
