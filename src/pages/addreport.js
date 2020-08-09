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
import { TextField } from "@material-ui/core";
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
    "& .MuiTextField-root": {
      focus: {
        border: 0,
      },
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
      <AppBar title="Add A Report" url="/reports" />
      <form
        className={classes.root}
        onSubmit={handleSubmit(onSubmit)}
        style={{
          verticalAlign: "middle",
          minHeight: "80vh",
          marginTop: "1em",
        }}
      >
        <Row>
          <TextField
            label="Title"
            style={{ width: "100%" }}
            name="title"
            inputRef={register({ required: true })}
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
            {/* <div
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
              <img
                style={{ height: 40, width: 40 }}
                src="/AddReport/plus.svg"
              />
            </div> */}
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
                    label="Multiple values"
                    placeholder="Favorites"
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
        <input type="submit" />
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
      <Layout seo={seo}>
        <HomePage />
      </Layout>
    </div>
  );
}
