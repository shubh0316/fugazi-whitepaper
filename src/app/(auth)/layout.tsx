import { Logo } from "@/components/logo";
import Link from "next/link";
import  logo  from "@/assets/logo.png";
import Image from "next/image";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col px-6 py-12 relative">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs mx-auto">
        <div className="flex justify-center">
          <Image src={logo} alt="logo" width={100} height={100} />
          {/* <Link href="/" aria-label="Compass">
            <Logo className="h-6 fill-gray-950 dark:fill-white" />
          </Link> */}
    
        </div>
        <div className="mt-10 w-full">{children}</div>
      </div>
    
    </div>
  );
}
