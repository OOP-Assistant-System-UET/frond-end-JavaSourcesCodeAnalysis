import React,{Component} from 'react';
import Header from "./Header";

class Account extends Component{
    render(){
        return(
            <center>
                <Header/>
                <h2 style={{paddingTop:'130px'}}>
                    Trang nay hien thong tin ca nhan nguoi dung
                </h2>
            </center>
        )
    }
}

export default Account;