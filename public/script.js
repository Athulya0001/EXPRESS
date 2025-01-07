async function handleSubmit() {
  const name = document.getElementById("name");
  console.log(name.value);

  if (!name) {
    console.error("Name is required");
    return;
  }

  const response = await fetch("http://localhost:3000/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  const data = await response.json();
  console.log(data, "response after adding data");

  document.getElementById("name").value = "";
}

async function fetchData() {
  const response = await fetch("http://localhost:3000/getData", {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);

  const list = document.getElementById("list");
  list.innerHTML = "";

  const listCreate = document.createElement('li');
  listCreate.textContent = data;

  list.appendChild(listCreate);
}

