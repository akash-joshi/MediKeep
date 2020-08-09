import React, { useEffect, useState, useContext } from "react";
import { Link, navigate } from "gatsby";
import { compose } from "recompose";
import { Icon, Input } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { useLocalStorage } from "react-use";

import { AuthUserContext } from "../components/Session";
import Layout from "../components/layout";
import FileUploader from "../components/AddReport/FileUploader";
import File from "../components/AddReport/File";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../components/appBar";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import tags from "../components/tag-data.json";

import {
  withAuthorization,
  withEmailVerification,
} from "../components/Session";

const Row = styled.div`
  margin-bottom: 1em;
`;

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiButton-root": {
      color: "white",
      width: "100%",
      backgroundColor: "black",
      fontWeight: "bold",
      textAlign: "center",
      border: "1px solid black",
      padding: "0.8em",
    },
    "& .MuiButton-root:active": {
      backgroundColor: "white",
      color: "black",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
}));

const HomePageBase = () => {
  const classes = useStyles();
  const authUser = useContext(AuthUserContext);

  const [files, setFiles] = useLocalStorage("userfiles", []);

  console.log(files);

  const { register, handleSubmit, errors, control } = useForm();
  const onSubmit = data => console.log(data);
  console.error(errors);
  return (
    <>
      <form
        className={classes.root}
        onSubmit={handleSubmit(onSubmit)}
        style={{
          verticalAlign: "middle",
          minHeight: "90vh",
          marginTop: "1em",
          position: "relative",
        }}
      >
        <Row>
          <TextField
            label="Title"
            style={{ width: "100%" }}
            name="title"
            inputRef={register({ required: true })}
            color="black"
          />
          {/* <b>Report Title</b>
          <input style={{ width: "100%" }} name="title" ref={register({required: true, maxLength: 80})} /> */}
        </Row>

        <Row>
          {/* <b>Report Description</b>
          <TextareaAutosize
            minRows={5}
            style={{
              width: "100%",
              padding: "0.3em",
              border: "0.1px solid rgba(0,0,0,.15)",
            }}
            id="myTextArea"
          /> */}
          <TextField
            style={{ width: "100%" }}
            label="Description"
            multiline
            name="description"
            color="black"
            inputRef={register}
          />
        </Row>

        <Row>
          <b>Add Reports (PDFs/Images)</b>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {files.map((fileURL, index) => (
              <File key={index} fileURL={fileURL} />
            ))}
            <FileUploader uid={authUser} setFiles={setFiles} />
          </div>
        </Row>
        <Row>
          <Controller
            as={
              <Autocomplete
                multiple
                options={tags}
                getOptionLabel={option => option}
                id="tags-standard"
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Tests Performed"
                  />
                )}
              />
            }
            name="tags"
            control={control}
            defaultValue={[]}
            rules={{
              validate: value => {
                return !!value;
              },
              required: true,
            }}
            onChange={([, data]) => data}
          />
        </Row>

        <Button
          style={{ marginTop: "1em" }}
          variant="outlined"
          className={classes.root}
        >
          Save
        </Button>
      </form>
    </>
  );
};

const seo = {
  title: "Home",
};

const condition = authUser => !!authUser;

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <AppBar title="Add A Report" url="/reports" show={true} />
      <Layout seo={seo}>
        <HomePage />
      </Layout>
    </div>
  );
}
