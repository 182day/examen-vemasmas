export const hashearTexto = async (texto: string): Promise<string> => {
  const encoder = new TextEncoder();
  const datos = encoder.encode(texto);
  const hashBuffer = await crypto.subtle.digest('SHA-256', datos);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};