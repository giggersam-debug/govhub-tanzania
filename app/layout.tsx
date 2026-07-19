import "./globals.css";

export const metadata = {
  title: "GovHub Tanzania — Rasmi. Every official form, one place.",
  description:
    "Search, understand, and download official Tanzanian government forms — with clear requirements, fees, and where to submit them.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
