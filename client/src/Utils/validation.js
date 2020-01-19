//form validation
export const validate = value => {
    let error;
    let status = true
    if (!value) {
      error = "Nu poate fi gol";
      status = false
    } 
    
  //   if (value.length > 70) {
  //    error = "Te rog nu cauta mai mult de 70 de caractere"; 
  //    status = false
  //  } 
    return {error,status}
};

export const validateNum = num => {
  let error;
  let status = true
  if (num < 0 ||  num === 0) {
    error = "Alege Experienta";
    status = false
  } 

  if(num > 50){
      error = "Numar prea mare";
      status = false
  }
  return {error,status}
}

export const validateEmail = (value) =>  {
  let error ;
  let status = true
  if (!value) {
    error = "Nu poate fi gol";
    status = false
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'adresa de mail este invalida';
    status = false
  }
  return {error, status};
}