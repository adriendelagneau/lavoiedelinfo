import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div>
  <Navigation />
      <div className="max-w-screen-xl mx-3 sm:mx-8 2xl:mx-auto">
        {children}
      <Footer />
      </div>
    </div>

  );
}
