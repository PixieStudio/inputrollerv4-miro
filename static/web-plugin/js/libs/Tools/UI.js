class UI {
    static displayOnLoad() {
        if (localStorage.displayPage) {
            UI.displayPage(localStorage.displayPage)
        } else {
            localStorage.displayPage = 'home'
            UI.displayPage('home')
        }
    }

    static displayPage(page) {
        const containers = document.querySelectorAll('div[container]')

        containers.forEach(container => {
            const c = container.getAttribute('container')
            const tab = document.querySelector(`a[tab='${c}'`)

            if (c === page) {
                container.style.display = 'block'
                tab.classList = 'nav-link active'
                localStorage.displayPage = page
            } else {
                container.style.display = 'none'
                tab.classList = 'nav-link'
            }
        })
    }
}

export default UI
