import { db } from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

/**
 * add a room 
 * @param {room} room 
 * @returns room
 */
const addRoom = room => {
    return db.collection('meeting').doc(room.roomId).set({
        room,
        CreatedAt: firebase.firestore.Timestamp.now()
    });
};

/**
 * add a user
 * @param {user} user 
 */

const addUser = async user => {
    console.log(user.displayName);
    db
        .collection('user')
        .doc(user.uid)
        .set({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        })
        .then(() => {
            console.log('user added successfully');
        })
        .catch(() => {
            console.log('signup failed');
        });
};

/**
 * adds the user to the room with the roomId provided in params
 * @param {user} user 
 * @param {roomId} roomId 
 * @returns 
 */
const addUserToMeeting = (user, roomId) => {
    return db.collection('meeting').doc(roomId).collection('participant').doc(user.uid).set({ ...user });
};

/**
 * adds a user to the given room (join room)
 * @param {userId} userId 
 * @param {room} room 
 * @returns 
 */

const addMeetingToUser = async (userId, room) => {
    console.log(room);
    return db.collection('user').doc(userId).collection('room').doc(room.roomId).set({ ...room });
};

/**
 * add a message sent by participant to the given room id
 * @param {roomId} roomId 
 * @param {message} message 
 */

const addMessage = (roomId, message) => {
    const textMessage = db.collection('meeting').doc(roomId).collection('messages');
    textMessage.add(message);
};

/**
 * get all the messages of a given room 
 * @param {roomId} roomId 
 * @param {function} callback 
 */
const getMessage = (roomId, callback) => {
    const getMsg = db.collection('meeting').doc(roomId).collection('messages').orderBy('sentAt', 'desc');
    getMsg.onSnapshot(callback);
};

/**
 * get all the participants of a given room
 * @param {meeting} meeting 
 * @param {function} callback 
 */
const getUserFromRoom = (meeting, callback) => {
    const getParticipants = db.collection('meeting').doc(meeting.roomId).collection('participant');
    getParticipants.onSnapshot(querySnapshot => {
        let participantsList = [];
        querySnapshot.forEach(doc => {
            participantsList.push({ participant: doc.data() });
        });
        callback(participantsList);
    });
};

/**
 * get all the rooms that the given user has joined/created
 * @param {userId} userId 
 * @param {function} callback 
 */
const getRoomOfUser = (userId, callback) => {
    const roomOfUser = db.collection('user').doc(userId).collection('room');
    roomOfUser.onSnapshot(callback);
};
/**
 * check whether a room with given Id exists or not
 * @param {roomId} roomId 
 * @returns refernce of a room
 */

const fetchRoom = roomId => {
    const ref = db.collection('meeting').doc(roomId);
    return ref.get();
};

/**
 * check whether a user with given Id exists or not
 * @param {userId} userId 
 * @returns reference of a participant
 */
const getParticipant = userId => {
    const ref = db.collection('user').doc(userId);
    return ref.get();
};

/**
 * get list of participants of a room
 * @param {roomId} roomId 
 * @param {function} callback 
 */
const fetchParticipants = (roomId, callback) => {
    const ref = db.collection('meeting').doc(roomId).collection('participant');
    ref.onSnapshot(callback);
};
export { addRoom, fetchParticipants, getParticipant, addUser, addUserToMeeting, addMessage, getRoomOfUser, fetchRoom, getUserFromRoom, getMessage, addMeetingToUser };
