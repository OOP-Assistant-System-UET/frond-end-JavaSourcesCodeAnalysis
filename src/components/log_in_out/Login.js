import React,{Component} from 'react';
import './../../css/Login.css';
import { Route} from "react-router-dom";
import Home from "../home/Home";


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            txtusername:'',
            txtpassword:'',
            redirectToReferrer: false
        }
    }

    onChange=(e)=>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]:value
        });
    }
    onLogin=(e)=>{
        e.preventDefault();
        var {txtusername, txtpassword}= this.state;
        new Promise((resolve,reject)=>{
            if(txtusername ==='admin' && txtpassword==='admin'){
                localStorage.setItem('user',JSON.stringify({
                    username: txtusername,
                    password:txtpassword
                }));
            }
        })
            .catch(function(err){
                console.log(err);
            });



    }
    render(){
        

        var {txtusername, txtpassword}= this.state;
        var loggedInUser = localStorage.getItem('user');
        function redirect(){
            if(loggedInUser!== null){
                return(

                    <Route path='/' exact component={Home} />
                );
            }
        }

        // }
        //     return <Redirect to='/login'/>
        // }
        return(
            <form  style={{marginTop:'130px'}} onSubmit={this.onLogin} >
                <div className="login" >
                    <input
                        type = "text"
                        placeholder="Username"
                        name="txtusername"
                        value={txtusername}
                        onChange={this.onChange}
                    />
                    <input
                        type = "password"
                        placeholder="Password"
                        name="txtpassword"
                        value={txtpassword}
                        onChange={this.onChange}
                    />
                    {/*<InputLink label="Log in" to="/" activeOnlyWhenExact={true}/>*/}
                    <input type = "submit" value ='Log in'  />

                </div>
            </form>
        );

    }

}
export default Login;