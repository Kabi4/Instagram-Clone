import React, { PureComponent } from 'react';
import './App.css';
import Header from './Header/Header';
import Post from './Post/Post';
import ImageUploader from './imageUploader/imageUploader';

import {db,auth} from './../Firebase/Firebase';
import Spinner from '../Components/Spinner/Spinner';
import SimpleModal from '../Components/Modal/Modal';
import { Button } from '@material-ui/core';
import Login from './Authentication/Login';

import * as actionCreator from './../Store/ActionCreators/index';

import Avatar from '@material-ui/core/Avatar/Avatar'; 

import { connect } from 'react-redux';

class App extends PureComponent {
  state = {
    posts: [],
    loading: true,
    modal: false,
    user: null
  }

  handleOpen = () => {
    this.setState({modal: true});
  };
  
  handleClose = () => {
    this.setState({modal: false});
  };

  

  componentDidUpdate(){
    auth.onAuthStateChanged(authUser=>{
      if(authUser){
          this.setState({user: authUser,modal: false});
          this.props.loggedIn(authUser.displayName);
      }else{
        this.setState({user: null});
      }
    })
  }

  componentDidMount(){
    db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot=>{
      this.setState({posts: snapshot.docs.map(ele=>{
        return {id: ele.id,data: ele.data()};
      }),loading: false})
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.loading?<Spinner/>:
          <React.Fragment>
            <SimpleModal modelClose={this.handleClose}  modelState={this.state.modal}>
              <Login/>
            </SimpleModal>
            <Header/>
            {this.props.authenticated?<div><ImageUploader username={this.props.displayName}/></div>:<div>
                <h2>Sign in to share your moments!</h2>
              </div>}
            <div className="userInfo">
            {!this.props.authenticated?<p>Hey, You are not logged in</p>:
              <React.Fragment>
                <Avatar
                        src=""
                        alt={this.props.displayName}
                        children={this.props.displayName[0]}
                    /><p>Welcome <strong style={{color: "black"}}>{this.props.displayName}</strong>,</p>
              </React.Fragment>
            }
            {this.props.authenticated?<Button onClick={()=>{this.props.loggedOut()}} >Sign Out</Button>:<Button onClick={this.handleOpen} >Sign-In</Button>}
            </div>
            {this.state.posts.map(ele=><Post key={ele.id} username={ele.data.username} imgurl={ele.data.imgurl} caption={ele.data.caption} />)}
          </React.Fragment>
        }
      </div>
    );
  }
};

const mapStateToProps = (state)=>{
    return{
      displayName: state.auth.displayName,
      authenticated: state.auth.authenticated
    }
};

const mapDispatchToProps = (dispatch)=>{
  return{
    loggedIn: (name)=>{dispatch(actionCreator.AUTH__SUCCESS(name))},
    loggedOut: ()=>{dispatch(actionCreator.logout())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
