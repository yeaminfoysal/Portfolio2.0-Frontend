import Navbar from "@/components/shared/Navbar";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="min-h-dvh">{children}</main>
        </>
    );
}
