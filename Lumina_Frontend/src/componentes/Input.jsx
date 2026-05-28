function Input({ label, error, register, name, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>

      <input
        {...register(name)}
        {...props}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && (
        <p className="text-red-500">{error.message}</p>
      )}
    </div>
  );
}

export default Input;