// components/CurrencyConverter.js
"use client"

import React, { useState } from 'react';
import { convertirMoneda } from '../services/api';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async (e) => {
    e.preventDefault();
    
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Por favor ingrese un monto válido');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Llamada al servicio que conecta con tu backend
      const data = await convertirMoneda(amount);
      
      // Asumiendo que tu backend devuelve estos datos
      setResult({
        montoOriginal: amount,
        montoConvertido: data.montoConvertido,
        tipoCambio: data.tipoCambio,
        fecha: data.fecha
      });
    } catch (err) {
      setError('Error al realizar la conversión. Por favor, intente nuevamente.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="text-xl font-bold text-center mb-6">
        Conversor USD a GTQ
      </div>
      
      <form onSubmit={handleConvert} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Monto en Dólares (USD)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ingrese el monto en USD"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            step="0.01"
            disabled={loading}
          />
        </div>

        <button 
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-medium 
            ${loading || !amount 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={loading || !amount}
        >
          {loading ? 'Convirtiendo...' : 'Convertir a Quetzales'}
        </button>

        {error && (
          <div className="p-3 text-red-500 bg-red-50 rounded-md text-sm">
            {error}
          </div>
        )}

        {result && !error && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="font-semibold text-lg mb-2 text-center">
              Resultado de la Conversión
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="font-medium">Monto USD:</div>
              <div className="text-right">${parseFloat(result.montoOriginal).toFixed(2)}</div>
              
              <div className="font-medium">Monto GTQ:</div>
              <div className="text-right">Q{result.montoConvertido}</div>
              
              <div className="font-medium">Tasa de cambio:</div>
              <div className="text-right">{result.tipoCambio}</div>
              
              <div className="font-medium">Fecha:</div>
              <div className="text-right">
                {new Date(result.fecha).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CurrencyConverter;