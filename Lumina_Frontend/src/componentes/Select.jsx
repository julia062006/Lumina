function Select({ label, options = [], ...props }) {
    return (
        <div className="flex flex-col gap-1 mb-3">
            {label && <label className="text-sm font-medium">{label}</label>}
            <select
                className="border rounded px-3 py-2"
                {...props}
            >
                <option value="">Selecione...</option>
                {options.map(op => (
                    <option key={op.value} value={op.value}>
                        {op.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;  