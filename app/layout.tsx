
export const metadata = {
  title: "Anahori Simon",
  description: "Portfolio and link-in-bio landing"
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
