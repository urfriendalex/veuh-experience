export type Product = {
  id: string;
  name: string;
  description: string;
  vikingDescription?: string;
  narrative: string;
  vikingNarrative?: string | null;
  price: number;
  image: string | string[];
  gallery?: string[];
  archived: boolean;
  size: string;
  category: 'Hoodie' | 'T-Shirt' | 'Pants' | 'Archive';
};

export const products: Product[] = [
  {
    id: '1',
    name: 'VEUH Every Knight',
    description: 'Hoodie, black, print on the back.',
    vikingDescription: 'Легендарная магическая броня, дает +420 временных ХП, а так же неуязвимость от атак жирных блантов.',
    narrative: 'A black hoodie forged for everyday battles.',
    vikingNarrative: null,
    price: 20,
    image: ['/products/veuh_hoodie_front.PNG', '/products/veuh_hoodie_back.PNG'],
    archived: false,
    size: 'One fit',
    category: 'Hoodie'
  },
  {
    id: '2',
    name: 'Mech&Shit Tee',
    description: 'T-shirt, navy, print on the back.',
    vikingDescription: 'Очень редкий магический артефакт, позволяет дважды перед долгим отдыхом использовать заклинание «Закись Хайпа», дающее +3 ко всем характеристикам на один раунд.',
    narrative: 'A navy tee carrying rare arcane energy.',
    vikingNarrative: null,
    price: 20,
    image: ['/products/hype-tee.PNG'],
    archived: false,
    size: 'One fit',
    category: 'T-Shirt'
  },
  {
    id: '3',
    name: 'Ultra Rare Exclusive One And Only Never Made Again Limited Edition',
    description: 'Hoodie, grey, print on the back.',
    vikingDescription: 'Мифические доспехи недоступные никому ниже 20-го уровня, дают неуязвимость ко всем типам урона, открывают все замки, бутылки и заклинания Барда.',
    narrative: 'A grey hoodie made as a one-time mythic drop.',
    vikingNarrative: null,
    price: 20,
    image: ['/products/lux-hoodie.PNG'],
    archived: false,
    size: 'One fit',
    category: 'Hoodie'
  },
  {
    id: '4',
    name: 'SPOTIBKN',
    description: 'Sweatpants, black, print on the side.',
    vikingDescription: 'Редкий магический предмет, при ношении можно использовать заклинание «Побег», которое позволяет выехать из Беларуси',
    narrative: 'A field cap for silent roaming and observation.',
    price: 20,
    image: ['/products/veuh_sweats.PNG'],
    archived: false,
    size: 'One fit',
    category: 'Pants'
  },
  {
    id: '5',
    name: 'VIKTORIA TEA',
    description: 'Consumable item, herbal blend infusion.',
    vikingDescription: 'Необычная броня, дает возможность призвать фамильяра Жига',
    narrative: 'A calming brew meant to be used, not worn.',
    vikingNarrative: null,
    price: 20,
    image: ['/products/viktoria_tea.PNG'],
    archived: false,
    size: 'Multiple use',
    category: 'T-Shirt'
  },
  {
    id: '6',
    name: 'Life Is Good',
    description: 'Hoodie, vintage wash, optimistic print.',
    vikingDescription: 'Древний артефакт оптимизма, дарует носителю иммунитет к страху и +2 к харизме при социальных проверках.',
    narrative: 'A hoodie from simpler times, now resting in the archive.',
    vikingNarrative: null,
    price: 20,
    image: '/products/life-is-hood.png',
    archived: true,
    size: 'One fit',
    category: 'Archive'
  },
  {
    id: '7',
    name: 'Another Good Day',
    description: 'T-shirt, soft cotton, uplifting message.',
    vikingDescription: 'Благословлённая ткань, восстанавливает 1d4 хитов каждое утро и снимает эффект усталости.',
    narrative: 'A tee that carried good vibes, now preserved in memory.',
    vikingNarrative: null,
    price: 20,
    image: '/products/another-tee.png',
    archived: true,
    size: 'One fit',
    category: 'Archive'
  },
];

export const activeProducts = products.filter((product) => !product.archived);
export const archivedProducts = products.filter((product) => product.archived);

export function getProductImagesFromImageField(image: Product['image']) {
  const source = Array.isArray(image) ? image : [image];
  return source.filter((item) => item.trim().length > 0);
}

export function getPrimaryProductImage(product: Product) {
  const fromImageField = getProductImagesFromImageField(product.image);
  if (fromImageField.length > 0) {
    return fromImageField[0];
  }

  const fromGallery = product.gallery?.find((item) => item.trim().length > 0);
  return fromGallery ?? '';
}
