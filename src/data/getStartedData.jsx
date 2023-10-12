import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

export function DataBase() {

  const Users = [
    {
      userId: "x2WlRAC5h2XyhpWGxu7yHZ82xwt2",
      username: "Admin",
      displayName: "Admin Admin",
      fullName: "Admin Admin",
      emailAddress: "admin@gmail.com",
      following: ["HFdWD9iv3xPxA7lyLShj7xMHbyi2",
    "2lVru7PUU3ebpl3OxfWVGuKPSMd2",
    "eOMPeXxsBZWc0tvBYL26Uy9wsjK2",
    "V0Z0ixtl83bXDR14EQ8zuYlC1Rm1",
    "gC87uzdOLoOvMdztTEbIEAKrzC32"
    ],
      followers: ["HFdWD9iv3xPxA7lyLShj7xMHbyi2",
      "2lVru7PUU3ebpl3OxfWVGuKPSMd2",
      "eOMPeXxsBZWc0tvBYL26Uy9wsjK2",
      "V0Z0ixtl83bXDR14EQ8zuYlC1Rm1",
      "gC87uzdOLoOvMdztTEbIEAKrzC32"],
      photoURL:"https://firebasestorage.googleapis.com/v0/b/instaclone-cbf5c.appspot.com/o/Admin%20?alt=media&token=911137c3-bf85-4991-ad80-3dd0aa843978", 
      dateCreated: Date.now(),
    },
    {
      userId: "HFdWD9iv3xPxA7lyLShj7xMHbyi2",
      username: "Dakota",
      displayName:"Dakota Johnson",
      fullName: "Dakota Johnson",
      emailAddress: "dakotajohnson123@gmail.com",
      following: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
      followers: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
      photoURL:"https://firebasestorage.googleapis.com/v0/b/instaclone-cbf5c.appspot.com/o/Dakota%20?alt=media&token=59e4f58d-32c4-4d2a-84f2-c3055f91824c",
      dateCreated: Date.now(),
    },
    {
      userId: "2lVru7PUU3ebpl3OxfWVGuKPSMd2",
      username: "Elizabeth",
      displayName:"Elizabeth Olsen",
      fullName: "Elizabeth Olsen",
      emailAddress: "elizabetholsen@gmail.com",
      following: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
      followers: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
      photoURL:"https://firebasestorage.googleapis.com/v0/b/instaclone-cbf5c.appspot.com/o/Elizabeth%20?alt=media&token=06fd278c-f461-4df5-92d2-b16c13aa311c",
      dateCreated: Date.now(),
    },
    {userId: "eOMPeXxsBZWc0tvBYL26Uy9wsjK2",
    username: "Elle",
    displayName:"Elle Fanning",
    fullName: "Elle Fanning",
    emailAddress: "ellefanning@gmail.com",
    following: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
    followers: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
    photoURL:"https://firebasestorage.googleapis.com/v0/b/instaclone-cbf5c.appspot.com/o/Elle%20?alt=media&token=5a5f7e60-1710-45aa-b931-ffd6d9eae727",
    dateCreated: Date.now(),
    },
    {userId: "V0Z0ixtl83bXDR14EQ8zuYlC1Rm1",
    username: "May",
    displayName:"May Calamawy",
    fullName: "May Calamawy",
    emailAddress: "maycalamawy@gmail.com",
    following: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
    followers: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
    photoURL:"https://firebasestorage.googleapis.com/v0/b/instaclone-cbf5c.appspot.com/o/May%20?alt=media&token=df38c622-e66c-40d6-ae12-43a12db784e9",
    dateCreated: Date.now(),
    },
    {userId: "gC87uzdOLoOvMdztTEbIEAKrzC32",
    username: "Scarlett",
    displayName:"Scarlett Johansson",
    fullName: "Scarlett Johansson",
    emailAddress: "scarlettjohansson@gmail.com",
    following: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
    followers: ["x2WlRAC5h2XyhpWGxu7yHZ82xwt2"],
    photoURL:"https://firebasestorage.googleapis.com/v0/b/instaclone-cbf5c.appspot.com/o/Scarlett%20?alt=media&token=b462473f-8c66-44fb-b33e-1920c683ffde",
    dateCreated: Date.now(),
    }
  ];


  Users.forEach(async (user) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        userId: user.userId,
        username: user.username,
        displayName: user.displayName,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        photoURL: user.photoURL,
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
        userId: Users[i].userId,
        imageSrc: [Users[i].photoURL],
        displayName:Users[i].displayName,
        caption: '',
        likes: [],
        comments: [
          {
            displayName: '',
            comment: ''
          },
          {
            displayName: '',
            comment: ''
          }
        ],
        userLatitude: '',
        userLongitude: '',
        dateCreated: Date.now()
      });
  }
}

  






















