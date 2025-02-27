import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-8 py-1.5 max-w-5xl mx-auto rounded-full text-btu_primary font-semibold text-lg backdrop-blur-md bg-white/70 border border-gray-200/20 shadow-lg transition-all duration-300 hover:bg-white/80">
      <Link
        href="/"
        className="transition-all duration-300 hover:opacity-80 mr-4"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={60}
          height={60}
          className="relative z-10 [filter:brightness(0)_saturate(100%)_invert(19%)_sepia(40%)_saturate(1642%)_hue-rotate(187deg)_brightness(94%)_contrast(93%)]"
        />
      </Link>

      <div className="flex items-center">
        {session && session.user ? (
          <>
            <Link href="/proje/ekle" className="nav-link">
              <span>Proje Ekle</span>
            </Link>

            <span className="text-btu_secondary/50">•</span>

            <Link href={`/kullanici/${session.id}`} className="nav-link">
              <span>{session.user.name}</span>
            </Link>

            <span className="text-btu_secondary/50">•</span>

            <button
              className="nav-button"
              onClick={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <button
            className="nav-button"
            onClick={async () => {
              "use server";
              await signIn("github");
            }}
          >
            Giriş Yap
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
