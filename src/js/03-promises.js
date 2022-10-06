import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector(".form"),
  button: document.querySelector("button"),
}

refs.button.addEventListener('click', onButtonClick)

function onButtonClick (evt) {
  evt.preventDefault()
  const formEl = refs.form.elements;
  let delay =  Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount = formEl.amount.value;

  for(let i=1; i <=amount; i+=1) {
    let position = i;
    
    if(position >= 2) {
      delay+=step
    }

    createPromise(position, delay).then(({ position, delay }) => {
      onSuccess({ position, delay })
        })
        .catch(({ position, delay }) => {
          onError({ position, delay })
        });
  }

}


function createPromise(position, delay) {
    return new Promise((resolve, reject) => {

      setTimeout(() => {

        const shouldResolve = Math.random() > 0.3;

        if (shouldResolve) {
          resolve({ position, delay })
        } else {
          reject({ position, delay })}
      }, 
      delay )
      }
    )
}

 
function onSuccess ({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError ({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
