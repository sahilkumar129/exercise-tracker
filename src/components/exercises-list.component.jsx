import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>Edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/exercises/")
      .then(res => {
        this.setState({ exercises: res.data });
      })
      .catch(error => console.log(error));
  }

  deleteExercise = id => {
    Axios.delete("http://localhost:8080/exercises/" + id)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
    this.setState({
      exercises: this.state.exercises.filter(ex => ex._id !== id)
    });
  };

  exerciseList() {
    return this.state.exercises.map(currentExercise => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ExerciseList;
