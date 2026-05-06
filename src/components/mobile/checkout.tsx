"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Truck, CreditCard, Check, ChevronRight } from "lucide-react";
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
  { id: "va-bca", name: "VA BCA", icon: "🏦" },
  { id: "va-mandiri", name: "VA Mandiri", icon: "🏦" },
  { id: "gopay", name: "GoPay", icon: "💚" },
  { id: "ovo", name: "OVO", icon: "💜" },
  { id: "dana", name: "DANA", icon: "💙" },
];

export function MobileCheckout() {
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
      router.push("/store/order/ORD-12345");
    }
  };

  return (
    <div className="bg-background pb-32">
      {/* Progress */}
      <div className="flex border-b">
        {[
          { num: 1, label: "Alamat", icon: MapPin },
          { num: 2, label: "Kirim", icon: Truck },
          { num: 3, label: "Bayar", icon: CreditCard },
        ].map((s) => (
          <div
            key={s.num}
            className={`flex-1 flex flex-col items-center py-3 text-xs ${
              step === s.num
                ? "text-primary border-b-2 border-primary"
                : step > s.num
                ? "text-green-600"
                : "text-muted-foreground"
            }`}
          >
            {step > s.num ? (
              <Check className="h-5 w-5 mb-1" />
            ) : (
              <s.icon className="h-5 w-5 mb-1" />
            )}
            {s.label}
          </div>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {/* Step 1: Address */}
        {step === 1 && (
          <>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Nama Lengkap</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">No. HP (WhatsApp)</label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08123456789"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Kota</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kota..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Alamat Lengkap</label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Jl. Contoh No. 123"
                />
              </div>
            </div>
          </>
        )}

        {/* Step 2: Shipping */}
        {step === 2 && (
          <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
            <div className="space-y-2">
              {shippingOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-4 border rounded-xl ${
                    selectedShipping === opt.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={opt.id} />
                    <div>
                      <p className="font-medium text-sm">{opt.name}</p>
                      <p className="text-xs text-muted-foreground">{opt.estimate}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm">{formatPrice(opt.price)}</span>
                </label>
              ))}
            </div>
          </RadioGroup>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 p-4 border rounded-xl ${
                    selectedPayment === method.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem value={method.id} />
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-medium text-sm">{method.name}</span>
                </label>
              ))}
            </div>
          </RadioGroup>
        )}

        {/* Order Summary */}
        <div className="border rounded-xl p-4 mt-4">
          <button
            className="w-full flex items-center justify-between"
            onClick={() => {}}
          >
            <span className="font-medium">
              {cartItems.length} item
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-40">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-lg font-bold">{formatPrice(total)}</span>
        </div>
        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Kembali
            </Button>
          )}
          <Button onClick={handleNext} disabled={!canProceed()} className="flex-1">
            {step === 3 ? "Bayar" : "Lanjut"}
          </Button>
        </div>
      </div>
    </div>
  );
}
