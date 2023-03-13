async function Login(){
    const reqBody = {
        Username: document.getElementById("username"),
        Password: document.getElementById("password")
    }
    fetch("http://localhost:5025/LogIn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    }).then((res) => res.json()).then(console.log(data)).catch(error => console.log(error))
}