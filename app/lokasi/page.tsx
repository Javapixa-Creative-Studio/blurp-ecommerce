"use client";

import { useIsDesktop } from "@/src/hooks";
import { StorefrontLayout } from "@/src/components/storefront-layout";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { stores } from "@/src/data/stores";

function LokasiContent() {
  const isDesktop = useIsDesktop();

  return (
    <div className={isDesktop ? "container mx-auto px-6 py-12" : "px-4 py-8"}>
      <div className={`text-center ${isDesktop ? "mb-12" : "mb-6"}`}>
        <h1 className={`font-bold ${isDesktop ? "text-4xl" : "text-2xl"} mb-4`}>
          Lokasi Toko
        </h1>
        <p className="text-muted-foreground">
          Kunjungi toko kami atau hubungi untuk informasi lebih lanjut
        </p>
      </div>

      <div className={`grid ${isDesktop ? "grid-cols-3" : "grid-cols-1"} gap-6`}>
        {stores.map((store) => (
          <Card key={store.id} className={store.isPrimary ? "border-primary" : ""}>
            <CardContent className="p-6">
              {store.isPrimary && (
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded mb-3">
                  Toko Utama
                </span>
              )}
              <h2 className="font-semibold text-lg mb-4">{store.name}</h2>

              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p>{store.address}</p>
                    <p className="text-muted-foreground">{store.city}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p>{store.hours}</p>
                </div>

                <div className="flex gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p>{store.phone}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(`https://wa.me/${store.whatsapp.replace(/\D/g, '')}`, '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(store.address + ', ' + store.city)}`, '_blank')}
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className={`mt-8 aspect-video bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground ${isDesktop ? "max-h-[400px]" : ""}`}>
        Google Maps Embed
      </div>
    </div>
  );
}

export default function LokasiPage() {
  return (
    <StorefrontLayout>
      <LokasiContent />
    </StorefrontLayout>
  );
}
