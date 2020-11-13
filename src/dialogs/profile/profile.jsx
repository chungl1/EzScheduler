import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@rmwc/dialog'
import { Button } from '@rmwc/button'

import "./profile.css"

// remind of unsaved changes if attempted to close and editState = true

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen : false,
            accInfoEditState : false,
            personalInfoEditState : false,
            bioEditState : false,
            editState : false
        }
    }

    callBackFn = (val) => {
        var curState, newState
        console.log(val)
        switch(val) {
            case "Account Information":
                this.setState((state) => ({ accInfoEditState: !state.accInfoEditState }), () => console.log("accinfoeditstate:", this.state.accInfoEditState))
                break
            case "Personal Information":
                this.setState((state) => ({ personalInfoEditState: !state.personalInfoEditState }), () => console.log("personalinfoeditstate:", this.state.personalInfoEditState))
                break
            case "Bio":
                this.setState((state) => ({ bioEditState: !state.bioEditState }), () => console.log("bioeditstate:", this.state.bioEditState))
                break
        }

    }

    closeDialog = () => {
        console.log(this.state.editState)
        if(this.state.editState){
            return(
                <>
                <WarningDialog />
                </>
            )
        } else {
            this.setState({
                isOpen : false,
                accInfoEditState : false,
                personalInfoEditState : false,
                bioEditState : false,
                editState : false
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Dialog 
                    open={this.state.isOpen} 
                    onClose={() => this.setState({isOpen : false})}>
                        <DialogTitle style={{textAlign: "center"}}>Profile<br />Picture here<br />{this.props.userInfo["name"]}</DialogTitle>
                        <DialogContent>
                            <Edit
                            section="Account Information"
                            callBackFn={this.callBackFn.bind(this)}
                            editState={this.state.accInfoEditState}
                            /><br />
                            Username (ID): <div className="right-align">{this.props.userInfo.userName}</div><br />
                            Password: <div className="right-align">{this.props.userInfo.password}</div><br /><br />
                            <Edit
                            section="Personal Information"
                            callBackFn={this.callBackFn.bind(this)}
                            editState={this.state.personalInfoEditState}
                            /><br />
                            School: <div className="right-align">{this.props.userInfo.school}</div><br />
                            Major: <div className="right-align">{this.props.userInfo.major}</div><br />
                            Year: <div className="right-align">{this.props.userInfo.year}</div><br /><br />
                            <Edit
                            section="Bio"
                            callBackFn={this.callBackFn.bind(this)}
                            editState={this.state.bioEditState}
                            /><br />
                            {this.props.userInfo.bio}
                        </DialogContent>
                        <DialogActions style={{textAlign: "center"}}>
                            <WarningDialog 
                            state={this.state}
                            callBackFn={this.closeDialog.bind(this)}/>
                        </DialogActions>
                    </Dialog>
                </div>
                <div style={{textAlign : "right"}}><br />
                    <Button raised onClick={() => this.setState({isOpen : true})}>Profile</Button>
                </div>
            </div>
        )
    }
}

class WarningDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen : false
        }
    }

    editState = () => {
        if(!this.props.state.accInfoEditState && !this.props.state.bioEditState && !this.props.state.personalInfoEditState) {
            return (false)
        } else {
            return (true)
        }
    }

    checkEditState = (editState) => {
        if (editState) {
            this.setState({isOpen : true})
        } else {
            this.setState({isOpen : false})
            this.props.callBackFn()
        }
    }

    render() {
        let editState = this.editState()
        return(
            <div>
                <Dialog open={this.state.isOpen}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>You have unsaved changes, please save changes before 
                    closing this dialog
                    </DialogContent>
                    <DialogActions>
                        <Button raised onClick={() => this.setState({isOpen : false})}>Close</Button>
                    </DialogActions>
                </Dialog>

                <Button raised onClick={() => this.checkEditState(editState)}>Close</Button>
            </div>
        )
    }
}

function TextBoxToggle(props) {
    return(
        <div></div>
    )
}

// issue here
class Edit extends React.Component {
    constructor(props) {
        super(props)
    }

    buttonLabel = () => {
        if(this.props.editState) {
            return ("Save")
        } else {
            return ("Edit")
        }
    }
    render() {
        return(
            <div>
                {this.props.section}{" "}
                <div className="right-align"><Button onClick={() => this.props.callBackFn(this.props.section)}>{this.buttonLabel()}</Button></div>
            </div>
        )
    }
}

export default Profile