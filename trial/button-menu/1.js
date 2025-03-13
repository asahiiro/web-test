document.getElementById('index-button').addEventListener('click', function() {
    var indexContent = document.getElementById('index-content');
    indexContent.classList.toggle('hidden');
    if (indexContent.classList.contains('hidden')) {
        this.textContent = 'Show Index';
    } else {
        this.textContent = 'Hide Index';
    }
});