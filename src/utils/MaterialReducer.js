export const tabsInitState = {
    addMaterial: false,
    listMaterial: false,
   };

   export const tabsReducer = (currentState, action) =>{

    switch (action.type) {
        case "ADD":
            return {
                
                ...action.payload,
                addMaterial: true
            };
        case "LIST":
            return {
                ...action.payload,
                listMaterial: true
            };
        
        default:
            return{
                ...currentState
            }
    }
   }