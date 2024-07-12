import BottomNav from "@/components/BottomNav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section>
      {children}
      <BottomNav />
    </section>
  );
}
