import Layout from '../components/Layout';
import React from 'react';
import config from '../config';
import axios from 'axios';

const apiUrl = config.development ? config.apiDevelopment : config.api;
const getLeaders = async() => {
    const res = await axios.get(`${apiUrl}/leaders`);
    return res.data;
}
const LeadersList = ({leaders}) => {
    return (
        <Layout activePage='leaders'>
            <div className="container" >
                <br />
                <h1 className='alert alert-dark display-5 rounded shadow-lg text-center p-3 mx-3'>Meet The Leaders</h1>
                <div class="row row-cols-3">
                    {leaders.map(leader =>(
                        <div class="card text-center my-1 rounded">
                            <div class="col">
                                <img className="card-img-top mt-2 rounded" src={`${apiUrl + leader.ProfilePicture.formats.large.url}`} alt='trip image cap' />
                                <div className='card-body'>
                                    <h4 class="card-title">{leader.FirstName} {leader.LastName}</h4>
                                    <h6 class="card-title">{leader.Position}</h6>
                                    <br/>
                                    <h6 class="card-title">Outdoor Skills</h6>
                                    <p class="card-text text-black-50">{leader.Description}</p>
                                    <h6 class="card-title">Fun Fact</h6>
                                    <p class="card-text text-black-50">{leader.FunFact}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <br/>
            </div>
        </Layout>
    )
};
export async function getServerSideProps(){
    const leaders = await getLeaders();
    return {
        props: {
            leaders
        }
    }
}
export default LeadersList;