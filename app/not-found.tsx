import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-btu_primary to-btu_secondary/30">
      <div className="text-center space-y-8 p-8 rounded-2xl bg-white/10 backdrop-blur-lg">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white/90">
            Sayfa Bulunamadı
          </h2>
          <p className="text-white/70 max-w-md">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-105"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
