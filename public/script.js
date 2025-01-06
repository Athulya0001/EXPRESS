async function handleSubmit() {
    const name = document.getElementById('name').value;
    console.log(name)

    async function fetchData(){
        console.log('function called')
        const response = await fetch('http://localhost:3000/add', {
            method: 'POST'
        });
        console.log(response,"response")
        const data = await response.json();
        console.log(data, data)
    }
    fetchData();

}

