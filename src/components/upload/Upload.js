/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleSubmit(e) {

    e.preventDefault();
    if (this.state.file === ""){
      alert("Please upload an image!");
    }else{
     
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
    // console.log('handle uploading-', this.state.imagePreviewUrl);

    var myHeaders = new Headers();
    //myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", "cdbfbcaf-5f5f-4abf-9f4d-fc5974aacf9c");

    var formdata = new FormData();
    formdata.append("file", this.state.file);
    formdata.append("sub_id", this.state.file.name);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    fetch("https://api.thecatapi.com/v1/images/upload", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        this.props.history.push("/");
      })
      .catch((error) => {console.log("error", error); alert ("Cat image could not be uploaded!")});

    }

    
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt="Cat image" />;
    } else {
      $imagePreview = (
        <div className="previewText"></div>
      );
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <label>
          <input
            className="fileInput"
            type="file"
            onChange={(e) => this._handleImageChange(e)}
          />
          </label>
          
          <button
            className="submitButton"
            class="btn btn-outline-primary"
            type="submit"
            onClick={(e) => this._handleSubmit(e)}
          >
            Upload Image
          </button>
        </form>
        <div className="imgPreview">{$imagePreview}</div>
      </div>
    );
  }
}

export default Upload;
