class DiceParser {

    static generate_roll(dice) {
        return Math.floor(Math.random() * Math.floor(dice) + 1)
    }

    static generate_fate_roll() {
        let roll = Math.floor(Math.random() * 3)
        let value
        if (roll === 0) {
            value = -1
        } else if (roll === 1) {
            value = 0
        } else {
            value = 1
        }
        return value
    }

    static roll_dice(number, dice) {
        const roll_dice = []
        for (let i = 0; i < number; i++) {
            roll_dice.push(DiceParser.generate_roll(dice))
        }
        return roll_dice
    }

    static roll_fate(number) {
        const roll_dice = []
        for (let i = 0; i < number; i++) {
            roll_dice.push(DiceParser.generate_fate_roll())
        }
        return roll_dice
    }

    static explode(dice, roll_dice) {
        for (let i = 0; i < roll_dice.length; i++) {
            if (roll_dice[i] >= dice) {
                roll_dice.push(DiceParser.generate_roll(dice))
            }
        }
        return roll_dice
    }

    static kh(int, roll_dice) {
        roll_dice.sort((a, b) => b - a)
        let drop_value = roll_dice.length - int
        for (let i = 0; i < drop_value; i++) {
            roll_dice.pop()
        }
        return roll_dice
    }

    static kl(int, roll_dice) {
        roll_dice.sort((a, b) => a - b)
        let drop_value = roll_dice.length - int
        for (let i = 0; i < drop_value; i++) {
            roll_dice.pop()
        }
        return roll_dice
    }

    static cs(int, roll_dice) {
        let value = 0
        roll_dice.forEach(d => {
            if (d >= int) {
                value += 1
            }
        })
        return value
    }

    static cf(int, roll_dice) {
        let value = 0
        roll_dice.forEach(d => {
            if (d <= int) {
                value += 1
            }
        })
        return value
    }

    static compare_multi(int, compare, global_sum) {
        let value
        eval(global_sum.toString() + compareSymbols(compare) + int.toString()) === true ? value = 1 : value = 0
        return value
    }

    static compare_simple(int, compare, roll_dice) {
        let value = 0
        roll_dice.forEach(d => {
            if (eval(d.toString() + compareSymbols(compare) + int.toString()) === true) {
                value++
            }
        })
        return value
    }

}
export default DiceParser
