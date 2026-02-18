import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multimedia - Alessia Productions",
  description: "Photos and videos from the field.",
};

export default function MultimediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
