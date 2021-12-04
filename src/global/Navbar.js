import { signInWithPopup, GoogleAuthProvider, signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const Navbar = () => {

    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    function useAuth() {
        const [currentUser, setCurrentUser] = useState();

        useEffect(() => {
            const unsub = onAuthStateChanged(getAuth(), user => setCurrentUser(user));
            return unsub;
        }, [])

        return currentUser;
    }

    function SignIn() {

        const signInWithGoogle = () => {
            setLoading("disabled");
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((result) => {
                    //
                }).catch((error) => {
                    // 
                })
            setLoading("");
        }

        return (
            <>
                <button disabled={loading} className="sign-in btn btn-primary" onClick={signInWithGoogle}>Sign in with Google</button>
            </>
        )

    }

    function SignOut() {
        const auth = getAuth();

        return auth.currentUser && (
            <button disabled={loading} className="sign-out btn btn-primary" onClick={() => {
                setLoading("disabled");
                signOut(auth)
                    .then((result) => {
                        //
                    }).catch((error) => {
                        // 
                    })
                setLoading("");
            }
            }>Sign Out</button>
        )
    }


    return (
        <div className="universalNavbar">
            <div className="drawer navbar mb-2 shadow-lg bg-neutral text-neutral-content">
                <div className="px-1 mx-1 navbar-start">
                    <a className="btn btn-ghost btn rounded-btn text-xl" href="/">
                        LYS
                    </a>
                </div>
                <div className="hidden px-2 mx-2 navbar-center lg:flex">
                </div>
                <div className="navbar-end">
                    <a className="btn btn-ghost btn-sm rounded-btn" href="/topics">
                        Topics
                    </a>
                    <button data-toggle-theme="dark,light" data-act-class="ACTIVECLASS">
                        <i class="bi bi-sun"></i>
                    </button>
                    <div className="login">
                        <label for="my-modal-2" class="btn btn-xs md:btn-sm lg:btn-md xl:btn-lg">ACCOUNT</label>
                        <input type="checkbox" id="my-modal-2" class="modal-toggle" />
                        <div class="modal">
                            <div class="modal-box">
                                {currentUser ?
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Your current account : </p>
                                        <img src={currentUser.photoURL} className="rounded-full h-24 w-24" />
                                        {currentUser.displayName}
                                        <SignOut />
                                    </div>
                                    :
                                    <div className="flex flex-col justify-center items-center">
                                        <p>Login :</p>
                                        <SignIn />
                                    </div>
                                }
                                <div class="modal-action">
                                    <label for="my-modal-2" class="btn">Close</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;