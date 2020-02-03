import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { DropzoneArea } from "material-ui-dropzone";
import { Button } from "@material-ui/core";
import { fileAlerts } from "../../Utils/settings/fileUpload";
import MainNav from "../../components/NavBars/MainNav/MainNav";
import Progress from "../../components/Progress/Progress";
import { instanceAPI } from "../../api/InstanceApi";
import { msg, msg_upload } from "../../Utils/messages";
import Success from "../../components/Pages/messages/Success";
import Failure from "../../components/Pages/messages/Failure";

const imageSize = 5e6;
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    "& img": {
      width: "100%",
      height: "auto",
    },
  },
  dropzoneClass: {
    marginTop: 15,
    height: "200px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  saveBtn: {
    marginTop: 15,
  },
});
const JobImageEdit = ({ match }) => {
  const classes = useStyles();

  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [statusBtn, setStatusBtn] = useState(true);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [failure, setFailure] = useState(false);

  const onChange = file => {
    setStatusBtn(false);
    setFile(file[0]);
  };

  const saveImage = async () => {
    const formData = new FormData();
    formData.append("job_image", file);
    const job_id = match.params.id;

    try {
      const res = await instanceAPI.post(`/api/job/image/edit?job_id=${job_id}`, formData, {
          headers: {
              "Content-Type": "multipart/form-data",
            },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            ),
          );
        },
      });

      if (res.status === 200) {
        // Clear percentage
        setMessage(msg_upload.upload_success);
        setStatusBtn(true);
        setTimeout(() => {
          setUploadStatus(true);
        }, 1500);
      }
    } catch (err) {
      if (err.response.status === 500) {
        setFailure(true);
        setMessage(msg.failure);
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  return (
    <>
      <MainNav />
      {uploadStatus ? (
        <Success title={msg.success} msg={msg_upload.upload_success_img} />
      ) : failure ? (
        <Failure title={msg.failure} msg={msg_upload.upload_failure_img} />
      ) : (
        <div className={classes.root}>
          <Grid item xs={11} sm={6} md={4}>
            <Progress completed={uploadPercentage} />
            <Typography space={2} component="span" variant="subtitle2">
              {message}
            </Typography>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              showPreviews={true}
              fullWidth
              onChange={onChange}
              maxFileSize={imageSize}
              showPreviewsInDropzone={false}
              dropzoneClass={classes.dropzoneClass}
              showAlerts={true}
              filesLimit={1}
              dropzoneText="Schimba Imaginea. -  max: 5MB"
              getFileRemovedMessage={fileAlerts.getFileRemovedMessage}
              getDropRejectMessage={fileAlerts.getDropRejectMessage}
              getFileLimitExceedMessage={fileAlerts.getFileLimitExceedMessage}
              getFileAddedMessage={fileAlerts.getFileAddedMessage}
            />
            <Button
              disabled={statusBtn}
              variant="contained"
              color="primary"
              className={classes.saveBtn}
              onClick={saveImage}
            >
              {msg.post}
            </Button>
          </Grid>
        </div>
      )}
    </>
  );
};
export default JobImageEdit;
