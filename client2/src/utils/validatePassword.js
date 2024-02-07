
export const validarContrasena = (contrasena) => {
    const resultados = {
        minCaracteres: contrasena.length >= 6,
        unaLetra: /[a-zA-Z]/.test(contrasena),
        unNumero: /\d/.test(contrasena)
        // La verificación de noConsecutivos se ha eliminado
    };

    return {
        esValida: Object.values(resultados).every(v => v),
        resultados
    };
};