import React, { Component } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar/Avatar'; 
class Post extends Component {
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
            </div>
        )
    }
};


export default Post;