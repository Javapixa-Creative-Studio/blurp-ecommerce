export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  whatsapp: string;
  email?: string;
  isPrimary?: boolean;
}

export const stores: Store[] = [
  {
    id: "1",
    name: "Toko Pusat — Jakarta",
    address: "Jl. Senopati No. 88, Kebayoran Baru",
    city: "Jakarta Selatan 12190",
    hours: "Senin–Sabtu · 10:00 – 21:00 WIB",
    phone: "+62 21 5555 8888",
    whatsapp: "+62 812 3456 7890",
    email: "hello@sorastore.id",
    isPrimary: true,
  },
  {
    id: "2",
    name: "Cabang Bandung",
    address: "Jl. Riau No. 21",
    city: "Bandung 40115",
    hours: "Setiap hari · 11:00 – 20:00 WIB",
    phone: "+62 22 4444 7777",
    whatsapp: "+62 812 9876 5432",
  },
  {
    id: "3",
    name: "Cabang Surabaya",
    address: "Jl. Basuki Rahmat No. 45",
    city: "Surabaya 60271",
    hours: "Setiap hari · 10:00 – 21:00 WIB",
    phone: "+62 31 3333 6666",
    whatsapp: "+62 813 1234 5678",
  },
];
