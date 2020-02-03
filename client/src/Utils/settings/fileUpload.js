export const fileAlerts = {
    getFileAddedMessage	(fileName ) {
       return  `Imaginea  a fost adaugat cu success.`
     },
     getFileLimitExceedMessage	(filesLimit	)  {
       return `Numai o imagine  este permis.Fa click pe imagine currenta pentru a sterge si adauga alta `
     },
     getDropRejectMessage (file)  {
       return `Imagine depaseste marimea permisa`
     },
   
     getFileRemovedMessage ()  {
       return `imaginea a fost stear-sa cu success`
     },
}