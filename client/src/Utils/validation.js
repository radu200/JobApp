//form validation
export const validate = value => {
    let error = ''
    let status = true
    if (!value) {
      error = "Nu poate fi gol";
      status = false
    } 
    
    if (value.length > 70) {
     error = "Te rog nu cauta mai mult de 70 de caractere"; 
     status = false
   } 
    return {error:error, status:status}
};
