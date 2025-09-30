export const categories = [
  { id: 1, name: "Cafés" },
  { id: 2, name: "Doces" },
  { id: 3, name: "Bebidas" },
  { id: 4, name: "Salgados" },
  { id: 5, name: "Lanches" },
  { id: 6, name: "Tortas" },
  { id: 7, name: "Chás" },
  { id: 8, name: "Sucos" }
];

export const items = [
  { id: 1, name: "Café Gelado", category: "coffee", cashbonus: true },
  { id: 2, name: "Bolo de Chocolate", category: "sweets", cashbonus: false },
  { id: 3, name: "Suco de Laranja", category: "beverages", cashbonus: true },
  { id: 4, name: "Cappuccino", category: "coffee", cashbonus: false },
  { id: 5, name: "Torta de Limão", category: "sweets", cashbonus: true },
  { id: 6, name: "Chá Gelado", category: "beverages", cashbonus: false },
  { id: 7, name: "Brownie", category: "sweets", cashbonus: true },
  { id: 8, name: "Latte", category: "coffee", cashbonus: false },
  { id: 9, name: "Água com Gás", category: "beverages", cashbonus: true },
  { id: 10, name: "Muffin de Mirtilo", category: "sweets", cashbonus: false },
  { id: 11, name: "Espresso", category: "coffee", cashbonus: true },
  { id: 12, name: "Croissant", category: "sweets", cashbonus: false },
  { id: 13, name: "Refrigerante", category: "beverages", cashbonus: true },
  { id: 14, name: "Mocha", category: "coffee", cashbonus: false },
  { id: 15, name: "Pudim", category: "sweets", cashbonus: true },
  { id: 16, name: "Chá Quente", category: "beverages", cashbonus: false },
  { id: 17, name: "Affogato", category: "coffee", cashbonus: true },
  { id: 18, name: "Brigadeiro", category: "sweets", cashbonus: false },
  {
    id: 19,
    name: "Smoothie de Morango",
    category: "beverages",
    cashbonus: true
  },
  { id: 20, name: "Macchiato", category: "coffee", cashbonus: false },
  { id: 21, name: "Cookie de Chocolate", category: "sweets", cashbonus: true },
  { id: 22, name: "Água Mineral", category: "beverages", cashbonus: false },
  { id: 23, name: "Café com Leite", category: "coffee", cashbonus: true },
  { id: 24, name: "Cheesecake", category: "sweets", cashbonus: false },
  { id: 25, name: "Chá de Hibisco", category: "beverages", cashbonus: true },
  { id: 26, name: "Ristretto", category: "coffee", cashbonus: false },
  { id: 27, name: "Palha Italiana", category: "sweets", cashbonus: true },
  { id: 28, name: "Suco de Uva", category: "beverages", cashbonus: false },
  { id: 29, name: "Americano", category: "coffee", cashbonus: true },
  { id: 30, name: "Donut", category: "sweets", cashbonus: false },
  { id: 31, name: "Chá de Camomila", category: "beverages", cashbonus: true },
  { id: 32, name: "Café Turco", category: "coffee", cashbonus: false },
  { id: 33, name: "Torta de Maçã", category: "sweets", cashbonus: true },
  { id: 34, name: "Suco Detox", category: "beverages", cashbonus: false },
  { id: 35, name: "Café Vienense", category: "coffee", cashbonus: true },
  { id: 36, name: "Pão de Mel", category: "sweets", cashbonus: false },
  { id: 37, name: "Chá Verde", category: "beverages", cashbonus: true },
  { id: 38, name: "Café Irlandês", category: "coffee", cashbonus: false },
  { id: 39, name: "Quindim", category: "sweets", cashbonus: true },
  {
    id: 40,
    name: "Milkshake de Chocolate",
    category: "beverages",
    cashbonus: false
  }
];

export const orders = [
  { id: "0098", items: ["Cappuccino", "Croissant", "Brownie"] },
  { id: "0099", items: ["Espresso", "Cookie de Chocolate"] },
  { id: "0100", items: ["Café Gelado", "Torta de Limão", "Chá Verde"] },
  { id: "0101", items: ["Latte", "Donut", "Suco de Laranja"] },
  { id: "0102", items: ["Mocha", "Brigadeiro", "Chá de Hibisco"] },
  { id: "0103", items: ["Affogato", "Pudim", "Smoothie de Morango"] },
  { id: "0104", items: ["Café com Leite", "Quindim"] },
  { id: "0105", items: ["Americano", "Torta de Maçã", "Água com Gás"] },
  { id: "0106", items: ["Café Vienense", "Pão de Mel", "Suco Detox"] },
  { id: "0107", items: ["Café Turco", "Cheesecake", "Chá Gelado"] }
];

export const days = [
  {
    day: "Segunda",
    entry1: "08:30",
    output1: "12:30",
    entry2: "13:30",
    output2: "20:30"
  },
  {
    day: "Terça",
    entry1: "09:00",
    output1: "12:00",
    entry2: "13:00",
    output2: "19:00"
  },
  {
    day: "Quarta",
    entry1: "08:00",
    output2: "12:00"
    // no entry2/output2
  },
  {
    day: "Quinta",
    entry1: "10:00",
    output2: "18:00"
    // no output1, entry2, or output2
  },
  {
    day: "Sexta",
    entry1: "08:30",
    output1: "12:30",
    entry2: "13:30",
    output2: "21:00"
  },
  {
    day: "Sábado",
    entry1: "09:00",
    output2: "14:00"
    // no entry2/output2
  },
  {
    day: "Domingo"
    // no entries
  }
];
