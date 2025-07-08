import { languages, getT } from "@/lib/i18n";
import { Test } from "../test";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function Home({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: 'en' | 'es'; }>;
}>) {
  const lng = (await params).lng;
  const {t} = await getT(lng, "home")

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>{t("title")} from server</h1>
      <Test />
    </div>
  );
}
