export interface User {
    // Identificador único del usuario
    uid: string;
    // Correo electrónico del usuario
    email: string;
    // Nombre de usuario, opcional
    displayName?: string;
    // Indica si el correo electrónico del usuario está verificado, opcional
    emailVerified?: boolean;
    // Indica si el usuario es anónimo, opcional
    isAnonymous?: boolean;
    // Método para obtener el token de identificación del usuario, devuelve una promesa de string
    getIdToken: () => Promise<string>;
    // Método para obtener el resultado del token de identificación del usuario, devuelve una promesa de un objeto
    getIdTokenResult: () => Promise<{
        // Token de identificación
        token: string;
        // Tiempo de autenticación
        authTime: string;
        // Tiempo de expiración
        expirationTime: string;
        // Tiempo de emisión
        issuedAtTime: string;
        // Proveedor de inicio de sesión
        signInProvider: string;
        // Reclamaciones, un registro de strings a any
        claims: Record<string, any>;
        // Segundo factor de inicio de sesión, cualquier tipo
        signInSecondFactor: any;
    }>;
    // Método para eliminar el usuario, devuelve una promesa de void
    delete: () => Promise<void>;
    // Método para vincular una credencial al usuario, devuelve una promesa de User
    linkWithCredential: (credential: any) => Promise<User>;
    // Método para vincular un número de teléfono al usuario, devuelve una promesa de any
    linkWithPhoneNumber: (phoneNumber: string, applicationVerifier: any) => Promise<any>;
    // Método para vincular un proveedor de inicio de sesión con una ventana emergente, devuelve una promesa de User
    linkWithPopup: (provider: any) => Promise<User>;
    // Método para vincular un proveedor de inicio de sesión con una redirección, devuelve una promesa de void
    linkWithRedirect: (provider: any) => Promise<void>;
}
