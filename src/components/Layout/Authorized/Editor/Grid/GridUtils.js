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
    GridUtils.addCrawlerData(object, text, position)
  },
  addCrawlerData({ objectId, link, position }) {
    GridUtils.getCrawlerData(link)
      .then(response => {
        const object = store.getters['objects/getObject'](objectId)
        object.image = object.image || response.body.image
        object.notes += response.body.notes
        object.title += '\n'+response.body.title
        if (object.addons) {
          object.addons.concat(response.body.addons || [])
        } else {
          object.addons = response.body.addons
        }
      })
  },
  addNotes({ objectId, text, position }) {
    const object = store.getters['objects/getObject'](objectId)
    object.info.settings.notes += text
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
        store.dispatch('objects/create', objectParams)
      })
  },
  insertNotes({ text, position }) {
    const objectParams = GridUtils.buildObject(
      {
        position,
        settings: {notes: text}
      }
    )
    store.dispatch('objects/create', objectParams)
  }
}

export default GridUtils