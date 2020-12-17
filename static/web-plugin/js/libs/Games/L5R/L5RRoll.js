import DiceParser from '../../Tools/DiceParser.js'
import UI from '../../Tools/UI.js'

class L5RRoll {

    static handleSubmit() {
        let state = true
        let error = ''
        let macro = ''
        const username = document.querySelector('#usernameL5R').value
        const ring = document.querySelector('#numRingL5R').value
        const skill = document.querySelector('#numSkillL5R').value

        if (username == '') {
            state = false
            error += 'Veuillez indiquer un pseudo.\n'
        }

        if (ring <= 0 && skill <= 0) {
            state = false
            error += 'Vous devez jeter au moins un dé.\n'
        }

        if (state === true) {
            macro += username
            macro += '/r'
            if (ring > 0) { macro += `${ring}r` }
            if (skill > 0) { macro += `${skill}s` }

            L5RRoll.Roll(macro)
        } else {
            miro.showErrorNotification(error)
        }
    }

    static async Roll(macro) {
        let str = macro
        let username = /^(?<username>.*)\/r/
        let ring = /(?<ring>\d{0,3})r/
        let skill = /(?<skill>\d{0,3})s/
        let data = { game: 'l5r', macro: '' }
        // let text = ''

        let u, r, s;

        if ((u = username.exec(str)) !== null) {
            data['username'] = u.groups.username
            str = str.replace(u[0], '')
        }

        if ((r = ring.exec(str)) !== null) {
            let num = parseInt(r.groups.ring)
            data['number_ring'] = num
            data['macro'] += `${num} ring`
            data['roll_ring'] = DiceParser.roll_dice(num, 6)
        }

        if ((s = skill.exec(str)) !== null) {
            let num = parseInt(s.groups.skill)
            data['number_skill'] = num
            data['macro'] += ` ${num} skill`
            data['roll_skill'] = DiceParser.roll_dice(num, 12)
        }

        dicePool(JSON.stringify(data))
        UI.displayPage('result')
    }

    static Display(obj) {
        let text = ''
        text += '<div class="chat-minus">Roll : '
        text += obj.macro
        text += '</div>'
        if (obj.roll_skill) {
            text += '<br />'
            obj.roll_skill.forEach(skill => {
                text += `<img src="./img/l5r/d12-${skill}.png" width="50px" height="50px"  />`
            })
        }
        if (obj.roll_skill && obj.roll_ring) { text += '<br />' }
        if (obj.roll_ring) {
            text += '<br />'
            obj.roll_ring.forEach(ring => {
                text += `<img src="./img/l5r/d6-${ring}.png" width="50px" height="50px"  />`
            })
        }
        text += "<hr />"
        return text
    }
}

export default L5RRoll
