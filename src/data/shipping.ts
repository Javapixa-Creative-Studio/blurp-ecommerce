export interface ShippingOption {
  id: string;
  name: string;
  estimate: string;
  price: number;
}

export const shippingOptions: ShippingOption[] = [
  { id: "jne-reg", name: "JNE REG", estimate: "2-3 hari", price: 18000 },
  { id: "jnt", name: "J&T Express", estimate: "1-2 hari", price: 22000 },
  { id: "sicepat", name: "SiCepat REG", estimate: "2 hari", price: 16000 },
  { id: "anteraja", name: "AnterAja", estimate: "2-3 hari", price: 15000 },
];

export interface City {
  id: string;
  name: string;
  province: string;
}

export const cities: City[] = [
  { id: "1", name: "Jakarta Selatan", province: "DKI Jakarta" },
  { id: "2", name: "Jakarta Pusat", province: "DKI Jakarta" },
  { id: "3", name: "Jakarta Barat", province: "DKI Jakarta" },
  { id: "4", name: "Bandung", province: "Jawa Barat" },
  { id: "5", name: "Surabaya", province: "Jawa Timur" },
  { id: "6", name: "Yogyakarta", province: "DI Yogyakarta" },
  { id: "7", name: "Semarang", province: "Jawa Tengah" },
  { id: "8", name: "Medan", province: "Sumatera Utara" },
  { id: "9", name: "Makassar", province: "Sulawesi Selatan" },
  { id: "10", name: "Denpasar", province: "Bali" },
];
