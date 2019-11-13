import React from 'react';
import {removeById } from './helpers'

describe('Helpers', () => {
    
    it('should be defined', () => {
       expect(removeById).toBeDefined()
    })

    
    it('should remove data from array with given id ', () => {
       const payload = [
           {
                id:1,
                name:'Cat'
           },
           {
               id:2,
               name:'Dog'
           }
        ]
           const response = [
             {
                id:1,
                name:'Cat'
              },  
           ]
        expect(removeById(payload, 2)).toEqual(response)
   })
 
  

    it('should not remove data from array with given  id  ', () => {
        const payload = [
            {
                id:1,
                name:'Cat'
            },

            {
                id:2,
                name:'Dog'
            }
         ]
        
         const response = [
            {
                id:1,
                name:'Cat'
            },

            {
                id:2,
                name:'Dog'
            }
           
         ]


        expect(removeById(payload, 3)).toEqual(response)
    })

 

})