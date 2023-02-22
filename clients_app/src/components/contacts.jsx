import React, { Component } from 'react';
import './clients.css'
import axios from 'axios'
import $ from 'jquery'

class Clients extends Component{
    state={
        clientContacts:[],
        clients:[],
        contacts:[],
        contactInfo:{
                name:'',
                surname:'',
                email_address:''
            },
        clientLinkInfo:{
            client:18,
            contact:11
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/contacts/getContactClientLinkAllAPI/')
            .then(res=>{
                this.setState({clientContacts:res.data})
            })
            .catch(error=>{
                console.log(error)
            })

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
        }

    setContactInfo=(event)=>{
        const contactInfo=this.state.contactInfo
        contactInfo[event.currentTarget.name]=event.currentTarget.value
        this.setState({contactInfo:contactInfo})
    }

    saveContact=event=>{
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/contacts/postAPI/', this.state.contactInfo)
        .then(res=>{
            $('.newClientForm').addClass('d-none')
            axios.get('http://127.0.0.1:8000/contacts/getAllAPI/')
                .then(res=>{
                    this.setState({contacts:res.data})
                })
                .catch(error=>{
                    console.log(error)
                })
            })
        .catch(error=>{
            console.log(error.error)
        })
    }

    setClientLinkInfo=(event)=>{
        const clientLinkInfo=this.state.clientLinkInfo
        clientLinkInfo[event.currentTarget.name]=event.currentTarget.value
        this.setState({clientLinkInfo:clientLinkInfo})

        console.log(clientLinkInfo)
    }

    saveContactClientLink=event=>{
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/contacts/postContactClientLinkAPI/', this.state.clientLinkInfo)
        .then(res=>{
            $('.clientContactForm').addClass('d-none')

            axios.get('http://127.0.0.1:8000/contacts/getContactClientLinkAllAPI/')
                .then(res=>{
                    this.setState({clientContacts:res.data})
                })
                .catch(error=>{
                    console.log(error)
                })
            })
        .catch(error=>{
            console.log(error.error)
        })
    }

    showContactClientWindow=(e)=>{
        $('.clientContactForm').removeClass('d-none')

        const clientLinkInfo=this.state.clientLinkInfo
        clientLinkInfo['contact']=parseInt(e)
        this.setState({clientLinkInfo:clientLinkInfo})
    }

    deleteContactClientLink=(e)=>{
        axios.get('http://127.0.0.1:8000/contacts/deleteContactClientLinkAPI/'+e)
            .then(res=>{
                axios.get('http://127.0.0.1:8000/contacts/getContactClientLinkAllAPI/')
                    .then(res=>{
                        this.setState({clientContacts:res.data})
                    })
                    .catch(error=>{
                        console.log(error)
                    })
            })
            .catch(error=>{
                console.log(error)
            })
    }

    render(){
            return (
                    <div className='container'>
                        <div className='row text-center my-3'>
                            <div className='col-6'>
                                <p className='text-center title'><strong>Contacts</strong></p>
                            </div>

                            <div className='col-3 my-auto'>
                                <button className='btn btn-success ' onClick={()=>$('.newClientForm').removeClass('d-none')}>Add contact</button>
                            </div>

                            <div className='col-3 my-auto'>
                                <button className='btn btn-danger' onClick={()=>$('.linkedContacts').removeClass('d-none')}>Contact Client Links</button>
                            </div>
                        </div>

                        {this.state.contacts.length!==0?
                        <div>
                            <div className='row  border-bottom mb-2'>
                                <div className='col-1'>
                                    <p className='font-weight-bold'>No.</p>
                                </div>

                                <div className='col-2'>
                                    <p className='font-weight-bold'>Surname</p>
                                </div>

                                <div className='col-3'>
                                    <p className='font-weight-bold'>Name</p>
                                </div>

                                <div className='col-2'>
                                    <p className='font-weight-bold'>Email</p>
                                </div>

                                <div className='col-2'>
                                    <p className='font-weight-bold text-center'>Linked Clients</p>
                                </div>

                                <div className='col-2'>
                                </div>
                          </div>
                            {this.state.contacts.map((contact, index)=><div className='row'>
                                                                            <div className='col-1'>
                                                                                <p>{++index}.</p>
                                                                            </div>

                                                                            <div className='col-2'>
                                                                                <p>{contact.surname}</p>
                                                                            </div>

                                                                            <div className='col-3'>
                                                                                <p>{contact.name}</p>
                                                                            </div>

                                                                            <div className='col-2'>
                                                                                <p>{contact.email_address}</p>
                                                                            </div>

                                                                            <div className='col-2'>
                                                                                <p className='text-center'>{this.state.clientContacts.filter(contactClient=>contactClient.contact.id===contact.id).length}</p>
                                                                            </div>

                                                                            <div className='col-2'>
                                                                                <button className='btn btn-primary' onClick={()=>this.showContactClientWindow(contact.id)}>Link client</button>
                                                                            </div>
                                                                      </div>
                                                                )}
                            </div>
                                                            :<p className='text-center'>No contact(s) found</p>}

                        <div className='newClientForm shadow d-none'>
                            <p className='text-center'><strong>Add New Contact</strong></p>
                            <form onSubmit={this.saveContact}>
                                <input className='form-control' type='text' placeholder='Enter surname' name='surname' onChange={(e)=>this.setContactInfo(e)} required/><br />
                                <input className='form-control' type='text' placeholder='Enter name' name='name' onChange={(e)=>this.setContactInfo(e)} required/><br />
                                <input className='form-control' type='email' placeholder='Enter emailaddress' name='email_address' onChange={(e)=>this.setContactInfo(e)} required/><br />
                                <input className='form-control btn-primary' type='submit' /><br />
                                <button className='form-control btn-primary' type='button' onClick={()=>$('.newClientForm').addClass('d-none')}>Cancel</button>
                            </form>
                        </div>

                        <div className='clientContactForm shadow d-none'>
                            <p className='text-center'><strong>Link Contact to a Client</strong></p>
                            <form onSubmit={this.saveContactClientLink}>
                                <select className='form-control dButton text-center subjectAnalysisTermSelect' name='client' onChange={this.setClientLinkInfo}>
                                    <option>Select client</option>
                                    {this.state.clients.map(client=><option value={client.id}>{client.name}</option>)}
                                </select><br />

                                <input className='form-control btn-primary' type='submit' /><br />
                                <button className='form-control btn-primary' type='button' onClick={()=>$('.clientContactForm').addClass('d-none')}>Cancel</button>
                            </form>
                        </div>



                        <div className='linkedContacts d-none'>
                            <p className='text-center'><strong>Linked Client Contact</strong></p>
                            <div className='row border-bottom'>
                                <div className='col-1'>
                                    <p><strong>No.</strong></p>
                                </div>

                                <div className='col-4'>
                                    <p><strong>Client name</strong></p>
                                </div>

                                <div className='col-4'>
                                    <p><strong>Contact</strong></p>
                                </div>

                                <div className='col-3'>

                                </div>
                            </div>

                            <div className='scrollableView container'>
                            {this.state.clientContacts.map((clientContact, index)=><div className='row'>
                                                                                        <div className='col-1'>
                                                                                            <p>{++index}.</p>
                                                                                        </div>

                                                                                        <div className='col-4'>
                                                                                            <p>{clientContact.contact.surname} {clientContact.contact.name}</p>
                                                                                        </div>

                                                                                        <div className='col-4'>
                                                                                            <p>{clientContact.client.name}</p>
                                                                                        </div>

                                                                                        <div className='col-3'>
                                                                                            <button className='btn btn-danger btnUnLink' onClick={()=>this.deleteContactClientLink(clientContact.id)}>Unlink</button>
                                                                                        </div>

                                                                                   </div>)}
                                   </div>

                            <button className='form-control btn-primary' type='button' onClick={()=>$('.linkedContacts').addClass('d-none')}>Close</button>
                        </div>

                    </div>
            )
        }
}


export default Clients;