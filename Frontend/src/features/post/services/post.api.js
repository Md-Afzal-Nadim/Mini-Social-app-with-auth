import axios from 'axios'


const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials:true,
})


export async function getFeed() {
  const res = await api.get('/api/posts/feed')
  return res.data
}


export async function createPost(imageFile, caption) {

  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('caption', caption);


  const res = await api.post('/api/posts', formData)
  return res.data
}