import React, { Component } from 'react';
import {  Route, Link } from "react-router-dom";
import '../../css/Header.css';
import '../../css/Inputfile.css';
import Header from "./Header";
import axios from 'axios';
import * as Config from './../../api/Config';
import { ProgressBar } from 'react-bootstrap';
class Inputfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            selectedFile: null,
            progress : 0,
            key:null,
            disabled:true
        }
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.uploadHandler = this.uploadHandler.bind(this);
    }

    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    }
    
    uploadHandler = (e) => {
        const self=this;

      if(this.state.selectedFile != null){
            return new Promise((resolve , reject)=>{
                const formData = new FormData();
                formData.append('file', this.state.selectedFile, this.state.selectedFile.name);
                axios.post(Config.API_URL +'/upload', formData, {
                    onUploadProgress: progressEvent => {
                        var percentCompleted = Math.round(progressEvent.loaded / progressEvent.total)*100;
                        console.log(percentCompleted + '%')
                        this.setState({progress: percentCompleted})
                    }


                }).then(res=> {
                    this.setState({
                        key:res.data.key,
                        disabled: false
                    });
                    sessionStorage.setItem('key', res.data.key);
                    self.props.token(res.data.key); 
                    
                console.log(JSON.stringify(res));
            });
                

            });
            
        }

    }

    render() {

        return (

            <center>
                <Header/>
                <div>
                    <article>
                        <img src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png" />
                        <div className="button" >
                            Choose file<input type="file" onChange={this.fileChangedHandler}/>
                        </div>
                    </article>
                    <button className="btn btn-outline-primary btn-lg"
                            style={{marginTop:'10px', width:'14%', height:'60px', fontFamily: 'Open Sans'}}
                            onClick={(e)=>this.uploadHandler(e)}>
                            Upload
                    </button>
                    <ProgressBar style={{marginTop:'25px', width:'40%'}} striped bsStyle="info" now={this.state.progress} />
                    <Route path='/classdiagram' children={({match})=>{
                        return(
                            <Link to='/classdiagram' >
                                <button
                                    className="btn btn-outline-primary btn-lg"
                                    style={{marginTop:'30px', width:'40%', height:'60px', fontFamily: 'Open Sans'}}
                                    disabled={this.state.disabled}
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
