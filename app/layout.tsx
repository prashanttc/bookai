import SessionProvider from "@/providers/SessionProvider";
import ".././styles/globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
export const metadata = {
  title: "My App",
  description: "A modern Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <SessionProvider>
        <ReactQueryProvider>
          <body>
            <div className="w-screen min-h-screen">
              <main className="flex-1 z-40">{children}</main>
            </div>
          </body>
        </ReactQueryProvider>
      </SessionProvider>
    </html>
  );
}
