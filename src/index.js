const baseUrl = "http://localhost:3000/quotes?_embed=likes"
document.addEventListener("DOMContentLoaded", () => {
const quoteList = document.getElementById("quote-list")
const form = document.querySelector("#new-quote-form")

    
    fetch(baseUrl)
    .then(res => res.json())
    .then(data => renderQuotes(data))

    function renderQuotes(data){
        data.forEach(element => {
            const li = document.createElement("li")
            // li.textContent = element.quote
            li.innerHTML = `
            <li class='quote-card'>
                <blockquote class="blockquote">
                     <p class="mb-0">${element.quote}</p>
                     <footer class="blockquote-footer">${element.author}</footer>
                    <br>
                    <button class='btn-success'>Likes: <span>${element.likes.length}</span></button>
                    <button class='btn-danger'>Delete</button>
                </blockquote>
            </li>
            `
            quoteList.append(li)
            const deleteBtn = li.querySelector(".btn-danger")
            deleteBtn.addEventListener("click", () => {
                li.remove()
            })
            const likeButton = li.querySelector(".btn-success")
            likeButton.addEventListener("click", () => {
                const span = li.querySelector("span")
                const likes = parseInt(span.textContent)
                span.textContent = likes + 1
            })

        });
    }
    
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const newQuote = document.createElement("li")
        const quote = e.target.quote.value
        const author = e.target.author.value
        newQuote.innerHTML = `
        <li class='quote-card'>
        <blockquote class="blockquote">
             <p class="mb-0">${quote}</p>
             <footer class="blockquote-footer">${author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
        </blockquote>
    </li>
        `
        quoteList.append(newQuote)
        const deleteBtn = newQuote.querySelector(".btn-danger")
            deleteBtn.addEventListener("click", () => {
                newQuote.remove()
            })
            const likeButton = newQuote.querySelector(".btn-success")
            likeButton.addEventListener("click", () => {
                const span = newQuote.querySelector("span")
                const likes = parseInt(span.textContent)
                span.textContent = likes + 1
            })
            form.reset()
    })
})