import DiceParser from '../../Tools/DiceParser.js'
import UI from '../../Tools/UI.js'

class ClassicRoll {
    static async handleSubmit() {
        let state = true
        let error = ''
        let allSet = []
        const username = document.querySelector('#usernameC').value

        if (username == '') {
            state = false
            error += 'Veuillez indiquer un pseudo.\n'
        }

        if (state === true) {


            let sets = JSON.parse(localStorage.diceSet)
            sets = sets.sort((a, b) => a - b)
            sets.shift()

            sets.forEach(set => {
                let number = document.querySelector(`#numberDice${set}`).value
                let type = document.querySelector(`#typeDice${set}`).value
                let mod = document.querySelector(`#modDice${set}`).value
                let cs = document.querySelector(`#criticalValue${set}`).value
                let cf = document.querySelector(`#fumbleValue${set}`).value
                let explode = document.querySelector(`#explodeValue${set}`).value
                let kh = document.querySelector(`#khValue${set}`).value
                let kl = document.querySelector(`#klValue${set}`).value
                let target = document.querySelector(`#targetValue${set}`).value
                let difficulty = document.querySelector(`#difficultyValue${set}`).value

                let obj = JSON.parse(localStorage[`diceSet${set}`])

                if (number === '' || number <= 0) { obj.number = 1 }
                if (type === '' || type <= 0) { obj.type = 6 }
                if (mod === '') { obj.mod = 0 }
                if (cs === '') { obj.criticalValue = obj.type }
                if (cf === '') { obj.fumbleValue = 1 }
                if (explode === '') { obj.explodeValue = obj.type }
                if (kh === '') { obj.kh = 1 }
                if (kl === '') { obj.kl = 1 }
                if (target === '') {
                    obj.targetOption = 'gteq'
                    obj.targetValue = obj.type
                }
                if (difficulty === '') {
                    obj.difficultyOption = 'gteq'
                    obj.difficultyValue = (obj.number * obj.type) / 2
                }

                localStorage[`diceSet${set}`] = JSON.stringify(obj)
            })


            sets.forEach(set => {
                let macro = ''
                let kh, kl, explode_value
                let obj = JSON.parse(localStorage[`diceSet${set}`])
                macro += `${obj.number}d${obj.type}`
                obj.mod === '' || obj.mod == 0 ? macro += '' : obj.mod >= 0 ? macro += `+${obj.mod}` : macro += obj.mod
                let roll_dice = DiceParser.roll_dice(obj.number, obj.type)
                let roll_origin = roll_dice.slice()
                let data = {
                    macro: macro,
                    game: 'classic',
                    number: parseInt(obj.number),
                    dice: parseInt(obj.type),
                    roll_origin: roll_origin,
                    roll_dice: roll_dice,
                    color: obj.color,
                    group: obj.difficultyTestSwitch,
                    explode: obj.explodeSwitch,
                    kh: kh,
                    kl: kl,
                    critical: obj.criticalSwitch,
                    cs_value: DiceParser.cs(parseInt(obj.criticalValue), roll_dice),
                    cf_value: DiceParser.cf(obj.fumbleValue, roll_dice),
                    mod_macro: obj.mod,
                }

                // Explode
                if (obj.explodeSwitch === true) {
                    explode_value = parseInt(obj.explodeValue)
                    DiceParser.explode(explode_value, roll_dice)
                } else {
                    explode_value = 0
                }
                data.explode_value = explode_value

                // KH / KL
                let roll_beforek = roll_dice.slice()
                data.roll_beforek = roll_beforek
                if (obj.advantageSwitch === true) {
                    kh = parseInt(obj.kh)
                    DiceParser.kh(kh, roll_dice)
                } else {
                    kh = 0
                }
                if (obj.disadvantageSwitch === true) {
                    kl = parseInt(obj.kl)
                    DiceParser.kl(kl, roll_dice)
                } else {
                    kl = 0
                }
                data.kh = kh
                data.kl = kl

                // Sum
                const dice_sum = roll_dice.reduce(sum_array)
                data.dice_sum = dice_sum

                // Global Sum
                const global_sum = dice_sum + parseInt(obj.mod)
                data.global_sum = global_sum

                // Compare
                let compare_dice = false
                let compare_sum = false
                let compare_dice_macro, compare_sum_macro
                if (obj.targetNumberSwitch === true) {
                    compare_dice_macro = `${compareSymbols(obj.targetOption)} ${obj.targetValue}`
                    compare_dice = DiceParser.compare_simple(obj.targetValue, obj.targetOption, roll_dice)
                }

                if (obj.difficultyTestSwitch === true) {
                    compare_sum_macro = `${compareSymbols(obj.difficultyOption)} ${obj.difficultyValue}`
                    compare_sum = DiceParser.compare_multi(obj.difficultyValue, obj.difficultyOption, global_sum)
                }

                data.compare_dice = compare_dice
                data.compare_dice_macro = compare_dice_macro
                data.compare_sum = compare_sum
                data.compare_sum_macro = compare_sum_macro

                allSet.push(data)
            })
            let finalData = {
                game: 'classic',
                username: username,
                set: allSet
            }

            // Sticker
            if (localStorage.classicSticker && localStorage.classicSticker === 'true') {
                let sticker = ''
                sticker += finalData['username']
                finalData.set.forEach((set, index) => {
                    sticker += `\n---------------\n`
                    sticker += colorFr(set['color'])
                    set.roll_dice.forEach((r, index) => {
                        if (index === (set.roll_dice.length - 1)) {
                            sticker += ` ${r}`
                        } else {
                            sticker += ` ${r}, `
                        }
                    })
                    if (set.mod_macro != 0) {
                        sticker += `\nmod : `
                        set.mod_macro > 0 ? sticker += `+${set.mod_macro}` : sticker += set.mod_macro
                    }
                    sticker += `\n\nTotal : ${set.global_sum}`
                })
                const vp = await canvasViewport()
                let selectSticker = await getWidget(getAppWidget('sticker', 'user', finalData.username))
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
                                user: finalData.username
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

            dicePool(JSON.stringify(finalData))
            UI.displayPage('result')
        } else {
            miro.showErrorNotification(error)
        }

    }

    static Display(obj, objID) {
        let text = ''
        let id = 0
        obj.forEach((message) => {
            id++
            text += '<div class="chat-minus">Roll : '
            text += message.macro
            text += '</div>'
            message['roll_dice'].forEach(d => {
                text += `<button type="button" class="btn btn-dice-result btn-${message.color} mx-1 mb-1">${d}</button>`
            })
            if (message.explode || message.mod_macro != "0" || message.kh != 0 || message.kl != 0) {
                text += `<div><a class="chat-minus" data-toggle="collapse" href="#detail-${objID}-${id}" role="button" aria-expanded="false" aria-controls="detail-${objID}-${id}">`
                text += 'Details'
                text += '</a></div>'
                text += `<div class="collapse detail-roll rounded p-2" id="detail-${objID}-${id}">`
                text += '<div class="py-2">'
                text += '<div>Initial roll : </div>'
                text += '<hr class="mt-1 mb-2" />'
                text += '<div>'
                message.roll_origin.forEach(d => {
                    text += `<button type="button" class="btn d-inline btn-dice-result btn-${message.color} mx-1 mb-1">${d}</button>`
                })
                text += '</div>'
                text += '</div>'
                if (message.explode) {
                    text += '<div class="py-2">'
                    text += '<div>Explode from a '
                    text += `<button type="button" class="btn d-inline btn-dice-result btn-${message.color} mx-1 mb-1">${message.explode_value}</button>`
                    text += '</div>'
                    text += '<hr class="mt-1 mb-2" />'
                    text += '<div>'
                    message.roll_beforek.forEach(d => {
                        text += `<button type="button" class="btn d-inline btn-dice-result btn-${message.color} mx-1 mb-1">${d}</button>`
                    })
                    text += '</div>'
                    text += '</div>'
                }
                if (message.kh != 0 || message.kl != 0) {
                    text += '<div class="py-2">'
                    text += '<div>Dice before keeping : </div>'
                    text += "<hr class='mt-1 mb-2' />"
                    text += '<div>'
                    message.roll_beforek.forEach(d => {
                        text += `<button type="button" class="btn d-inline btn-dice-result btn-${message.color} mx-1 mb-1">${d}</button>`
                    })
                    text += '</div>'
                    text += '</div>'
                }
                if (message.mod_macro != "0") {
                    let mod
                    message.mod_macro > 0 ? mod = `+${message.mod_macro}` : mod = message.mod_macro
                    text += '<div class="py-2">'
                    text += `<div>Modifiers : ${mod}</div>`
                    // if (message.mod_roll.length != 0) {
                    //     text += "<div>Dés modificateurs : </div>"
                    //     text += "<hr class='mt-1 mb-2' />"
                    //     text += '<div>'
                    //     message.mod_roll.forEach(d => {
                    //         text += `<button type="button" class="btn d-inline btn-dice-result btn-${message.color} mx-1 mb-1">${d}</button>`
                    //     })
                    //     text += '</div>'
                    //     text += `<div>Modificateurs après jet : ${message.mod}</div>`
                    // }
                    text += '</div>'
                }
                text += '</div>'
            }
            text += '<div class="global-sum"><small class="chat-minus">Total : </small>'
            text += `<span class="global-sum-${message.color} ml-2">${message.global_sum}</span>`
            text += '</div>'
            if (message.compare_dice) {
                text += '<div>'
                text += message.compare_dice == 0 ? '<span class="global-sum-red chat-minus">Failure</span>' : `<span class="global-sum-green chat-minus">${message.compare_dice} Success</span>`
                text += `<span class="chat-minus ml-2">( each die  ${message.compare_dice_macro} )</span>`
                text += '</div>'
            }

            if (message.compare_sum) {
                text += '<div>'
                text += message.compare_sum == 1 ? '<span class="global-sum-green chat-minus">Success</span>' : '<span class="global-sum-red chat-minus">Failure</span>'
                text += `<span class="chat-minus ml-2">( sum of dice ${message.compare_sum_macro} )</span>`
                text += '</div>'
            }
            if (message.critical) {
                if (message.cf_value != 0) {
                    text += '<div>'
                    text += `<span class="global-sum-red chat-minus">${message.cf_value} Critical failure</span>`
                    text += '</div>'
                }
                if (message.cs_value != 0) {
                    text += '<div>'
                    text += `<span class="global-sum-green chat-minus">${message.cs_value} Critical success</span>`
                    text += '</div>'
                }
            }

            text += '<hr />'
        })
        return text
    }
}

export default ClassicRoll
