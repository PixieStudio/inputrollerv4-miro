// ==============================================
//                       APP
// ==============================================

const APP_ID = ''
const APP_URL = 'https://xxx.laflys.com'
const LIBRARY_PATH = 'web-plugin/library.html'

// ==============================================
//                     UTILS
// ==============================================

const langStored = () => {
    if (localStorage.lang) {
        return localStorage.lang
    } else {
        return "en"
    }
}

const addDiv = (container, text) => {
    container.insertAdjacentHTML('afterbegin', text)
}

const removeSet = (e) => {
    let setId = e.target.getAttribute('data-diceset')
    localStorage.removeItem(`diceSet${setId}`)
    const arr = JSON.parse(localStorage.diceSet)
    const indexSet = arr.indexOf(Math.floor(setId))
    if (indexSet > -1) {
        arr.splice(indexSet, 1)
    }
    localStorage.diceSet = JSON.stringify(arr)
    document.querySelector(`#diceSet${setId}`).remove()
}

const sum_array = (a, b) => a + b

async function canvasViewport() {
    const viewport = await miro.board.viewport.get()
    const x = viewport.x + (viewport.width / 2)
    const y = viewport.y + (viewport.height / 2)
    let canvasViewport = {
        x: x,
        y: y
    }
    return canvasViewport
}



const goToWidget = async (id) => {
    await miro.board.viewport.zoomToObject(id)
}

const getWidget = (obj) => {
    return miro.board.widgets.get(obj)
}


function getAppWidget(type, key, value) {
    return {
        type: type,
        metadata: {
            [APP_ID]: { [key]: value }
        }
    }
}
// ==============================================
//                Pool
// ==============================================

const createPool = async () => {
    let pool = await getWidget(getAppWidget('SHAPE', 'type', 'pool_ir'))
    if (pool.length === 0) {
        //Viewport
        const viewport = await miro.board.viewport.get();
        const x = viewport.x + (viewport.width / 2);
        const y = viewport.y + (viewport.height / 2);
        const text = '<p>Input Roller</p><p>Base de données</p><p><strong>Ne pas supprimer</strong></p><p>Onglet "Home" du plugin, pour en savoir plus.</p>'

        await miro.board.widgets.create({
            type: 'SHAPE',
            x: x,
            y: y,
            height: 600,
            width: 1150,
            text: text,
            style: {
                shapeType: 7,
                backgroundColor: "#414bb2",
                borderColor: "transparent",
                borderWidth: 1,
                textAlign: "c",
                textAlignVertical: "m",
                textColor: "#d0d0d0",
                bold: 1,
                fontSize: 48,
                fontFamily: 10
            },
            metadata: {
                [APP_ID]: {
                    roll: 0,
                    type: 'pool_ir'
                }
            }
        })
    }
}

const dicePool = async (str) => {
    let pool = await getWidget(getAppWidget('SHAPE', 'type', 'pool_ir'))
    if (pool.length === 1) {
        pool = pool[0]
        poolMeta = pool.metadata[APP_ID]
        poolMeta['roll'] += 1
        poolMeta[`${poolMeta['roll']}`] = str
        await miro.board.widgets.update({
            id: pool.id,
            metadata: {
                [APP_ID]: poolMeta
            }
        })
    } else {
        createPool()
    }
}

// ==============================================
//                Store Form
// ==============================================
const handleChange = (event) => {
    event.preventDefault();
    let key = event.target.id;
    let value = event.target.value;
    localStorage[key] = value
}

const storeCheckbox = (event) => {
    let key = event.target.id
    let el = document.getElementById(key)
    let value
    el.checked == true ? value = true : value = false
    localStorage[key] = value
}

const handleChangeSet = (event) => {
    event.preventDefault();
    let id = event.target.getAttribute('set-id')
    let obj = JSON.parse(localStorage[`diceSet${id}`])
    let color = event.target.getAttribute('data-color')
    if (color) {
        const set = document.querySelectorAll(`.btn-dice-color${id}`)
        set.forEach(s => {
            if (s.classList.contains('focus')) {
                s.classList.remove('focus')
            }
        })
        event.target.classList.add('focus')
        obj[event.target.getAttribute('set-key')] = event.target.getAttribute('data-color')
    } else {
        obj[event.target.getAttribute('set-key')] = event.target.value
    }
    let data = JSON.stringify(obj)
    localStorage[`diceSet${id}`] = data
}

const storeCheckboxSet = (event) => {
    let id = event.target.getAttribute('set-id')
    let obj = JSON.parse(localStorage[`diceSet${id}`])
    let el = document.getElementById(event.target.id)
    let value
    el.checked == true ? value = true : value = false
    obj[event.target.getAttribute('set-key')] = value
    let data = JSON.stringify(obj)
    localStorage[`diceSet${id}`] = data
    //Show
    let sub = document.querySelector(`#${event.target.getAttribute('sub')}`)
    if (sub.classList.contains('d-none') && value === true) {
        sub.classList.replace('d-none', 'd-block')
    } else if (sub.classList.contains('d-block') && value === false) {
        sub.classList.replace('d-block', 'd-none')
    }
}


// ==============================================
//                Color
// ==============================================

const colorFr = (verb) => {
    let color = ''
    switch (verb) {
        case 'black':
            color = '⬛';
            break;
        case 'white':
            color = '⬜';
            break;
        case 'red':
            color = '🟥';
            break;
        case 'green':
            color = '🟩';
            break;
        case 'blue':
            color = '🟦';
            break;
        case 'yellow':
            color = '🟨';
            break;
    }
    return color
}

const compareSymbols = (el) => {
    let value
    if (el === 'gt') {
        value = '>'
    } else if (el === 'gteq') {
        value = '>='
    } else if (el === 'lt') {
        value = '<'
    } else if (el === 'lteq') {
        value = '<='
    }
    return value
}
