import Form from "./ui/Form";
import Logo from "./ui/Logo";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 sm:px-4 font-mono">
      <main className="flex flex-col gap-4 row-start-2 items-center max-w-3xl">
        <div className="flex items-center gap-4">
          <Logo />
          <h1>
            Ingrese un texto o un archivo de texto para analizar y verificar si
            es spam u ofensivo.
            <br />
            <b>
              Si envías tanto texto escrito como archivo se utilizará el
              archivo.
            </b>
          </h1>
        </div>
        <Form />
      </main>
    </div>
  );
}
