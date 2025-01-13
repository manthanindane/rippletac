import type { Metadata } from "next";
import { DM_Sans } from 'next/font/google'
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google'


const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})


const clientId = process.env.GOOGLE_CLIENT_ID

if (!clientId) {
  console.error('Google Client ID is not defined in environment variables')
}

export const metadata: Metadata = {
  title: "RippleTac",
  description: "Email Automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={clientId || ''}>
      <body
        className={dmSans.className}
      >
        {children}
      </body>
      </GoogleOAuthProvider>
    </html>
  );
}
