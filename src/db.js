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

const addMeetingToUser = async (user, meeting, callback) => {
    const userMeetingList = db.collection('user').doc(user.uid).collection('rooms');
    userMeetingList
        .add(meeting)
        .then(() => {
            console.log('you entered the room');
        })
        .catch(() => {
            console.log('failed to get into room');
        });
};

const addMessage = (message, meeting) => {
    const textMessage = db.collection('meeting').doc(meeting.uniqueName).collection('messages');
    textMessage
        .add(message)
        .then(() => {
            console.log('message sent successfully');
        })
        .catch(() => {
            console.log('failed');
        });
};
const getMessage = (meeting, callback) => {
    const getMsg = db.collection('meeting').doc(meeting.uniqueName).collection('messages').orderBy('timestamp', 'desc');
    getMsg.onSnapshot(querySnapshot => {
        let messages = [];
        querySnapshot.forEach(doc => {
            messages.push({ message: doc.data() });
        });

        callback(messages);
    });
};
const getUserFromRoom = (meeting, callback) => {
    const getParticipants = db.collection('meeting').doc(meeting.uniqueName).collection('participant');
    getParticipants.onSnapshot(querySnapshot => {
        let participantsList = [];
        querySnapshot.forEach(doc => {
            participantsList.push({ participant: doc.data() });
        });
        callback(participantsList);
    });
};
const getRoomOfUser = callback => {
    const roomOfUser = db.collection('user').collection('room');
    roomOfUser.onSnapshot(querySnapshot => {
        let joinedRooms = [];
        querySnapshot.forEach(doc => {
            joinedRooms.push({ room: doc.data() });
        });
        callback(joinedRooms);
    });
};
export { addUser, addMessage, getRoomOfUser, getUserFromRoom, getMessage, addMeetingToUser };
