"use client";

import Link from "next/link";
import { useLocale } from "@/app/store/locale";
import { getLocalizedPath } from "@/lib/localePath";

type LinkProps = React.ComponentProps<typeof Link>;

export const LocalizedLink: React.FC<LinkProps> = ({
  href,
  children,
  ...props
}) => {
  const locale = useLocale();
  const localizedHref =
    typeof href === "string" && href.startsWith("/")
      ? getLocalizedPath(locale, href)
      : href;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
};
