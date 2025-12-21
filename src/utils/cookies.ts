// Utilidad para manejar cookies con encriptación básica usando Base64 + codificación

const ENCRYPTION_KEY = 'OpoReview2024SecretKey';

// Función para encriptar datos
const encrypt = (data: string): string => {
  try {
    // Añadir la key como salt y codificar en base64
    const salted = `${ENCRYPTION_KEY}:${data}`;
    const encoded = btoa(encodeURIComponent(salted));
    // Ofuscar más el resultado
    return encoded.split('').reverse().join('');
  } catch {
    return '';
  }
};

// Función para desencriptar datos
const decrypt = (encryptedData: string): string => {
  try {
    // Revertir la ofuscación
    const reversed = encryptedData.split('').reverse().join('');
    // Decodificar base64
    const decoded = decodeURIComponent(atob(reversed));
    // Remover el salt
    const parts = decoded.split(':');
    if (parts[0] === ENCRYPTION_KEY) {
      return parts.slice(1).join(':');
    }
    return '';
  } catch {
    return '';
  }
};

// Establecer una cookie encriptada
export const setCookie = (name: string, value: unknown, days: number = 7): void => {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  const encryptedValue = encrypt(stringValue);
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  document.cookie = `${name}=${encryptedValue};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

// Obtener y desencriptar una cookie
export const getCookie = <T = string>(name: string): T | null => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      const encryptedValue = cookie.substring(nameEQ.length);
      const decryptedValue = decrypt(encryptedValue);
      
      if (!decryptedValue) return null;
      
      try {
        return JSON.parse(decryptedValue) as T;
      } catch {
        return decryptedValue as unknown as T;
      }
    }
  }
  return null;
};

// Eliminar una cookie
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Verificar si existe una cookie
export const hasCookie = (name: string): boolean => {
  return getCookie(name) !== null;
};
