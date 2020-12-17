import UI from './libs/Tools/UI.js'
import MenuTab from './libs/Components/MenuTab.js'
import Home from './libs/Components/Home.js'
import DiceSystem from './libs/Components/DiceSystem.js'
import ClassicRollForm from './libs/Games/Classic/ClassicRollForm.js'
import FateRollForm from './libs/Games/Fate/FateRollForm.js'
import FateRoll from './libs/Games/Fate/FateRoll.js'
import L5RRollForm from './libs/Games/L5R/L5RRollForm.js'
import L5RRoll from './libs/Games/L5R/L5RRoll.js'
import Result from './libs/Components/Result.js'
import DiceLog from './libs/Components/DiceLog.js'
import ClassicRoll from './libs/Games/Classic/ClassicRoll.js'


// ==============================================
//                 CUSTOM HTML
// ==============================================

window.customElements.define('menu-tab', MenuTab)
window.customElements.define('home-container', Home)
window.customElements.define('dice-system', DiceSystem)
window.customElements.define('result-container', Result)
window.customElements.define('classic-roll-form', ClassicRollForm, { extends: 'div' })
window.customElements.define('fate-roll-form', FateRollForm, { extends: 'div' })
window.customElements.define('l5r-roll-form', L5RRollForm, { extends: 'div' })

// ==============================================
//                 DB
// ==============================================

document.getElementById('goToPool').addEventListener('click', async () => {
    const pool = await getWidget(getAppWidget('SHAPE', 'type', 'pool_ir'))
    if (pool.length === 1) {
        await miro.board.viewport.zoomToObject(pool)
    }
})

document.getElementById('clearPoolLog').addEventListener('click', async () => {
    const pool = await getWidget(getAppWidget('SHAPE', 'type', 'pool_ir'))
    if (pool.length === 1) {
        await miro.board.widgets.update({
            id: pool[0].id,
            metadata: {
                [APP_ID]: {
                    roll: 0,
                    type: 'pool_ir'
                }
            }
        })
        miro.showErrorNotification('Log successfully cleared.')
    }
})

// ==============================================
//               FORM DICE SET
// ==============================================

document.getElementById('moreDice').addEventListener('click', () => {
    const diceSetContainer = document.getElementById('diceSetContainer')
    if (typeof localStorage.diceSet === 'undefined') {
        localStorage.diceSet = JSON.stringify([0])
    }
    let arrayDice = JSON.parse(localStorage.diceSet)
    arrayDice = arrayDice.sort((a, b) => b - a)
    const diceSetID = arrayDice[0] + 1
    arrayDice.push(diceSetID)
    localStorage.diceSet = JSON.stringify(arrayDice)

    localStorage[`diceSet${diceSetID}`] = JSON.stringify({
        id: diceSetID,
        number: "",
        type: "",
        mod: "",
        color: "black",
        classicStocker: false,
        criticalSwitch: false,
        explodeSwitch: false,
        advantageSwitch: false,
        disadvantageSwitch: false,
        targetNumberSwitch: false,
        difficultyTestSwitch: false
    })
    diceSetContainer.innerHTML += ClassicRollForm.DiceSet(diceSetID)
})



// ==============================================
//               FORM SUBMIT
// ==============================================

document.querySelector('#formL5R').addEventListener('submit', e => {
    e.preventDefault()
    L5RRoll.handleSubmit()
})

document.querySelector('#formFate').addEventListener('submit', e => {
    e.preventDefault()
    FateRoll.handleSubmit()
})

document.querySelector('#formClassic').addEventListener('submit', e => {
    e.preventDefault()
    ClassicRoll.handleSubmit()
})

// ==============================================
//                 COLOR BTN
// ==============================================

const global_btn_color = document.querySelectorAll('button[data-diceset]')
global_btn_color.forEach(btn => {
    btn.addEventListener('click', event => {
        const set = document.querySelectorAll(`button[data-diceset=${event.target.getAttribute('data-diceset')}`)
        set.forEach(s => {
            if (s.classList.contains('focus')) {
                s.classList.remove('focus')
            }
        })
        event.target.classList.add('focus')
        localStorage[`${event.target.getAttribute('data-diceset')}Color`] = event.target.getAttribute('data-color')
    })
})

miro.onReady(() => {
    UI.displayOnLoad()
    DiceSystem.actualSystemOnLoad()
    setInterval(DiceLog.build, 100)
})
