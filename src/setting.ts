let postheader = {
    method: "POST",
    headers: {
        'user-agent': 'Mozilla/4.0',
        'content-type': 'application/json'
    },
}

let wsaddr = "ws://127.0.0.1:8001"

export {postheader, wsaddr}