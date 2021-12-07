import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, doc, addDoc, updateDoc, query, where, arrayUnion, getDocs } from "firebase/firestore";
import { useState } from "react";

const Top = () => {

    const db = getFirestore();
    const [message, setMessage] = useState();

    const newStory = async (self) => {
        if (title === "" && sentence === "") {
            setMessage("You can't submit an empty story!")
            return
        }
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setMessage(<button class="btn btn-lg btn-circle loading"></button>)
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            try {
                const docRef = await addDoc(collection(db, "story"), {
                    title: title,
                    sentence: sentence,
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                });
                const q = query(collection(db, "user"), where("uid", "==", user.uid));
                const querySnapshot = await getDocs(q);
                var acc
                querySnapshot.forEach((doc) => {
                    acc = doc.id;
                });
                if (acc === undefined) {
                    const userRef = await addDoc(collection(db, "user"), {
                        uid: user.uid,
                        stories: [docRef.id]
                    });
                } else {
                    const userRef = await updateDoc(doc(db, "user", acc), {
                        stories: arrayUnion(docRef.id)
                    });
                }
                console.log("Document written with ID: ", docRef.id);
                setMessage("Great! You just submitted a new story!");
                setTitle("");
                setSentence("");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        } else {
            setMessage("Error, Please Login before submitting a new story!")
        }
    }

    const [title, setTitle] = useState("");
    const [sentence, setSentence] = useState("");

    const checkIfOne = (self) => {
        if (self.nativeEvent.inputType !== "insertText") {
            setSentence(self.target.value);
            return
        } else if (sentence.slice(-1) === ".") {
            return
        } else {
            setSentence(self.target.value);
        }
    }

    return (
        <div className="Top flex flex-col justify-center items-center">
            <h1 className="justify-center items-center">Current trending!</h1>
            <div className="trending flex flex-wrap justify-center">
                <div class="card shadow-2xl lg:card-side bg-primary text-primary-content mx-5 trendingCard">
                    <div class="card-body">
                        <strong></strong>
                        <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.</p>
                        <div class="justify-end card-actions">
                            <button class="btn btn-primary">
                                View

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 ml-2 stroke-current">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card shadow-2xl lg:card-side bg-primary text-primary-content mx-5 trendingCard">
                    <div class="card-body">
                        <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.</p>
                        <div class="justify-end card-actions">
                            <button class="btn btn-primary">
                                View

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 ml-2 stroke-current">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card shadow-2xl lg:card-side bg-primary text-primary-content mx-5 trendingCard">
                    <div class="card-body">
                        <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.</p>
                        <div class="justify-end card-actions">
                            <button class="btn btn-primary">
                                View

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 ml-2 stroke-current">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="submit-new-story">
                <div class="hero min-h-screen">
                    <div class="flex-col justify-center hero-content lg:flex-row">
                        <div class="text-center lg:text-left">
                            <h1 class="mb-5 text-5xl font-bold">
                                Found Interesting?
                            </h1>
                            <p class="mb-5">
                                Submit a new story yourself right now! Remember, you can only submit a title with a starting sentence!
                            </p>
                        </div>
                        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <div class="card-body">
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Title</span>
                                    </label>
                                    <input type="text" value={title} onChange={(self) => { setTitle(self.target.value) }} placeholder="title" class="homepage-new-title input input-bordered" />
                                </div>
                                <div class="form-control">
                                    <label class="label">
                                        <span class="label-text">Your first sentence</span>
                                    </label>
                                    <input type="text" value={sentence} onChange={checkIfOne} placeholder="password" class="homepage-new-sentence input input-bordered" />
                                </div>
                                <div class="form-control mt-6">
                                    <label for="homepage-new-submit" class="btn btn-primary modal-button">Submit</label>
                                    <input type="checkbox" id="homepage-new-submit" value="Submit" class="btn btn-primary modal-toggle" onClick={newStory} />
                                    <div class="modal">
                                        <div class="modal-box">
                                            <p>{message}</p>
                                            <div class="modal-action">
                                                <label for="homepage-new-submit" class="btn">Close</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Top;
