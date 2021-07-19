import React, { Component } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class TrainingEditor extends Component {
  constructor(props) {
    super(props);
    this.setState({
      editorState: EditorState.createEmpty(),
    });
  }

  onEditorStateChange = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
    const content = editorState.getCurrentContent();
    console.log(convertToRaw(content));
    console.log(stateToHTML(content));
    //document.getElementById('result').innerHTML = stateToHTML(content);
    const { setContent } = this.props;
    setContent(stateToHTML(content));
  };

  state = {};

  //secret - b1c38b2f2ea4f0903085d9ad770dfc54d33ea5bf

  render() {
    async function uploadImageCallBack(file) {
      //upload the image and show from there :3
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/upload");
        xhr.setRequestHeader("Authorization", "Client-ID fb0c6579fd8e45e");
        const data = new FormData();
        data.append("image", file);
        xhr.send(data);

        xhr.addEventListener("load", () => {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          resolve(response);
        });
        xhr.addEventListener("error", () => {
          const error = JSON.parse(xhr.responseText);
          console.log(error);
          reject(error);
        });
      });
    }

    const { editorState } = this.state;
    return (
      <React.Fragment>
        <div className="editor" id="tr-editor">
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              inline: { inDropdown: false },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                uploadCallback: uploadImageCallBack,
                alt: { present: true, mandatory: false },
              },
            }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TrainingEditor;
