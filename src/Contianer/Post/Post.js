import React, { Component } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar/Avatar'; 
import { db } from '../../Firebase/Firebase';
import { Button } from '@material-ui/core';

import firebase from 'firebase';
import Comment from '../../Components/Comment/Comment';
class Post extends Component {
    state = {
        comments: [],
        loading: true,
        comment: "",
        posting: false
    }

    componentDidMount(){
        this.setState({loading: true});
        db.collection("posts")
        .doc(this.props.postid)
        .collection("comments")
        .orderBy("timestamp","desc")
        .onSnapshot(snapshot=>{
            this.setState({comments: snapshot.docs.map(ele=>{
                return {id: ele.id,data: ele.data()};
              }),loading: false})
        })
    }

    postComment = (e)=>{
        e.preventDefault();
        this.setState({posting: true});
        db.collection("posts")
        .doc(this.props.postid)
        .collection("comments")
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            username: this.props.displayName,
            comment: this.state.comment
        })
        .then(res=>{
            this.setState({comment: "",posting: false})
        })
        .catch(err=>{
            alert(err.message)
        })
    }

    render() {
        return (
            <div className="post">
                <div className="post__avatar">
                    <Avatar 
                        src=""
                        alt={this.props.username}
                        children={this.props.username[0]}
                    />
                    <p className="post__avatar__name">{this.props.username}</p>
                </div>
                <img className="post__image" src={this.props.imgurl} alt="post" />
                <div className="post__caption">
                    <p className="post__caption__name">{this.props.username}</p>
                    <p className="post__caption__caption">{this.props.caption}</p>
                </div>
                <form className="post__form" onSubmit={(e)=>{ this.postComment(e)}}>
                    <input  onChange={(e)=>{e.preventDefault();this.setState({comment: e.target.value})}} className="post__input" placeholder="Write Something......" value={this.state.comment} />
                    <Button className="post__button" type="submit" disabled={this.state.comment.trim()==="" || !(this.props.displayName) || this.state.posting} >
                        {this.state.posting?"Posting":"Post"}
                    </Button>
                </form>
                <div className="post__comments">
                    {this.state.loading
                    ?<p style={{padding: "10px 20px", color: "lightgray" ,fontSize: "16px"}}>Loading......</p>
                    :this.state.comments.map(ele=>{
                        return <Comment key={ele.id} username={ele.data.username} comment={ele.data.comment} />
                    })
                    }
                </div>
            </div>
        )
    }
};


export default Post;