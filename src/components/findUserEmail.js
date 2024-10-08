import { onValue, ref } from 'firebase/database';

import { database } from './firebaseConfig';
const findUserEmail = (email,callback) => {
    usersRef = ref(database,"users");
    let foundUser = null;
    onValue(usersRef, (snapshot) => {
        const user = snapshot.val();
            for (let key in user) {
                if (user[key].email === email) {
                    foundUser = key;
                    
                    break;
                }
            }

        if (foundUser) {
            
            callback(foundUser);
        }   
        if (!foundUser) {
            console.log("No user found with email: " + email);
            callback(null);
        }
        
    });

};

export default findUserEmail;