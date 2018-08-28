const settings = {
  default: {
    info: {}
  },
  'Chatbot_Question': {
    name: 'Question',
    size: {
      width: 390,
      height: 510
    },
    has: {
      in: true,
      out: true,
      resize: false,
      settings: true,
      title: true
    },
    components: ['Chatbot_Answer', 'Chatbot_Question', 'Chatbot_DialogFlow'],
    default(object) {
      return {
        ...settings.default,
        info: {
          title: 'Question',
          component: {
            content: {
              footer: []
            }
          }
        },
        size: settings[object.type].size,
        ...object
      }
    }
  },
  'Chatbot_Answer': {
    name: 'Answer',
    size: {
      width: 220,
      height: 60
    },
    has: {
      in: true,
      out: true,
      resize: false,
      settings: true,
      title: true
    },
    components: ['Chatbot_Question'],
    default(object) {
      return {
        ...settings.default,
        info: { title: 'Answer', settings: { answerVariants: [{}] } },
        size: settings[object.type].size,
        ...object
      }
    }
  },
  'Chatbot_DialogFlow': {
    name: 'DialogFlow',
    size: {
      width: 220,
      height: 60
    },
    has: {
      in: true,
      out: true,
      title: false,
      resize: false,
      settings: true
    },
    inColor: '#ef6c00',
    outColor: '#ef6c00',
    components: ['Chatbot_Answer'],
    default(object) {
      return {
        ...settings.default,
        info: { title: 'DialogFlow', settings: {}},
        size: settings[object.type].size,
        ...object
      }
    }
  },
}

export default settings