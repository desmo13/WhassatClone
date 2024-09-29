import { ref, onValue } from 'firebase/database';
import { database } from './firebaseConfig';

const listenForFriendRequests = (currentUser, callback) => {
    const RefFriendRequests = ref(database, `users/${currentUser}/friendRequests`);

    // Escuchar cambios en el nodo 'friendRequests' en tiempo real
    onValue(RefFriendRequests, (snapshot) => {
        const friendRequests = snapshot.val();
        let updatedChatData = [];

        if (friendRequests) {
            // Recorrer las solicitudes de amistad y agregar a updatedChatData
            for (let key in friendRequests) {
                if (friendRequests[key] === true) {
                    console.log('Friend request from:', friendRequests[key]);
                    updatedChatData.push({
                        id: key,
                        name: friendRequests[key].name || 'Amigo desconocid0',  // Ajusta si tienes el nombre en otro lugar
                        lastMessage: 'Solicitud de amistad recibida'
                    });
                }
            }
        }

        // Actualiza el estado solo una vez cuando se procesan los datos
        callback(updatedChatData);
    });
};

export default listenForFriendRequests;
