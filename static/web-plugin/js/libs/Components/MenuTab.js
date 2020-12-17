import UI from '../Tools/UI.js'

class MenuTab extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = `
        <div class="container p-0 m-0">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" id="homeTab" tab="home" href="#">
                        Home
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" id="diceTab" tab="dice" href="#">
                        Lanceur de dés
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" id="resultTab" tab="result" href="#">
                        Résultats
                    </a>
                </li>
            </ul>
        </div>
        `

        const pages = ['homeTab', 'diceTab', 'resultTab']

        pages.forEach(p => {
            const el = document.getElementById(p)
            el.addEventListener('click', () => {
                const val = el.getAttribute('tab')
                localStorage.displayPage = val
                UI.displayPage(val)
            })
        })
    }
}

export default MenuTab
