export type Product = {
  id: string;
  name: string;
  description: string;
  narrative: string;
  price: number;
  image: string;
  archived: boolean;
  size: string;
  category: 'Layer' | 'Utility' | 'Ceremony' | 'Archive';
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Midnight Field Coat',
    description: 'Heavy cotton coat with hidden inner pocket and hand-bound seams.',
    narrative: 'The first piece in your collection: a coat built for quiet winter walks.',
    price: 280,
    image: '/products/product-1.svg',
    archived: false,
    size: 'One tailored fit',
    category: 'Layer'
  },
  {
    id: '2',
    name: 'Paperwhite Knit Crew',
    description: 'Soft merino knit with a sharp neck line and compact silhouette.',
    narrative: 'Second arrival: warmth without weight, the everyday core layer.',
    price: 160,
    image: '/products/product-2.svg',
    archived: false,
    size: 'One tailored fit',
    category: 'Layer'
  },
  {
    id: '3',
    name: 'Graphite Utility Trouser',
    description: 'Structured trouser with side tabs and reinforced pocket channels.',
    narrative: 'Third piece: structure and movement, made for long city days.',
    price: 190,
    image: '/products/product-3.svg',
    archived: false,
    size: 'One tailored fit',
    category: 'Utility'
  },
  {
    id: '4',
    name: 'Slate Leather Belt',
    description: 'Vegetable-tanned leather belt with matte steel buckle hardware.',
    narrative: 'Fourth detail: the anchor point that pulls every outfit together.',
    price: 95,
    image: '/products/product-4.svg',
    archived: false,
    size: 'One tailored fit',
    category: 'Utility'
  },
  {
    id: '5',
    name: 'Noir Ceremony Shirt',
    description: 'Crisp cotton shirt with hidden placket and softened shoulder line.',
    narrative: 'Final main piece: clean, quiet, and ready for the birthday reveal.',
    price: 145,
    image: '/products/product-5.svg',
    archived: false,
    size: 'One tailored fit',
    category: 'Ceremony'
  },
  {
    id: '6',
    name: 'Archive: Fjord Overshirt',
    description: 'Past-season overshirt in washed indigo, now preserved in archive.',
    narrative: 'Archive item: retired, but still part of the story.',
    price: 210,
    image: '/products/product-6.svg',
    archived: true,
    size: 'One tailored fit',
    category: 'Archive'
  },
  {
    id: '7',
    name: 'Archive: Lunar Scarf',
    description: 'Cashmere blend scarf with contrast edge binding from a prior run.',
    narrative: 'Archive item: memory piece from an earlier chapter.',
    price: 120,
    image: '/products/product-7.svg',
    archived: true,
    size: 'One tailored fit',
    category: 'Archive'
  }
];

export const activeProducts = products.filter((product) => !product.archived);
export const archivedProducts = products.filter((product) => product.archived);
