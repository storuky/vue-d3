import AnalysisToolsSettings from './Plugins/AnalysisTools/Objects/settings'
import ChatbotSettings from './Plugins/Chatbot/Objects/settings'


const components = {
  AnalysisTools: Object.keys(AnalysisToolsSettings).filter(e => e != 'default'),
  Chatbot: Object.keys(ChatbotSettings).filter(e => e != 'default')
}

const ComponentSelector = {
  name: 'Click To Add',
  size: {
    width: 300,
    height: 100
  },
  has: {
    in: true,
    out: false,
    resize: false,
    settings: false
  },
  default(object) {
    return {
      ...settings.default,
      size: settings[object.type].size,
      ...object
    }
  }
}

const settings = { ComponentSelector, ...AnalysisToolsSettings, ...ChatbotSettings, components }

export default settings