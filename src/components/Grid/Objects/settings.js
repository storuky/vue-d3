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
        info: {title: 'Answer'},
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
  },
  'ComponentSelector': {
    size: {
      width: 300,
      height: 100
    },
    has: {
      in: true,
      out: false,
      resize: false
    },
    default(object) {
      return {
        ...settings.default,
        size: settings[object.type].size,
        ...object
      }
    }
  },
  'General': {
    size: {
      width: 100,
      height: 100
    },
    has: {
      in: true,
      out: true,
      resize: true
    },
    default(object) {
      return {
        ...settings.default,
        size: settings[object.type].size,
        ...object
      }
    }
  },
  'Organisation': {
    size: {
      width: 100,
      height: 100
    },
    has: {
      in: true,
      out: true,
      resize: true
    },
    default(object) {
      return {
        ...settings.default,
        size: settings[object.type].size,
        ...object
      }
    }
  },
  'Person': {
    size: {
      width: 100,
      height: 100
    },
    has: {
      in: true,
      out: true,
      resize: true
    },
    default(object) {
      return {
        ...settings.default,
        size: settings[object.type].size,
        ...object
      }
    }
  }
}

export default settings