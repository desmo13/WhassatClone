import { ref, update } from "firebase/database";  // Asegúrate de importar 'ref'
import { database } from './firebaseConfig';  // Importa tu configuración de Firebase

const sendFriendRequest = (currentUser, targetUserId, currentUserEmail) => {
    // Usa backticks correctamente para interpolar el targetUserId
    const RefFriendRequest = ref(database, `users/${targetUserId}/friendRequests`);

    update(RefFriendRequest, {
        [currentUser]: {
            state: true,
            name: currentUserEmail,
        }
    })
        .then(() => {
            console.log(`Solicitud de amistad enviada a ${targetUserId}`);
        })
        .catch((error) => {
            console.error('Error al enviar la solicitud de amistad:', error);
        });
};

export default sendFriendRequest;
