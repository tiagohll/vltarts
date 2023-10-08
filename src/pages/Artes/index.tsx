import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getDatabase, onValue, ref } from "firebase/database";

type Artes = [
  {
    id: number;
    name: string;
    url: string;
  }
];

export function Artes() {
  const [data, setData] = useState<Artes>();
  const [data2, setData2] = useState<Artes>();

  useEffect(() => {
    document.title = "Artes - VLT Art's"
    onValue(ref(getDatabase(), "artes/logos"), (snapshot) => {
      setData(snapshot.val());
    });
    onValue(ref(getDatabase(), "artes/thumbs"), (snapshot) => {
      setData2(snapshot.val());
    });
  }, []);

  return (
    <>
      <Header />
      <h1 className="text-center font-semibold text-xl my-4">
        Você está na página Artes
      </h1>
      <section className="container flex flex-col items-center">
        <h1 className="font-medium text-lg">Logos</h1>
        <div className="flex flex-wrap gap-1">
          {data?.map((logos) => (
            <div key={logos.id} className="bg-zinc-700 rounded p-1">
              <img
                className="rounded"
                width={200}
                src={logos.url}
                alt={logos.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="container flex flex-col items-center">
        <h1 className="font-medium text-lg">Thumbnails</h1>
        <div className="flex flex-wrap gap-1">
          {data2?.map((thumbs) => (
            <div key={thumbs.id} className="bg-zinc-700 rounded p-1">
              <img
                className="rounded"
                width={400}
                height={250}
                src={thumbs.url}
                alt={thumbs.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
