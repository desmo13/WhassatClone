const listenForFriendRequests = (currentUser, callback) => {
    const RefFriendRequests = ref(database, `users/${currentUser}/friendRequests`);

    onValue(RefFriendRequests, (snapshot) => {
        const friendRequests = snapshot.val();
        
        console.log('Friend requests:', friendRequests);
        callback(friendRequests);
    })
    .catch((error) => { 
        console.error('Error al escuchar solicitudes de amistad:', error);  
        callback(null); 
    });
};

export default listenForFriendRequests;