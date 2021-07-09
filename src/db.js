import { db, auth } from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

//addUser-
//addRoom-
//addMeetingToUser-
//addUserToMeeting-
//addMessage-
//getMessage-
//getUserFromRoom-
//GetRoomOfUser-
//getRoom
const addRoom = room => {
    return db.collection('meeting').doc(room.roomId).set({
        room,
        CreatedAt: firebase.firestore.Timestamp.now()
    });
};

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

const addUserToMeeting = (user, roomId) => {
    return db.collection('meeting').doc(roomId).collection('participant').doc(user.uid).set({ ...user });
};

const addMeetingToUser = async (userId, room) => {
    console.log(room);
    return db.collection('user').doc(userId).collection('room').doc(room.roomId).set({ ...room });
};

const addMessage = (roomId, message) => {
    const textMessage = db.collection('meeting').doc(roomId).collection('messages');
    textMessage.add(message);
};
const getMessage = (roomId, callback) => {
    const getMsg = db.collection('meeting').doc(roomId).collection('messages').orderBy('sentAt', 'desc');
    getMsg.onSnapshot(callback);
};
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
const getRoomOfUser = (userId, callback) => {
    const roomOfUser = db.collection('user').doc(userId).collection('room');
    roomOfUser.onSnapshot(callback);
};

const fetchRoom = roomId => {
    const ref = db.collection('meeting').doc(roomId);
    return ref.get();
};
const fetchParticipants = (roomId, callback) => {
    const ref = db.collection('meeting').doc(roomId).collection('participant');
    ref.onSnapshot(callback);
};
export { addRoom, fetchParticipants, addUser, addUserToMeeting, addMessage, getRoomOfUser, fetchRoom, getUserFromRoom, getMessage, addMeetingToUser };
