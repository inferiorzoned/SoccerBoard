import React, { Component } from 'react';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faMicrophoneAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faPen, faTrash, faMicrophoneAlt);

const CommandPallette = () => {
    return ( 
        <div className="command-pallette">
            <div className="btn-cmd btn-cmd-add">
                <FontAwesomeIcon icon={faPlus} className="fa-icon-white" />
            </div>
            <div className="btn-cmd btn-cmd-edit">
                <FontAwesomeIcon icon={faPen} className="fa-icon-white" />
            </div>
            <div className="btn-cmd btn-cmd-delete">
                <FontAwesomeIcon icon={faTrash} className="fa-icon-white" />
            </div>
            <div className="btn-cmd btn-cmd-record">
                <FontAwesomeIcon icon={faMicrophoneAlt} className="fa-icon-white" />
            </div>
        </div>
    );
}
 
export default CommandPallette;