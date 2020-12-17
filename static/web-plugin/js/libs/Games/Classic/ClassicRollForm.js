
class ClassicRollForm extends HTMLDivElement {
    constructor() {
        super()

        let classicSticker, usernameC
        localStorage.classicSticker && localStorage.classicSticker == 'true' ? classicSticker = 'checked' : classicSticker = ''
        localStorage.usernameC ? usernameC = localStorage.usernameC : usernameC = ''

        this.innerHTML = `
        <form id="formClassic">
            <div class="form-group">
                <button type="submit"  class="btn btn-danger btn-block" id="rollClassicDice">Lancer les dés</button>
            </div>
            <div class="form-group">
                <label class="control-label">Personnage ou Pseudo</label>
                <div class="form-group">
                    <input type="text" class="form-control" aria-label="Username" id="usernameC" value="${usernameC}" oninput="handleChange(event)">
                </div>
            </div>
             <div class="form-group">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="classicSticker" onclick="storeCheckbox(event)" ${classicSticker}>
                    <label class="custom-control-label" for="classicSticker">Sticker</label>
                </div>
            </div>
            <!-- Container dice set -->
            <div id="diceSetContainer">
            </div>
            <button type="button" class="my-3 btn btn-outline-info btn-block text-left" id="moreDice">
                <i class="fas fa-plus mr-3"></i> Ajouter un set de dés</span>
            </button>
            <div class="form-group">
                <button type="submit"  class="btn btn-danger btn-block" id="rollClassicDice">Lancer les dés</span></button>
            </div>
        </form>
        `

        if (localStorage.diceSet) {
            const diceSetContainer = document.getElementById('diceSetContainer')
            let sets = JSON.parse(localStorage.diceSet)
            sets = sets.sort((a, b) => a - b)
            sets.shift()
            sets.forEach(set => {
                diceSetContainer.innerHTML += ClassicRollForm.DiceSet(set)
                let obj = JSON.parse(localStorage[`diceSet${set}`])
                let criticalTarget = document.querySelector(`#criticalTarget${set}`)
                let explodeTarget = document.querySelector(`#explodeTarget${set}`)
                let khTarget = document.querySelector(`#khTarget${set}`)
                let klTarget = document.querySelector(`#klTarget${set}`)
                let targetNumber = document.querySelector(`#targetNumber${set}`)
                let difficultyTarget = document.querySelector(`#difficultyTarget${set}`)

                if (
                    obj.criticalSwitch === true ||
                    obj.explodeSwitch === true ||
                    obj.advatageSwitch === true ||
                    obj.disadvantageSwitch === true ||
                    obj.targetNumberSwitch === true ||
                    obj.difficultyTestSwitch === true
                ) {
                    document.querySelector(`#collapseOptions${set}`).classList.add('show')
                }

                if (obj.criticalSwitch === true) {
                    criticalTarget.classList.remove('d-none')
                    criticalTarget.classList.add('d-block')
                } else {
                    criticalTarget.classList.remove('d-block')
                    criticalTarget.classList.add('d-none')
                }
                if (obj.explodeSwitch === true) {
                    explodeTarget.classList.remove('d-none')
                    explodeTarget.classList.add('d-block')
                } else {
                    explodeTarget.classList.remove('d-block')
                    explodeTarget.classList.add('d-none')
                }
                if (obj.advantageSwitch === true) {
                    khTarget.classList.remove('d-none')
                    khTarget.classList.add('d-block')
                } else {
                    khTarget.classList.remove('d-block')
                    khTarget.classList.add('d-none')
                }
                if (obj.disadvantageSwitch === true) {
                    klTarget.classList.remove('d-none')
                    klTarget.classList.add('d-block')
                } else {
                    klTarget.classList.remove('d-block')
                    klTarget.classList.add('d-none')
                }
                if (obj.targetNumberSwitch === true) {
                    targetNumber.classList.remove('d-none')
                    targetNumber.classList.add('d-block')
                } else {
                    targetNumber.classList.remove('d-block')
                    targetNumber.classList.add('d-none')
                }
                if (obj.difficultyTestSwitch === true) {
                    difficultyTarget.classList.remove('d-none')
                    difficultyTarget.classList.add('d-block')
                } else {
                    difficultyTarget.classList.remove('d-block')
                    difficultyTarget.classList.add('d-none')
                }
            })
        } else {
            localStorage.diceSet = JSON.stringify([0])
            ClassicRollForm.NewSet()
        }
    }

