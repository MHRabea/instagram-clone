import { addDoc, collection } from "firebase/firestore";
import { db } from "./config";

export function DataBase() {
  const Users = [
    {
      userId: "JpXBPpjZpJRnAm9cIvvX7aVvpjk1",
      username: "Jennifer",
      fullName: "Jennifer Lawrence",
      emailAddress: "jennifer@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "Dakota",
      fullName: "Dakota Johnson",
      emailAddress: "Dakota@johnson.com",
      following: [],
      followers: ["JpXBPpjZpJRnAm9cIvvX7aVvpjk1"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "Scarlett",
      fullName: "Scarlett Johansson",
      emailAddress: "scarlett@gmail.com",
      following: [],
      followers: ["JpXBPpjZpJRnAm9cIvvX7aVvpjk1"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "Elle",
      fullName: "Elle Fanning",
      emailAddress: "Elle@gmail.com",
      following: [],
      followers: ["JpXBPpjZpJRnAm9cIvvX7aVvpjk1"],
      dateCreated: Date.now(),
    },
  ];


  Users.forEach(async (user) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        userId: user.userId,
        username: user.username,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        following: user.following,
        followers: user.followers,
        dateCreated: user.dateCreated,
      });
      console.log("Document written with ID : ", docRef.id);
    } catch (err) {
      console.error("Error adding document ", err);
    }
  });
  for (let i = 1; i <= 5; ++i) {
  addDoc(collection(db , "photos"),{
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/User/${i}.png`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}

  






















