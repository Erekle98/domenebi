import Head from "next/head";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Domenebi</title>
        <meta name="description" content="Domenebi.ge try it out" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="main container">
        <Header />
      </div>
    </>
  );
}
