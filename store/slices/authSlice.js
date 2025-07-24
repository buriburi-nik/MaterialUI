import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isSignedIn: false,
    isLoading: false,
    error: null,
    signInForm:{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",    
        linkedinProfile: "",
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateSignInForm: (state, action) => {
            const { field, value} = action.payload;
            state.signInForm[field] = value;
        },
    },
});

export const {
    updateSignInForm,
} = authSlice.actions;

export default authSlice.reducer;