import Head from "next/head";

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Domenebi</title>
        <meta name="description" content="Domenebi.ge try it out" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="main">
        <Header />
        <NavBar />
      </div>
    </>
  );
}
