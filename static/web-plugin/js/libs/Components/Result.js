class Result extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = `
            <div id="result-container" container="result" style="display:none">
            </div>
        `
    }
}

export default Result
