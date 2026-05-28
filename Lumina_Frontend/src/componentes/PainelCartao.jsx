function PainelCartao({ titulo, descricao, icone: Icone, cor, onClick }) {
    const CORES = {
        blue: {
            bg: "bg-blue-100",
            text: "text-blue-600",
            hoverShadow: "hover:shadow-blue-400/40",
            hoverBorder: "hover:border-blue-300",
        },
        green: {
            bg: "bg-green-100",
            text: "text-green-600",
            hoverShadow: "hover:shadow-green-400/40",
            hoverBorder: "hover:border-green-300",
        },
        purple: {
            bg: "bg-purple-100",
            text: "text-purple-600",
            hoverShadow: "hover:shadow-purple-400/40",
            hoverBorder: "hover:border-purple-300",
        },
        pink: {
            bg: "bg-pink-100",
            text: "text-pink-600",
            hoverShadow: "hover:shadow-pink-400/40",
            hoverBorder: "hover:border-pink-300",
        },
    };

    const estilo = CORES[cor];

    return (
        <div
            onClick={onClick}
            className={`group w-full p-6 rounded-2xl bg-white border border-border/40
                cursor-pointer transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl
                ${estilo.hoverShadow}
                ${estilo.hoverBorder}
                flex items-center gap-4`}
        >
            <div className={`p-3 rounded-xl ${estilo.bg}`}>
                <Icone className={`w-6 h-6 ${estilo.text}`} />
            </div>

            <div>
                <h2 className="text-lg font-medium mb-1 text-gray-700
                    group-hover:text-[var(--lumina-purple)] transition-colors">
                    {titulo}
                </h2>
                <p className="text-sm text-gray-500">
                    {descricao}
                </p>
            </div>
        </div>
    );
}

export default PainelCartao;