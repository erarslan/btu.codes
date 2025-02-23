import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between px-10 mt-2 max-w-5xl shadow-md mx-auto rounded-full text-btu_primary bg-gray-50 font-semibold text-lg">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={80} height={30} />
      </Link>

      <div className="flex items-center gap-4">
        {session && session.user ? (
          <>
            <Link href="/proje/ekle">
              <span>Projeni Ekle</span>
            </Link>

            <span className="text-secondary">•</span>

            <Link href={`/kullanici/${session.user.id}`}>
              <span>{session.user.name}</span>
            </Link>

            <span className="text-secondary">•</span>

            <button
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
