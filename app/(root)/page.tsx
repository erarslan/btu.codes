import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="animate-gradient-flow bg-gradient-to-r from-btu_primary via-btu_secondary to-btu_primary p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center">
          Projeni ekle, üniversitedeki ekip arkadaşını bul!
        </h1>
      </div>
    </div>
  );
}
