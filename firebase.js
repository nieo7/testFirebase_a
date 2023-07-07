// firebase.js
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
  getData: async () => {
    try {
      // const querySnapshot = await firestore.getDocs(firestore.collection(firestore, "order"));
      const querySnapshot = await firestore.collection("order").get();
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, data: doc.data() });
      });
      console.log("讀取資料成功：", results);
      return results;
    } catch (error) {
        console.error("讀取資料時發生錯誤：", error);
    }
  },
  deleteOrder: async (orderId) => {
    console.log("orderId = " + orderId);
    try {
      // const orderRef = firestore.doc(firestore.collection(firestore, "order"), orderId);
      const orderRef = await firestore.doc(`order/${orderId}`);
      await orderRef.delete();
      console.log("訂單已成功刪除");
    } catch (error) {
      console.error("刪除訂單時發生錯誤：", error);
    }
  },
  addSubCollection: async (orderId, subCollectionName, subCollectionData) => {
    try {
      const orderRef = await firestore.doc(`order/${orderId}`);
      const subCollectionRef = orderRef.collection(subCollectionName);
      await subCollectionRef.add(subCollectionData);
      console.log("子集合已成功新增");
    } catch (error) {
      console.error("新增子集合时发生错误：", error);
    }
  },
  getSubCollectionData: async (orderId, subCollectionName) => {
    try {
      const orderRef = await firestore.doc(`order/${orderId}`);
      const subCollectionRef = orderRef.collection(subCollectionName);
      const snapshot = await subCollectionRef.get();
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, data: doc.data() });
      });
      console.log(`读取 ${subCollectionName} 子集合数据成功：`, results);
      return results;
    } catch (error) {
      console.error(`读取 ${subCollectionName} 子集合数据时发生错误：`, error);
    }
  },
  findGroup: async (gPhone, gPw) => {
    try {
      // const q = firestore.query(firestore.collection(firestore, "groupOrder"), where("gPhone", "==", gPhone), where("gPw", "==", gPw));
      const q = firestore.collection("groupOrder").where("gPhone", "==", gPhone).where("gPw", "==", gPw);
        const querySnapshot = await q.get();
        // const querySnapshot = await getDocs(q);
        const firstDoc = querySnapshot.docs[0];
        if (firstDoc) {
          return firstDoc.id;
        }
        return null;
    } catch (error) {
        console.error("尋找訂單ID時發生錯誤：", error);
        return null;
    }
  },
  getDocumentById: async (collectionName, documentId) => {
    try {
      const documentRef = firestore.doc(`${collectionName}/${documentId}`);
      const documentSnapshot = await documentRef.get();
      if (documentSnapshot.exists) {
        const documentData = documentSnapshot.data();
        console.log("获取文档数据成功：", documentData);
        return documentData;
      } else {
        console.log("文档不存在");
        return null;
      }
    } catch (error) {
      console.error("获取指定文档数据时发生错误：", error);
      return null;
    }
  },
};

// 附加 Firebase 物件到全域的 window 物件上
window.Firebase = Firebase;
