document.addEventListener('click', event => {
  const id = event.target.dataset.id
  if (event.target.dataset.type === 'remove') {
    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  } else if (event.target.dataset.type === 'edit') {
    const title = event.target.dataset.title
    const currentLi = event.target.closest('li')
    const delBtn = event.target.previousElementSibling
    const editBtn = event.target
    edit(id, title).then((value) => {
      event.target.closest('li').innerHTML = ''
      currentLi.innerText = value
      editBtn.dataset.title = value
      currentLi.appendChild(delBtn)
      currentLi.appendChild(editBtn)
    })
  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, title) {
  const result = prompt(title, title)
  const params = {
    param: result
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( params )  
  }
  await fetch(`/${id}`, options)
  if (result === null) return title
  return result
}