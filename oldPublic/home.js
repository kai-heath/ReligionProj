function addEmail() {
    let emailAddress = document.getElementById('emailInput').value
    let outputElement = document.getElementById('emailResult')
    outputElement.textContent = "adding email..."
    emailAddRequest(emailAddress)
        .then((response) => outputElement.textContent = response)
}

async function emailAddRequest(emailAddress) {
    const request = await fetch('/api/addEmail', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email: emailAddress}),
    })
    return await request.text();
}