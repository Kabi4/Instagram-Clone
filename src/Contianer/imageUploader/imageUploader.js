import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import firebase from 'firebase';

import {db , storage} from './../../Firebase/Firebase';


import './imageUploader.css';

class ImageUploader extends Component {
    state = {
        image: null,
        caption: '',
        progressing: 0,
        posting: false
    }
    imageSourceChangeHandler = (e)=>{
        e.preventDefault();
        if(e.target.files[0]){
            this.setState({image: e.target.files[0]})
        }else{
            this.setState({image: null})
        }
    }

    uploadHandler = (e)=>{
        e.preventDefault();
        this.setState({posting: true});
        const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({progressing: progress});
            },
            (error)=>{
                alert(error.message);
            },
            ()=>{
                storage.ref("images")
                .child(this.state.image.name)
                .getDownloadURL()
                .then(url=>{
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: this.state.caption,
                        imgurl: url,
                        username: this.props.username,
                    })
                    this.setState({
                        image: null,
                        caption: '',
                        progressing: 0,
                        posting: false
                    })
                })
            }
        )
    }
    render() {
        return (
            <div className="uploader">
                <h4>{this.props.username}, Share Your Moments</h4>
                <progress style={{width: "100%",padding: "0px 0px"}} max={100} value={this.state.progressing} />
                <input type="text" placeholder="What's on your mind?" value={this.state.caption}  onChange={(e)=>{e.preventDefault();this.setState({caption: e.target.value})}} />
                <input type="file" onChange={(e)=>{this.imageSourceChangeHandler(e)}} />
                <Button disabled={this.state.posting} onClick={(e)=>{this.uploadHandler(e)}}>{this.state.posting?"Uploading...":"Upload"}</Button>
            </div>
        )
    }
};

export default ImageUploader;