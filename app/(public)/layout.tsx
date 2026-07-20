import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SplashScreen from "@/components/SplashScreen";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <SplashScreen>
      <div className="min-h-screen bg-sage flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </SplashScreen>
  );
}
