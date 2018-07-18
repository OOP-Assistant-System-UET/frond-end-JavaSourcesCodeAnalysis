import React,{Component} from 'react';
import Inputfile from './Inputfile';
import Header from "./Header";
class Home extends Component{
    fun=(e)=>{
      this.props.token(e);
    }
    render(){
        return(

            <div>
                <Header/>
                <h1 style={{paddingTop:'100px'}}>Select file to upload</h1>
                <div style={{marginTop:'10px'}}>
                    <Inputfile token={this.fun}/>
                </div>
            </div>
        )
    }
}

export default Home;