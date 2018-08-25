const settings = {
  default: {
    info: {}
  },
  'Answer': {
    size: {
      width: 220,
      height: 60
    },
    has: {
      in: true,
      out: true,
      resize: false
    },
    components: ['Question'],
    default (object) {
      return {
        ...settings.default,
        info: {title: 'Answer', settings: {answerVariants: [{}]}},
        size: settings[object.type].size,
        ...object
      }
    }
  },
  'Question': {
    size: {
      width: 390,
      height: 510
    },
    has: {
      in: true,
      out: true,
      resize: false
    },
    components: ['Answer', 'Question'],
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
  }
}

export default settings