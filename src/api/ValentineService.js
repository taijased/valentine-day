
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
  }
}

export default ValentineService

