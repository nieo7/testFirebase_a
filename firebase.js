// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// 初始化 Firebase app
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyCGBbSB4QtxvoEXQqsktzfUOTG4e_oYJ2c",
        authDomain: "nifb-facd6.firebaseapp.com",
        projectId: "nifb-facd6",
        storageBucket: "nifb-facd6.appspot.com",
        messagingSenderId: "971119415970",
        appId: "1:971119415970:web:51b73a2b31f5991ae9bdfb",
        measurementId: "G-JKEP728BXD"
};
// firebase.js

// 初始化 Firebase app
firebase.initializeApp(firebaseConfig);

// 取得 Firestore 實例
const firestore = firebase.firestore();

const Firebase = {
  addData: async (collectionName, data) => {
    try {
      const docRef = await firestore.collection(collectionName).add(data);
      console.log("文件已成功新增，文件 ID:", docRef.id);
    } catch (error) {
      console.error("新增文件時發生錯誤：", error);
    }
  },
  // 其他操作函式...
};

// 附加 Firebase 物件到全域的 window 物件上
window.Firebase = Firebase;
