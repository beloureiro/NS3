import React from 'react';
import { Link } from 'react-router-dom';

const IndependentWidthPage = () => {
  // Dados de exemplo para a tabela
  const tableData = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
    { id: 3, name: 'Item 3', value: 300 },
  ];

  return (
    <div className="w-full bg-gray-900 min-h-screen p-6">
      {/* Cabeçalho da página */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-green-400 mb-2">Página com Largura Independente</h1>
        <p className="text-gray-300">Esta página demonstra elementos com largura total.</p>
      </header>

      {/* Seção principal com grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna da esquerda */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Informações</h2>
          <p className="text-gray-300 mb-4">
            Esta seção utiliza a largura total disponível. Em telas maiores, ela ocupará metade da largura da página.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded transition duration-300">
            Ação Principal
          </button>
        </section>

        {/* Coluna da direita */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Dados de Exemplo</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-green-400">ID</th>
                <th className="py-2 text-green-400">Nome</th>
                <th className="py-2 text-green-400">Valor</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="py-2 text-gray-300">{item.id}</td>
                  <td className="py-2 text-gray-300">{item.name}</td>
                  <td className="py-2 text-gray-300">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

      {/* Barra inferior com link de retorno */}
      <footer className="mt-8 text-center">
        <Link to="/" className="text-green-400 hover:text-green-300 transition duration-300">
          Voltar para a página inicial
        </Link>
      </footer>
    </div>
  );
};

export default IndependentWidthPage;