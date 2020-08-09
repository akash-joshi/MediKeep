import React, { useState, useContext } from "react";
import axios from "axios";
import mime from "mime-types";

import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

import Loader from "../Loader";

function FileUploader(props) {
  const [uploadingStatus, setUploadingStatus] = useState(0);

  const authUser = useContext(AuthUserContext);

  const { uid } = authUser;

  const uploadFile = e => {
    const file = e.target.files;
    setUploadingStatus(1);

    const extension = mime.extension(file[0].type);

    const uploadTask = props.firebase.storageRef
      .child(`reports/${uid}/${new Date().valueOf()}.${extension}`)
      .put(file[0], { contentType: file[0].type });

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      props.firebase.appRef.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case props.firebase.appRef.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case props.firebase.appRef.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function(error) {
        console.error(error);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function(downloadURL) {
            console.log("File available at", downloadURL);
            props.setFiles(files => [...files, downloadURL]);
            setUploadingStatus(0);
          });
      },
    );

    // axios
    //   .post(endpoint, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then(response => {
    //     setUrl(response.data.Location);
    //     setUploadingStatus(2);
    //   })
    //   .catch(error => {
    //     setUploadingStatus(-1);
    //     document.querySelector("#react-s3-file-uploader").value = "";
    //     setError(
    //       `Error: ${
    //         error.response.data.msg
    //           ? error.response.data.msg
    //           : "Could not connect to the Server."
    //       }`,
    //     );
    //   });
  };

  return (
    <div>
      <label htmlFor="file-uploader">
        <div
          style={{
            width: "90%",
            height: "calc(30vw * 2)",
            boxShadow: "2px 5px 4px rgba(0, 0, 0, 0.25)",
            textAlign: "center",
            marginTop: "1.5em",
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "50%",
          }}
        >
          {uploadingStatus === 0 && (
            <img
              style={{ height: 40, width: 40 }}
              src="/AddReport/plus.svg"
            />
          )}
          {uploadingStatus === 1 && <Loader />}
        </div>
      </label>

      <input
        className="browser-default"
        style={{
          opacity: 0,
          position: "absolute",
          zIndex: -1,
        }}
        accept={"image/*"}
        type="file"
        onChange={uploadFile}
        id={`file-uploader`}
      />
    </div>
  );
}

export default withFirebase(FileUploader);
