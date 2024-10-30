/ services/api.js

// Configura la URL base de tu API de Spring Boot
const API_URL = 'http://localhost:8080'; // Ajusta el puerto según tu configuración

export const convertirMoneda = async (monto) => {
  try {
    // Esta URL debe coincidir con tu endpoint en Spring Boot
    const response = await fetch(`${API_URL}/api/tipocambio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ monto: parseFloat(monto) })
    });

    if (!response.ok) {
      throw new Error('Error en la conversión');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al llamar al API:', error);
    throw error;
  }
};