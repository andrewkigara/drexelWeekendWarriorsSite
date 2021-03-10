import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
import Layout from '../../components/Layout';
import FormPicker from '../../components/FormPicker';
import { Row, Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import config from '../../config';

const apiUrl = config.development ? config.apiDevelopment : config.api;

const getEventData = async (eventId) => {
	const res = await axios.get(`${apiUrl}/trips/${eventId}`);
    return res.data;
}

const getDateTime = dateString => moment(dateString).format('dddd, MMMM Do YYYY, h:mm a');

const Event = ({eventData, userPrivilege, userName, userJwt}) => {
    const { 
        id: tripId, 
        tripName, 
        tripDescription, 
        tripDate, 
        ticketSales, 
        importantDocuments, 
        tripPhoto, 
        isOnlineEvent,
        isOnlineSale,
        ticketLink, 
        participantForms,
        maxParticipantAmount
    } = eventData;
    const [modalOpen, setModalOpen] = useState(false);
    const [verifyFormCreateModal, setVerifyFormCreateModal] = useState(false);
    const tripLeaders = eventData.tripLeaders.map(leader => leader.username);
    const router = useRouter();

    const toggleVerifyForm = useCallback(() => setVerifyFormCreateModal(!verifyFormCreateModal), [verifyFormCreateModal]);
    
    const openForm = useCallback(async isMultiSignUp => {
        try {
            if (participantForms.length >= maxParticipantAmount && !verifyFormCreateModal) {
                setVerifyFormCreateModal(true);
                return;
            }

            const formTokenRes = await axios.post(`${apiUrl}/forms/getFormToken`, {
                isMultiSignUp,
                tripId
            }, {
                headers: {
                    Authorization: `Bearer ${userJwt}`
                }
            });
            const { formToken } = formTokenRes.data;
            router.push('/forms/[form]', `/forms/${formToken}`);
        } catch (err) {
            console.error(err);
        }
    }, [tripId, userJwt, verifyFormCreateModal, participantForms, maxParticipantAmount]);

    const toggleModal = useCallback(() => setModalOpen(!modalOpen), [modalOpen]);

    return (
        <Layout activePage='events'>
            <br />
            <div className='container-fluid w-75'>
                <div className='row'>
                    <div className='col-xl'>
                        <img className='img-fluid' src={`${apiUrl + tripPhoto.url}`} alt='trip image cap' />
                    </div>
                    <div className='col-xl my-3'>
                        <h1>{tripName}</h1>
                        <p>{getDateTime(tripDate)}</p>
                        <p>{ticketSales && 
                            <>
                                <span>Ticket sales: </span> 
                                {getDateTime(ticketSales)}
                            </>
                        }</p>
                        {isOnlineEvent && ticketLink && 
                            <p>Registration link: <a href={ticketLink}>{ticketLink}</a></p>
                        }
                        <ReactMarkdown source={tripDescription} />
                        {/* Insert code below once there is a good method of handling users generating multiple trip forms
                            Ideas: - IP check
                                   - Code that comes from somewhere else to verify the submission
                                   - Verfied and Signed Cookies (might be problems if the user decides to delete cookies) 
                        */}
                        {/* {participantForms.length < maxParticipantAmount 
                            && moment(ticketSales).isBefore(moment()) 
                            && isOnlineSale
                            ? <Button className='w-100' color='success' onClick={() => openForm(false)}>Sign up!</Button>
                            : participantForms.length < maxParticipantAmount 
                                && <Badge color='info' className='p-2' pill>A sign up link will appear here at the day and time of the ticket sales. Come back later and check then.</Badge>
                        } */}
                    </div>
                </div>
                <div className='row my-2'>
                    <div className='col-xl'>
                        {importantDocuments.length ?
                            <>
                                <h1 className='text-center'>Important Documents for Trip Participants</h1>
                                <div>

                                </div>
                            </>
                            :
                            <div></div>               
                        }
                    </div>
                    <div className='col-xl my-2'>
                        {((userPrivilege === 'leader' && tripLeaders.includes(userName)) || userPrivilege === 'admin') && 
                            <>
                                <Row>
                                    <p className='h3'>Leader Tools</p>
                                    <Badge color='danger' className='p-2 mb-2 mx-3' pill>There are {participantForms.length} forms submitted out of {maxParticipantAmount} that could be completed.</Badge>
                                </Row>
                                <Row>
                                    <Button color='info' className='w-100 my-1' onClick={toggleModal}>View Participant Forms</Button>
                                    <FormPicker toggleModal={toggleModal} modalOpen={modalOpen} formData={participantForms} />
                                </Row>
                                <Row>
                                    <Button color='primary' className='w-100 my-1' onClick={() => openForm(false)}>Generate Single Sign Up Form</Button>
                                    <Button color='primary' className='w-100 my-1' onClick={() => openForm(true)}>Generate Multi-sign Up Form</Button>
                                </Row>
                            </>
                        }
                    </div>
                    <Modal size='lg' isOpen={verifyFormCreateModal} toggle={toggleVerifyForm} centered>
                        <ModalHeader toggle={toggleVerifyForm}>
                            Verify Form Creation
                        </ModalHeader>
                        <ModalBody>
                            The max participant limit has been reached. There are {participantForms.length} forms submitted out of the {maxParticipantAmount} available spots. 
                            Are you sure you want to create a form?
                        </ModalBody>
                        <ModalFooter>
                            <Button color='danger' onClick={() => openForm(false)}>Continue to create single sign up form</Button>
                            <Button color='danger' onClick={() => openForm(true)}>Continue to create multi-sign up form</Button>
                            <Button color='primary' onClick={toggleVerifyForm}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ query }) {
    const eventData = await getEventData(query.event);
    return {
        props: {
            eventData
        }
    }
}

const mapStateToProps = state => ({
    userPrivilege: state.authenticate.user?.role.type,
    userName: state.authenticate.user?.username,
    userJwt: state.authenticate.jwt,
});

export default connect(mapStateToProps)(Event);