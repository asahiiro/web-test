
//document.getElementById("themeButton").addEventListener("click", changeTheme());

function changeTheme(){
    let theme = document.getElementById('theme');
    if(theme.getAttribute('href')=='light.css'){
        theme.setAttribute('href','dark.css');
    } else {
        theme.setAttribute('href','light.css');
    }
}
document.getElementById('index-button').addEventListener('click', function() {
    var indexContent = document.getElementById('index-content');
    indexContent.classList.toggle('hidden');
});