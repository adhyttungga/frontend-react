const api = "http://localhost:5000"

const create = async (user) => {
  try {
    let response = await fetch(api + "/article", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const list = async (signal, url) => {
  try {
    let response = await fetch(api + url, {
      method: "GET",
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const read = async (params, signal) => {
  try {
    let response = await fetch(api + '/article/' + params.userId, {
      method: 'GET',
      signal: signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      } 
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const update = async(params, user) => {
  try {
    let response = await fetch(api + '/article/' + params.userId, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
  create,
  list,
  read,
  update
}