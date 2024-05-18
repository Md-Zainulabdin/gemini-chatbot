import { LucideLinkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="py-6 px-16 md:py-0">
      <div className="container w-full flex flex-col items-center justify-between gap-4 md:h-24 sm:flex-row">
        <p className="text-center text-md leading-loose text-muted-foreground md:text-left">
          Built with <span className="text-red-600">❤</span> by Zain-ul-Abdin
        </p>
        <div className="space-x-6 flex items-center">
          <Link href={"https://twitter.com/_md_zainulabdin"} target="_blank">
            <Twitter className="w-5 h-5 text-muted-foreground" />
          </Link>

          <Link
            href={"https://www.linkedin.com/in/m-zain-ul-abdin/"}
            target="_blank "
          >
            <LucideLinkedin className="w-5 h-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
