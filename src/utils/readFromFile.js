import source from '../assets/games.txt'

export default async function readFromFile(index=0, size = 1){
    return await fetch(source)
        .then(t => t.text())
        .then(t => t.split('\n'))
        .then(t => {
            const stack = []
            t.map((r,i) => {
                if(i % 10 === 0)
                    stack.push(t[i+1]+t[i+2]+t[i+3]+t[i+4]+t[i+5]+t[i+6]+t[i+7]+t[i+8]+t[i+9])
                return undefined
            })
            return stack
        })
        .then(t => t.slice(index, index + size))
        .then(t => t.map((r) => {
            let stack = []
            Array(9).fill(0).map((_, i) =>
                stack.push([parseInt(r[i*9]), parseInt(r[i*9+1]), parseInt(r[i*9+2]),
                    parseInt(r[i*9+3]), parseInt(r[i*9+4]), parseInt(r[i*9+5]),
                    parseInt(r[i*9+6]), parseInt(r[i*9+7]), parseInt(r[i*9+8]) ]))
            return stack
        }))
}