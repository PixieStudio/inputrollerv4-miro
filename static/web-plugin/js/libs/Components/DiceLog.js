import ClassicRoll from '../Games/Classic/ClassicRoll.js'
import FateRoll from '../Games/Fate/FateRoll.js'
import L5RRoll from '../Games/L5R/L5RRoll.js'

class DiceLog {
    static async build() {
        const parentResults = document.querySelector('#result-container')
        let pool = await getWidget(getAppWidget('SHAPE', 'type', 'pool_ir'))
        if (pool.length === 1) {
            pool = pool[0]
            const poolMeta = pool.metadata[APP_ID]
            const countRoll = poolMeta['roll']
            if (countRoll === 0) {
                parentResults.innerHTML = '<span id="empty_log">Empty Log. Roll a dice!</span>'
            } else {
                let logDiv = document.querySelector('#empty_log')
                if (logDiv) { logDiv.remove() }
                for (let i = 1; i <= countRoll; i++) {
                    let diceBoxID = document.querySelector(`#resultContainer${i}`)
                    if (diceBoxID === null) {
                        if (poolMeta[i]) {
                            let obj = JSON.parse(poolMeta[i])
                            let result = ''
                            result += `<div class="text-muted block-message" id="resultContainer${i}">`
                            result += `<span class="chat-username text-uppercase">#${i} - ${obj.username}</span>`
                            // result += `<span class="chat-minus"> - ${strftime('%d.%m.%y %H:%M', message.created_at)}</span>`
                            result += '</div>'

                            result += '<li class="list-group-item mb-2 global-roll">'
                            if (obj.game === 'l5r') {
                                result += L5RRoll.Display(obj)
                            } else if (obj.game === 'fate') {
                                result += FateRoll.Display(obj)
                            } else if (obj.game === 'classic') {
                                result += ClassicRoll.Display(obj.set, i)
                            }
                            result += '</li>'
                            addDiv(parentResults, result)
                            if (parentResults.style.display === 'block') {
                                parentResults.scrollIntoView(true)
                            }
                        }
                    }
                }
            }
        }

    }

}

export default DiceLog
