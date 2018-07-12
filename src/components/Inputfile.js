import React, { Component } from 'react';
import {  Route, Link } from "react-router-dom";
import './Header.css';
import './Inputfile.css';
const ButtonLink=({ label, to, activeOnlyWhenExact })=>{
    return(
        <Route path={to} exact={activeOnlyWhenExact} children={({match})=>{
            return(
                <Link to={to} >
                <button type="button" className="btn btn-outline-primary btn-lg" style={{marginTop:'30px', width:'40%', height:'60px', fontFamily: 'Open Sans'}}>
                    {label}
                </button>
                </Link>
            )
        }}

        />
    )
}
class Inputfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            nameFile: ''
        }
        this.onClick = this.onClick.bind(this);
        this.getNF = this.getNF.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }

    handleChange() {
    this.setState({ nameFile: this.refs.input.value });

    }
    onClick() {
        // console.log(this.refs.input.value);


    }
    getNF(){
        console.log(this.refs.input.value);
        return(
            <p>{this.refs.input.value}</p>
        );
    }
    render() {

        return (

            <center>
                <div>

                    <article>
                        <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png" />
                        {this.state.nameFile}
                        <span className="button" >
                            Choose file<input type="file" ref="input" onChange={this.handleChange}/>
                        </span>
                    </article>
                    <ButtonLink label="CONVERT TO CLASS DIAGRAM" to="/classdiagram" activeOnlyWhenExact={false}/>

                </div>
            </center>
        );
    }
}

export default Inputfile;
