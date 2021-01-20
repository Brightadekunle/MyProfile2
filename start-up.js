// Assume users have ID ranging from 1 to 100
let firstBatch = []
let secondBatch = []
for (var i = 0; i < 100; i++){
    if (i%2 == 0){
        firstBatch.push(i)
    } else {
        secondBatch.push(i)
    }
}

console.log(firstBatch, secondBatch)
