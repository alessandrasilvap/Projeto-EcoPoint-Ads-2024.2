//Objeto que está sendo chamado no html
function toggleNews(element) {
    const isExpanded = element.classList.contains('expanded');
    
    // Remove a expansão de todas as notícias
    document.querySelectorAll('.news-item').forEach(item => item.classList.remove('expanded'));
    
    // Se não estava expandido, expande
    if (!isExpanded) {
        element.classList.add('expanded');
    }
}
