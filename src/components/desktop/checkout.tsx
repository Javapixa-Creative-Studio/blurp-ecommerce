"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, MapPin, Truck, CreditCard, Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Separator } from "@/src/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cartItems, getCartTotal } from "@/src/data/cart";
import { shippingOptions, cities } from "@/src/data/shipping";
import { formatPrice } from "@/src/lib/utils";

const paymentMethods = [
  { id: "va-bca", name: "Virtual Account BCA", icon: "🏦" },
  { id: "va-mandiri", name: "Virtual Account Mandiri", icon: "🏦" },
  { id: "gopay", name: "GoPay", icon: "💚" },
  { id: "ovo", name: "OVO", icon: "💜" },
  { id: "dana", name: "DANA", icon: "💙" },
];

export function DesktopCheckout() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedShipping, setSelectedShipping] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const subtotal = getCartTotal(cartItems);
  const shippingCost = shippingOptions.find((s) => s.id === selectedShipping)?.price || 0;
  const total = subtotal + shippingCost;

  const canProceed = () => {
    if (step === 1) return name && phone && email && address && selectedCity;
    if (step === 2) return selectedShipping;
    if (step === 3) return selectedPayment;
    return false;
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit order
      router.push("/store/order/ORD-12345");
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Beranda</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/store/keranjang" className="hover:text-foreground transition-colors">Keranjang</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium">Checkout</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {[
            { num: 1, label: "Alamat", icon: MapPin },
            { num: 2, label: "Pengiriman", icon: Truck },
            { num: 3, label: "Pembayaran", icon: CreditCard },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              {i > 0 && <div className="w-12 h-px bg-border mx-2" />}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  step === s.num
                    ? "bg-primary text-primary-foreground"
                    : step > s.num
                    ? "bg-green-100 text-green-700"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > s.num ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <s.icon className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_380px] gap-8">
          {/* Main Form */}
          <div className="space-y-6">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="border rounded-xl p-6 space-y-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Alamat Pengiriman
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tidak perlu daftar akun. Masukkan alamat untuk melanjutkan.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nama Lengkap *</label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">No. HP (WhatsApp) *</label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08123456789"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                  <p className="text-xs text-muted-foreground">
                    Link pembayaran & konfirmasi akan dikirim ke email ini
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Kota *</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kota..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}, {city.province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Alamat Lengkap *</label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Shipping */}
            {step === 2 && (
              <div className="border rounded-xl p-6 space-y-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Pilih Pengiriman
                </h2>

                <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                  <div className="space-y-3">
                    {shippingOptions.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${
                          selectedShipping === opt.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={opt.id} />
                          <div>
                            <p className="font-medium">{opt.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Estimasi {opt.estimate}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold">{formatPrice(opt.price)}</span>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="border rounded-xl p-6 space-y-4">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Pilih Pembayaran
                </h2>

                <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
                          selectedPayment === method.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={method.id} />
                        <span className="text-xl">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                      </label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  Kembali
                </Button>
              )}
              <Button onClick={handleNext} disabled={!canProceed()} className="flex-1">
                {step === 3 ? "Bayar Sekarang" : "Lanjutkan"}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="h-fit sticky top-24">
            <div className="border rounded-xl p-6">
              <h2 className="font-semibold text-lg mb-4">Ringkasan Pesanan</h2>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="h-14 w-14 bg-secondary rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.color} • {item.size} • x{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ongkos Kirim</span>
                  <span>{shippingCost ? formatPrice(shippingCost) : "-"}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
