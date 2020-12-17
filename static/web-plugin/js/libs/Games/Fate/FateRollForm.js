
class FateRollForm extends HTMLDivElement {
    constructor() {
        super()

        let fateSticker, usernameF, numberFateDice, modFateDice
        localStorage.fateSticker && localStorage.fateSticker === 'true' ? fateSticker = 'checked' : fateSticker = ''
        localStorage.usernameF ? usernameF = localStorage.usernameF : usernameF = ''
        localStorage.numberFateDice ? numberFateDice = localStorage.numberFateDice : numberFateDice = 4
        localStorage.modFateDice ? modFateDice = localStorage.modFateDice : modFateDice = 0

        this.innerHTML = `
        <form id="formFate">
            <div class="form-group">
                <button type="submit"  class="btn btn-danger btn-block" id="rollFateDice">Lancer les dés</button>
            </div>
            <div class="form-group">
                <label class="control-label">Personnage ou Pseudo</span></label>
                <div class="form-group">
                    <input type="text" class="form-control" aria-label="Username" id="usernameF" value="${usernameF}" oninput="handleChange(event)">
                </div>
            </div>
            <div class="form-group">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="fateSticker" onclick="storeCheckbox(event)" ${fateSticker}>
                    <label class="custom-control-label" for="fateSticker">Sticker</label>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label">Dés</label>
                <div class="form-group">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control number-dice" aria-label="Number of dice"
                            id="numberFateDice" min="1" value="${numberFateDice}" oninput="handleChange(event)">
                        <span class="input-group-text">+</span>
                        <input type="number" class="form-control mod-dice" aria-label="Modificator" id="modFateDice" value="${modFateDice}" oninput="handleChange(event)">
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-dice btn-black mx-1 btn-dice-color-fate" data-color="black" data-diceset="fate"></button>
            <button type="button" class="btn btn-dice btn-white mx-1 btn-dice-color-fate" data-color="white" data-diceset="fate"></button>
            <button type="button" class="btn btn-dice btn-red mx-1 btn-dice-color-fate" data-color="red" data-diceset="fate"></button>
            <button type="button" class="btn btn-dice btn-green mx-1 btn-dice-color-fate" data-color="green" data-diceset="fate"></button>
            <button type="button" class="btn btn-dice btn-blue mx-1 btn-dice-color-fate" data-color="blue" data-diceset="fate"></button>
            <button type="button" class="btn btn-dice btn-yellow mx-1 btn-dice-color-fate" data-color="yellow" data-diceset="fate"></button>
        </form>
        `
        if (localStorage.fateColor) {
            const set = document.querySelector(`[data-diceset=fate][data-color=${localStorage.fateColor}]`)
            set.classList.add('focus')
        } else {
            localStorage.fateColor = 'black'
            const set = document.querySelector(`[data-diceset=fate][data-color=black`)
            set.classList.add('focus')
        }
    }
}

export default FateRollForm
