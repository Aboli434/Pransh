export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category?: string;
  captionKey?: string;
  aspect?: "landscape" | "portrait" | "square" | "wide";
  featured?: boolean;
  temporary?: boolean;
}

export const galleryData: GalleryItem[] = [
  {
    id: "g-01",
    src: "/images/gallery/landscape-1.jpg",
    alt: "Agricultural Landscape",
    captionKey: "land",
    aspect: "landscape",
    featured: true,
    temporary: true
  },
  {
    id: "g-02",
    src: "/images/gallery/detail-1.jpg",
    alt: "Farming Detail",
    captionKey: "cultivation",
    aspect: "portrait",
    temporary: true
  },
  {
    id: "g-03",
    src: "/images/journey/03-growing.jpg",
    alt: "Growing crops",
    captionKey: "growth",
    aspect: "square",
    temporary: true
  },
  {
    id: "g-04",
    src: "/images/gallery/harvest-1.jpg",
    alt: "Harvest Detail",
    captionKey: "harvest",
    aspect: "portrait",
    temporary: true
  },
  {
    id: "g-05",
    src: "/images/gallery/landscape-2.jpg",
    alt: "A Farming Landscape",
    aspect: "landscape",
    temporary: true
  },
  {
    id: "g-06",
    src: "/images/rice/rice-product.jpg",
    alt: "Rice harvest",
    captionKey: "rice",
    aspect: "landscape",
    temporary: true
  }
];
