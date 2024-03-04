
const initialState = {
  data: {
    isAuthenticated: true,
    user: null,
  },
  story: null,
  speech: {
    voice: 0,
    pitch: 1,
    rate: 1,
    volume: 1,
  },
  faceRecognition: true
}

export function Reducer(state = initialState, { type, payload }) {
  switch (type) {
    case 'user_login':
      return {
        ...state,
        data: {
          isAuthenticated: true, user: payload.user
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
    default:
      return state;
  }
}