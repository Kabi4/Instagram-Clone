import React from 'react';
import './Comment.css';

const Comment = (props) => {
    return (
        <div className="comment">
            <h4 className="comment__user">{props.username}</h4>
            <p className="comment__detials">{props.comment}</p>
        </div>
    )
};

export default Comment;
