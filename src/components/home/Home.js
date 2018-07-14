import React,{Component} from 'react';
import Inputfile from './Inputfile';
class Home extends Component{
    render(){
        return(
            <div>
                <h1 style={{paddingTop:'100px'}}>Select file to upload</h1>
                <div style={{marginTop:'10px'}}>
                    <Inputfile/>
                </div>
            </div>
        )
    }
}

export default Home;