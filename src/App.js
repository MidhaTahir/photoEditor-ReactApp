import React, { useState } from "react";
import "./App.css";
import Slider from "./Slider";
import SidebarItem from "./SidebarItem";
import { data } from "./sampleData";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const DEFAULT_OPTIONS = data;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function UploadButton(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={props.handleUploadClick}
      />

      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          style={{
            marginTop: "40px",
            marginLeft: "-223px",
            marginBottom: "20px",
          }}
        >
          Upload Another Image
        </Button>
      </label>
    </div>
  );
}

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const selectedOption = options[selectedOptionIndex];

  function handleSliderChange({ target }) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      });
    });
  }

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });
    return { filter: filters.join(" ") };
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const [mainState, setMainState] = useState("initial");
  const [imageUploaded, setImageUploaded] = useState(0);

  const handleUploadClick = (event) => {
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile(reader.result);
    };

    setMainState("uploaded");
    setSelectedFile(event.target.files[0]);
    setImageUploaded(1);
  };

  return (
    <div className="container">
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />

      <UploadButton
        className="uploader"
        handleUploadClick={handleUploadClick}
      />

      <div>
        <img
          src={selectedFile ? selectedFile : "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" }
          className="main-image"
          style={getImageStyle()}
        ></img>
      </div>

      <div className="sidebar">
        <SidebarItem
          options={options}
          activeIndex={selectedOptionIndex}
          handleClick={setSelectedOptionIndex}
        />
      </div>
    </div>
  );
}
export default App;
