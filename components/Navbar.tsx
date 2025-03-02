import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { PlusCircle, User, LogOut, LogIn } from "lucide-react";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-3 sm:px-6 py-2 sm:py-1.5 w-auto max-w-xl mx-auto rounded-full text-btu_primary font-semibold text-base backdrop-blur-md bg-white/70 border border-gray-200/20 shadow-lg transition-all duration-300 hover:bg-white/80">
      <Link
        href="/"
        className="transition-all duration-300 hover:opacity-80 mr-3 sm:mr-3 min-w-[45px] sm:min-w-[50px] flex items-center justify-center"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={60}
          height={60}
          className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] relative z-10 [filter:brightness(0)_saturate(100%)_invert(19%)_sepia(40%)_saturate(1642%)_hue-rotate(187deg)_brightness(94%)_contrast(93%)]"
        />
      </Link>

      <div className="flex items-center gap-3 sm:gap-4">
        {session && session.user ? (
          <>
            <Link
              href="/proje/ekle"
              className="nav-link flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:justify-start gap-1.5 whitespace-nowrap rounded-full hover:bg-white/50 p-2 sm:p-2"
              title="Proje Ekle"
            >
              <PlusCircle size={22} className="sm:size-[18px]" />
              <span className="hidden sm:inline">Proje Ekle</span>
            </Link>

            <Link
              href={`/kullanici/${session.id}`}
              className="nav-link flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:justify-start gap-1.5 whitespace-nowrap rounded-full hover:bg-white/50 p-2 sm:p-2"
              title={session.user.name || "Profil"}
            >
              <User size={22} className="sm:size-[18px]" />
              <span className="hidden sm:inline truncate max-w-[80px]">
                {session.user.name}
              </span>
            </Link>

            <button
              className="nav-button flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:justify-start gap-1.5 whitespace-nowrap rounded-full hover:bg-white/50 p-2 sm:p-2"
              onClick={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              title="Çıkış Yap"
            >
              <LogOut size={22} className="sm:size-[18px]" />
              <span className="hidden sm:inline">Çıkış Yap</span>
            </button>
          </>
        ) : (
          <button
            className="nav-button flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto sm:justify-start gap-1.5 whitespace-nowrap rounded-full hover:bg-white/50 p-2 sm:p-2"
            onClick={async () => {
              "use server";
              await signIn("github");
            }}
            title="Giriş Yap"
          >
            <LogIn size={22} className="sm:size-[18px]" />
            <span className="hidden sm:inline">Giriş Yap</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
