export default function MainLayout({
    children,
    modal,
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <main className="relative">
            {children}
            {modal}
        </main>
    )
}
