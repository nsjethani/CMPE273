import React,{Component} from 'react';
import * as API from '../api/API';
import MobileTearSheet from '../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500} from 'material-ui/styles/colors';
import FileDownload from 'react-file-download';

var tablestyle={textAlign:'left'};

export class createDir extends Component{

    state = {
        dirname: '',
        ComponenetToBeRendered: '1',

    };

    componentWillMount(){
        this.setState({
            dirname: '',
            isNotEmpty: true
        });
    }

    render()
    {
        return(

            <div>
                <input className="form-control"
                       type="text"
                       label="Folder Name"
                       placeholder="Folder"
                       value={this.state.dirname}
                       onChange={(event) => {
                           this.setState({
                               dirname: event.target.value,
                               isNotEmpty : false
                           });
                       }}
                />
                <button disabled={this.state.isNotEmpty}>Create</button>
            </div>
        )
    }
}

    export class MainLayout extends Component{

        constructor(props) {
            super(props);

            this.state = {
                child1: createDir,
                enableView:false,
                files: [],
                rootdir:'',
                userid:'',
                newdirname:'',
                newdirlen:0
            };
        }
        componentWillMount(){

            var userid = localStorage.getItem("userid");
            var rootdir = localStorage.getItem("rootdir");

            this.setState({
                child1: createDir,
                enableView:false,
                rootdir:rootdir,
                userid:userid
            });

            this.getfile(rootdir);
        }


        getfile= (filepath) =>{
            var data = {'dir':filepath};
            API.getfiles(data)
                .then((res) => {
                    if (res.status === '201') {

                        this.setState({
                            files: res.filelist
                        });
                    }
                })
        };

        downloadfile= (filepath,filename) =>{

            var data = {'path':filepath,'name':filename};
            console.log("My data in download", data)
            API.downloadfile(data)
                .then((res) => {
                    FileDownload(res.data, filename);

                })
        };

        handleFileUpload = (event) => {

            const payload = new FormData();
            //var data ={'myfile':event.target.files[0], 'path':this.state.rootdir}
            payload.append('myfile', event.target.files[0]);
            console.log("root dir in this page ", this.state.rootdir)
            payload.append('path',this.state.rootdir);
            console.log("payload path ",payload.get('path'))
            API.uploadFile(payload)
                .then((status) => {
                    if (status.status === '201') {
                        console.log("I am here ",status.status)
                        this.getfile(this.state.rootdir)
                    }
                });

        };

        renderPage()
        {
                return (
                <div className="row">
                    <div className="col-xs-3 col-md-3 col-sm-3">
                        <MobileTearSheet>
                            <List>
                                <ListItem
                                    leftAvatar={<Avatar icon={<ActionAssignment/>} backgroundColor={blue500}/>}
                                    primaryText="Upload File"
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<FileFolder/>} backgroundColor={blue500}/>}
                                    primaryText="Create New Folder"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: true
                                        });
                                    }}
                                />
                            </List>
                        </MobileTearSheet>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6">
                        {React.createElement(this.state.child1)}
                    </div>
                    <div className="col-xs-3 col-md-3 col-sm-3">

                        <TextField
                            ref="filename"
                            className={'fileupload'}
                            type="file"
                            name="mypic"
                            onChange={this.handleFileUpload}
                        />
                    </div>

                </div>)}


            renderPage2()
            {
                return (
                    <div className="row">
                        <div className="col-xs-3 col-md-3 col-sm-3">
                            <MobileTearSheet>
                                <List>
                                    <ListItem
                                        leftAvatar={<Avatar icon={<ActionAssignment/>} backgroundColor={blue500}/>}
                                        primaryText="Upload File"
                                    />
                                    <ListItem
                                        leftAvatar={<Avatar icon={<FileFolder/>} backgroundColor={blue500}/>}
                                        primaryText="Create New Folder"
                                        onClick={(event) => {
                                            this.setState({
                                                enableView: true
                                            });
                                        }}
                                    />
                                </List>
                            </MobileTearSheet>
                        </div>
                        <div className="col-xs-6 col-md-6 col-sm-6">
                            <table className="table" style={tablestyle}>
                                    {this.state.files.map(file=>
                                        <tr >
                                            <a onClick={()=>this.downloadfile(file.path,file.name)}>{file.name}</a>
                                        </tr>
                                    )}

                            </table>
                        </div>
                        <div className="col-xs-3 col-md-3 col-sm-3">
                            <div>
                            <TextField
                                className={'fileupload'}
                                type="file"
                                name="mypic"
                                onChange={this.handleFileUpload}
                            />
                            </div>
                            <div>
                                <input className="form-control"
                                       type="text"
                                       label="Folder Name"
                                       placeholder="Folder"
                                       value={this.state.dirname}
                                       onChange={(event) => {
                                           this.setState({
                                               newdirname: event.target.value,
                                               newdirlen: event.target.length
                                           });
                                       }}

                                />
                                <button disabled={this.state.newdirlen<=0}>Create</button>
                            </div>
                        </div>

                        </div>

                    </div>)
            }


        render()
        {
            console.log(this.state.files)
           if(this.state.enableView)
           { return this.renderPage();}
           else
           { return this.renderPage2();}
        }
    }




