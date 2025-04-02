"use client";

import Link from "next/link";
import { useLocale } from "@/app/store/locale";

type LinkProps = React.ComponentProps<typeof Link>;

export const LocalizedLink: React.FC<LinkProps> = ({
  href,
  children,
  ...props
}) => {
  const locale = useLocale();

  return (
    <Link href={`/${locale}${href}`} {...props}>
      {children}
    </Link>
  );
};
