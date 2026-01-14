export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content="0; url=/en" />
      </head>
      <body>{children}</body>
    </html>
  )
}

