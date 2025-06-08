import type { Metadata } from "next";
import { cn } from "~/lib/tailwind";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "React Building Blocks"
  },
  description:
    "A collection of simple, reusable, and effective React components."
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn("min-h-screen bg-white")}>
      <main className="mx-auto grid max-w-xl grid-cols-1 justify-items-center gap-12 px-4 md:max-w-2xl md:gap-28 md:py-32 lg:max-w-3xl xl:max-w-4xl">
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
