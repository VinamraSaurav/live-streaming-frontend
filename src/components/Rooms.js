'use client'
import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function randomID(len) {
    let result = '';
    if (result) return result;
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

const Rooms = ({roomId}) => {
    const roomID = (roomId===undefined || roomId===null || roomId==='' || roomId==="")?randomID(10):roomId;

    let myMeeting = async (element) => {

        // generate Kit Token
        const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

        // console.log(appID, serverSecret, roomID);

        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));
       
        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
               container: element,
               sharedLinks: [
                 {
                   name: 'Copy link',
                   url:
                    window.location.protocol + '//' + 
                    window.location.host + window.location.pathname,
                 },
                 {
                    name: 'Room ID',
                    url: roomID,
                 }
               ],
               scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
               },
          
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 50,
            layout: "Sidebar",
            showLayoutButton: true
          
      }
        
        );
         };
  return (
    <div>
        <div
      ref={myMeeting}
      style={{ width: '99vw', height: '99vh' }}
    ></div>
    </div>
  )
}

export default Rooms