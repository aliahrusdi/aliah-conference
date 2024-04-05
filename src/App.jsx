import { useState } from 'react';
import { DyteMeeting } from '@dytesdk/react-ui-kit';
import { useDyteClient } from '@dytesdk/react-web-core';
import './App.css';

function App() {
  const [meeting, initMeeting] = useDyteClient();
  const [meetingState, setMeetingState] = useState(false);
  const meetingid = "bbb1572f-d152-42ba-b18c-5cd7566d2a05";
  const preset = "group_call_host";
  const orgid = "7c767870-2a84-4cef-9be5-dcccface5717";
  const apikey = "6717603bb3cb38223318";
  async function addParticipant() {
    console.log('Basic ' + btoa(orgid + ':' + apikey));
    var nameuser = document.getElementById("username").value;
    var id = Math.floor(Math.random() * 100);
    const url = 'https://api.dyte.io/v2/meetings/' + meetingid + '/participants';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Basic ' + btoa(orgid + ':' + apikey)
      },
      body: '{"name":"' + nameuser + '","picture":"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png","preset_name":"' + preset + '","custom_participant_id":"' + id + '"}'
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const token = data["data"]["token"];
      initMeeting({
        authToken: token,
      });
      setMeetingState(true);
    } catch (error) {
      console.error(error);
    }
  }

  if (meetingState) {
    return <DyteMeeting meeting={meeting} />;
  } else {
    return (
      <div>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet" />
        {/* <label htmlFor="username">Name:</label>
        <input type="text" id="username" />
        <button onClick={() => addParticipant()}>Join</button> */}

        <body>
          <div class="background">
            <div class="shape"></div>
            <div class="shape"></div>
          </div>
          <form>
            <h3>Aliah Meeting</h3>
            <label for="username">Username</label>
            <input type="text" placeholder="Name" id="username" />

            <button type='button' onClick={() => addParticipant()}>Join Meeting</button>

          </form>
        </body>
      </div>
    )
  }
}

export default App;
