import Link from "next/link";
import { Github, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 mb-6">
      <div className="max-w-[490px] mx-auto max-sm:max-w-[235px] ">
        <div className="flex items-center justify-center gap-3 py-2 rounded-full backdrop-blur-md bg-white/70 border border-gray-200/20 shadow-lg transition-all duration-300 hover:bg-white/80 text-btu_primary">
          <span className="text-xs sm:text-sm font-semibold">
            © {currentYear} BTÜ Galeri
          </span>

          <div className="h-8 w-[1.5px] bg-gradient-to-b from-transparent via-btu_primary/60 to-transparent rounded-full animate-pulse max-sm:hidden"></div>

          <div className="flex items-center gap-1 text-xs sm:text-sm font-medium max-sm:hidden">
            <Link
              href="https://github.com/erarslan"
              target="_blank"
              className="hover:underline font-semibold"
            >
              @erarslan
            </Link>
            tarafından
            <Heart
              size={14}
              className="text-red-500 animate-pulse"
              fill="currentColor"
            />
            ile yapıldı.
          </div>

          <div className="h-8 w-[1.5px] bg-gradient-to-b from-transparent via-btu_primary/60 to-transparent rounded-full animate-pulse"></div>

          <Link
            href="https://github.com/btu-gallery"
            target="_blank"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/50 transition-all duration-500 ease-in-out hover:scale-125"
            aria-label="GitHub"
          >
            <Github size={22} className="text-btu_primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
