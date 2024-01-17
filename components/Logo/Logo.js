import Link from "next/link";
import logo from "@/public/images/eaglecollectionslogowhite.png";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/orders/page/1">
      <Image
        src={logo}
        alt="eagle collections logo"
        width="160"
        className=""
        priority
      />
    </Link>
  );
}
