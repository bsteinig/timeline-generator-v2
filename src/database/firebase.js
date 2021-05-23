import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import 'firebase/app'
import "firebase/firestore"
import { firebaseConfig } from './firebaseConfig'

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = (setUser) => {
  auth.signInWithPopup(googleProvider).then((res) => {
    const { displayName, email, uid, photoURL } = res.user;
    let user = {
      displayName, email, uid, photoURL
    }
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user))
    let log = {userId: user.uid, action: 'Login', title: '', text: ''}
    logUserActivity(log)
    setUser("logged in");
  }).catch((error) => {
    console.log(error.message)
  })
}

export const getUser = () => {
  auth.onAuthStateChanged(async userData => {
    const { displayName, email, uid, photoURL } = userData;
    let user = {
      displayName, email, uid, photoURL
    }
    return user;
  })
  // if(auth.currentUser){
    
  // }else{
  //   return null;
  // }
}

export const logOut = (setuser) => {
  auth.signOut().then(()=> {
    localStorage.setItem("user", null)
    setuser("not logged in");
  }).catch((error) => {
    console.log(error.message)
  })
}

export const writeUserData = (data) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/")
  let newTimeline = ref.child(`timelines/${data.user}`).push();
  newTimeline.set(data)
  console.log(data);
}

export const getUserData = (user, callback) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/");
  let timelines = ref.child(`timelines/${user.uid}`);
  timelines.on('value', (snapshot) => {
    callback(snapshot.val());
  })
};

export const getImportData = (user, timeline, callback) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/");
  let timelines = ref.child(`timelines/${user}/${timeline}`);
  timelines.on('value', (snapshot) => {
    callback(snapshot.val());
  })
};

export const removeUserData = (user, timeline) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/");
  let timelines = ref.child(`timelines/${user.uid}/${timeline}`);
  timelines.remove()
};

export const logUserActivity = (data) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/");
  data.time =  firebase.database.ServerValue.TIMESTAMP;
  ref.child("logs").get().then((snapshot) => {
    if (snapshot.exists()) {
      let arr = snapshot.val();
      arr.push(data)
      let newLog = ref.child(`logs`)
      newLog.set(arr)
    } else {
      let arr = [data]
      let newLog = ref.child(`logs`)
      newLog.set(arr)
    }
  }).catch((error) => {
    console.error(error);
  });
}

export const fetchUserLogs = (callback) => {
  var defaultDatabase = firebase.database();
  let ref = defaultDatabase.ref("/");
  let logs = ref.child('logs')
  logs.on('value', (snapshot) => {
    callback(snapshot.val())
  })
}