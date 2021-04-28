document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate').addEventListener('click', retrieveAnalysis);
});

function retrieveAnalysis(e){
    e.preventDefault();
    const urlInput = document.getElementById('url-input').value;
    document.getElementById('agreement').innerHTML = 'Loading...'
    getSentimentAnalysis(urlInput)
    .then(function(data){
        console.log(data);
    });
}

const getSentimentAnalysis = async (urlInput)=>{
    console.log(urlInput)
    fetch('http://localhost:8081/sentiment-analysis', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({url: urlInput})
    })
    .then(response => response.json())
    .then(response => updateUI(response))
}

function updateUI(response){
    document.getElementById('agreement').innerHTML = `Agreement: ${response.agreement}`
    document.getElementById('confidence').innerHTML = `Confidence: ${response.confidence}`
    document.getElementById('irony').innerHTML = `Irony: ${response.irony}`
    document.getElementById('subjectivity').innerHTML = `Subjectivity: ${response.subjectivity}`
    document.getElementById('score').innerHTML = `Score: ${response.score_tag}`
}

export { retrieveAnalysis, updateUI }
