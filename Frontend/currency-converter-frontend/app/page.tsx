'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { parseString } from 'xml2js';

const Home = () => {
  const [exchangeRate, setExchangeRate] = useState<{ fecha: string; referencia: string } | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExchangeRate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/exchange-rate/current');
      parseString(response.data.rate, (err, result) => {
        if (err) {
          setError('Error parsing XML');
          setIsLoading(false);
          return;
        }
        const data = result.InfoVariable.CambioDolar[0].VarDolar[0];
        setExchangeRate({
          fecha: data.fecha[0],
          referencia: data.referencia[0],
        });
        setTimestamp(response.data.timestamp);
      });
    } catch (err) {
      setError('Error fetching exchange rate');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 to-green-700 p-6">
      <img
        src="/images/logo banco.jpeg"
        alt="Logo Banco de Guatemala"
        className="w-52 h-52 mb-4 transform transition duration-300 hover:scale-110 hover:shadow-2xl rounded-full hover:bg-blue-200 p-2"
      />
      <h1 className="text-white text-4xl font-bold mb-2">Brandon José Nájera Quiñonez 0905-21-607</h1>
      <h2 className="text-white text-2xl mb-6">Consulta del Tipo de Cambio</h2>
      {error && <p className="text-red-500">{error}</p>}
      {exchangeRate ? (
        <div className="bg-white shadow-xl rounded-lg p-6 text-center w-full max-w-md transition duration-300 transform hover:scale-105 hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Información del Tipo de Cambio</h3>
          <p className="text-gray-700 text-lg mt-4">
            <span className="font-bold text-xl">Fecha:</span> <span className="text-2xl">{exchangeRate.fecha}</span>
          </p>
          <p className="text-gray-800 text-lg mt-2">
            <span className="font-bold text-xl">Referencia:</span> <span className="text-2xl">{exchangeRate.referencia}</span>
          </p>
          <p className="text-gray-800 text-lg mt-2">
            <span className="font-bold text-xl">Fecha y Hora de la Consulta:</span> <span className="text-2xl">{new Date(timestamp!).toLocaleString()}</span>
          </p>
          <button
            onClick={fetchExchangeRate}
            className={`mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 transform hover:bg-blue-700 hover:scale-105 flex items-center justify-center ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-t-2 border-white rounded-full animate-spin"></div>
            ) : (
              'Actualizar Consulta'
            )}
          </button>
        </div>
      ) : (
        <p className="text-white">Cargando...</p>
      )}
    </div>
  );
};

export default Home;
