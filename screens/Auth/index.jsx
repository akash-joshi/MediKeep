import React from "react";

import { View, Button } from "react-native";
import firebase from "firebase";
import * as Google from "expo-google-app-auth";

const Auth = ({ navigation }) => {
  // Check if user is already logged In.
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      console.log("We are authenticated now!");
    }

    // Do other things
  });

  var provider = new firebase.auth.GoogleAuthProvider();

  const myGoogleSignIn = () => {
    console.log("my google");
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  const onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function (result) {
              console.log("user signed in ");
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  })
                  .then(function (snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  });
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      });
  };

  const signInWithGoogleAsync = async () => {
    // console.log("here");
    // try {
    //   const result = await Expo.Google.logInAsync({
    //     androidClientId:
    //       "858762695063-8u1nmkpkcm54ierem1opbefatjb6qq1t.apps.googleusercontent.com",
    //     behavior: "web",
    //     scopes: ["profile", "email"],
    //   });
    //   console.log("empty");
    //   console.log(result);

    //   if (result.type === "success") {
    //     onSignIn(result);
    //     console.log("got access");
    //     return result.accessToken;
    //   } else {
    //     console.log("canncelled");
    //     return { cancelled: true };
    //   }
    // } catch (e) {
    //   console.log("error");
    //   console.log(e);
    //   return { error: true };
    // }

    console.log("new attempt");
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        androidClientId:
          "858762695063-8u1nmkpkcm54ierem1opbefatjb6qq1t.apps.googleusercontent.com",
        behavior: "web",
        scopes: ["profile", "email"],
      });

      if (type === "success") {
        /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
        onSignIn(result);
        console.log(user);
      }
    } catch (e) {
      console.log("error");
      console.log(e);
      return { error: true };
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Sign in with Google"
        onPress={() => {
          signInWithGoogleAsync();
        }}
      />
    </View>
  );
};

export default Auth;
