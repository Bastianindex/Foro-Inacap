// Esta interfaz define la estructura de un post en la aplicación.
// Las propiedades son:
// - id?: string; Identificador único del post, opcional.
// - title: string; Título del post.
// - content: string; Contenido principal del post.
// - detail: string; Detalles adicionales del post.
// - userId: string; Identificador único del usuario que creó el post.
// - username: string; Nombre de usuario del usuario que creó el post.
// - timestamp: number; Marca de tiempo del post, representando el momento de su creación.
export interface Post {
    id?: string;
    title: string;
    content: string;
    detail: string;
    userId: string;
    username: string;
    timestamp: number;
    profilePicture?: string;
    // Aquí se pueden agregar más propiedades según las necesidades específicas de los posts.
}
