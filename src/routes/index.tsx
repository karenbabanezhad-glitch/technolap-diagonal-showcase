import { createFileRoute } from "@tanstack/react-router";
import { TechnolapPage } from "@/components/technolap-page";

const title = "تکنولپ | مرکز تخصصی تعمیرات و پخش قطعات لپ‌تاپ";
const description =
  "تکنولپ؛ تعمیر تخصصی لپ‌تاپ، عیب‌یابی، سرویس و پخش قطعات لپ‌تاپ در کرج، جهانشهر.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TechnolapPage,
});
