const apiKey = '2f7c1f0473c07d78c0f430480094e126';

function getAdcode() {
    return fetch(`https://restapi.amap.com/v3/ip?key=${apiKey}`)
    .then(response => response.json)
    .then(data => data.)
}