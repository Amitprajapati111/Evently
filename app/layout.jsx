import "./globals.css";

export const metadata = {
  title: "Evently | Post an event requirement",
  description: "Tell Evently what your event needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
