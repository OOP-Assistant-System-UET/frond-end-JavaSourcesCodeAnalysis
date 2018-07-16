import React, { Component } from 'react';
import {  Route, Link } from "react-router-dom";
import '../../css/Header.css';
import '../../css/Inputfile.css';
import Header from "./Header";
import axios, { post } from 'axios';
import * as Config from './../../api/Config';
const ButtonLink=({ label, to, activeOnlyWhenExact })=>{
    return(
        <Route path={to} exact={activeOnlyWhenExact} children={({match})=>{
            return(
                <Link to={to} >
                <button
                    type="button"
                    className="btn btn-outline-primary btn-lg"
                    style={{marginTop:'30px', width:'40%', height:'60px', fontFamily: 'Open Sans'}}
                    onClick={this.uploadHandler}
                >
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
            selectedFile: null
        }
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
    }

    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }
     uploadHandler =(e) =>{
        e.preventDefault();// neu c muon xem no link luon sang trang kia thi xoa dong nay nha
        return new Promise((resolve , reject)=>{
            const formData = new FormData();
            formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
             axios.post(Config.API_URL +'/upload', formData, {
                onUploadProgress: progressEvent => {
                    console.log(progressEvent.loaded / progressEvent.total)
                }
            });
        });

    }

    render() {

        return (

            <center>
                <Header/>
                <div>

                        <article>
                            <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png" />
                            <span className="button" >
                            Choose file<input type="file" onChange={this.fileChangedHandler}/>
                        </span>
                        </article>
                    <div className="progress" style={{marginTop:'10px', width:'40%'}}>
                        <div className="progress-bar progress-bar-info progress-bar-striped" role="progressbar"
                             aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width:"50%"}}>
                            50% Complete (info)
                        </div>
                    </div>
                    <Route path='/classdiagram' children={({match})=>{
                        return(
                            <Link to='/classdiagram' >
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-lg"
                                    style={{marginTop:'30px', width:'40%', height:'60px', fontFamily: 'Open Sans'}}
                                    onClick={(e)=>this.uploadHandler(e)}
                                >
                                    CONVERT TO CLASS DIAGRAM
                                </button>
                            </Link>
                        )
                    }}

                    />

                </div>
            </center>
        );
    }
}

export default Inputfile;
