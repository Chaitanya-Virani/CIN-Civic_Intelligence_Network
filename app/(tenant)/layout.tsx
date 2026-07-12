import { LanguageProvider } from "@/context/LanguageContext";

export default function TenantGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
}
