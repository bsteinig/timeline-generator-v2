import firebase from 'firebase';
import "firebase/auth";
import "firebase/database";
import 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA3NI2u876SiZCai-2SVxYy364ppXMI_c8",
  authDomain: "timeline-app-af58e.firebaseapp.com",
  databaseURL: "https://timeline-app-af58e-default-rtdb.firebaseio.com/",
  projectId: "timeline-app-af58e",
  storageBucket: "timeline-app-af58e.appspot.com",
  messagingSenderId: "176055956652",
  appId: "1:176055956652:web:a532e6d604f92b7b229b09",
  measurementId: "G-SD018M52BF"
};

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