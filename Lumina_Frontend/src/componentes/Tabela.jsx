function Tabela({ colunas, dados, renderLinha, renderAcoes }) {
    return (
        <table className="w-full border text-sm">
            <thead className="bg-gray-100 text-left">
                <tr>
                    {colunas.map(col => (
                        <th key={col} className="px-4 py-2">{col}</th>
                    ))}
                    {renderAcoes && <th className="px-4 py-2 text-center">Ações</th>}
                </tr>
            </thead>

            <tbody>
                {dados.map((item, index) => (
                    <tr key={index} className="border-t">
                        {renderLinha(item)}

                        {renderAcoes && (
                            <td className="px-4 py-2">
                                <div className="flex justify-center gap-2">
                                    {renderAcoes(item)}
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabela;