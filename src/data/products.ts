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
    id: "pransh-rice-current",
    name: "PRANSH Farm Rice",
    variety: "[CURRENT RICE VARIETY]",
    description: "Explore the rice currently offered through PRANSH, grown as part of our farming journey and available through direct enquiry.",
    image: "/images/rice/rice-product.jpg",
    grainImage: "/images/rice/rice-grain-macro.jpg",
    availability: "[AVAILABLE PACK SIZE / DETAILS]"
  }
];
