import Vue from 'vue'
import ChartObject from '../../../../../resources/index'
import store from '../../../../../store/index'


const GridUtils = {
  buildObject({ position, settings}) {
    return {
      type: "AnalysisTools_General",
      position: position,
      size: {width: 100, height: 100},
      info: {
        settings
      }
    }
  },
  getCrawlerData (text) {
    return Vue.http.post('/vulcan/v1/crawler/parse', { link: text })
  },
  youtubeId(youtubeUrl) {
    if (!youtubeUrl) return null
    var match = youtubeUrl.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)

    return match ? match[5] : null
  },
  addYoutube({ objectId, text, position }) {
    console.log(object, text, position)
  },
  addCrawlerData({ objectId, link, position }) {
    GridUtils.getCrawlerData(link)
      .then(response => {
        const objectComponent = store.getters.getObjectComponent(objectId)
        const settings = objectComponent.localData.info
        settings.image = settings.image || response.body.image
        settings.notes += response.body.notes
        settings.title += '\n'+response.body.title
        if (settings.addons) {
          settings.addons.concat(response.body.addons || [])
        } else {
          settings.addons = response.body.addons
        }
        objectComponent.calcSize()
      })
  },
  addNotes({ objectId, text, position }) {
    const objectComponent = store.getters.getObjectComponent(objectId)
    objectComponent.localData.info.settings.notes += text
  },
  insertFromCrawler({ link, position }) {
    GridUtils.getCrawlerData(link)
      .then(response => {
        const objectParams = GridUtils.buildObject(
          {
            position,
            settings: response.body
          }
        )
        store.dispatch('createObject', objectParams)
      })
  },
  insertNotes({ text, position }) {
    const objectParams = GridUtils.buildObject(
      {
        position,
        settings: {notes: text}
      }
    )
    store.dispatch('createObject', objectParams)
  }
}

export default GridUtils