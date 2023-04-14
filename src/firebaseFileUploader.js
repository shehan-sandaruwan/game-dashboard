import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  storageBucket: process.env.GAME_DASHBOARD_AUTH_KEY,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const metadata = {
  contentType: "image/*",
};
const storageRef = ref(storage, "images/" + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

uploadTask.on(
  "state_changed",
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("Upload is " + progress + "% done");
    switch (snapshot.state) {
      case "paused":
        console.log("Upload is paused");
        break;
      case "running":
        console.log("Upload is running");
        break;
    }
  },
  (error) => {
    switch (error.code) {
      case "storage/unauthorized":
        break;
      case "storage/canceled":
        break;
      case "storage/unknown":
        break;
    }
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
    });
  }
);
