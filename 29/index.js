function handleSubmit(e) {
  e.preventDefault()

  const input = e.target

  const data = {}

  for(let i = 0; i < input.length; i++) {
    if(input[i].type !== "submit") {
      data[input[i].id] = input[i].value
    }
  }

  alert(JSON.stringify(data))
}

const form = document.querySelector("#form")

form. addEventListener("submit", handleSubmit)
