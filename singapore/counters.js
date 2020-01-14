let count = 0

// impure counter functions
function incrementA () {
    count = count + 1
    console.log('A', count)
}

function incrementB () {
    count = count + 1
    console.log('B', count)
}

incrementA()
incrementA()
incrementB()
incrementA()
