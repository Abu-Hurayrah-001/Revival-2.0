// IMPORTS+
"use client";
import { signUp } from "../actions/auth/signUp";

// SIGN UP
const SignUp = () => {
    return (
        <div className="w-full h-[100vh] grid place-content-center">
			<button
                className="cursor-pointer"
                onClick={ () => signUp() }    
            >
                Sign Up
            </button>
		</div>
    );
};

export default SignUp;