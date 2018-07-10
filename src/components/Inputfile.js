

import React, { Component } from 'react';
import './Header.css'
import './Inputfile.css'
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
//         // this.state= {
//         //     redirect: false
//         // };
//         // this.setRedirect= this.setRedirect.bind(this);
//         // this.renderRedirect = this.renderRedirect.bind(this);
//     }
    /*handleClick(){
        console.log(this.refs.input.value);
    }*/

    // setRedirect = () => {
    //     this.setState({
    //         redirect: true
    //     })
    // }
    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         return <Redirect to = '/class_diagram'/>
    //             }
    //
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
                    <button type="button" onClick={this.onClick} className="btn btn-outline-primary btn-lg" style={{marginTop:'30px', width:'40%', height:'60px', fontFamily: 'Open Sans'}}>
                        CONVERT TO CLASS DIAGRAM
                    </button>

                </div>
            </center>
        );
    }
}

export default Inputfile;
