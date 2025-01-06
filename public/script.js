async function handleSubmit() {
    const name = document.getElementById('name').value;
    console.log(name)

    if (!name) {
        console.error('Name is required');
        return;
      }

    const response = await fetch('http://localhost:3000/add',{
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name})
    });

    const data = await response.json();
    console.log(data, "response after adding data");

    document.getElementById('name').value = "";

};



