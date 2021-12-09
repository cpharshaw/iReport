

for (let i = 1; i < 101; i++) {
    const f = "Fizz";
    const b = "Buzz";
    let res = [];
    const remainCheck = (val, dvsr) => val % dvsr === 0;

    remainCheck(i, 3) ? res[0] = f + " " + i : null;
    remainCheck(i, 5) ? [...res, b] : null;
    console.log(res);
}