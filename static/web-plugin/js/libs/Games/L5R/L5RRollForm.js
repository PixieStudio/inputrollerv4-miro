class L5RRollForm extends HTMLDivElement {
    constructor() {
        super()
        let l5rSticker, usernameL5R, numSkillL5R, numRingL5R, fateColor
        localStorage.l5rSticker && localStorage.l5rSticker === 'true' ? l5rSticker = 'checked' : l5rSticker = ''
        localStorage.usernameL5R ? usernameL5R = localStorage.usernameL5R : usernameL5R = ''
        localStorage.numSkillL5R ? numSkillL5R = localStorage.numSkillL5R : numSkillL5R = 0
        localStorage.numRingL5R ? numRingL5R = localStorage.numRingL5R : numRingL5R = 0

        this.innerHTML = `
        <form id="formL5R">
            <div class="form-group">
                <button type="submit"  class="btn btn-danger btn-block" id="rollL5RDice">Lancer les dés</button>
            </div>
            <div class="form-group">
                <label class="control-label">Personnage ou Pseudo</label>
                <div class="form-group">
                    <input type="text" class="form-control" aria-label="Username" id="usernameL5R" value="${usernameL5R}" oninput="handleChange(event)">
                </div>
            </div>
            <!-- <div class="form-group">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="l5rSticker" onclick="storeCheckbox(event)" ${l5rSticker}>
                    <label class="custom-control-label" for="l5rSticker">Post-It</label>
                </div>
            </div> -->
            <div class="form-group">
                <label class="control-label">Dés</label>
                <div class="form-group">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control number-dice" aria-label="Number of dice"
                            id="numSkillL5R" min="0" value="${numSkillL5R}" oninput="handleChange(event)">
                        <span class="input-group-text">Skill Dice</span>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group mb-3">
                        <input type="number" class="form-control number-dice" aria-label="Number of dice"
                            id="numRingL5R" min="0" value="${numRingL5R}" oninput="handleChange(event)">
                        <span class="input-group-text">Ring Dice</span>
                    </div>
                </div>
            </div>
        </form>
        `
    }
}

export default L5RRollForm
