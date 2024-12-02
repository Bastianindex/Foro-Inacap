// Esta interfaz define la estructura de un objeto Post, que incluye las siguientes propiedades:
// - id: Un identificador único del post, que puede ser un string o null.
// - title: El título del post, que es un string.
// - content: El contenido principal del post, que es un string.
// - detail: Los detalles adicionales del post, que es un string.
// - Se deja espacio para agregar cualquier otra propiedad adicional que se necesite en el futuro.
export interface Post {
  id?: string | null;
  title: string;
  content: string;
  detail: string;
  // Añade aquí cualquier otra propiedad que necesites
}
