import DiceParser from '../../Tools/DiceParser.js'
import UI from '../../Tools/UI.js'

class FateRoll {
    static handleSubmit() {
        let state = true
        let error = ''
        let macro = ''
        const username = document.querySelector('#usernameF').value
        const numberDice = document.querySelector('#numberFateDice').value
        const mod = document.querySelector('#modFateDice').value
        const color = localStorage.fateColor

        if (username == '') {
            state = false
            error += 'Veuillez indiquer un pseudo.\n'
        }

        if (numberDice <= 0) {
            state = false
            error += 'Vous devez jeter au moins un dé.\n'
        }

        if (!color) {
            state = false
            error += 'Vous devez choisir une couleur de dés.\n'
        }

        if (state === true) {
            macro += `${username}/r${numberDice}dF+${mod}${color}`
            FateRoll.Roll(macro)
        } else {
            miro.showErrorNotification(error)
        }
    }

    static async Roll(macro) {
        let str = macro
        let usernameReg = /^(?<username>.*)\/r/
        let numberReg = /^(?<number>\d{0,3})df/i
        // let colorReg = /(?<color>(red|blue|green|yellow|white))/
        let modReg = /(?<mod>([\+\-\*]\d{1,3})+)/
        // let compareReg = /(?<compare>(\<|\>|\<\=|\>\=)\d{1,3})/
        let data = { game: 'fate', macro: '' }
        // let sticker = ''


        let username, number, color, mod, compare

        if ((username = usernameReg.exec(str)) !== null) {
            data['username'] = username.groups.username
            str = str.replace(username[0], '')
            console.log(username[0])
        }

        if ((number = numberReg.exec(str)) !== null) {
            let num = parseInt(number.groups.number)
            data['number'] = num
            data['macro'] = `${num}dF`
            data['roll_dice'] = DiceParser.roll_fate(num)
        }

        if ((mod = modReg.exec(str)) !== null) {
            let sum = eval(mod.groups.mod)
            let num = parseInt(sum)
            data['macro'] += `${mod.groups.mod}`
            data['mod_macro'] = mod.groups.mod
            data['mod_sum'] = num
        }

        data['color'] = localStorage.fateColor

        const global_sum = data['roll_dice'].reduce(sum_array) + data['mod_sum']
        data['global_sum'] = global_sum

        // Sticker
        if (localStorage.fateSticker && localStorage.fateSticker === 'true') {
            let sticker = ''
            sticker += data['username']
            sticker += '\n\n'
            sticker += colorFr(data['color'])
            data['roll_dice'].forEach(r => {
                sticker += ` ${r} `
            })
            sticker += `\nmod : ${data['mod_sum']}\n\n`
            sticker += `Total : ${data['global_sum']}`
            const vp = await canvasViewport()
            let selectSticker = await getWidget(getAppWidget('sticker', 'user', data['username']))
            if (selectSticker.length === 0) {
                miro.board.widgets.create({
                    type: 'Sticker',
                    scale: 2.5,
                    x: vp.x,
                    y: vp.y,
                    text: sticker,
                    style: {
                        stickerType: 0,
                        textAlign: 'c'
                    },
                    metadata: {
                        [APP_ID]:
                        {
                            user: data['username']
                        }
                    }
                })
            } else {
                for (let i = 0; selectSticker.length > i; i++) {
                    let stickerId = selectSticker[i].id
                    //Sticker color
                    // let selStickerStyle = selectSticker[i].style
                    await miro.board.widgets.update({
                        id: stickerId,
                        x: selectSticker[i].x,
                        y: selectSticker[i].y,
                        scale: selectSticker[i].scale,
                        style: {
                            stickerType: 0,
                            textAlign: 'c',
                        },
                        text: sticker
                    })
                }
            }


        }

        dicePool(JSON.stringify(data))
        UI.displayPage('result')
    }

    static Display(obj) {
        let text = ''
        text += '<div class="chat-minus">Roll : '
        text += obj.macro
        text += '</div>'
        obj.roll_dice.forEach(d => {
            let fate
            if (d == -1) {
                fate = '-'
            } else if (d == 0) {
                fate = ' '
            } else if (d == 1) {
                fate = '+'
            }
            text += `<button type="button" class="btn btn-dice-result btn-${obj.color} mx-1 mb-1">${fate}</button>`
        })
        text += '<div class="global-sum"><small class="chat-minus">Total : </small>'
        text += `<span class="global-sum-${obj.color} ml-2">${obj.global_sum}</span>`
        text += '</div>'
        text += '<hr />'
        return text
    }
}

export default FateRoll
