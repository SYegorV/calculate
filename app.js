//  calculator:

// определяем поле для вывода результата:
// и создаем контейнер для клавиатуры:
const output = document.querySelector('output')
let memoryMS = 0 // определяем memory
let signMinus = false // true - number отрицательное
let i = 0

// find button and add in button обработчикa события "click":
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        //по клику вызывается функция со значением кнопки в качестве параметра
        calc(this.value)
        const qwer = document.getElementById('id_pl_mi').value
        if (this.value === qwer) {            
            calc(qwer)
        }
    })
})

// вводить символы с клавиатуры:
// обработчик события "нажатие клавиши"
// метод match -- [ filter передает функции calc аргумент соответствующий в нем условию]
// если значением event.key является один из символов, указанных в квадратных скобках ([])
// обратная косая черта - экранирование
// | -- альтерация Backspace или Enter
// то вызывается calc с event.key в качестве параметра, иначе ничего не делаем
// Shift успешно отбрасывается
document.addEventListener('keydown', event => {
    if ((event.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Enter/)) calc(event.key)
})

// код читается снизу вверх
// функция принимает значение кнопки или ключ клавиши
function calc(value) {
    // если нажат знак равенства или Enter
    if (value.match(/=|Enter/)) {
        // пробуем выполнить операцию:
        try {
            // вычисляем значение строки
            const n = 8 // 8 знаков дробной части к вычисляемому результату
            let s = eval(output.textContent).toFixed(n) // исходное число // строчка            
            let f = Math.floor( Number(s)) 
            let t = Number(s)- f // дробная часть //число            
            let v = Math.floor( Number(s)) // целая чать
            let Strt = String(t) // число в строку
            let Strtt = Strt.replace(/0*$/,'')            
            let tt = Number(Strtt) // строчка в число
            output.textContent = Number(`${v + tt}`) // строчка в число
            
            if (value.match(/=/)) {
                
            }              
        } catch { // если операцию выполнить невозможно
            let oldValue = output.textContent // save value поля
            let newValue = 'недопустимое выражение' // create new переменную
            output.textContent = newValue // выводим value новой переменной в поле
            // через полторы секунды возвращаем полю предыдущее value:
            setTimeout(() => {
                output.textContent = oldValue
            }, 1500)
        }
    } else if (value.match(/=/&&/Rvt/)) {
        
    } else if (value === 'MS') { // else if нажат simbol MS
        // write number in memory
        // пробуем выполнить операцию:
        try {
            output.textContent =  eval(output.textContent);
            memoryMS = Number(output.textContent) // save value поля
            // clear поле:
            output.textContent = ''            
        } catch { // если операцию выполнить невозможно
            let oldValue = output.textContent // save value поля
            let newValue = 'недопустимое выражение' // create new переменную
            output.textContent = newValue // выводим value новой переменной в поле
            // через полторы секунды возвращаем полю предыдущее value:
            setTimeout(() => {
                output.textContent = oldValue
            }, 1500)
        }                
    } else if (value === 'MR') { // если нажат simbol MR
        // вывести number from memory on индикатор
        output.textContent = memoryMS.toFixed(8)        
    } else if (value === 'M+') { // если нажат simbol M+
        // add to number in memory numbers on индикаторе
        memoryMS = Number(memoryMS) + Number(output.textContent)
        output.textContent = ''
    } else if (value === 'M-') { // если нажат simbol M-
        // компенсация from number in memory number on индикаторе
        memoryMS = Number(memoryMS) - Number(output.textContent)
        output.textContent = ''                
    } else if (value === 'MC') { // если нажат simbol MC
        // clear number in memory
        memoryMS = Number(0)
        output.textContent = ''                
    } else if (value === 'AC') { // если нажат simbol AC
        // clear number in memory
        memoryMS = Number(0)
        output.textContent = ''                
    } else if (value === 'C') { // если нажат simbol С
        // clear поле
        output.textContent = ''
    } else if (value.match(/<-/)) { // если нажат simbol <-
        // <- уменьшаем строку на один simbol:
        output.textContent = output.textContent.substring(0, output.textContent.length - 1)
    } else if (value === '-<>') { // если нажат символ &plusmn --- value.match(/-<>/)        
        signMinus = !signMinus //смена знака        
        output.textContent = Number(signMinus ? - + Number(output.textContent): Number(output.textContent))        
    } else if (value.match(/CE|Backspace/)) { // если нажат символ CE или Backspace 
        // CE уменьшаем строку на один simbol
        // Backspace вводим предыдущий [символ/действие] повтор
        output.textContent = output.textContent.substring(0, output.textContent.length - 1)
    } else if ( value === '.'|value === '*'|value === '/'|value === '+'|value === '-' && output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '.'|output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '*'|output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '/'|output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '+'|output.textContent.substring(output.textContent.length - 1, output.textContent.length) === '-' ) {
        
    } else if ( output.textContent.length > 32 - 1 ) { // ввод 32 simbols in поле
        let oldValue = output.textContent // save value поля
        let newValue = 'недопустимое выражение' // create new переменную
        output.textContent = newValue // выводим value новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else if (value === '.'|value === '0'|value === '1'|value === '2'|value === '3'|value === '4'|value === '5'|value === '6'|value === '7'|value === '8'|value === '9') {
        const n1 = 12 // 12 знаков целой части
        const n2 = 8 // 8 знаков дробная часть

        let ss = output.textContent // исходное число        
        ss = Number(ss + value).toFixed(n2+2)        
        let ff = Math.floor( Number(ss)).toFixed(n2+2)        
        let tt = (Number(ss)- ff).toFixed(n2 + 2) // дробная часть // строчка        
        if (tt > 0 ) {            
            i = i + 1            
            zxcone(i, ss, n1, n2, value)            
        } else {
            zxctwo(tt, ss, n1, n2, value)
        }        
    }
    else { // если нажата любая другая (отфильтрованная) кнопка или клавиша
        // write value in поле:
        output.textContent += value        
    }
}

