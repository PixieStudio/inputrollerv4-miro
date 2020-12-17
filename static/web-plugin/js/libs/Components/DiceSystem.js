// import ClassicRollForm from "../Games/Classic/ClassicRollForm.js"
// import FateRollForm from "../Games/Fate/FateRollForm.js"
// import L5RRollForm from "../Games/L5R/L5RRollForm.js"

class DiceSystem extends HTMLElement {
    constructor() {
        super()

        const systems_nav = `
        <div id="dice-container" container="dice" style="display:none">
            <ul class="nav mb-2">
                <li class="nav-item dropdown w-100">
                    <a class="nav-link dropdown-toggle btn btn-outline-primary btn-block" data-toggle="dropdown"
                        href="#" role="button" aria-haspopup="true" aria-expanded="false" id="diceSystem">
                    </a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" id="diceClassic" name="Classic">Classic</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" id="diceFate" name="Fate">Fate</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" id="diceL5R" name="L5R">L5R</a>
                    </div>
                </li>
            </ul>
            <div is="classic-roll-form" dice-form="diceClassic" style="display:none"></div>
            <div is="fate-roll-form" dice-form="diceFate" style="display:none"></div>
            <div is="l5r-roll-form" dice-form="diceL5R" style="display:none"></div>
        </div>
        `
        this.innerHTML = systems_nav

        const systems = ['diceClassic', 'diceFate', 'diceL5R']

        systems.forEach((s) => {
            document.getElementById(s).addEventListener('click', () => {
                localStorage.actualSystem = s
                DiceSystem.actualSystem(s)
            })
        })
    }

    static actualSystemOnLoad() {
        if (localStorage.actualSystem) {
            DiceSystem.actualSystem(localStorage.actualSystem)
        } else {
            localStorage.actualSystem = 'none'
            DiceSystem.actualSystem('none')
        }
    }

    static actualSystem(system) {
        const diceSystem = document.querySelector('#diceSystem')
        const diceForms = document.querySelectorAll('div[dice-form]')

        if (system === 'none') {
            diceSystem.textContent = '--- Système ---'
        } else {
            diceSystem.textContent = document.getElementById(system).getAttribute('name')
        }

        diceForms.forEach(diceForm => {
            const df = diceForm.getAttribute('dice-form')
            if (system === df) {
                diceForm.style.display = 'block'
            } else {
                diceForm.style.display = 'none'
            }
        })
    }


}

export default DiceSystem
