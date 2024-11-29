import './globals.css';

interface Props {
  children: React.ReactNode;
}

export default async function GlobalLayout({ children }: Props) {
  return (
    <html>
      <body>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
