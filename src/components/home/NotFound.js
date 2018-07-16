import React,{Component} from 'react';
import Header from "./Header";
class NotFound extends Component{
    render(){
        return(
            <center>
                <Header/>
                <h2 style={{paddingTop:'120px'}}>404-Not found</h2>

            </center>
        )
    }
}

export default NotFound;