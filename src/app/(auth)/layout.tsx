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
      <div className="absolute bottom-0 left-0 right-0 pb-6 px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:text-[#30C67B] dark:hover:text-[#30C67B] transition-colors"
          >
            Privacy Policy
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="/terms-and-conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:text-[#30C67B] dark:hover:text-[#30C67B] transition-colors"
          >
            Terms and Conditions
          </a>
        </div>
      </div>
    </div>
  );
}
