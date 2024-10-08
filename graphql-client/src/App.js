import logo from './logo.svg';
import './App.css';
import { useQuery, gql, useMutation } from '@apollo/client';

const GET_SPEAKERS = gql`
  query getSpeakers {
    speakers {
      id
      name
      bio
      webSite
    }
  }
`
const GET_SPEAKER = gql`
  query getSpeaker($id: Int!) {
    speaker(id: $id) {
      id
      name
      bio
      webSite
    }
  }
`;

const ADD_SPEAKER = gql`
  mutation AddSpeaker ($name: String!, $bio: String!, $webSite : String!) {
  addSpeaker(input: {
    name: $name,
    bio: $bio,
    webSite: $webSite }) {
    speaker {
      id
    }
  }
}
`;

const DELETE_SPEAKER = gql`
mutation DeleteSpeaker($id: Int!) {
  deleteSpeaker(id: $id) {
    speaker {
      id
      name
      bio
    }
  }
}
`;

function App() {
  return (
    <div className="App">
      <AddSpeaker />
      <DisplaySpeakers />
    </div>
  );
}

function DisplaySpeakers() {
  const { loading, error, data } = useQuery(GET_SPEAKERS);
  const [deleteSpeaker] = useMutation(DELETE_SPEAKER,{
    refetchQueries: [{ query: GET_SPEAKERS }]
  });
  const DeleteSpeaker = (id) => {
    deleteSpeaker({ variables: { id: id }, awaitRefetchQueries : true  });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  return(  <div>
    <table style={{padding : '10px'}}>
      <colgroup>
        <col width="10%" />
        <col width="60%" />
        <col width="20%" />
        <col width="10%" />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Bio</th>
          <th>Website</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.speakers.map(({ bio, name, id, webSite }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{bio}</td>
            <td>{webSite}</td>
            <td><button value={id} onClick={() => DeleteSpeaker(id)} >Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
  );
}

function AddSpeaker() {
  let input;
  const [addNewSpeaker, { data, loading, error }] = useMutation(ADD_SPEAKER,{
    refetchQueries: [{ query: GET_SPEAKERS }]
  });
  
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addNewSpeaker({ variables: { name: input.value, bio : input.value, webSite : input.value}, awaitRefetchQueries : true });
          input.value = '';
        }}
      >
        <div>
          <p>Add new speaker</p>
          <input required 
           ref={node => {
            input = node;
          }}
            type="text"
            placeholder="Enter speaker name"
          />
          <br />
          <br />
          <input
           ref={node => {
            input = node;
          }}
            type="text" required 
            placeholder="Enter speaker bio"
          />
          <br />
          <br />
          <input required 
            ref={node => {
              input = node;
            }}
            type="text"
            placeholder="Enter speaker website"
          />
          <br />
          <br />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}


export default App;
