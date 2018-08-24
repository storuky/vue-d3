const settings = {
  default: {
    info: {}
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