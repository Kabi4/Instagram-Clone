import React, { Component } from 'react';
import './Post.css';
import post from './../../Assets/Images/Post.jpg';
import Avatar from '@material-ui/core/Avatar/Avatar'; 
class Post extends Component {
    render() {
        return (
            <div className="post">
                <div className="post__avatar">
                    <Avatar 
                        src=""
                        alt="KushagraSingh"
                        children="K"
                    />
                    <p className="post__avatar__name">KushagraSingh</p>
                </div>
                <img className="post__image" src={post} alt="post" />
                <div className="post__caption">
                    <p className="post__caption__name">KushagraSingh</p>
                    <p className="post__caption__caption">The Nature is only thing which is pure.....</p>
                </div>
            </div>
        )
    }
};


export default Post;