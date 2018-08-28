const settings = {
  default: {
    info: {}
  },
  'AnalysisTools_General': {
    name: 'General',
    size: {
      width: 100,
      height: 100
    },
    has: {
      in: true,
      out: true,
      resize: true,
      title: true,
      settings: true
    },
    components: ["AnalysisTools_Person", "AnalysisTools_Organisation", "AnalysisTools_General"],
    default(object) {
      return {
        ...settings.default,
        size: settings[object.type].size,
        ...object
      }
    }
  },
  'AnalysisTools_Organisation': {
    name: 'Organisation',
    size: {
      width: 100,
      height: 100
    },
    has: {
      in: true,
      out: true,
      resize: true,
      title: true,
      settings: true
    },
    components: ["AnalysisTools_Person", "AnalysisTools_Organisation", "AnalysisTools_General"],
    default(object) {
      return {
        ...settings.default,
        size: settings[object.type].size,
        ...object
      }
    }
  },
  'AnalysisTools_Person': {
    name: 'Person',
    size: {
      width: 100,
      height: 100
    },
    has: {
      in: true,
      out: true,
      resize: true,
      title: true,
      settings: true
    },
    components: ["AnalysisTools_Person", "AnalysisTools_Organisation", "AnalysisTools_General"],
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