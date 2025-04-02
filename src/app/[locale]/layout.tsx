import { Locales } from "@/types/products";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const availableLocalesMap = Object.fromEntries(
  Object.values(Locales).map((locale) => [locale, true])
);

export const metadata = {
  title: "Vapesooo - Premium Vape Products",
  description: "Discover our wide range of premium vape products",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: Locales };
}

export default async function RootLayout(props: RootLayoutProps) {
  const { children, params } = props;

  const { locale } = await params;

  // Validate locale
  if (!availableLocalesMap[locale]) {
    return notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
