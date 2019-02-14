
import Api from './Api.js'



const ValentineService = {
  createValentine (data) {
    return Api.post('dvc', data)
  },
  getValentine (hash) {
    return Api.get('dvc/' + hash)
  },
  setCounter () {
    return Api.post('progrev')
  },
  uniqueCounter () {
    return Api.get('progrev')
  },
  getCounterValentine () {
    return Api.get('count')
  }
}

export default ValentineService