    static NewSet() {
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
            classicSticker: false,
            criticalSwitch: false,
            explodeSwitch: false,
            advantageSwitch: false,
            disadvantageSwitch: false,
            targetNumberSwitch: false,
            difficultyTestSwitch: false
        })
        diceSetContainer.innerHTML += ClassicRollForm.DiceSet(diceSetID)
    }

    static DiceSet(id) {
        let obj = JSON.parse(localStorage[`diceSet${id}`])
        let number = obj.number
        let type = obj.type
        let mod = obj.mod
        let criticalSwitch, explodeSwitch, advantageSwitch, disadvantageSwitch, targetNumberSwitch, difficultyTestSwitch
        obj.criticalSwitch === true ? criticalSwitch = 'checked' : criticalSwitch = ''
        obj.explodeSwitch === true ? explodeSwitch = 'checked' : explodeSwitch = ''
        obj.advantageSwitch === true ? advantageSwitch = 'checked' : advantageSwitch = ''
        obj.disadvantageSwitch === true ? disadvantageSwitch = 'checked' : disadvantageSwitch = ''
        obj.targetNumberSwitch === true ? targetNumberSwitch = 'checked' : targetNumberSwitch = ''
        obj.difficultyTestSwitch === true ? difficultyTestSwitch = 'checked' : difficultyTestSwitch = ''
        let black, white, red, green, blue, yellow
        obj.color === 'black' ? black = 'focus' : black = ''
        obj.color === 'white' ? white = 'focus' : white = ''
        obj.color === 'red' ? red = 'focus' : red = ''
        obj.color === 'green' ? green = 'focus' : green = ''
        obj.color === 'blue' ? blue = 'focus' : blue = ''
        obj.color === 'yellow' ? yellow = 'focus' : yellow = ''

        let targetOptions = ''
        const optTarget = ['gt', 'gteq', 'lt', 'lteq']
        optTarget.forEach(el => {
            if (el === obj.targetOption) {
                targetOptions += `<option value="${el}" selected> ${compareSymbols(el)}</option>`
            } else {
                targetOptions += `<option value="${el}"> ${compareSymbols(el)}</option>`
            }
        })

        let difficultyOptions = ''
        const optDifficult = ['gt', 'gteq', 'lt', 'lteq']
        optDifficult.forEach(el => {
            if (el === obj.difficultyOption) {
                difficultyOptions += `<option value="${el}" selected> ${compareSymbols(el)}</option>`
            } else {
                difficultyOptions += `<option value="${el}"> ${compareSymbols(el)}</option>`
            }
        })

        const text = `
            <div class="form-group dice-set" id="diceSet${id}" data-dicesetid="${id}">
                    <label class="col-10 p-0 text-left control-label">Set de Dés #${id}</label><i class="col-2 p-0 text-right fas fa-times pointer close-set" data-diceset="${id}" onclick="removeSet(event)"></i>
                    <div class="form-group">
                        <div class="input-group mb-1">
                            <input type="number" class="form-control" aria-label="Number of dice ${id}" id="numberDice${id}" min="1" value="${number}" set-id=${id} set-key='number' oninput="handleChangeSet(event)">
                            <span class="input-group-text">d</span>
                            <input type="number" class="form-control" aria-label="Type of dice ${id}" id="typeDice${id}" min="1" value="${type}" set-id=${id} set-key='type' oninput="handleChangeSet(event)">
                            <span class="input-group-text">+</span>
                            <input type="number" class="form-control" aria-label="Modificator ${id}" id="modDice${id}" value="${mod}" set-id=${id} set-key='mod' oninput="handleChangeSet(event)">
                        </div>
                        <button type="button" class="btn btn-dice btn-black mx-1 btn-dice-color${id} ${black}" data-color="black" set-id=${id} set-key='color' onclick="handleChangeSet(event)"></button>
                        <button type="button" class="btn btn-dice btn-white mx-1 btn-dice-color${id} ${white}" data-color="white" set-id=${id} set-key='color' onclick="handleChangeSet(event)"></button>
                        <button type="button" class="btn btn-dice btn-red mx-1 btn-dice-color${id} ${red}" data-color="red" set-id=${id} set-key='color' onclick="handleChangeSet(event)"></button>
                        <button type="button" class="btn btn-dice btn-green mx-1 btn-dice-color${id} ${green}" data-color="green" set-id=${id} set-key='color' onclick="handleChangeSet(event)"></button>
                        <button type="button" class="btn btn-dice btn-blue mx-1 btn-dice-color${id} ${blue}" data-color="blue" set-id=${id} set-key='color' onclick="handleChangeSet(event)"></button>
                        <button type="button" class="btn btn-dice btn-yellow mx-1 btn-dice-color${id} ${yellow}" data-color="yellow" set-id=${id} set-key='color' onclick="handleChangeSet(event)"></button>
                    </div>
                    <a class="" data-toggle="collapse" href="#collapseOptions${id}" aria-expanded="false" aria-controls="collapseOptions${id}">
                                Options
                    </a>
                    <div class="collapse" id="collapseOptions${id}">
                        <!-- Critical Fumble  -->
                        <div class="form-group">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="criticalSwitch${id}" sub="criticalTarget${id}" set-id=${id} set-key='criticalSwitch' onclick="storeCheckboxSet(event)" ${criticalSwitch}>
                                <label class="custom-control-label" for="criticalSwitch${id}">Succès / Échecs critiques</label>
                            </div>
                        </div>
                        <div class="form-group d-none" id="criticalTarget${id}">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Succès Critique >=</span>
                                </div>
                                <input type="number" class="form-control" aria-label="Critical success target" id="criticalValue${id}"
                                    min="1" set-id=${id} set-key='criticalValue' value="${obj.criticalValue}" oninput="handleChangeSet(event)">
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Échec Critique <=</span>
                                </div>
                                <input type="number" class="form-control" aria-label="Fumble target" id="fumbleValue${id}" min="1" set-id=${id} set-key='fumbleValue' value="${obj.fumbleValue}" oninput="handleChangeSet(event)">
                            </div>
                        </div>
                        <!-- Explode Option  -->
                        <div class="form-group">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="explodeSwitch${id}" sub="explodeTarget${id}" set-id=${id} set-key='explodeSwitch' onclick="storeCheckboxSet(event)" ${explodeSwitch}>
                                <label class="custom-control-label" for="explodeSwitch${id}">Dés explosifs</label>
                            </div>
                        </div>
                        <div class="form-group d-none" id="explodeTarget${id}">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Minimum pour exploser</span>
                                </div>
                                <input type="number" class="form-control" aria-label="Valeur minimale explosion" id="explodeValue${id}"
                                    min="1" set-id=${id} set-key='explodeValue' value="${obj.explodeValue}" oninput="handleChangeSet(event)">
                            </div>
                        </div>
                        <!-- Advantage Option  -->
                        <div class="form-group">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="advantageSwitch${id}" sub="khTarget${id}" set-id=${id} set-key='advantageSwitch' onclick="storeCheckboxSet(event)" ${advantageSwitch}>
                                <label class="custom-control-label" for="advantageSwitch${id}">Garder les plus grands</label>
                            </div>
                        </div>
                        <div class="form-group d-none" id="khTarget${id}">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Combien de dés à conserver ?</span>
                                </div>
                                <input type="number" class="form-control" aria-label="How many dice to keep" id="khValue${id}" set-id=${id} set-key='kh' value="${obj.kh}" oninput="handleChangeSet(event)">
                            </div>
                        </div>
                        <!-- Disadvantage Option  -->
                        <div class="form-group">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="disadvantageSwitch${id}" sub="klTarget${id}" set-id=${id} set-key='disadvantageSwitch' onclick="storeCheckboxSet(event)" ${disadvantageSwitch}>
                                <label class="custom-control-label" for="disadvantageSwitch${id}">Garder les plus petits</label>
                            </div>
                        </div>
                        <div class="form-group d-none" id="klTarget${id}">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Combien de dés à conserver ?</span>
                                </div>
                                <input type="number" class="form-control" aria-label="How many dice to keep" id="klValue${id}" set-id=${id} set-key='kl' value="${obj.kl}" oninput="handleChangeSet(event)">
                            </div>
                        </div>
                        <!-- Target Number  -->
                        <div class="form-group">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="targetNumberSwitch${id}" sub="targetNumber${id}" set-id=${id} set-key='targetNumberSwitch' onclick="storeCheckboxSet(event)" ${targetNumberSwitch}>
                                <label class="custom-control-label" for="targetNumberSwitch${id}">Succès Cible (dés séparés)</label>
                            </div>
                        </div>
                        <div class="form-group d-none" id="targetNumber${id}">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Chaque dé doit être </span>
                                </div>
                                <select class="custom-select" id="targetOptions${id}" set-id=${id} set-key='targetOption' oninput="handleChangeSet(event)">
                                                                                            ${targetOptions}
                                </select>
                                <input type="number" class="form-control" aria-label="Target Number" id="targetValue${id}" min="1" set-id=${id} set-key='targetValue' value="${obj.targetValue}" oninput="handleChangeSet(event)">
                            </div>
                        </div>
                        <!-- Difficulty Test  -->
                        <div class="form-group">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" id="difficultyTestSwitch${id}" sub="difficultyTarget${id}" set-id=${id} set-key='difficultyTestSwitch' onclick="storeCheckboxSet(event)" ${difficultyTestSwitch}>
                                <label class="custom-control-label" for="difficultyTestSwitch${id}">Difficulté (somme des dés)</label>
                            </div>
                        </div>
                        <div class="form-group d-none" id="difficultyTarget${id}">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">La somme doit être </span>
                                </div>
                                <select class="custom-select" id="difficultyOptions${id}" set-id=${id} set-key='difficultyOption' oninput="handleChangeSet(event)">
                                                                                                    ${difficultyOptions}
                                </select>
                                <input type="number" class="form-control" aria-label="Difficulty" id="difficultyValue${id}" min="0" set-id=${id} set-key='difficultyValue' value="${obj.difficultyValue}" oninput="handleChangeSet(event)">
                            </div>
                        </div>
                    </div>
                </div>
                `
        return text
    }



}

export default ClassicRollForm
