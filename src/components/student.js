import React, { Component } from "react";
import "./Student.css"


class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
                viewTests: false,
                tag: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleTests = this.toggleTests.bind(this);
    }

    toggleTests() {
        this.setState({viewTests: !this.state.viewTests})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addTag(this.props.id, this.state.tag)
        this.setState({tag: ''})

    }

    handleChange(e) {
        this.setState({tag: e.target.value})
    }

    render() {
        return (
            <div className="list-item">
                <div className="image-container">
                    <div className="image-border">
                        <img className="avatar" src={this.props.image}/>
                    </div>
                </div>
                <div className="text-container">
                    <h1 className="student-name">{this.props.firstName.toUpperCase()} {this.props.lastName.toUpperCase()}</h1>
                    <div className="stats">
                        <p>Email: {this.props.email}</p>
                        <p>Company: {this.props.company}</p>
                        <p>Skill: {this.props.skill}</p>
                        <p>Average: {this.props.average}%</p>
                    </div>
                    <div style={{display: `${this.state.viewTests ? '' : 'none'}`}} className="tests">
                        {this.props.grades.map((test, index) => {
                            return <div key={index}>Test {index + 1}: <span className="test-percentage">{test}%</span></div>
                        })}
                    </div>
                    <div className="tag-container">
                        <div className="tags">{this.props.tags.map((tag, index) => {
                            return <span className='tag' key={index}>{tag}</span>
                        })}</div>
                        <form className="tag-form" onSubmit={this.handleSubmit}>
                            <input required onChange={this.handleChange} value={this.state.tag} type="text" placeholder="Add a tag" className="tag-input"/>
                        </form>
                    </div>
                </div>
                <div className="button-container">
                    <i onClick={this.toggleTests} className={`fas ${this.state.viewTests ? 'fa-minus' : 'fa-plus'} fa-2xl`}></i>
                </div>
            </div>
        )
    }
}

export default Student;