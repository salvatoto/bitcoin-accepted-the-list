import "../app/globals.css";
import { useContext } from "react";
import { Inter } from "next/font/google";
import Meta from "./meta";
import Footer from "./footer";
import Alert from "./alert";
import { AlertContext } from "@/contexts/AlertContext";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  const { alertMessage } = useContext(AlertContext);
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert alertMessage={alertMessage} />
        <main className={inter.className}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
