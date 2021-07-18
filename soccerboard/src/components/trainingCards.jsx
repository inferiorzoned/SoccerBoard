import React, { Component } from "react";
import { render } from "react-dom";
import CardGroup from "./commons/cardGroup";
import {
  trainingCategories,
  getTrainingRepoCategoryData,
} from "../utils/repoElements";
import { CircularProgress } from "@material-ui/core";

class TrainingCards extends Component {
  state = { name: "dummy" };

  async componentDidMount() {
    // const { trainingRepoCategoryData, trainingCategories } = this.state;
    const trainingRepoCategoryData = await getTrainingRepoCategoryData();
    // const trainingCategories = trainingCategories;
    this.setState({ trainingRepoCategoryData });
  }

  render() {
    const { handleLink, linkType } = this.props;
    const { trainingRepoCategoryData } = this.state;
    console.log(trainingRepoCategoryData);
    if (trainingRepoCategoryData) {
      return (
        <ul style={{ listStyleType: "none" }}>
          {trainingCategories.map((trainingType, trainingTypeIndex) => (
            <li key={trainingTypeIndex}>
              <CardGroup
                groupType={"trainingRepo"}
                categoryName={trainingType}
                categoryData={trainingRepoCategoryData}
                handleLink = {handleLink}
                linkType = {linkType}
              />
            </li>
          ))}
        </ul>
        // <h1>hello</h1>
      );
    } else {
      return (
        <div className="centered">
          <CircularProgress color="secondary" />
        </div>
      );
    }
  }
}

export default TrainingCards;

// import React, { Component } from "react";
// import { render } from "react-dom";
// import axios from "axios";
// // import TrainingCards from "./trainingCards";

// class TrainingCards extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "React",
//     };
//     // this.getTodos = this.getTodos.bind(this);
//   }

//   async componentDidMount() {
//     // this.getTodos();
//     let data = await axios
//       .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
//       .then(function (response) {
//         return response;
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//     this.setState({ todos: data.data });
//   }

//   async getTodos() {}

//   render() {
//     const { todos } = this.state;
//     return (
//       <div>
//         <h3>Using componentDidMount for initial data render</h3>
//         <hr />
//         {todos &&
//           todos.map((todo) => {
//             return (
//               <table>
//                 <tr>
//                   <td>{todo.id}</td>
//                   <td>
//                     <p key={todo.id}>{todo.title}</p>
//                   </td>
//                 </tr>
//               </table>
//             );
//           })}
//       </div>
//     );
//   }
// }

// export default TrainingCards;
