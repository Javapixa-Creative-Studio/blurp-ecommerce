"use client";

import { useIsDesktop } from "@/src/hooks";
import { StorefrontLayout } from "@/src/components/storefront-layout";
import { Separator } from "@/src/components/ui/separator";

const values = [
  {
    title: "Kualitas",
    description: "Setiap produk dipilih dengan teliti untuk memastikan kualitas terbaik bagi pelanggan kami.",
  },
  {
    title: "Keberlanjutan",
    description: "Kami berkomitmen pada praktik bisnis yang ramah lingkungan dan berkelanjutan.",
  },
  {
    title: "Pelayanan",
    description: "Kepuasan pelanggan adalah prioritas utama kami. Tim kami siap membantu Anda.",
  },
];

function AboutContent() {
  const isDesktop = useIsDesktop();

  return (
    <div className={isDesktop ? "container mx-auto px-6 py-12" : "px-4 py-8"}>
      {/* Hero */}
      <div className={`text-center ${isDesktop ? "max-w-2xl mx-auto mb-16" : "mb-8"}`}>
        <h1 className={`font-bold ${isDesktop ? "text-4xl" : "text-2xl"} mb-4`}>
          Tentang SoraStore
        </h1>
        <p className="text-muted-foreground">
          SoraStore adalah destinasi belanja online terpercaya untuk produk berkualitas tinggi.
          Didirikan dengan visi untuk memberikan pengalaman belanja yang mudah, cepat, dan menyenangkan.
        </p>
      </div>

      {/* Story */}
      <div className={`${isDesktop ? "grid grid-cols-2 gap-12 items-center mb-16" : "mb-8"}`}>
        <div className={`aspect-video bg-secondary rounded-2xl flex items-center justify-center text-muted-foreground ${!isDesktop && "mb-6"}`}>
          Gambar Toko
        </div>
        <div>
          <h2 className={`font-semibold ${isDesktop ? "text-2xl" : "text-xl"} mb-4`}>
            Cerita Kami
          </h2>
          <p className="text-muted-foreground mb-4">
            Berawal dari kecintaan pada produk berkualitas dan keinginan untuk berbagi dengan lebih banyak orang,
            SoraStore lahir di Jakarta pada tahun 2020.
          </p>
          <p className="text-muted-foreground">
            Kini, kami telah melayani ribuan pelanggan di seluruh Indonesia dengan berbagai produk pilihan
            mulai dari fashion, kecantikan, hingga aksesoris lifestyle.
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Values */}
      <div className={isDesktop ? "mb-16" : "mb-8"}>
        <h2 className={`font-semibold ${isDesktop ? "text-2xl" : "text-xl"} mb-6 text-center`}>
          Nilai-Nilai Kami
        </h2>
        <div className={`grid ${isDesktop ? "grid-cols-3" : "grid-cols-1"} gap-6`}>
          {values.map((value, i) => (
            <div key={i} className="text-center p-6 bg-secondary/30 rounded-2xl">
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className={`grid ${isDesktop ? "grid-cols-4" : "grid-cols-2"} gap-4 text-center`}>
        {[
          { number: "10,000+", label: "Pelanggan Puas" },
          { number: "500+", label: "Produk" },
          { number: "3", label: "Toko Fisik" },
          { number: "34", label: "Provinsi Terjangkau" },
        ].map((stat, i) => (
          <div key={i} className="p-4">
            <p className={`font-bold ${isDesktop ? "text-3xl" : "text-2xl"} text-primary`}>
              {stat.number}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <StorefrontLayout>
      <AboutContent />
    </StorefrontLayout>
  );
}
