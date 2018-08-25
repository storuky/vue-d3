const settings = {
  default: {
    info: {}
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
    components: ["Person", "Organisation", "General"],
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
    components: ["Person", "Organisation", "General"],
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
    components: ["Person", "Organisation", "General"],
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