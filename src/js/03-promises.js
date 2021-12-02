import Notiflix from 'notiflix';

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const {
        elements: { delay, step, amount },
    } = event.currentTarget;
    let delayTime = Number(delay.value);
    let stepTime = Number(step.value);
    let amountNum = Number(amount.value);

    let position = 1;
    for (let index = 0; index < amountNum; index += 1) {
        createPromise(position, delayTime)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        position += 1;
        delayTime += stepTime;
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay);
    });
}
// function createPromise(position, delay) {
//     timeout = setInterval(() => {
//         const shouldResolve = Math.random() > 0.3;
//         if (shouldResolve) {
//             Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         } else {
//             Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//         }
//     }, delay);
// }

// const handleSubmit = function (event) {
//     event.preventDefault();
//     const {
//         elements: { delay, step, amount },
//     } = event.currentTarget;
//     delayTime = Number(delay.value);
//     stepTime = step.value;
//     amountNum = amount.value;
//     setTimeout(() => {
//         createInterval(stepTime, amountNum);
//     }, delayTime);
// };
// form.addEventListener('submit', handleSubmit);

// function createInterval(intervalValue, countRepeats) {
//     let promiseNum = 0;

//     for (let index = 0; index < countRepeats; index += 1) {
//         promiseNum += 1;
//         console.log('timeout=setInterval ~ promiseNum', promiseNum);
//         createPromise(promiseNum, intervalValue);
//     }
// }
// clearInterval(timeout);
