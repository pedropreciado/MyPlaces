let arr = [5, 4, 3, 2, 1]

let i = 0;

setInterval(() => {
	console.log(arr[i])
	i = (i + 1) % arr.length 
}, 3000) 
