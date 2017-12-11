import React,{Component} from 'react';
import * as API from '../api/API';
import MobileTearSheet from '../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ContentSend from 'material-ui/svg-icons/content/send';
import {blue500} from 'material-ui/styles/colors';
import FileDownload from 'react-file-download';
import UserProfile from './UserProfile';
import {Checkbox} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';


var tablestyle={textAlign:'left'};

var fl_right={color:"blue",float:"left"}

var f1={float:"left"}

var bcolor={backgroundColor:"#f7f7f9",textAlign:"left"}


    export class MainLayout extends Component{

        constructor(props) {
            super(props);

            this.state = {
                child1: UserProfile,
                enableView: 1,
                files: [],
                sharedFiles : [],
                staredList: [],
                origStaerdList: [],
                logs: [],
                rootdir: '',
                pathHistory: [],
                starPathHistory: [],
                userid: '',
                newdirname: '',
                newdirlen: 0,
                open: false,
                address: '',
                share_enable: false,
                file_to_share: {},
                show_modal:false,
                show_modal_group:false,
                group_address:''
            }
        }
        componentWillMount(){

            var userid = localStorage.getItem("userid");
            var rootdir = "./uploads/"+localStorage.getItem("rootdir");

            this.setState({
                child1: UserProfile,
                enableView:1,
                rootdir:rootdir,
                userid:userid
            });

            this.getfile(rootdir);
            this.getlogs();
            this.getShareFile();
            this.getStareFile()
        }

        getStareFile= () =>{
            API.getStarFiles()
                .then((res) => {
                    console.log("response in get starred files is ",res)
                    if (res.status === 201) {
                        res.json().then((data)=> {
                            console.log("data is ", data)
                            this.setState({
                                staredList : data,
                                origStaerdList : data
                            });
                        })}
                    else if(res.status===204)
                    {

                        console.log("got 204 status in starred files")
                        this.setState({
                            origStaerdList: []
                        });
                    }
                });
        };


        getShareFile= () =>{
            API.getShareFiles()
                .then((res) => {
                    console.log("response in get shared files is ",res)
                    if (res.status === 200) {
                        res.json().then((data)=> {
                            console.log("data is ", data)
                            this.setState({
                                sharedFiles : data
                            });
                        })}
                    else if(res.status===204)
                    {

                        console.log("got 204 status")
                        this.setState({
                            sharedFiles: []
                        });
                    }
                });
        };

        create = (data) => {
            if(data=='group')
                this.setState({show_modal_group: true})


        }
        close = (text) => {
                if(text=='share')
                    this.setState({show_modal: false});
                else if(text=='group')
                    this.setState({show_modal_group:false});
        };
        open = () => {
            this.setState({show_modal_group:true})

        };

        getBack = () =>{
            let len = this.state.pathHistory.length
            if(len>1){
                this.getfile(this.state.pathHistory[len-2]);
                console.log("Filepath b4",this.state.pathHistory)
                this.state.pathHistory.splice(len-2, 2);
                console.log("Filepath after",this.state.pathHistory)
            }else{
                this.getfile(this.state.rootdir);
                this.state.pathHistory.splice(len-1, 1);
            }
        };
        getBackStar = () =>{
            let len = this.state.starPathHistory.length;
                if(len>1){
                    this.getStarChild(this.state.starPathHistory[len-2]);
                    this.state.starPathHistory.splice(len-2, 2);
                 }else{
                    this.setState({staredList:this.state.origStaerdList})
                    this.state.starPathHistory.splice(len-1, 1);
                }
        };

        getStarChild= (filepath) =>{
            var data = {'dir':filepath};
            API.getfiles(data)
                .then((res) => {
                    if (res.status === '201') {
                        if(filepath!=this.state.starPathHistory[this.state.starPathHistory.length-1]){
                            this.state.starPathHistory.push(filepath);
                        }
                        this.setState({
                            staredList : res.filelist
                        });
                    }
                })
        };

        getfile= (filepath) =>{
            var data = {'path':filepath};

            API.getfiles(data)
                .then((res) => {
                    console.log("response in get files is ",res)
                    if (res.status === 201) {
                        res.json().then((data)=> {
                            console.log("data is ", data)

                            this.setState({
                                files: data.files
                            });
                        })}
                    else if(res.status===204)
                        {
                            console.log("got 204 status")
                            this.setState({
                                files: []
                            });
                        }
                        });
                        if(filepath!=this.state.pathHistory[this.state.pathHistory.length-1]){
                            this.state.pathHistory.push(filepath);
                        }

                        this.getStars();
        };


        getlogs = () =>
            API.getlogs()
                .then((res) => {
                    console.log("response here is  ",res)
                    if (res.status === 201) {
                        res.json().then((data)=>{
                            console.log("Got data from logs",data)
                            this.setState({
                                logs: data
                            });
                        })

                    }
                })

        getStars = () =>{
            console.log("Comparing starred files")
            this.state.files.map((file)=>{
                    file.isStar = false;
                }
            )

            console.log(this.state.files)
            console.log(this.state.origStaerdList)
            this.state.files.map((file1)=>{
                this.state.origStaerdList.map((file2)=>{
                    if(file2.id === file1.id){
                        file1.isStar = true
                        }
                    }
                )
                }
            )
            console.log("Got starred ", this.state.files)
            this.setState({files:this.state.files})
        }


        downloadfile= (filepath,filename) =>{

            var data = {'path':filepath,'name':filename};
            console.log("My data in download", data)
            API.downloadfile(data)
                .then((res) => {
                    FileDownload(res.data, filename);

                })
        };

        createFolder= (newdirname) =>{
            var dirpath = "";
            var index = this.state.pathHistory.length;
            if(this.state.pathHistory.length>0){
                dirpath = (this.state.pathHistory[index-1]);
            }else{
                dirpath = (this.state.rootdir);
            }
            console.log("I am in create folder with path ", dirpath);
            var data = {'foldername':newdirname, 'dirpath': dirpath};
            API.createdir(data)
                .then((status) => {
                    if (status.status === 201) {
                        console.log("Folder created :)")
                        this.getfile(dirpath);
                    }
                });
        };

        onFolderClick= (dirpath,dirname) =>{
             var newpath = dirpath+'/'+dirname
                console.log(newpath, "has been clicked");
                this.setState({rootdir:newpath},this.getfile(newpath));
        };

        onStarFolderClick= (dirpath,dirname) =>{
            var newpath = dirpath+'/'+dirname
            console.log(newpath, "has been clicked in star");
            this.getStarChild(newpath);
        };

        handleFileUpload = (event) => {
            let u_path="";
            if(this.state.pathHistory.length>0){
                u_path = (this.state.pathHistory[this.state.pathHistory.length-1]);
            }else{
                u_path = (this.state.rootdir);
            }
            const payload = new FormData();
            //var data ={'myfile':event.target.files[0], 'path':this.state.rootdir}
            payload.append('myfile', event.target.files[0]);
            console.log("root dir in this page ", this.state.rootdir)
            payload.append('path',u_path);
            console.log("payload path ",payload.get('path'))
            API.uploadFile(payload)
                .then((status) => {
                    if (status.status === 201) {
                        console.log("I am here ",status.status)
                        this.getfile(this.state.rootdir)
                    }
                    else if(status.status === 203)
                    {
                        this.props.history.push("/login")
                    }
                });

        };

        shareButton = (name) =>
        {
            this.setState({
                show_modal:true,
                share_enable:false,
                file_to_share:name
                })
        }


        shareFile = (address) =>{
            console.log("In share file at react side")

            if (address === null) {
                console.log("User cancelled the prompt.");
            }
            else {
                address = address.trim();
                if(address === "")
                {
                    console.log("User cancelled the prompt.");
                }
                else {
                    let sharingIds;
                    sharingIds = address.split(";");
                    let data = {
                        userdata:[],
                        itemid: this.state.file_to_share
                    };
                    sharingIds.every((id) => {
                        if (id === "") {
                            sharingIds.splice(sharingIds.indexOf(id), 1);
                            return id;
                        }
                        data.userdata.push(id);
                        return id;
                    });
                    console.log(data);
                    API.doShareData(data).then((response) => {
                        //alert("i am back")
                        console.log("status is ",response.status);
                        if(response.status === 200){

                            alert("Shared successfully")
                            this.close('share')
                        }
                        else if (response.status === 301){
                            this.close('share')
                            alert("File has been already share with this user.")

                        }
                    });
                }
            }
        }

        createGroup = (address) =>{
            alert("In create group at react side ",address)

        }

        handleStar(event,fid,fname,fpath,isdir) {
            let u_path="";
            if(this.state.pathHistory.length>0){
                u_path = (this.state.pathHistory[this.state.pathHistory.length-1]);
            }else{
                u_path = (this.state.rootdir);
            }
            var checked = event.target.checked;
            var data = {'file_id':fid,
                         'file_name':fname,
                        'file_path':fpath,
                        'isdir':isdir
            };
            if(checked){
                API.markStar({id:fid,status:true}).then((res) => {
                    this.getfile(u_path);
                    this.getStareFile();
                });
            }
            else{
                API.unmarkStar({id:fid,status:false}).then((res) => {
                    this.getfile(u_path);
                    this.getStareFile();
                });
            }
        };

        /*deletefileconfirm=(fid)=>{
            console.log("Confirm is ",typeof confirmable)
            var r = confirmable("Are you sure you wanna delete this file ? Once deleted, cannot be recovered.");
            console.log("r is ",r)
            if (r == true) {
                this.deletefile(fid)
            } else {
                alert("File/Folder not deleted")
            }
        }*/

        deletefile= (file) =>{
            let u_path="";
            if(this.state.pathHistory.length>0){
                u_path = (this.state.pathHistory[this.state.pathHistory.length-1]);
            }else{
                u_path = (this.state.rootdir);
            }
            API.deletefile(file)
                .then((status) => {
                    console.log("delete file status ",status)
                    if (status.status === 200) {
                        this.getfile(u_path);
                        this.getStareFile();
                    }
                    else if (status.status === 204) {
                        alert("some error occurred")
                    }
                });
        };


        renderPage()
        {
            var mr80={marginRight:150};
            var bgcolor={backgroundColor:'white'};
                return (
                <div className="row">
                    <div className="col-xs-3 col-md-3 col-sm-3">
                        <MobileTearSheet>
                            <List>
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="Upload File"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 1
                                        });
                                    }}
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="My recent activity"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 2
                                        });
                                    }}
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="My Profile"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 3
                                        });
                                    }}
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="My groups"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 4
                                        });
                                    }}
                                />

                            </List>
                        </MobileTearSheet>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6">
                        <div className="card col-sm-12"  >
                            <div className="card-body">
                                <h4 style={tablestyle}>Your Recent Activity</h4>
                                {
                                    this.state.logs.map((log) => {
                                        return (
                                            <div style={bcolor}>

                                                    <div style={bcolor} role="alert">
                                                        <div style={mr80}>File Name : { log.file_name } </div>
                                                        <div>  <span>Operation : {log.action_type}</span></div>
                                                        <div>
                                                            <span aria-hidden={true}>Date Time : {(new Date(log.creation_time)).toUTCString()}</span>
                                                        </div>
                                                        <br/>
                                                    </div>

                                            </div>
                                        );
                                    })
                                }
                            </div>

                        </div>
                    </div>
                    <div className="col-xs-3 col-md-3 col-sm-3">
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
                                        leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                        primaryText="Upload File"
                                        onClick={(event) => {
                                            this.setState({
                                                enableView: 1
                                            });
                                        }}
                                    />
                                    <ListItem
                                        leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                        primaryText="My recent activity"
                                        onClick={(event) => {
                                            this.getlogs()
                                            this.setState({
                                                enableView: 2
                                            });

                                        }}
                                    />
                                    <ListItem
                                        leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                        primaryText="My Profile"
                                        onClick={(event) => {
                                            this.setState({
                                                enableView: 3
                                            });
                                        }}
                                    />
                                    <ListItem
                                        leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                        primaryText="My groups"
                                        onClick={(event) => {
                                            this.setState({
                                                enableView: 4
                                            });
                                        }}
                                    />

                                </List>
                            </MobileTearSheet>
                        </div>
                        <div className="col-xs-6 col-md-6 col-sm-6">
                            <div style={{display: this.state.share_enable ? 'inline-block' : 'none' }}>
                                <br/>
                            <input type='email' onChange={(event) => {
                                const address=event.target.value
                                this.setState({
                                    address: event.target.value
                                });

                            }}
                            />
                            &nbsp; &nbsp;
                            <button onClick={() =>this.shareFile(this.state.address)}>Share</button>
                            </div>
                            <h3  style={tablestyle}>
                                Starred Files
                            </h3>
                            <div style={tablestyle}> <button className="btn btn-primary" onClick={() => this.getBackStar()}>
                                Back
                            </button></div>
                            <hr/>
                            <table className="table" style={tablestyle}>
                                {this.state.staredList.map(file=>
                                    (file.type==='d') ?
                                        (
                                            <tr>
                                                <td>
                                                    <button className="btn btn-outline-primary" onClick={()=>this.onStarFolderClick(file.path, file.name)}>{file.name}</button>
                                                </td>
                                                <td>
                                                    {(this.state.staredList === this.state.origStaerdList) ?
                                                        (<Checkbox checked={true} value={file.path}
                                                                   onChange={(e) => this.handleStar(e, file.id, file.name, file.path, false)}>Star</Checkbox>)
                                                        :
                                                        (<p></p>)
                                                    }
                                                    </td>
                                                <td>   </td>
                                                <td></td>
                                            </tr>
                                        )
                                        :(
                                            <tr>
                                                <td>
                                                    <a onClick={() => this.downloadfile(file.path, file.name)}>{file.name}</a>
                                                </td>
                                                <td>
                                                    {(this.state.staredList === this.state.origStaerdList) ?
                                                        (<Checkbox checked={true} value={file.path}
                                                                   onChange={(e) => this.handleStar(e, file.id, file.name, file.path, false)}>Star</Checkbox>)
                                                        :
                                                        (<p></p>)
                                                    }
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        )
                                )}

                            </table>
                            <h3 style={tablestyle}>
                               Files
                            </h3>
                            <div  style={tablestyle}> <button className="btn btn-primary"   onClick={() => this.getBack()}>
                                Back
                            </button></div>
                            <hr/>
                            <table className="table" style={tablestyle}>
                                    {this.state.files.map(file=>
                                        (file.type==='d') ?
                                        (
                                        <tr>
                                            <td>
                                            <button className="btn btn-outline-primary" onClick={()=>this.onFolderClick(file.path, file.name)}>{file.name}</button>
                                            </td>
                                            <td>
                                                <Checkbox checked={file.isStar} value={file.path} onChange={(e) => this.handleStar(e,file.id,file.name,file.path,false)} >Star</Checkbox>      </td>
                                            <td>
                                                <button className="btn btn-outline-danger" onClick={() => {if(window.confirm('Delete the file/folder?')) {this.deletefile(file)};}}>Delete</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.shareButton(file.id) }>Share</button>
                                            </td>
                                        </tr>
                                        )
                                    :(
                                        <tr>
                                            <td>
                                                <a href={file.path+'/'+file.name} download>{file.name}</a>
                                            </td>

                                            <td>
                                                <Checkbox checked={file.isStar} value={file.path} onChange={(e) => this.handleStar(e,file.id,file.name,file.path,true)} >Star</Checkbox>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-danger" onClick={() => {if(window.confirm('Delete the file/folder?')) {this.deletefile(file)};}}>Delete</button>
                                            </td>
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.shareButton(file.id) }>Share</button>
                                            </td>
                                        </tr>
                                        )
                                    )}

                            </table>

                            <h3 style={tablestyle}>
                                Files shared with you
                            </h3>
                            <div  style={tablestyle}> <button className="btn btn-primary"   onClick={() => this.getBack()}>
                                Back
                            </button></div>
                            <hr/>
                            <table className="table" style={tablestyle}>
                                {this.state.sharedFiles.map(file=>
                                    (file.type==='d') ?
                                        (
                                            <tr>
                                                <td>
                                                    <button className="btn btn-outline-primary" onClick={()=>this.onFolderClick(file.path, file.name)}>{file.name}</button>
                                                </td>
                                            </tr>
                                        )
                                        :(
                                            <tr>
                                                <td>
                                                    <a href={file.path+'/'+file.name} download>{file.name}</a>
                                                </td>

                                            </tr>
                                        )
                                )}

                            </table>
                        </div>

                        <div>
                            <Modal show={this.state.show_modal} onHide={() => {
                                this.close('share')
                            }}>

                                <Modal.Body>
                                    <p>Enter semicolon seperated emails to share file</p>
                                    <input type='email' onChange={(event) => {
                                        const address=event.target.value
                                        this.setState({
                                            address: event.target.value
                                        });

                                    }}
                                    />
                                    &nbsp; &nbsp;
                                    <button onClick={() =>this.shareFile(this.state.address)}>Share</button>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="col-sm-5 col-md-5">
                                        <button onClick={() => {
                                            this.close('share')
                                        }}>Close
                                        </button>
                                    </div>
                                </Modal.Footer>
                            </Modal>

                        </div>

                        <div className="col-xs-3 col-md-3 col-sm-3">
                             <h4 style={fl_right}>Upload File</h4>
                            <div>

                            <input
                                className={'fileupload'}
                                type="file"
                                name="mypic"
                                onChange={this.handleFileUpload}
                            />
                            </div>
                            &nbsp; &nbsp;

                            <h4 style={fl_right}>Create Folder</h4>



                            <div>

                                &nbsp; &nbsp;
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

                                &nbsp; &nbsp;
                                    <div>
                                <button style={f1} className="btn btn-primary" disabled={this.state.newdirlen<=0} onClick={()=>this.createFolder(this.state.newdirname)}>Create</button>
                                    </div>
                                    </div>
                        </div>
                    </div>
                        )}

        renderPage3()
        {
            return (
                <div className="row">
                    <div className="col-xs-3 col-md-3 col-sm-3">
                        <MobileTearSheet>
                            <List>
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="Upload File"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 1
                                        });
                                    }}
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="My recent activity"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 2
                                        });
                                    }}
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="My Profile"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 3
                                        });
                                    }}
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="My groups"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 4
                                        });
                                    }}
                                />

                            </List>
                        </MobileTearSheet>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6">
                        <div className="card col-sm-8"  >
                            <div className="card-body">
                                <h4>My Profile</h4>
                                {React.createElement(this.state.child1)}
                            </div>

                        </div>
                    </div>
                    <div className="col-xs-3 col-md-3 col-sm-3">
                    </div>

                </div>)}

        renderPage4()
        {
            return (
                <div className="row">
                    <div className="col-xs-3 col-md-3 col-sm-3">
                        <MobileTearSheet>
                            <List>
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="Upload File"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 1
                                        });
                                    }}
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="My recent activity"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 2
                                        });
                                    }}
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="My Profile"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 3
                                        });
                                    }}
                                />
                                <ListItem
                                    leftAvatar={<Avatar icon={<ContentSend/>} backgroundColor={blue500}/>}
                                    primaryText="My groups"
                                    onClick={(event) => {
                                        this.setState({
                                            enableView: 4
                                        });
                                    }}
                                />

                            </List>
                        </MobileTearSheet>
                    </div>
                    <div className="col-xs-6 col-md-6 col-sm-6">
                        <table>
                        <tr>
                            <button style={f1} className="btn btn-primary" onClick={()=> {this.create('group')}}>create group</button>
                        </tr>
                        <tr>
                            <h3 style={f1}>My Groups</h3>
                        </tr>
                          </table>

                            <div>
                            <Modal show={this.state.show_modal_group} onHide={() => {
                                this.close('group')
                            }}>

                                <Modal.Body>
                                    <p>Enter comma seperated emails to create a group</p>
                                    Group Name :
                                    <input type="text"/>
                                    <br/>
                                    Email:
                                    <input type='email' onChange={(event) => {
                                        const address=event.target.value
                                        this.setState({
                                            group_address: event.target.value
                                        });

                                    }}
                                    />
                                    &nbsp; &nbsp;
                                    <br/>
                                    <button onClick={() =>this.createGroup(this.state.group_address)}>Create</button>
                                </Modal.Body>
                                <Modal.Footer>
                                    <div className="col-sm-5 col-md-5">
                                        <button onClick={() => {
                                            this.close('group')
                                        }}>Close
                                        </button>
                                    </div>
                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
                    <div className="col-xs-3 col-md-3 col-sm-3">
                    </div>

                </div>)}



        render()
        {
            console.log(this.state.files)
           if(this.state.enableView === 2)
           { return this.renderPage();}
           else if(this.state.enableView === 1)
           { return this.renderPage2();}
           else if(this.state.enableView === 3)
           { return this.renderPage3();}
           else if(this.state.enableView === 4)
           { return this.renderPage4();}
        }
}





