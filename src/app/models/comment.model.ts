// Este código define la interfaz de un comentario en la aplicación
export interface Comment {
  id?: string; // Identificador único del comentario
  userId: string; // Identificador único del usuario que realizó el comentario
  username: string; // Nombre de usuario del usuario que realizó el comentario
  profilePicture: string; // URL de la imagen de perfil del usuario que realizó el comentario
  text: string; // Texto del comentario
  timestamp: number; // Marca de tiempo del comentario
  upvotes: number; // Número de votos positivos del comentario
  downvotes: number; // Número de votos negativos del comentario
  isEditing?: boolean; // Indica si el comentario está en modo de edición
  newText?: string; // Texto del comentario después de la edición
}
