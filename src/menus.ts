export interface Menu {
  name: string;
  description: string;
  initialStock: number;
}

export const MENUS: Menu[] = [
  { name: "Temptation", description: "Tomates séchées, Mozza, Pesto", initialStock: 10 },
  { name: "Chaos", description: "Chèvre, Miel", initialStock: 10 },
  { name: "Oblivion", description: "Champignons, Oignons caramélisés, Pesto", initialStock: 10 },
  { name: "Craving", description: "Ovomaltine", initialStock: 10 },
];