function zxcone(i, ss, n1, n2, value) {
    let tt = (Number(ss)%1).toFixed(2 + i) // дробная часть // строчка    
    let replacett = Number((Number(tt.replace(/0*$/,''))).toFixed(i)) // дробная часть // число    
    let vv = Math.floor( Number(ss)) // целая чать // число
    let Strvv = String(vv) // число в строку
    let Strreplacett = String(replacett) // число в строку    
    if (Strvv.length > n1) {
        let oldValue = output.textContent // сохраняем значение поля
        let newValue = 'целая чать более 12 цифр' // создаем новую переменную
        output.textContent = newValue // выводим значение новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else if (Strreplacett.length - 2 >= n2 + 1) {
        let oldValue = output.textContent // сохраняем значение поля
        let newValue = 'дробная часть более 8 цифр' // создаем новую переменную
        output.textContent = newValue // выводим значение новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else { //(Strvv.length < n1||Strreplacett.length - 2 < n2 + 1) {
        output.textContent += value
    }
}

function zxctwo(tt, ss, n1, n2, value) {    
    let replacett = Number(tt.replace(/0*$/,'')) // дробная часть // число    
    let vv = Math.floor( Number(ss)) // целая чать // число
    let Strvv = String(vv) // число в строку
    let Strreplacett = String(replacett) // число в строку    
    if (Strvv.length > n1) {
        let oldValue = output.textContent // сохраняем значение поля
        let newValue = 'целая чать более 12 цифр' // создаем новую переменную
        output.textContent = newValue // выводим значение новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else if (Strreplacett.length - 2 >= n2 + 1) {
        let oldValue = output.textContent // сохраняем значение поля
        let newValue = 'дробная часть более 8 цифр' // создаем новую переменную
        output.textContent = newValue // выводим значение новой переменной в поле
        // через полторы секунды возвращаем полю предыдущее значение:
        setTimeout(() => {
            output.textContent = oldValue
        }, 1500)
    } else { //(Strvv.length < n1||Strreplacett.length - 2 < n2 + 1) {
        output.textContent += value
    }    
}


