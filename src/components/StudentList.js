import axios from "axios";
import React, { Component } from "react";
import Student from "./student";
import "./StudentList.css";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [], tagSearch: "", nameSearch: "" };

    this.handleNameSearch = this.handleNameSearch.bind(this);
    this.handleTagSearch = this.handleTagSearch.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  async componentDidMount() {
    let students = [];
    let api = "https://api.hatchways.io/assessment/students";
    let res = await axios.get(api);
    students.push(...res.data.students);
    students.forEach((student) => {
      let average = 0;
      for (let i = 0; i < student.grades.length; i++) {
        average += parseInt(student.grades[i]) / student.grades.length;
      }
      student.available = true;
      student.fullName = student.firstName + " " + student.lastName;
      student.tags = [];
      student.average = average;
    });
    this.setState({ students: students });
  }

  handleTagSearch(e) {
    this.setState({ tagSearch: e.target.value.toLowerCase() });
    this.setState((st) => {
      st.students.forEach((student) => {
        let joinedTags = student.tags.join("").toLowerCase();
        student.tags.length <= 0
          ? Object.assign(student, { available: false })
          : Object.assign(student, { available: true });

        if (st.tagSearch === "" && st.nameSearch === "") {
          Object.assign(student, { available: true });
        } else if (st.nameSearch === "" && st.tagSearch) {
          student.tags.forEach((tag) => {
            if (tag) {
              if (joinedTags.includes(st.tagSearch)) {
                Object.assign(student, { available: true });
              } else Object.assign(student, { available: false });
            }
          });
        } else if (st.nameSearch) {
          student.tags.forEach((tag) => {
            if (tag) {
              let studentName = student.fullName.toLowerCase();
              if (
                joinedTags.includes(st.tagSearch) &&
                studentName.includes(st.nameSearch)
              ) {
                Object.assign(student, { available: true });
              } else Object.assign(student, { available: false });
            }
          });
        }
      });
    });
  }

  handleNameSearch(e) {
    this.setState({ nameSearch: e.target.value.toLowerCase() });
    this.setState((st) =>
      st.students.forEach((student) => {
        let joinedTags = student.tags.join("").toLowerCase();

        if (st.tagSearch === "" && st.nameSearch === "") {
          Object.assign(student, { available: true });
        } else if (st.tagSearch === "" && st.nameSearch) {
          let studentName = student.fullName.toLowerCase();
          if (studentName.includes(st.nameSearch) && st.tagSearch === "") {
            Object.assign(student, { available: true });
          } else {
            Object.assign(student, { available: false });
          }
        } else if (st.tagSearch) {
          student.tags.forEach((tag) => {
            if (tag) {
              let studentName = student.fullName.toLowerCase();
              if (
                joinedTags.includes(st.tagSearch) &&
                studentName.includes(st.nameSearch)
              ) {
                Object.assign(student, { available: true });
              } else Object.assign(student, { available: false });
            }
          });
        }
      })
    );
  }

  addTag(id, tag) {
    this.setState((st) =>
      st.students.forEach((student) => {
        if (student.id === id) {
          student.tags.push(tag);
        }
      })
    );
  }

  render() {
    return (
      <div className="list">
        <div className="search-container">
          <div className="name-search-container">
            <input
              onChange={this.handleNameSearch}
              type="search"
              placeholder="Search by name"
              className="search-by-name"
            />
          </div>
        </div>
        <div className="search-container">
          <div className="tag-search-container">
            <input
              onChange={this.handleTagSearch}
              type="search"
              placeholder="Search by tag"
              className="search-by-tag"
            />
          </div>
        </div>

        {this.state.students.map((student) => {
          if (student.available === true) {
            return (
              <Student
                key={student.id}
                id={student.id}
                image={student.pic}
                city={student.city}
                company={student.company}
                email={student.email}
                firstName={student.firstName}
                lastName={student.lastName}
                grades={student.grades}
                skill={student.skill}
                average={student.average}
                addTag={this.addTag}
                tags={student.tags}
              />
            );
          }
          return undefined;
        })}
      </div>
    );
  }
}

export default StudentList;
