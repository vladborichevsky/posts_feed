import axios from 'axios' 

export const getDataByAxios = async (url) => {
  let response = await axios.get(url)
  return await response.data
}