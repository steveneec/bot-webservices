export const intentFunctions = [
  {
    name: 'playVideo',
    description: 'Play a video in YouTube',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'the name of video',
        },
      },
    },
  },
  {
    name: 'playMusic',
    description: 'Play a song in YouTube',
    parameters: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'the name of song',
        },
        artist: {
          type: 'string',
          description: 'the name of artist',
        },
      },
    },
  },
  {
    name: 'sendEmail',
    description: 'Send a e-mail',
    parameters: {
      type: 'object',
      properties: {
        to: {
          type: 'string',
          description: 'the name of contact without email',
        },
        subject: {
          type: 'string',
          description: 'the subject of email',
        },
        message: {
          type: 'string',
          description: 'the message of email',
        },
      },
    },
  },
  {
    name: 'moveIntent',
    description: 'Move the robot',
    parameters: {
      type: 'object',
      properties: {
        moveTo: {
          type: 'string',
          enum: ['left', 'right', 'back', 'forward'],
        },
        /*rotate: {
          type: 'number',
          description: 'How many degrees should it rotate',
        },
        distance: {
          type: 'number',
          description: 'How many centimeters you must advance',
        },*/
      },
    },
  },
];
