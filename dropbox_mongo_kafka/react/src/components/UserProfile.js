import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import * as API from '../api/API';


class UserProfile extends  Component{

    state = {
        fname : '',
        lname : '',
        overview : '',
        work: '',
        highschool: '',
        bachelors: '',
        masters:'',
        otheredu:'',
        mobile:'',
        lifeevent:'',
        music:'',
        show:'',
        sports:''

    };

    componentWillMount(){
        API.fetchUserProfile({}).then((response) => {
            console.log("fetch profile response", response)
            this.setState({
                fname:response.data[0].fname,
                lname:response.data[0].lname,
                overview:response.data[0].overview,
                work: response.data[0].work,
                highschool: response.data[0].highschool,
                bachelors:response.data[0].bachelors,
                masters:response.data[0].masters,
                otheredu:response.data[0].otheredu,
                mobile:response.data[0].mobile,
                lifeevent:response.data[0].lifeevent,
                music:response.data[0].music,
                show:response.data[0].show,
                sports:response.data[0].sports

            })
            console.log("current state ",this.state)
        });

    };

    saveUserProfile = (userdata) => {
        console.log("I am going to save profile")
        API.saveUserProfile(userdata)
            .then((status) => {
                console.log("response after saving profile ",status)
                if (status.status === '201') {
                    console.log("User Profile Updated.")
                    alert("Your Profile has been updated.")
                     } else if (status === 401) {
                    console.log("Error in user profile update")
                }
            });
    };


    render(){
        var tablestyle={textAlign:'left'};

        return(
            <div>
                <div >
                    <Panel className="profile-panel" style={tablestyle}>
                        <form  >
                            <fieldset>
                                <table>

                                    <tr>

                                        <td>
                                            First Name </td><td> <input className={`form-group `}
                                                                      placeholder="First Name"
                                                                      type="text"
                                                                      value={this.state.fname}
                                                                      onChange={(event)=>{
                                                                          this.setState({
                                                                              fname:event.target.value
                                                                          });
                                                                      }}
                                                                      required
                                                                      autoFocus
                                    />
                                    </td>
                                    </tr><tr>

                                    <td>
                                        Last Name </td><td> <input className={`form-group `}
                                                                  placeholder="Last Name"
                                                                  type="text"
                                                                  value={this.state.lname}
                                                                  onChange={(event)=>{
                                                                      this.setState({
                                                                          lname:event.target.value
                                                                      });
                                                                  }}
                                                                  required
                                                                  autoFocus
                                />
                                </td>
                                </tr>



                                    <tr>

                                    <td>
                                        OverView </td><td> <input className={`form-group `}
                                                       placeholder="OverView"
                                                       type="text"
                                                       value={this.state.overview}
                                                       onChange={(event)=>{
                                                           this.setState({
                                                               overview:event.target.value
                                                           });
                                                       }}
                                                       required
                                                       autoFocus
                                />
                                    </td>
                                </tr>
                                <tr><td>
                                    Work </td><td> <input className={`form-group `}
                                                       placeholder="Work"
                                                       type="text"
                                                       value={this.state.work}
                                                       onChange={(event)=>{
                                                           this.setState({
                                                               work:event.target.value
                                                           });
                                                       }}
                                                       required
                                                       autoFocus
                                />
                                </td></tr>
                                <tr><td>
                                    High School </td><td> <input className={`form-group `}
                                                            placeholder="Eduction(High School)"
                                                            type="text"
                                                            value={this.state.highschool}
                                                            onChange={(event)=>{
                                                                this.setState({
                                                                    highschool:event.target.value
                                                                });
                                                            }}
                                                            required
                                                            autoFocus
                                />
                                </td></tr>

                                    <tr><td>
                                    Undergraduate </td><td>  <input className={`form-group `}
                                                              placeholder="Eduction(Undergraduate)"
                                                              type="text"
                                                              value={this.state.bachelors}
                                                              onChange={(event)=>{
                                                                  this.setState({
                                                                      bachelors:event.target.value
                                                                  });
                                                              }}
                                                              required
                                                              autoFocus
                                />
                                    </td></tr>
                                    <tr><td>
                                    Graduate </td><td>   <input className={`form-group `}
                                                              placeholder="Eduction(Graduate)"
                                                              type="text"
                                                              value={this.state.masters}
                                                              onChange={(event)=>{
                                                                  this.setState({
                                                                      masters:event.target.value
                                                                  });
                                                              }}
                                                              required
                                                              autoFocus
                                />
                                    </td></tr>
                                    <tr><td>
                                    Other Education Details </td><td>  <input className={`form-group `}
                                                           placeholder="Eduction(Other Details)"
                                                           type="text"
                                                           value={this.state.otheredu}
                                                           onChange={(event)=>{
                                                               this.setState({
                                                                   otheredu:event.target.value
                                                               });
                                                           }}
                                                           required
                                                           autoFocus
                                />
                                    </td></tr>
                                    <tr><td>
                                    Mobile </td><td>   <input className={`form-group `}
                                                         placeholder="Mobile"
                                                         type="text"
                                                         value={this.state.mobile}
                                                         onChange={(event)=>{
                                                             this.setState({
                                                                 mobile:event.target.value
                                                             });
                                                         }}
                                                         required
                                                         autoFocus
                                />
                                    </td></tr>
                                    <tr><td>
                                    Life Events </td><td>  <input className={`form-group `}
                                                         placeholder="Impotant life events"
                                                         type="text"
                                                         value={this.state.lifeevent}
                                                         onChange={(event)=>{
                                                             this.setState({
                                                                 lifeevent:event.target.value
                                                             });
                                                         }}
                                                         required
                                                         autoFocus
                                />
                                    </td></tr>
                                    <tr><td>
                                    Music </td><td>  <input className={`form-group `}
                                                        placeholder="Music"
                                                        type="text"
                                                        value={this.state.music}
                                                        onChange={(event)=>{
                                                            this.setState({
                                                                music:event.target.value
                                                            });
                                                        }}
                                                        required
                                                        autoFocus
                                />
                                    </td></tr>
                                    <tr><td>
                                    Shows </td><td>  <input className={`form-group `}
                                                        placeholder="Show"
                                                        type="text"
                                                        value={this.state.show}
                                                        onChange={(event)=>{
                                                            this.setState({
                                                                show:event.target.value
                                                            });
                                                        }}
                                                        required
                                                        autoFocus
                                />
                                    </td></tr>
                                    <tr><td>
                                    Sprots </td><td>   <input className={`form-group `}
                                                          placeholder="Sports"
                                                          type="text"
                                                          value={this.state.sports}
                                                          onChange={(event)=>{
                                                              this.setState({
                                                                  sports:event.target.value
                                                              });
                                                          }}
                                                          required
                                                          autoFocus
                                />
                                    </td></tr>
                                </table>

                                <Button  onClick={() => this.saveUserProfile(this.state)} bsSize="sm" bsStyle="success" block>Update</Button>

                            </fieldset>
                        </form>

                    </Panel>

                </div>

            </div>
        )
    }
}

export default UserProfile;