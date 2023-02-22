import React, { Component } from 'react';
import './clients.css'
import axios from 'axios'
import $ from 'jquery'

class Clients extends Component{
    state={
        clients:[],
        contacts:[],
        clientInfo:{
                name:'',
                client_code:'',
            },
        clientContacts:[]
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/clients/getAllAPI/')
            .then(res=>{
                this.setState({clients:res.data})
            })
            .catch(error=>{
                console.log(error)
            })

        axios.get('http://127.0.0.1:8000/contacts/getAllAPI/')
            .then(res=>{
                this.setState({contacts:res.data})
            })
            .catch(error=>{
                console.log(error)
            })

        axios.get('http://127.0.0.1:8000/contacts/getContactClientLinkAllAPI/')
            .then(res=>{
                this.setState({clientContacts:res.data})
            })
            .catch(error=>{
                console.log(error)
            })
        }

    setClientInfo=(event)=>{
        var letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        var numbers='0123456789'.split('')
        const clientInfo=this.state.clientInfo
        clientInfo['name']=event.currentTarget.value

        var randomLetter1 =letters[Math.floor(Math.random()*letters.length)]
        var randomLetter2 =letters[Math.floor(Math.random()*letters.length)]
        var randomNumber1 =numbers[Math.floor(Math.random()*numbers.length)]
        var randomNumber2 =numbers[Math.floor(Math.random()*numbers.length)]
        var randomNumber3 =numbers[Math.floor(Math.random()*numbers.length)]

         var x=clientInfo['name'].split(' ').length>2?
               clientInfo['name'].split(' ')[0][0]+clientInfo['name'].split(' ')[1][0]+clientInfo['name'].split(' ')[2][0]+randomNumber1+randomNumber2+randomNumber3
              :clientInfo['name'].split(' ').length===2?
               clientInfo['name'].split(' ')[0][0]+clientInfo['name'].split(' ')[1][0]+randomLetter1+randomNumber1+randomNumber2+randomNumber3
              :clientInfo['name'].split(' ').length===1?
               clientInfo['name'].split(' ')[0][0]+randomLetter1+randomLetter2+randomNumber1+randomNumber2+randomNumber3
              :''

        clientInfo['client_code']=x.toUpperCase()

        this.setState({clientInfo:clientInfo})
    }

    saveClient=event=>{
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/clients/postAPI/', this.state.clientInfo)
        .then(res=>{
            $('.newClientForm').addClass('d-none')
            axios.get('http://127.0.0.1:8000/clients/getAllAPI/')
                .then(res=>{
                    this.setState({clients:res.data})
                })
                .catch(error=>{
                    console.log(error)
                })
            })
        .catch(error=>{
            console.log(error.error)
        })
    }

    render(){
            return (
                    <div className='container'>
                        <div className='row text-center my-3 justify-content-center align-self-center'>
                            <div className='col-6'>
                                <p className='text-center title'><strong>Clients</strong></p>
                            </div>
                            <div className='col-6 my-auto'>
                                <button className='btn btn-success ' onClick={()=>$('.newClientForm').removeClass('d-none')}>Add client <i className='fa fa-user-plus'></i></button>
                            </div>
                        </div>

                        {this.state.clients.length!==0?
                        <div>
                            <div className='row  border-bottom mb-1'>
                                <div className='col-2'>
                                    <p className='font-weight-bold'>No.</p>
                                </div>

                                <div className='col-4'>
                                    <p className='font-weight-bold'>Names</p>
                                </div>

                                <div className='col-4'>
                                    <p className='font-weight-bold'>Client code</p>
                                </div>

                                <div className='col-2'>
                                    <p className='font-weight-bold text-center'>Contacts</p>
                                </div>
                          </div>
                            {this.state.clients.map((client, index)=><div className='row'>
                                                                            <div className='col-2'>
                                                                                <p>{++index}.</p>
                                                                            </div>

                                                                            <div className='col-4'>
                                                                                <p>{client.name}</p>
                                                                            </div>

                                                                            <div className='col-4'>
                                                                                <p>{client.client_code}</p>
                                                                            </div>

                                                                            <div className='col-2'>
                                                                                <p className='text-center'>{this.state.clientContacts.filter(clientContact=>clientContact.client.id===client.id).length}</p>
                                                                            </div>
                                                                      </div>
                                                                )}
                            </div>
                                                            :<p className='text-center'>No client(s) found</p>}

                        <div className='newClientForm shadow d-none'>
                            <p className='text-center'><strong>Add New Client</strong></p>
                            <form onSubmit={this.saveClient}>
                                <input className='form-control' type='text' placeholder='Enter Surname, First name, Last name' onChange={(e)=>this.setClientInfo(e)} required/>
                                <br />
                                <input className='form-control btn-primary' type='submit' /><br />
                                <button className='form-control btn-primary' type='button' onClick={()=>$('.newClientForm').addClass('d-none')}>Cancel</button>
                            </form>
                        </div>

                    </div>
            )
        }
}


export default Clients;