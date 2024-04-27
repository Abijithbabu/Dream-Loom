
const initialState = {
  data: {
    isAuthenticated: false,
    user: null,
  },
  story: null,
  likes: [],
  speech: {
    voice: 0,
    pitch: 1,
    rate: 0.5,
    volume: 1,
  },
  faceRecognition: true,
  help:false
}

export function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'user_login':
      return {
        ...state,
        data: {
          isAuthenticated: true, user: payload
        }
      };
    case 'user_signup':
      return {
        ...state,
        data: {
          isAuthenticated: false, user: payload
        }
      };
    case 'user_logout':
      return {
        ...state,
        data: {
          isAuthenticated: false,
        }
      };
    case 'story':
      return {
        ...state,
        story: payload
      };
    case 'likes':
      return {
        ...state,
        likes: payload
      };
    case 'speech':
      return {
        ...state,
        speech: {
          voice: payload?.voice,
          pitch: payload?.pitch,
          rate: payload?.rate,
          volume: payload?.volume,
        }
      };
    case 'face_recognition':
      return {
        ...state,
        faceRecognition: payload
      };
    case 'help':
      return {
        ...state,
        help: payload
      };
    default:
      return state;
  }
}