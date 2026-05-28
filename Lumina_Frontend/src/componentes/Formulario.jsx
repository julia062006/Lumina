function Formulario({ titulo, onSubmit, children }) {
  return (
    <div className="flex justify-center  py-10">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6 text-center">
          {titulo}
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {children}
        </form>

      </div>
    </div>
  );
}

export default Formulario;